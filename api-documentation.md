
# API Documentation

This file documents all the available API endpoints for the application.

## Appointments

- **URL:** `/api/appointments`
- **Method:** `GET`
- **Description:** Retrieves a list of all patient appointments.
- **Returns:** An array of appointment objects.

## Billing

- **URL:** `/api/billing`
- **Method:** `GET`
- **Description:** Retrieves a list of billing invoices.
- **Returns:** An array of billing objects.

## Consultation Payments

- **URL:** `/api/consultation-payments`
- **Method:** `GET`
- **Description:** Retrieves a list of consultation payment transactions.
- **Returns:** An array of transaction objects.

## Dashboard Appointments

- **URL:** `/api/dashboard-appointments`
- **Method:** `GET`
- **Description:** Retrieves a list of appointments for the doctor dashboard.
- **Returns:** An array of appointment objects.

## Dashboard Stats

- **URL:** `/api/dashboard-stats`
- **Method:** `GET`
- **Description:** Retrieves key statistics for the doctor dashboard.
- **Returns:** An object with stats like `totalPatients`, `todayPatients`, `appointments`.

## Doctors

- **URL:** `/api/doctors`
- **Method:** `GET`
- **Description:** Retrieves a list of available doctors.
- **Returns:** An array of doctor profile objects.

## Invoices

- **URL:** `/api/invoices`
- **Method:** `GET`
- **Description:** Retrieves a list of all invoices.
- **Returns:** An array of invoice objects.

## Lab Tests

- **URL:** `/api/lab-tests`
- **Method:** `GET`
- **Description:** Retrieves a list of lab test records.
- **Returns:** An array of lab test objects.

## Medical Records

- **URL:** `/api/medical-records`
- **Method:** `GET`
- **Description:** Retrieves a list of patient medical records.
- **Returns:** An array of medical record objects.

## My Patients

- **URL:** `/api/my-patients`
- **Method:** `GET`
- **Description:** Retrieves a list of the doctor's patients.
- **Returns:** An array of patient objects.

## Prescriptions

- **URL:** `/api/prescriptions`
- **Method:** `GET`
- **Description:** Retrieves a list of prescriptions.
- **Returns:** An array of prescription objects.

## Reviews

- **URL:** `/api/reviews`
- **Method:** `GET`
- **Description:** Retrieves a list of doctor reviews.
- **Returns:** An array of review objects.
