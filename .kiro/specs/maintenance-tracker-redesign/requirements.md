# Requirements Document

## Introduction

This feature adds a **Maintenance Tracker Panel** to the 1997 Volvo S90 Build Tracker application and overhauls the visual design to a cleaner, more professional aesthetic. The maintenance tracker displays six recurring service items with color-coded status indicators, allows the user to log completed services, and persists all data to `data.json` via the File System Access API. The style redesign replaces the current dark, glow-heavy look with a brighter, flatter, more professional design.

## Glossary

- **Tracker_App**: The single-page client-side application (`index.html`) that renders the 1997 Volvo S90 Build Tracker, reads and writes `data.json` using the File System Access API, and displays build stages, tasks, and maintenance items.
- **Maintenance_Panel**: A UI section within the Tracker_App, positioned between the hero section and the stage cards, that displays all tracked maintenance items with their service status.
- **Maintenance_Item**: A single recurring service entry (e.g., "Oil Change") with a defined interval, last-service record, and computed next-due value.
- **Mileage_Based_Item**: A Maintenance_Item whose service interval is defined in miles (e.g., every 3,000 miles).
- **Date_Based_Item**: A Maintenance_Item whose service interval is defined in months (e.g., every 36 months).
- **Status_Indicator**: A color-coded visual cue applied to each Maintenance_Item — green (good), amber (approaching due), or red (overdue).
- **Service_Log_Entry**: The act of recording a completed service by updating the `lastMiles` or `lastDate` field of a Maintenance_Item.
- **Data_File**: The `data.json` file that stores all application state including `meta`, `stages`, and `maintenance` keys.
- **Current_Mileage**: The vehicle's current odometer reading, stored in `data.json` under `meta.currentMileage`, used to compute due status for Mileage_Based_Items.

## Requirements

### Requirement 1: Maintenance Data Model

**User Story:** As a car owner, I want my maintenance records stored in a structured format alongside my build data, so that the Tracker_App can track and display service history.

#### Acceptance Criteria

1. THE Data_File SHALL contain a `maintenance` key at the top level, alongside the existing `meta` and `stages` keys.
2. THE Data_File SHALL contain a `currentMileage` field within the `meta` object to store the vehicle's current odometer reading.
3. WHEN the Tracker_App loads a Data_File that does not contain a `maintenance` key, THE Tracker_App SHALL initialize the `maintenance` key with the six default Maintenance_Items: Oil Change (3,000-mile interval), Timing Belt + Water Pump (70,000-mile interval, lastMiles: 133800), Coolant Flush (36-month interval, lastDate: "2025-03-15"), Transmission Fluid (30,000-mile interval), Brake Fluid (24-month interval), and Spark Plugs (30,000-mile interval).
4. WHEN the Tracker_App loads a Data_File that does not contain a `currentMileage` field in `meta`, THE Tracker_App SHALL initialize `currentMileage` to `null`.
5. THE Tracker_App SHALL represent each Mileage_Based_Item with the fields: `id` (string), `label` (string), `intervalMiles` (number), and `lastMiles` (number or null).
6. THE Tracker_App SHALL represent each Date_Based_Item with the fields: `id` (string), `label` (string), `intervalMonths` (number), and `lastDate` (ISO 8601 date string or null).

### Requirement 2: Current Mileage Entry

**User Story:** As a car owner, I want to enter and update my vehicle's current mileage, so that the Tracker_App can accurately compute which services are due.

#### Acceptance Criteria

1. THE Maintenance_Panel SHALL display the Current_Mileage value prominently.
2. WHEN the Current_Mileage is null, THE Maintenance_Panel SHALL display a prompt indicating that the user needs to set the current mileage.
3. WHEN the user clicks on the Current_Mileage display, THE Tracker_App SHALL present an inline text input allowing the user to type a new mileage value.
4. WHEN the user submits a new Current_Mileage value, THE Tracker_App SHALL validate that the value is a positive integer.
5. IF the user submits a non-numeric or non-positive Current_Mileage value, THEN THE Tracker_App SHALL reject the input and retain the previous Current_Mileage value.
6. WHEN the user submits a valid Current_Mileage value, THE Tracker_App SHALL save the updated value to the Data_File.

### Requirement 3: Maintenance Panel Display

**User Story:** As a car owner, I want to see all my maintenance items at a glance with clear status indicators, so that I know which services are due or overdue.

#### Acceptance Criteria

1. THE Maintenance_Panel SHALL be positioned between the hero section and the stage cards in the page layout.
2. THE Maintenance_Panel SHALL display all six Maintenance_Items in a grid or card layout.
3. THE Maintenance_Panel SHALL display each Mileage_Based_Item with a "Last" value showing the mileage at which the service was last performed, and a "Due" value showing the mileage at which the next service is due.
4. THE Maintenance_Panel SHALL display each Date_Based_Item with a "Last" value showing the date on which the service was last performed, and a "Due" value showing the date by which the next service is due.
5. WHEN a Maintenance_Item has a null last-service value, THE Maintenance_Panel SHALL display "Not recorded" for the "Last" value and "Set mileage/date to calculate" for the "Due" value.
6. THE Maintenance_Panel SHALL display a section heading that identifies the panel as the maintenance tracker.

