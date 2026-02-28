-- =====================================================
-- LineUp Initial Schema
-- PostgreSQL
-- =====================================================

-- =====================
-- ENUM TYPES
-- =====================

CREATE TYPE queue_status_enum AS ENUM ('OPEN', 'PAUSED', 'CLOSED');

CREATE TYPE queue_entry_status_enum AS ENUM
('WAITING', 'CALLED', 'SERVED', 'NO_SHOW', 'LEFT');

CREATE TYPE appointment_status_enum AS ENUM
('BOOKED', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'NO_SHOW');

CREATE TYPE notification_status_enum AS ENUM
('PENDING', 'SENT', 'READ');

CREATE TYPE notification_channel_enum AS ENUM
('IN_APP', 'EMAIL');

CREATE TYPE org_role_enum AS ENUM
('STUDENT', 'STAFF', 'ADMIN');

-- =====================
-- USERS
-- =====================

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    password_hash TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

-- =====================
-- ORGANIZATIONS
-- =====================

CREATE TABLE organizations (
    org_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_by INT NOT NULL REFERENCES users(user_id)
);

-- =====================
-- USER ↔ ORGANIZATION (Bridge)
-- =====================

CREATE TABLE user_organization_roles (
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    org_id INT NOT NULL REFERENCES organizations(org_id) ON DELETE CASCADE,
    role org_role_enum NOT NULL,
    PRIMARY KEY (user_id, org_id)
);

-- =====================
-- SERVICES
-- =====================

CREATE TABLE services (
    service_id SERIAL PRIMARY KEY,
    org_id INT NOT NULL REFERENCES organizations(org_id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    location_text TEXT,
    virtual_join_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

-- =====================
-- QUEUES (1:1 with service)
-- =====================

CREATE TABLE queues (
    queue_id SERIAL PRIMARY KEY,
    service_id INT NOT NULL UNIQUE REFERENCES services(service_id) ON DELETE CASCADE,
    status queue_status_enum NOT NULL DEFAULT 'OPEN'
);

-- =====================
-- QUEUE ENTRIES
-- =====================

CREATE TABLE queue_entries (
    queue_entry_id SERIAL PRIMARY KEY,
    queue_id INT NOT NULL REFERENCES queues(queue_id) ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    status queue_entry_status_enum NOT NULL DEFAULT 'WAITING',
    joined_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    left_at TIMESTAMP,
    CHECK (left_at IS NULL OR left_at >= joined_at)
);

-- Business Rule:
-- A user cannot have two active entries in same queue

CREATE UNIQUE INDEX unique_active_queue_entry
ON queue_entries(queue_id, user_id)
WHERE status IN ('WAITING','CALLED');

-- =====================
-- APPOINTMENT SLOTS
-- =====================

CREATE TABLE appointment_slots (
    slot_id SERIAL PRIMARY KEY,
    service_id INT NOT NULL REFERENCES services(service_id) ON DELETE CASCADE,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    capacity INT NOT NULL CHECK (capacity > 0),
    CHECK (end_time > start_time)
);

-- =====================
-- APPOINTMENTS
-- =====================

CREATE TABLE appointments (
    appointment_id SERIAL PRIMARY KEY,
    service_id INT NOT NULL REFERENCES services(service_id) ON DELETE CASCADE,
    slot_id INT NOT NULL REFERENCES appointment_slots(slot_id) ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    status appointment_status_enum NOT NULL DEFAULT 'BOOKED',
    booked_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =====================
-- SERVICE SESSIONS
-- =====================

CREATE TABLE service_sessions (
    session_id SERIAL PRIMARY KEY,
    service_id INT NOT NULL REFERENCES services(service_id) ON DELETE CASCADE,
    started_by INT NOT NULL REFERENCES users(user_id),
    started_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP,
    appointment_id INT REFERENCES appointments(appointment_id),
    queue_entry_id INT REFERENCES queue_entries(queue_entry_id),

    CHECK (
        (appointment_id IS NOT NULL AND queue_entry_id IS NULL)
        OR
        (appointment_id IS NULL AND queue_entry_id IS NOT NULL)
    ),

    CHECK (ended_at IS NULL OR ended_at >= started_at)
);

-- =====================
-- ANNOUNCEMENTS
-- =====================

CREATE TABLE announcements (
    announcement_id SERIAL PRIMARY KEY,
    service_id INT NOT NULL REFERENCES services(service_id) ON DELETE CASCADE,
    created_by INT NOT NULL REFERENCES users(user_id),
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL
);

-- =====================
-- NOTIFICATIONS
-- =====================

CREATE TABLE notifications (
    notification_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status notification_status_enum NOT NULL DEFAULT 'PENDING',
    channel notification_channel_enum NOT NULL DEFAULT 'IN_APP',
    read_at TIMESTAMP
);

-- =====================
-- PERFORMANCE INDEXES
-- =====================

CREATE INDEX idx_queue_entries_queue ON queue_entries(queue_id);
CREATE INDEX idx_appointments_user ON appointments(user_id);
CREATE INDEX idx_notifications_user ON notifications(user_id);