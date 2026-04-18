# Implementation Plan: Maintenance Tracker Redesign

## Overview

This plan implements the maintenance tracker panel and visual redesign for the 1997 Volvo S90 Build Tracker. The app is a single `index.html` file with inline CSS and JS, using the File System Access API for persistence. Tasks are ordered to build incrementally: extract pure functions first, add the data model, build the maintenance panel, wire up inline editing, apply the visual redesign, and validate everything end-to-end.

## Tasks

- [ ] 1. Extract pure functions into a testable module
  - [x] 1.1 Create a `functions.js` file and extract pure logic from `index.html`
    - Extract or create the following pure functions in `functions.js`: `initializeDefaults(data)`, `computeStatus(item, currentMileage)`, `validateMileage(value)`, `validateDate(value)`, `logService(item, value)` (returns updated item or null on invalid input)
    - Each function must be independently callable without DOM or global state
    - Add `<script src="functions.js"></script>` to `index.html` before the main inline `<script>` block so the app can call these functions
    - _Requirements: 1.3, 1.4, 4.1–4.8, 5.4–5.6, 6.1–6.6_

  - [ ]* 1.2 Write property test: Initialization preserves existing data and adds correct defaults
    - **Property 1: Initialization preserves existing data and adds correct defaults**
    - Use fast-check to generate random data objects with/without `maintenance` and `currentMileage`
    - Verify original `meta` fields and `stages` are unchanged, `maintenance` has 6 correct defaults, `currentMileage` is null if missing
    - **Validates: Requirements 1.3, 1.4**

  - [ ]* 1.3 Write property test: Mileage validation accepts only positive integers
    - **Property 2: Mileage validation accepts only positive integers**
    - Use fast-check to generate random strings, integers, doubles, and edge cases
    - Verify validation returns true only for positive integer strings
    - **Validates: Requirements 2.4, 2.5**

  - [ ]* 1.4 Write property test: Mileage-based status computation is correct
    - **Property 3: Mileage-based status computation is correct**
    - Use fast-check to generate random (lastMiles, intervalMiles, currentMileage) tuples
    - Verify green/amber/red thresholds and remaining value
    - **Validates: Requirements 4.1, 4.2, 4.3, 6.1, 6.3**

  - [ ]* 1.5 Write property test: Date-based status computation is correct
    - **Property 4: Date-based status computation is correct**
    - Use fast-check to generate random (lastDate, intervalMonths, today) tuples
    - Verify green/amber/red thresholds and remaining days value
    - **Validates: Requirements 4.4, 4.5, 4.6, 6.2, 6.4**

  - [ ]* 1.6 Write property test: Service logging updates correct field or rejects invalid input
    - **Property 5: Service logging updates the correct field with valid input and rejects invalid input**
    - Use fast-check to generate random items and input values (valid and invalid)
    - Verify lastMiles/lastDate updated for valid input, unchanged for invalid
    - **Validates: Requirements 5.4, 5.5, 5.6**

  - [ ]* 1.7 Write property test: Maintenance changes preserve existing meta and stages data
    - **Property 6: Maintenance changes preserve existing meta and stages data**
    - Use fast-check to generate full data objects, perform maintenance mutations, verify meta/stages unchanged
    - **Validates: Requirements 8.4**

- [ ] 2. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 3. Implement data model changes and backward-compatible migration
  - [x] 3.1 Update `openFolder()` to call `initializeDefaults(data)` after reading data.json
    - After `readData()` returns, call `initializeDefaults(data)` before assigning to `currentData`
    - This ensures `maintenance` array and `currentMileage` are always present in memory
    - On next save, the defaults will be persisted to `data.json`
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

  - [ ]* 3.2 Write unit tests for default initialization with real data.json structure
    - Verify 6 default items have correct ids, labels, intervals, and initial values
    - Verify timing belt lastMiles is 133800, coolant flush lastDate is "2025-03-15"
    - Verify existing meta and stages are untouched
    - _Requirements: 1.3, 1.5, 1.6_

