# CodeMaster AI - Database Design & Schema Specification

> Designed and engineered by **Ayananshu Mahapatra**.

## Entity Relationship Overview

```mermaid
erDiagram
    USERS ||--|| PROFILES : has
    USERS ||--o{ SUBMISSIONS : submits
    USERS ||--o{ USER_PROGRESS : solves
    USERS ||--o{ AI_CONVERSATIONS : initiates
    USERS ||--o{ CONTEST_PARTICIPANTS : enters

    PROBLEMS ||--o{ TEST_CASES : contains
    PROBLEMS ||--o{ SUBMISSIONS : receives
    PROBLEMS ||--o{ USER_PROGRESS : tracked_by
    PROBLEMS ||--o{ AI_CONVERSATIONS : referenced_in
    PROBLEMS }o--o{ TOPICS : categorized_under

    SUBMISSIONS ||--o{ SUBMISSION_RESULTS : produces
    TEST_CASES ||--o{ SUBMISSION_RESULTS : verified_by
    AI_CONVERSATIONS ||--o{ AI_MESSAGES : contains
    CONTESTS ||--o{ CONTEST_PARTICIPANTS : hosts

    USERS {
        bigint id PK
        varchar name
        varchar email UK
        varchar password
        varchar role
        timestamp created_at
    }

    PROFILES {
        bigint id PK
        bigint user_id FK,UK
        text bio
        text avatar_url
    }

    PROBLEMS {
        bigint id PK
        varchar title
        varchar slug UK
        text description
        varchar difficulty
        text constraints
        varchar acceptance_rate
        timestamp created_at
    }

    TOPICS {
        bigint id PK
        varchar name UK
    }

    TEST_CASES {
        bigint id PK
        bigint problem_id FK
        text input
        text expected_output
        boolean is_hidden
    }

    SUBMISSIONS {
        bigint id PK
        bigint user_id FK
        bigint problem_id FK
        varchar language
        text source_code
        varchar status
        bigint execution_time
        bigint memory_used
        timestamp submitted_at
    }

    SUBMISSION_RESULTS {
        bigint id PK
        bigint submission_id FK
        bigint test_case_id FK
        bigint execution_time
        bigint memory
        varchar verdict
    }

    USER_PROGRESS {
        bigint id PK
        bigint user_id FK
        bigint problem_id FK
        timestamp solved_at
    }
```

---

## Flyway Migration Structure

Flyway migrations are located in `backend/src/main/resources/db/migration/`:
- **`V1__init_schema.sql`**: Baseline DDL creating all 13 core relational tables, foreign key constraints (`ON DELETE CASCADE`), and performance indexes.
- **`V2__seed_problems.sql`**: Initial seeds for 8 topics, 5 landmark DSA problems (Two Sum, Valid Anagram, Longest Substring, Valid Parentheses, Trapping Rain Water), sample test cases, and hidden test cases.

## Indexing Strategy
- `idx_submissions_user`: Optimizes user submission history lookups (`SELECT * FROM submissions WHERE user_id = ? ORDER BY submitted_at DESC`).
- `idx_submissions_problem`: Optimizes per-problem submission statistics and leaderboard computations.
- `idx_problems_difficulty`: Accelerates filtering by Easy, Medium, or Hard.
- `idx_problems_slug`: Enables fast $O(1)$ lookups for SEO-friendly URLs (`/problems/two-sum`).
