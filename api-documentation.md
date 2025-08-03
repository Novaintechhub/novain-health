
# API Documentation

This file provides documentation for the API endpoints that can be used by the mobile app developers.

## Endpoints

### Get Appointments

- **URL:** `/api/appointments`
- **Method:** `GET`
- **Description:** Retrieves a list of all patient appointments.
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    [
      {
        "name": "Tosin Adebayo",
        "avatarUrl": "https://placehold.co/80x80.png",
        "avatarHint": "woman portrait",
        "date": "12th October 2025, 4:00 PM",
        "bookingDate": "11th October 2025",
        "type": "Video Call",
        "status": "Confirm",
        "amount": "₦200"
      },
      ...
    ]
    ```
