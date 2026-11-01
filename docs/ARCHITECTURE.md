# Architecture Overview - CodeMaster AI
**Lead Architect & Developer**: Ayananshu Mahapatra

## 1. System Architecture

CodeMaster AI is an enterprise-grade AI-assisted coding and competitive programming platform architected on a decoupled full-stack model.

```
┌─────────────────────────────────────────────────────────────────┐
│                       Client Layer (Vite + React)              │
│      Dark Navy Theme · Modern UI · Real-Time Health Status      │
│                     (http://localhost:5173)                     │
└────────────────────────────────┬────────────────────────────────┘
                                 │
                                 │ REST API / JSON (Axios)
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                API Layer (Spring Boot 3 + Java 21)              │
│       Spring Web · Spring Data JPA · DevTools · Validation      │
│                     (http://localhost:8080)                     │
└────────────────────────────────┬────────────────────────────────┘
                                 │
                                 │ JDBC / Connection Pooling (HikariCP)
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                       Data Layer (PostgreSQL)                   │
│          Database: codemaster_db · Host: localhost:5432         │
└─────────────────────────────────────────────────────────────────┘
```

## 2. Component Specifications

### 2.1 Backend (`codemaster-api`)
- **Framework**: Spring Boot 3.3.5 / Java 21 LTS
- **Core Modules**:
  - `HealthController`: Exposes `/api/health` providing live telemetry of API and database status.
  - `HealthService`: Performs non-blocking ping checks, query verification, and latency measurement against PostgreSQL.
  - `CorsConfig`: Cross-Origin Resource Sharing permitting client origins (`http://localhost:5173`).
  - `DatabaseHealth` & `HealthResponse` DTOs: Type-safe immutable response structures.

### 2.2 Frontend (`frontend`)
- **Framework**: React 18 + Vite 6
- **Styling**: Tailwind CSS with custom developer dark-navy palette (`#070b14`, `#0d1527`, `#1e293b`).
- **Icons**: Lucide React
- **HTTP Client**: Axios configured with timeout and error interceptors.
- **Routing**: React Router v6.

### 2.3 Data Store (`PostgreSQL`)
- **Database**: `codemaster_db`
- **Driver**: PostgreSQL JDBC 42.7+
- **Credentials**: Environment-variable backed (`DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USERNAME`, `DB_PASSWORD`) with secure defaults.
