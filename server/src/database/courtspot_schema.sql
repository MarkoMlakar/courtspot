USE `courtspot`;

-- Drop tables if they exist (in reverse order of dependencies)
DROP TABLE IF EXISTS comments, court_images, favorites, sightings, courts, locations, sports, users;

-- Create users table
CREATE TABLE users (
    id CHAR(36) PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    date_of_birth DATE,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_username (username),
    CHECK (email REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create trigger for date_of_birth validation
DELIMITER //
CREATE TRIGGER before_insert_users
BEFORE INSERT ON users
FOR EACH ROW
BEGIN
    IF NEW.date_of_birth >= CURDATE() THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Date of birth must be in the past';
    END IF;
END//

CREATE TRIGGER before_update_users
BEFORE UPDATE ON users
FOR EACH ROW
BEGIN
    IF NEW.date_of_birth >= CURDATE() THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Date of birth must be in the past';
    END IF;
END//
DELIMITER ;

-- Create locations table
CREATE TABLE locations (
    id CHAR(36) PRIMARY KEY,
    city VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    postal_code VARCHAR(50),
    latitude DECIMAL(9,6) NOT NULL,
    longitude DECIMAL(9,6) NOT NULL,
    location_point POINT NOT NULL,
    full_address VARCHAR(500),
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CHECK (latitude BETWEEN -90 AND 90),
    CHECK (longitude BETWEEN -180 AND 180)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create spatial index after table creation
CREATE SPATIAL INDEX idx_location_point ON locations (location_point);

-- Create trigger to update location_point
DELIMITER //
CREATE TRIGGER before_insert_locations
BEFORE INSERT ON locations
FOR EACH ROW
BEGIN
    SET NEW.location_point = POINT(NEW.longitude, NEW.latitude);
END//

CREATE TRIGGER before_update_locations
BEFORE UPDATE ON locations
FOR EACH ROW
BEGIN
    SET NEW.location_point = POINT(NEW.longitude, NEW.latitude);
END//
DELIMITER ;

-- Create sports table
CREATE TABLE sports (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    icon_url TEXT,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_name (name)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create courts table
CREATE TABLE courts (
    id CHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location_id CHAR(36),
    sport_id CHAR(36),
    number_of_sightings INTEGER DEFAULT 0,
    created_by CHAR(36),
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE SET NULL,
    FOREIGN KEY (sport_id) REFERENCES sports(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_location (location_id),
    INDEX idx_sport (sport_id),
    INDEX idx_created_by (created_by)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create court_images table
CREATE TABLE court_images (
    id CHAR(36) PRIMARY KEY,
    court_id CHAR(36) NOT NULL,
    image_url TEXT NOT NULL,
    width INTEGER,
    height INTEGER,
    file_size INTEGER,
    is_primary BOOLEAN DEFAULT FALSE,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (court_id) REFERENCES courts(id) ON DELETE CASCADE,
    INDEX idx_court (court_id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create comments table
CREATE TABLE comments (
    id CHAR(36) PRIMARY KEY,
    user_id CHAR(36) NOT NULL,
    court_id CHAR(36) NOT NULL,
    content TEXT NOT NULL,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (court_id) REFERENCES courts(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_court (court_id),
    INDEX idx_created_at (created_at)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create favorites table
CREATE TABLE favorites (
    user_id CHAR(36) NOT NULL,
    court_id CHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, court_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (court_id) REFERENCES courts(id) ON DELETE CASCADE,
    INDEX idx_court (court_id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create sightings table
CREATE TABLE sightings (
    id CHAR(36) PRIMARY KEY,
    user_id CHAR(36) NOT NULL,
    court_id CHAR(36) NOT NULL,
    spotted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    note TEXT,
    is_deleted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (court_id) REFERENCES courts(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_court (court_id),
    INDEX idx_spotted_at (spotted_at)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
