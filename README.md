# CodeMaster AI

> Next-generation AI-powered competitive programming platform designed and engineered by **Ayananshu Mahapatra**.

[![Java 21](https://img.shields.io/badge/Java-21-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.5-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791.svg)](https://www.postgresql.org/)

---

## Project Structure

```
CodeMaster-AI/
├── backend/                  # Spring Boot 3 + Java 21 REST API (codemaster-api)
│   ├── src/main/java/        # Application source code
│   ├── src/main/resources/   # application.properties & resources
│   └── pom.xml               # Maven build descriptor
├── frontend/                 # React 18 + Vite + Tailwind CSS dashboard
│   ├── src/                  # React source code & components
│   ├── package.json          # Node dependencies
│   └── tailwind.config.js    # Developer dark navy theme configuration
├── docs/                     # Architectural & milestone documentation
│   ├── ARCHITECTURE.md
│   └── MILESTONE_1.md
├── .gitignore                # Git ignore patterns
└── README.md                 # Project documentation
```

---

## Milestone 1 Overview

Milestone 1 establishes the foundational infrastructure, full-stack scaffolding, PostgreSQL connectivity, and real-time health telemetry across the platform.

### Key Capabilities
- **Spring Boot Backend**: RESTful architecture running on port `8080` with Spring Data JPA and HikariCP connection pooling.
- **PostgreSQL Database**: Configured for `codemaster_db` with zero hardcoded credentials via environment variable interpolation.
- **Telemetry & Health Endpoint**: `GET /api/health` providing live telemetry on application uptime, environment specs, and PostgreSQL round-trip latency.
- **Developer Dark-Navy Dashboard**: Responsive, developer-focused React interface with CodeMaster AI branding, stats cards, difficulty breakdown, and live health badges.

---

## Quickstart Guide

### Prerequisites
- **Java 21** or later
- **Maven 3.9+** (or included Maven wrapper)
- **Node.js 20+** and **npm**
- **PostgreSQL 15+** running on `localhost:5432`

---

### 1. Database Setup
Ensure PostgreSQL is running and the database `codemaster_db` is created:
```sql
CREATE DATABASE codemaster_db;
```

---

### 2. Backend Setup (`codemaster-api`)
Navigate to the `backend/` directory:
```bash
cd backend

# Configure environment variables (optional - defaults to localhost:5432)
export DB_HOST=localhost
export DB_PORT=5432
export DB_NAME=codemaster_db
export DB_USERNAME=postgres
export DB_PASSWORD=postgres

# Build and run the Spring Boot application
mvn spring-boot:run
```
The API will start at **http://localhost:8080**.
Verify the health endpoint:
```bash
curl http://localhost:8080/api/health
```

---

### 3. Frontend Setup (`frontend`)
In a new terminal, navigate to the `frontend/` directory:
```bash
cd frontend

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```
The dashboard will be available at **http://localhost:5173**.

---

## API Documentation

### `GET /api/health`
Returns live service and database connectivity telemetry.

**Sample Response (`200 OK`)**:
```json
{
  "status": "UP",
  "application": "codemaster-api",
  "version": "1.0.0-SNAPSHOT",
  "timestamp": "2026-11-01T20:15:00.123456",
  "uptime": "0h 1m 24s",
  "environment": {
    "javaVersion": "21",
    "springBootVersion": "3.3.5"
  },
  "database": {
    "status": "CONNECTED",
    "type": "PostgreSQL",
    "databaseName": "codemaster_db",
    "url": "jdbc:postgresql://localhost:5432/codemaster_db",
    "version": "PostgreSQL 16.2 on x86_64-pc-windows-msvc",
    "responseTimeMs": 3
  }
}
```

---

## Author & Lead Developer

**Ayananshu Mahapatra**
- **GitHub**: [@ayananshumahapatra21-sudo](https://github.com/ayananshumahapatra21-sudo)
- **Project Repository**: [CodeMaster-AI](https://github.com/ayananshumahapatra21-sudo/CodeMaster-AI)

---

## License
MIT License © 2026 CodeMaster AI • Ayananshu Mahapatra.
