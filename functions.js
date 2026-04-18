// ── Pure functions for the Maintenance Tracker ──────────────────────────

/**
 * Initialize default maintenance data if missing from the data object.
 * Mutates data in place and returns it.
 *
 * @param {object} data - Parsed data.json object
 * @returns {object} The same data object with defaults added
 */
function initializeDefaults(data) {
  if (!data.meta) {
    data.meta = {};
  }

  if (!('currentMileage' in data.meta)) {
    data.meta.currentMileage = null;
  }

  if (!Array.isArray(data.maintenance)) {
    data.maintenance = [
      { id: 'oil-change',    label: 'Oil Change',               intervalMiles: 3000,  lastMiles: null },
      { id: 'timing-belt',   label: 'Timing Belt + Water Pump', intervalMiles: 70000, lastMiles: 133800 },
      { id: 'coolant-flush', label: 'Coolant Flush',            intervalMonths: 36,   lastDate: '2025-03-15' },
      { id: 'trans-fluid',   label: 'Transmission Fluid',       intervalMiles: 30000, lastMiles: null },
      { id: 'brake-fluid',   label: 'Brake Fluid',              intervalMonths: 24,   lastDate: null },
      { id: 'spark-plugs',   label: 'Spark Plugs',              intervalMiles: 30000, lastMiles: null }
    ];
  }

  return data;
}

/**
 * Compute the status color and due info for a single maintenance item.
 * Pure function — no side effects.
 *
 * @param {object} item - A maintenance item object
 * @param {number|null} currentMileage - Current odometer reading
 * @param {Date} [today] - Reference date for date-based calculations (defaults to new Date())
 * @returns {{ status: 'green'|'amber'|'red', dueMiles?: number, dueDate?: string, remaining?: number|string }}
 */
function computeStatus(item, currentMileage, today) {
  if (!today) {
    today = new Date();
  }

  // Mileage-based item
  if ('intervalMiles' in item) {
    // No last-service record
    if (item.lastMiles === null || item.lastMiles === undefined) {
      return { status: 'amber' };
    }
    // Current mileage unknown
    if (currentMileage === null || currentMileage === undefined) {
      return { status: 'amber' };
    }

    var dueMiles = item.lastMiles + item.intervalMiles;
    var remaining = dueMiles - currentMileage;
    var threshold = 0.1 * item.intervalMiles;

    var status;
    if (remaining < 0) {
      status = 'red';
    } else if (remaining <= threshold) {
      status = 'amber';
    } else {
      status = 'green';
    }

    return { status: status, dueMiles: dueMiles, remaining: remaining };
  }

  // Date-based item
  if ('intervalMonths' in item) {
    // No last-service record
    if (item.lastDate === null || item.lastDate === undefined) {
      return { status: 'amber' };
    }

    // Compute due date by adding intervalMonths to lastDate
    var parts = item.lastDate.split('-');
    var lastDateObj = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    var dueMonth = lastDateObj.getMonth() + item.intervalMonths;
    var dueDateObj = new Date(lastDateObj.getFullYear(), dueMonth, lastDateObj.getDate());

    // Format due date as YYYY-MM-DD
    var yyyy = dueDateObj.getFullYear();
    var mm = String(dueDateObj.getMonth() + 1).padStart(2, '0');
    var dd = String(dueDateObj.getDate()).padStart(2, '0');
    var dueDate = yyyy + '-' + mm + '-' + dd;

    // Compute remaining days
    var todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    var dueStart = new Date(dueDateObj.getFullYear(), dueDateObj.getMonth(), dueDateObj.getDate());
    var remainingDays = Math.round((dueStart - todayStart) / (1000 * 60 * 60 * 24));

    var status;
    if (remainingDays < 0) {
      status = 'red';
    } else if (remainingDays <= 60) {
      status = 'amber';
    } else {
      status = 'green';
    }

    return { status: status, dueDate: dueDate, remaining: remainingDays };
  }

  // Fallback — unknown item type
  return { status: 'amber' };
}

/**
 * Validate that a string represents a valid positive integer for mileage.
 * Returns true only for strings like "1", "42", "133800".
 * Rejects decimals, negatives, leading zeros (except "0" itself is not positive), empty, whitespace, etc.
 *
 * @param {string} value - The string to validate
 * @returns {boolean}
 */
function validateMileage(value) {
  if (typeof value !== 'string') return false;
  // Must match one or more digits, no leading zeros (unless the number is just "0", but 0 is not positive)
  if (!/^[1-9][0-9]*$/.test(value)) return false;
  return true;
}

/**
 * Validate that a string is a valid ISO 8601 date (YYYY-MM-DD) representing a real calendar date.
 *
 * @param {string} value - The string to validate
 * @returns {boolean}
 */
function validateDate(value) {
  if (typeof value !== 'string') return false;
  // Must match YYYY-MM-DD format
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  var parts = value.split('-');
  var year = parseInt(parts[0], 10);
  var month = parseInt(parts[1], 10);
  var day = parseInt(parts[2], 10);

  // Month must be 1-12
  if (month < 1 || month > 12) return false;

  // Create a date and verify it round-trips (catches invalid days like Feb 30)
  var dateObj = new Date(year, month - 1, day);
  if (dateObj.getFullYear() !== year || dateObj.getMonth() !== month - 1 || dateObj.getDate() !== day) {
    return false;
  }

  return true;
}

/**
 * Log a service for a maintenance item. Returns a copy of the item with the
 * updated field, or null if the input is invalid.
 *
 * @param {object} item - A maintenance item object
 * @param {string} value - The value to log (mileage string or date string)
 * @returns {object|null} Updated copy of the item, or null on invalid input
 */
function logService(item, value) {
  // Mileage-based item
  if ('intervalMiles' in item) {
    if (!validateMileage(value)) return null;
    var updated = {};
    for (var key in item) {
      if (item.hasOwnProperty(key)) {
        updated[key] = item[key];
      }
    }
    updated.lastMiles = parseInt(value, 10);
    return updated;
  }

  // Date-based item
  if ('intervalMonths' in item) {
    if (!validateDate(value)) return null;
    var updated = {};
    for (var key in item) {
      if (item.hasOwnProperty(key)) {
        updated[key] = item[key];
      }
    }
    updated.lastDate = value;
    return updated;
  }

  // Unknown item type
  return null;
}

// ── Exports for Node.js testing (no-op in browser) ──────
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initializeDefaults, computeStatus, validateMileage, validateDate, logService };
}
