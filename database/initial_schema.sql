-- ENUM TYPES
CREATE TYPE queue_status_enum AS ENUM ('OPEN', 'PAUSED', 'CLOSED');

CREATE TYPE queue_entry_status_enum AS ENUM 
('WAITING', 'CALLED', 'SERVED', 'NO_SHOW', 'LEFT');

CREATE TYPE appointment_status_enum AS ENUM 
('CONFIRMED', 'CHECKED_IN', 'COMPLETED', 'CANCELLED', 'NO_SHOW');

CREATE TYPE notification_status_enum AS ENUM 
('PENDING', 'SENT', 'READ');

CREATE TYPE notification_channel_enum AS ENUM 
('IN_APP', 'EMAIL');

-- ORGANIZATIONS
CREATE TABLE organizations (
    org_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

-- USERS
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    password_hash TEXT,
    org_id INT REFERENCES organizations(org_id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT TRUE
);

-- ROLES
CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE
);

-- USER ROLES
CREATE TABLE user_roles (
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    role_id INT REFERENCES roles(role_id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

-- SERVICES
CREATE TABLE services (
    service_id SERIAL PRIMARY KEY,
    org_id INT NOT NULL REFERENCES organizations(org_id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    location_text TEXT,
    virtual_join_url TEXT,
    is_active BOOLEAN DEFAULT TRUE
);

-- QUEUES
CREATE TABLE queues (
    queue_id SERIAL PRIMARY KEY,
    service_id INT NOT NULL UNIQUE REFERENCES services(service_id) ON DELETE CASCADE,
    status queue_status_enum NOT NULL
);

-- QUEUE ENTRIES
CREATE TABLE queue_entries (
    queue_entry_id SERIAL PRIMARY KEY,
    queue_id INT NOT NULL REFERENCES queues(queue_id) ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    status queue_entry_status_enum NOT NULL,
    joined_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    left_at TIMESTAMP
);

-- APPOINTMENT SLOTS
CREATE TABLE appointment_slots (
    slot_id SERIAL PRIMARY KEY,
    service_id INT NOT NULL REFERENCES services(service_id) ON DELETE CASCADE,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    capacity INT NOT NULL CHECK (capacity > 0)
);

-- APPOINTMENTS
CREATE TABLE appointments (
    appointment_id SERIAL PRIMARY KEY,
    service_id INT NOT NULL REFERENCES services(service_id) ON DELETE CASCADE,
    slot_id INT NOT NULL REFERENCES appointment_slots(slot_id) ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    status appointment_status_enum NOT NULL,
    booked_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ANNOUNCEMENTS
CREATE TABLE announcements (
    announcement_id SERIAL PRIMARY KEY,
    service_id INT NOT NULL REFERENCES services(service_id) ON DELETE CASCADE,
    created_by INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL
);

-- NOTIFICATIONS
CREATE TABLE notifications (
    notification_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status notification_status_enum NOT NULL,
    channel notification_channel_enum NOT NULL,
    read_at TIMESTAMP
);

-- SERVICE SESSIONS
CREATE TABLE service_sessions (
    session_id SERIAL PRIMARY KEY,
    service_id INT NOT NULL REFERENCES services(service_id) ON DELETE CASCADE,
    started_by INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    started_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP,
    appointment_id INT REFERENCES appointments(appointment_id) ON DELETE SET NULL,
    queue_entry_id INT REFERENCES queue_entries(queue_entry_id) ON DELETE SET NULL,
    CHECK (
        (appointment_id IS NOT NULL AND queue_entry_id IS NULL)
        OR
        (appointment_id IS NULL AND queue_entry_id IS NOT NULL)
    )
);


-- PERFORMANCE INDEXES

CREATE INDEX idx_queue_entries_queue_status 
ON queue_entries(queue_id, status);

CREATE INDEX idx_appointment_slots_service_time 
ON appointment_slots(service_id, start_time);

CREATE INDEX idx_appointments_user_status 
ON appointments(user_id, status);

CREATE INDEX idx_notifications_user_status 
ON notifications(user_id, status);


-- A user cannot have two active entries in same queue

CREATE UNIQUE INDEX unique_active_queue_entry
ON queue_entries(queue_id, user_id)
WHERE status IN ('WAITING', 'CALLED');


