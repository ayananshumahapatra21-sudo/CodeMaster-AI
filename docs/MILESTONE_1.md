# Milestone 1: Project Scaffolding & System Connectivity

## Objectives
- Scaffold the `CodeMaster AI` repository structure: `frontend/`, `backend/`, and `docs/`.
- Build the Spring Boot 3 + Java 21 backend application (`codemaster-api`).
- Establish PostgreSQL connection to `codemaster_db` using externalized environment variables.
- Implement the `GET /api/health` telemetry endpoint.
- Develop a modern developer-focused dark-themed dashboard in React (Vite + Tailwind CSS).
- Connect the frontend to the backend via Axios and display live indicators for Spring Boot and PostgreSQL health.

## Verification Checklist
- [x] Backend compiles clean with Maven on Java 21.
- [x] PostgreSQL connection active and connected to `codemaster_db`.
- [x] `GET /api/health` returns status `UP` and database status `CONNECTED`.
- [x] Frontend running on `http://localhost:5173`.
- [x] Frontend renders branding, navigation, statistics cards, and coding difficulty cards.
- [x] Status indicators dynamically show live backend and database connectivity.
