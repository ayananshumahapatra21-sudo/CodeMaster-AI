# CodeMaster AI - REST API Documentation

> Base URL: `http://localhost:8080/api/v1` (with `/api` fallback aliases)  
> Interactive Swagger UI: `http://localhost:8080/swagger-ui.html`  
> OpenAPI Specification: `http://localhost:8080/v3/api-docs`

---

## 1. System Health & Telemetry

### `GET /api/health` or `GET /api/v1/health`
Retrieves server uptime, Java/Spring runtime specifications, and live database latency.

#### Response `200 OK`
```json
{
  "status": "UP",
  "application": "codemaster-api",
  "version": "1.0.0-SNAPSHOT",
  "timestamp": "2026-11-19T12:00:00",
  "uptime": "2m 14s",
  "environment": {
    "author": "Ayananshu Mahapatra",
    "leadDeveloper": "Ayananshu Mahapatra",
    "javaVersion": "25.0.2",
    "springBootVersion": "3.3.5",
    "osName": "Windows 11"
  },
  "database": {
    "status": "CONNECTED",
    "type": "PostgreSQL",
    "databaseName": "codemaster_db",
    "url": "jdbc:postgresql://localhost:5432/codemaster_db",
    "productVersion": "PostgreSQL 16.2",
    "latencyMs": 4,
    "error": null
  }
}
```

---

## 2. Problem Management

### `GET /api/v1/problems`
Returns all coding problems with metadata, difficulty, acceptance rate, and sample test cases.

### `GET /api/v1/problems/{id}`
Returns full problem details, starter code templates (Java, Python, C++, JS), and sample test cases.

### `POST /api/v1/problems` *(Admin)*
Creates a new problem.
```json
{
  "title": "Two Sum",
  "description": "Given an array of integers...",
  "difficulty": "Easy",
  "topic": "Arrays & Hashing",
  "constraints": "2 <= nums.length <= 10^4",
  "acceptanceRate": "52.4%"
}
```

### `POST /api/v1/problems/{id}/run`
Executes code against sample test cases.
```json
{
  "code": "class Solution { ... }",
  "language": "java"
}
```

#### Response `200 OK`
```json
{
  "status": "Accepted",
  "passedCount": 2,
  "totalCount": 2,
  "executionTimeMs": 14,
  "memoryKb": 42100,
  "message": "All sample test cases passed successfully!",
  "language": "java"
}
```

---

## 3. Planned Endpoints (Milestones 2–8)

| Method | Endpoint | Milestone | Description |
|---|---|---|---|
| `POST` | `/auth/register` | Milestone 2 | Register new user account |
| `POST` | `/auth/login` | Milestone 2 | Authenticate and obtain JWT token |
| `GET` | `/users/me` | Milestone 2 | Current authenticated user profile |
| `POST` | `/submissions` | Milestone 6 | Submit solution for full evaluation |
| `GET` | `/submissions/{id}` | Milestone 6 | Submission verdict and performance |
| `GET` | `/submissions/history`| Milestone 6 | User submission history |
| `POST` | `/ai/hint` | Milestone 7 | Request AI-generated hint |
| `POST` | `/ai/explain` | Milestone 7 | Request AI algorithmic explanation |
| `POST` | `/ai/debug` | Milestone 7 | Request AI debugging feedback |
| `GET` | `/users/me/progress` | Milestone 8 | Progress statistics and difficulty breakdown |
| `GET` | `/leaderboard` | Milestone 8 | Global user rankings and points |
