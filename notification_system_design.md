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


# Stage 2

## Suggested DB: PostgreSQL

### Why?
- ACID compliance
- Strong support for JSONB, indexing, full-text search
- Handles complex queries well
- Mature ecosystem
- Supports partial indexes, materialized views

## Schema

```sql
CREATE TABLE students (
  id VARCHAR(50) PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE
);

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id VARCHAR(50) REFERENCES students(id),
  type VARCHAR(20) CHECK (type IN ('Event', 'Result', 'Placement')),
  message TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  is_read BOOLEAN DEFAULT FALSE
);

-- Index for frequent query
CREATE INDEX idx_notifications_student_isread ON notifications(student_id, is_read DESC, timestamp DESC);


# Stage 3

## Optimized Query

```sql
SELECT id, type, message, timestamp
FROM notifications
WHERE student_id = '1042' AND is_read = false
ORDER BY timestamp DESC
LIMIT 50;
```

Create index:

```sql
CREATE INDEX idx_unread_recent
ON notifications(student_id, is_read, timestamp DESC);
```


# Stage 4

## Performance Improvements

- Pagination (10 per request)
- Redis cache for unread count
- Client caching (5 mins TTL)
- WebSockets for real-time updates


# Stage 5

## Bulk Notify Reliability

### Problems in naive approach

Sequential sending is very slow and unreliable. If email fails midway, system state becomes inconsistent.

### Better Approach: Queue + Worker

- Create a job log
- Enqueue each notification task
- Worker processes with retry
- DB write and email sending are decoupled

### Revised Pseudocode

```python
def notify_all(student_ids, msg):
  job_id = create_job_log(msg)
  for sid in student_ids:
    enqueue({
      'student_id': sid,
      'message': msg,
      'job_id': job_id,
      'retries': 0
    })
```