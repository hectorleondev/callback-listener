-- Database initialization script
-- Create test database if it doesn't exist
SELECT 'CREATE DATABASE callback_listener_test'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'callback_listener_test')\gexec

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE callback_listener_dev TO callback_user;
GRANT ALL PRIVILEGES ON DATABASE callback_listener_test TO callback_user;