### Requirement 4: Status Color Coding

**User Story:** As a car owner, I want color-coded indicators on each maintenance item, so that I can instantly see which services are good, approaching, or overdue.

#### Acceptance Criteria

1. WHEN a Mileage_Based_Item has remaining miles greater than 10% of its interval, THE Status_Indicator SHALL display green.
2. WHEN a Mileage_Based_Item has remaining miles between 0% and 10% (inclusive) of its interval, THE Status_Indicator SHALL display amber.
3. WHEN a Mileage_Based_Item has remaining miles below 0% (overdue), THE Status_Indicator SHALL display red.
4. WHEN a Date_Based_Item has remaining time greater than 60 days before the due date, THE Status_Indicator SHALL display green.
5. WHEN a Date_Based_Item has remaining time between 0 and 60 days (inclusive) before the due date, THE Status_Indicator SHALL display amber.
6. WHEN a Date_Based_Item is past the due date (overdue), THE Status_Indicator SHALL display red.
7. WHEN a Maintenance_Item has no last-service record, THE Status_Indicator SHALL display amber to indicate unknown status.
8. WHEN the Current_Mileage is null, THE Status_Indicator for all Mileage_Based_Items SHALL display amber to indicate that status cannot be computed.

### Requirement 5: Service Logging

**User Story:** As a car owner, I want to log a completed service by entering the mileage or date, so that the maintenance tracker stays up to date.

#### Acceptance Criteria

1. WHEN the user clicks on a Maintenance_Item, THE Tracker_App SHALL present an inline input field for logging a completed service.
2. WHEN the user clicks on a Mileage_Based_Item, THE Tracker_App SHALL present a numeric input field pre-populated with the Current_Mileage value (if available).
3. WHEN the user clicks on a Date_Based_Item, THE Tracker_App SHALL present a date input field pre-populated with today's date.
4. WHEN the user submits a valid mileage value for a Mileage_Based_Item, THE Tracker_App SHALL update the `lastMiles` field of that Maintenance_Item in the Data_File.
5. WHEN the user submits a valid date for a Date_Based_Item, THE Tracker_App SHALL update the `lastDate` field of that Maintenance_Item in the Data_File.
6. IF the user submits an invalid value (non-numeric mileage, invalid date format), THEN THE Tracker_App SHALL reject the input and retain the previous last-service value.
7. WHEN a Service_Log_Entry is saved, THE Tracker_App SHALL re-render the Maintenance_Panel to reflect the updated status.
8. WHEN a Service_Log_Entry is saved, THE Tracker_App SHALL display the save indicator confirming the write to the Data_File.

### Requirement 6: Due Date and Mileage Computation

**User Story:** As a car owner, I want the tracker to automatically calculate when each service is next due, so that I do not have to do the math myself.

#### Acceptance Criteria

1. THE Tracker_App SHALL compute the next due mileage for a Mileage_Based_Item as `lastMiles + intervalMiles`.
2. THE Tracker_App SHALL compute the next due date for a Date_Based_Item as `lastDate + intervalMonths`.
3. THE Tracker_App SHALL compute remaining miles for a Mileage_Based_Item as `dueMiles - currentMileage`.
4. THE Tracker_App SHALL compute remaining days for a Date_Based_Item as the number of days between today and the computed due date.
5. WHEN a Mileage_Based_Item has a null `lastMiles` value, THE Tracker_App SHALL not compute a due mileage and SHALL display the item as having unknown due status.
6. WHEN a Date_Based_Item has a null `lastDate` value, THE Tracker_App SHALL not compute a due date and SHALL display the item as having unknown due status.

### Requirement 7: Visual Design Overhaul

**User Story:** As a user, I want the application to have a clean, professional, modern appearance, so that it feels polished and easy to read.

#### Acceptance Criteria

1. THE Tracker_App SHALL use a brighter background color scheme, replacing the current dark (#0f1117) background with a lighter palette.
2. THE Tracker_App SHALL reduce or eliminate glow effects (box-shadow glows, radial gradient overlays, animated pulsing glows) from all UI elements.
3. THE Tracker_App SHALL use flat or subtly elevated card styles instead of heavy shadow and gradient treatments.
4. THE Tracker_App SHALL maintain the Inter font family and the existing responsive breakpoints.
5. THE Tracker_App SHALL preserve all existing functionality of the landing screen, hero section, stage cards, task toggling, and save indicator.
6. THE Tracker_App SHALL apply a consistent color palette across the Maintenance_Panel and existing stage card components.
7. THE Tracker_App SHALL ensure that all text meets a minimum contrast ratio of 4.5:1 against its background for readability.

### Requirement 8: Data Persistence

**User Story:** As a user, I want all maintenance data saved automatically when I make changes, so that my records are never lost.

#### Acceptance Criteria

1. WHEN the user logs a Service_Log_Entry, THE Tracker_App SHALL write the updated Data_File to disk using the File System Access API.
2. WHEN the user updates the Current_Mileage, THE Tracker_App SHALL write the updated Data_File to disk using the File System Access API.
3. IF a write to the Data_File fails, THEN THE Tracker_App SHALL display the save indicator in an error state with the text "Save failed".
4. THE Tracker_App SHALL not modify the existing `meta` or `stages` data when saving maintenance changes.