- [x] 4. Implement maintenance panel rendering
  - [x] 4.1 Add `renderMaintenancePanel(data)` and `renderMaintenanceItem(item, currentMileage)` functions
    - `renderMaintenancePanel` returns HTML string with section heading "Maintenance Tracker", current mileage display, and a grid of 6 maintenance item cards
    - `renderMaintenanceItem` returns HTML string for a single card with label, status dot (green/amber/red via `computeStatus`), "Last" value, and "Due" value
    - Handle null lastMiles/lastDate: show "Not recorded" for Last, "Set mileage/date to calculate" for Due
    - Handle null currentMileage: show "Set current mileage" prompt
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 4.1–4.8, 6.1–6.6_

  - [x] 4.2 Insert maintenance panel into the `render(data)` function
    - Call `renderMaintenancePanel(data)` and insert its output between the overall-progress section and the `main-content` div in the `render()` template string
    - _Requirements: 3.1_

  - [x] 4.3 Add maintenance panel CSS
    - Add styles for `.maintenance-panel`, `.maintenance-header`, `.mileage-display`, `.maintenance-grid`, `.maint-card`, `.maint-card.status-green`, `.maint-card.status-amber`, `.maint-card.status-red`, `.maint-label`, `.maint-detail`, `.maint-value`
    - Grid: 3 columns on desktop, 2 on tablet, 1 on mobile
    - Status colors use existing `--green`, `--amber`, `--red` CSS variables
    - _Requirements: 3.2, 4.1–4.6, 7.6_

- [x] 5. Implement inline editing for mileage and service logging
  - [x] 5.1 Implement current mileage inline editing
    - Clicking the mileage display swaps it for a text input
    - Enter commits the value (calls `updateMileage`), Escape cancels, blur commits if valid
    - `updateMileage(value)` validates via `validateMileage`, updates `currentData.meta.currentMileage`, calls `render()` + `saveData()`
    - Invalid input is rejected silently, previous value retained
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

  - [x] 5.2 Implement service logging inline editing
    - Clicking a maintenance item card shows an inline input field
    - Mileage items: numeric input pre-populated with currentMileage (if available)
    - Date items: date input pre-populated with today's date
    - Enter commits, Escape cancels, blur commits if valid
    - Valid submission calls `logService` logic, updates `currentData.maintenance`, calls `render()` + `saveData()`
    - Invalid input rejected silently, previous value retained
    - Save indicator shown on successful save
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 8.1, 8.2, 8.3_

- [ ] 6. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Apply visual design overhaul
  - [x] 7.1 Update CSS custom properties and remove glow effects
    - Replace `:root` variables: `--bg` → `#f5f6fa`, `--bg-card` → `#ffffff`, `--bg-hover` → `#f0f1f5`, `--text-primary` → `#1a1d26`, `--text-secondary` → `#5f6880`, `--text-muted` → `#9ca3b4`, `--border` → `rgba(0,0,0,0.08)`, `--border-card` → `rgba(0,0,0,0.1)`, `--shadow` → `0 1px 3px rgba(0,0,0,0.08)`, `--shadow-lg` → `0 4px 12px rgba(0,0,0,0.1)`
    - Remove or replace all `box-shadow` glow effects on accent elements, progress bars, and animated dots
    - Replace dark gradients in hero and landing backgrounds with light gradients or solid colors
    - Keep Inter font family and responsive breakpoints unchanged
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

  - [x] 7.2 Update component styles for light theme consistency
    - Update hero section: light background, dark text, adjust SVG silhouette opacity
    - Update landing screen: light background, dark text, adjust button styles
    - Update stage cards: white background, subtle borders, flat shadows
    - Update task items: adjust hover states, checked/unchecked colors for light theme
    - Update section toggles, badges, progress bars for light palette
    - Update save indicator colors for light background
    - Update footer styles
    - Ensure consistent color palette across maintenance panel and stage cards
    - _Requirements: 7.1, 7.2, 7.3, 7.5, 7.6_

  - [x] 7.3 Verify contrast ratios meet WCAG AA (4.5:1 minimum)
    - Check all text/background color pairs in the updated palette
    - Adjust any colors that fail the 4.5:1 contrast ratio
    - _Requirements: 7.7_

- [-] 8. Wire everything together and final integration
  - [ ] 8.1 Verify existing functionality is preserved
    - Test that task toggling, stage rendering, section expand/collapse, save indicator, and landing screen all work correctly after all changes
    - Verify the File System Access API read/write cycle works with the new `maintenance` and `currentMileage` fields
    - _Requirements: 7.5, 8.1, 8.2, 8.3, 8.4_

  - [ ]* 8.2 Write integration tests for full render cycle
    - Test: load data with maintenance → verify panel renders 6 items → log a service → verify re-render with updated status
    - Test: load data without maintenance → verify defaults initialized → verify panel renders
    - _Requirements: 5.7, 5.8, 1.3, 1.4_

- [ ] 9. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- The pure functions in `functions.js` enable testing without a DOM environment
- fast-check is used for property-based testing (standard PBT library for JavaScript)
- All changes happen within `index.html` (CSS + JS) and the new `functions.js` file
