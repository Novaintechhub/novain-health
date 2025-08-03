# NovainHealth API Documentation

This document provides details on all the available API endpoints for the NovainHealth application, intended for use by the mobile app development team.

---

## Endpoints

### 1. Appointments

*   **Endpoint:** `/api/appointments`
*   **Method:** `GET`
*   **Description:** Fetches a list of all appointments for the currently authenticated user.
*   **Response Body (Example):**
    ```json
    [
      {
        "name": "Tosin Adebayo",
        "avatarUrl": "https://placehold.co/80x80.png",
        "date": "12th October 2025, 4:00 PM",
        "bookingDate": "11th October 2025",
        "type": "Video Call",
        "status": "Confirm",
        "amount": "₦200"
      }
    ]
    ```

---
<!-- New endpoints will be added here as they are created. -->
