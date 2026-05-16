# Stage 1

## Core Actions Supported
- Fetch all notifications (with pagination)
- Mark as read
- Filter by type (Event, Result, Placement)
- Real-time delivery of new notifications

## REST API Endpoints

### GET /api/notifications
Fetch paginated list of notifications.

**Query Params**:
- `limit=10` (optional)
- `page=1` (optional)
- `type=Placement` (optional; one of Event|Result|Placement)

**Headers**:
- Authorization: Bearer <token>

**Response (200)**:
```json
{
  "data": [
    {
      "id": "d1460958-...",
      "type": "Placement",
      "message": "CSX Corp hiring drive starts tomorrow",
      "timestamp": "2026-04-22T17:51:18Z",
      "isRead": false
    }
  ],
  "pagination": {
    "total": 1250,
    "page": 1,
    "limit": 10,
    "next": "/api/notifications?page=2&limit=10"
  }
}