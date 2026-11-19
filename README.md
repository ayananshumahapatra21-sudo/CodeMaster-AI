# CodeMaster AI

> Next-generation AI-powered competitive programming platform designed and engineered by **Ayananshu Mahapatra**.

[![Java 21+](https://img.shields.io/badge/Java-21%2B%20%2F%2025-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.5-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791.svg)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED.svg)](https://www.docker.com/)

---

## 1. Project Overview

**CodeMaster AI** is a full-stack, AI-driven coding practice and competitive programming platform inspired by LeetCode, HackerRank, and CodeChef. It combines a production-grade Spring Boot 3 modular monolith, a React 18 single-page application with Monaco Editor, Docker-isolated code execution sandboxing, and contextual AI hints.

### Core Modules
| Module | Features |
|---|---|
| **Authentication (M2)** | Register, login, JWT token management, role-based access control (USER / ADMIN) |
| **Problem Management (M3)** | Browse, search, filter by topic and difficulty, starter code templates |
| **Code Editor (M4)** | Monaco Editor integration, multi-language syntax highlighting, customizable layout |
| **Execution Engine (M5)** | Docker sandbox isolation, CPU timeouts (2s), memory caps (256MB), network isolation |
| **Submissions (M6)** | Sample & hidden test case evaluation, verdicts (Accepted, TLE, MLE, WA) |
| **AI Assistant (M7)** | Algorithmic hints, step-by-step explanations, intelligent debugging |
| **Progress & Leaderboard (M8)** | Difficulty breakdown, user activity, points, and global rankings |

---

## 2. Project Architecture & Structure

```
codemaster-ai/
├── backend/                       # Spring Boot 3 + Java 21 REST API
│   ├── src/main/java/com/codemaster/
│   │   ├── common/                # ApiResponse, GlobalExceptionHandler
│   │   ├── config/                # CORS, Swagger/OpenAPI
│   │   ├── health/                # System telemetry & database latency
│   │   ├── problem/               # Problem, Topic, TestCase entities, service & controller
│   │   ├── user/                  # User, Profile entities & repository
│   │   ├── submission/            # Submission, SubmissionResult entities
│   │   ├── progress/              # UserProgress tracking
│   │   └── auth/ security/ execution/ ai/ leaderboard/ contest/ # Milestone modules
│   ├── src/main/resources/
│   │   ├── application.yml        # Config with dev/test profiles & env interpolation
│   │   └── db/migration/          # Flyway SQL migrations (V1 schema, V2 seed data)
│   └── pom.xml                    # Maven build descriptor
├── frontend/                      # React 18 + Vite + Tailwind CSS SPA
│   ├── src/
│   │   ├── components/            # Navbar, Footer, StatCard, DifficultyCard, StatusIndicator
│   │   ├── pages/                 # Dashboard, Problems, ProblemWorkspace, Progress
│   │   ├── layouts/               # MainLayout wrapper
│   │   ├── services/              # API client, healthService, problemService, authService
│   │   ├── hooks/                 # useHealth, useProblems
│   │   ├── context/               # AuthContext
│   │   └── utils/                 # Constants, colors, helpers
│   └── package.json
├── execution-service/             # Dockerized sandbox execution runner
│   ├── runner/                    # Process execution & resource monitoring
│   ├── language-config/           # Java, Python, C++ runner profiles
│   └── Dockerfile
├── infrastructure/                # Nginx proxy & Prometheus monitoring
├── docs/                          # Architecture, database ERD, API contracts
├── docker-compose.yml             # PostgreSQL 16 & Redis 7 local cluster
├── .env.example                   # Environment configuration template
└── README.md
```

---

## 3. Quickstart & Local Setup (Milestone 1)

### Prerequisites
- **Java**: JDK 21+ (Tested on Eclipse Adoptium OpenJDK 25 LTS)
- **Node.js**: v18+ (Tested on Node v26 / v22)
- **Build Tools**: Apache Maven 3.9+, npm 10+
- **Database / Containers**: Docker & Docker Compose (or local PostgreSQL)

### Step 1: Start PostgreSQL & Redis
```bash
# From the repository root
docker compose up -d
```
*This starts PostgreSQL on port `5432` with database `codemaster_db` and Redis on port `6379`.*

### Step 2: Start the Backend (Spring Boot 3)
```bash
cd backend
mvn spring-boot:run
```
- API Base: `http://localhost:8080/api/v1`
- Live Health Telemetry: `http://localhost:8080/api/health`
- Swagger OpenAPI UI: `http://localhost:8080/swagger-ui.html`

*Note: If PostgreSQL is offline, the backend gracefully runs with in-memory persistence (`--spring.profiles.active=dev`), ensuring uninterrupted local development!*

### Step 3: Start the Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 4. Milestone 1 Verification Checklist
- [x] Full-stack directory structure matching production specifications (`codemaster-ai/frontend`, `backend`, `execution-service`, `infrastructure`, `docs`).
- [x] Feature-based Spring Boot package architecture (`com.codemaster.problem`, `user`, `submission`, `health`, etc.).
- [x] Relational schema designed and implemented in Flyway migrations (`V1__init_schema.sql`, `V2__seed_problems.sql`).
- [x] JPA entities and Spring Data repositories mapped to `users`, `profiles`, `problems`, `topics`, `test_cases`, `submissions`, `submission_results`, and `user_progress`.
- [x] Health telemetry endpoint (`GET /api/health`) reporting database connection latency, system uptime, and JVM specifications.
- [x] React developer dashboard with dark navy theme, live backend/database connectivity indicators, stats cards, and problem directory.
- [x] Interactive Monaco code editor workspace with multi-language execution simulation.
- [x] Docker Compose environment configured for PostgreSQL 16 and Redis 7.
- [x] Comprehensive architecture, database design, and REST API documentation.

---

## 5. Development Roadmap Progress

- **Milestone 1: Project Setup & Foundation** — Completed
- **Milestone 2: Authentication & Spring Security (JWT)** — Up Next
- **Milestone 3: Problem Management & Filtering**
- **Milestone 4: Online Monaco Code Editor**
- **Milestone 5: Docker Code Execution Sandbox Engine**
- **Milestone 6: Submission Evaluation System**
- **Milestone 7: AI Assistant (Hints, Explanations, Debugging)**
- **Milestone 8: User Progress, Analytics & Global Leaderboard**
- **Milestone 9: Unit, Integration & Security Testing**
- **Milestone 10: Production Cloud Deployment & CI/CD**

---

## License
MIT License. Developed by **Ayananshu Mahapatra**.
