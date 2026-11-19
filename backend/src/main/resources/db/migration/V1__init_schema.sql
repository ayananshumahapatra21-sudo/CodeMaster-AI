-- =======================================================
-- CodeMaster AI - Flyway Database Migration: V1 Initial Schema
-- =======================================================

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Profiles Table
CREATE TABLE IF NOT EXISTS profiles (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    bio TEXT,
    avatar_url TEXT
);

-- 3. Problems Table
CREATE TABLE IF NOT EXISTS problems (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    difficulty VARCHAR(20) NOT NULL,
    constraints TEXT,
    acceptance_rate VARCHAR(20) DEFAULT '50.0%',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Topics Table
CREATE TABLE IF NOT EXISTS topics (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

-- 5. Problem-Topic Join Table
CREATE TABLE IF NOT EXISTS problem_topics (
    problem_id BIGINT REFERENCES problems(id) ON DELETE CASCADE,
    topic_id BIGINT REFERENCES topics(id) ON DELETE CASCADE,
    PRIMARY KEY (problem_id, topic_id)
);

-- 6. Test Cases Table
CREATE TABLE IF NOT EXISTS test_cases (
    id BIGSERIAL PRIMARY KEY,
    problem_id BIGINT REFERENCES problems(id) ON DELETE CASCADE,
    input TEXT NOT NULL,
    expected_output TEXT NOT NULL,
    is_hidden BOOLEAN DEFAULT TRUE
);

-- 7. Submissions Table
CREATE TABLE IF NOT EXISTS submissions (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    problem_id BIGINT REFERENCES problems(id) ON DELETE CASCADE,
    language VARCHAR(30) NOT NULL,
    source_code TEXT NOT NULL,
    status VARCHAR(30) DEFAULT 'PENDING',
    execution_time BIGINT,
    memory_used BIGINT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. Submission Results Table
CREATE TABLE IF NOT EXISTS submission_results (
    id BIGSERIAL PRIMARY KEY,
    submission_id BIGINT REFERENCES submissions(id) ON DELETE CASCADE,
    test_case_id BIGINT REFERENCES test_cases(id) ON DELETE CASCADE,
    execution_time BIGINT,
    memory BIGINT,
    verdict VARCHAR(30) DEFAULT 'PENDING'
);

-- 9. User Progress Table
CREATE TABLE IF NOT EXISTS user_progress (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    problem_id BIGINT REFERENCES problems(id) ON DELETE CASCADE,
    solved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, problem_id)
);

-- 10. AI Conversations Table
CREATE TABLE IF NOT EXISTS ai_conversations (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    problem_id BIGINT REFERENCES problems(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 11. AI Messages Table
CREATE TABLE IF NOT EXISTS ai_messages (
    id BIGSERIAL PRIMARY KEY,
    conversation_id BIGINT REFERENCES ai_conversations(id) ON DELETE CASCADE,
    role VARCHAR(30) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 12. Contests Table
CREATE TABLE IF NOT EXISTS contests (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 13. Contest Participants Table
CREATE TABLE IF NOT EXISTS contest_participants (
    contest_id BIGINT REFERENCES contests(id) ON DELETE CASCADE,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    score INT DEFAULT 0,
    PRIMARY KEY (contest_id, user_id)
);

-- Indexes for Query Performance
CREATE INDEX IF NOT EXISTS idx_submissions_user ON submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_submissions_problem ON submissions(problem_id);
CREATE INDEX IF NOT EXISTS idx_problems_difficulty ON problems(difficulty);
CREATE INDEX IF NOT EXISTS idx_problems_slug ON problems(slug);
