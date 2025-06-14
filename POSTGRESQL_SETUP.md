# PostgreSQL Setup Guide for Callback Listener

This guide covers the PostgreSQL implementation for your callback-listener project using Docker Desktop.

## Overview

Your backend has been configured to use PostgreSQL instead of SQLite. The setup includes:

- PostgreSQL 15 (Alpine) container
- Persistent data storage with Docker volumes
- Health checks and proper service dependencies
- Database management utilities

## Prerequisites

1. **Docker Desktop**: Ensure Docker Desktop is installed and running
2. **Environment Variables**: The `.env` file has been updated with PostgreSQL configuration

## Configuration Files Updated

### 1. Main docker-compose.yml
- Added PostgreSQL service with health checks
- Updated backend service to depend on PostgreSQL
- Added persistent volume for database data

### 2. Backend docker-compose.yml
- Standalone PostgreSQL setup for backend-only development
- Same configuration as main compose file

### 3. Environment Files
- `.env`: Updated with PostgreSQL connection details
- `backend/.env.example`: Updated template with PostgreSQL variables

### 4. Database Scripts
- `backend/scripts/init-db.sql`: Database initialization script
- `db-manage.sh`: Database management utility script

## Getting Started

### 1. Start the Services

```bash
# From the project root directory
docker-compose up -d

# Or start just PostgreSQL
./db-manage.sh start
```

### 2. Check Status

```bash
# Check all services
docker-compose ps

# Check PostgreSQL specifically
./db-manage.sh status
```

### 3. Run Database Migrations

```bash
# Initialize/update database schema
./db-manage.sh migrate

# Or manually
docker-compose exec backend flask db upgrade
```

## Database Management

Use the `db-manage.sh` script for common database operations:

```bash
# Start PostgreSQL
./db-manage.sh start

# Stop PostgreSQL
./db-manage.sh stop

# Reset database (WARNING: Deletes all data)
./db-manage.sh reset

# Connect to PostgreSQL shell
./db-manage.sh connect

# View logs
./db-manage.sh logs

# Create backup
./db-manage.sh backup

# Restore from backup
./db-manage.sh restore backup_file.sql

# Check status
./db-manage.sh status
```

## Environment Variables

Key environment variables in `.env`:

```env
# PostgreSQL Database configuration
POSTGRES_DB=callback_listener
POSTGRES_USER=callback_user
POSTGRES_PASSWORD=callback_pass_secure_2024
DATABASE_URL=postgresql://callback_user:callback_pass_secure_2024@postgres:5432/callback_listener
```

## Database Connection Details

### From Host Machine (for external tools)
- **Host**: localhost
- **Port**: 5432
- **Database**: callback_listener
- **Username**: callback_user
- **Password**: callback_pass_secure_2024

### From Docker Containers
- **Host**: postgres
- **Port**: 5432
- **Database**: callback_listener
- **Username**: callback_user
- **Password**: callback_pass_secure_2024

## Troubleshooting

### 1. Container Won't Start
```bash
# Check logs
docker-compose logs postgres

# Check if port 5432 is already in use
lsof -i :5432

# Reset everything
./db-manage.sh reset
```

### 2. Connection Refused
```bash
# Wait for container to be healthy
docker-compose ps

# Check health status
./db-manage.sh status

# View PostgreSQL logs
./db-manage.sh logs
```

### 3. Migration Issues
```bash
# Check if migrations directory exists
ls -la backend/migrations/

# Initialize migrations if needed
docker-compose exec backend flask db init

# Create migration
docker-compose exec backend flask db migrate -m "Initial migration"

# Apply migration
docker-compose exec backend flask db upgrade
```

### 4. Data Persistence
The database data is stored in a Docker volume named `callback-listener_postgres_data`. 
This ensures data persists between container restarts.

```bash
# List volumes
docker volume ls

# Inspect volume
docker volume inspect callback-listener_postgres_data

# Remove volume (WARNING: Deletes all data)
docker volume rm callback-listener_postgres_data
```

## Development vs Production

### Development
- Use `backend/docker-compose.yml` for backend-only development
- PostgreSQL accessible on localhost:5432
- Debug mode enabled

### Production
- Use main `docker-compose.yml` with frontend
- All services in isolated network
- Production configuration

## Security Notes

1. **Change Default Password**: Update `POSTGRES_PASSWORD` in production
2. **Network Security**: PostgreSQL is only accessible within Docker network in production
3. **Backup Strategy**: Implement regular backups using the backup script
4. **Secret Management**: Consider using Docker secrets for sensitive data

## Performance Tuning

The PostgreSQL configuration includes:
- Connection pooling (10 connections, 20 overflow)
- Pool pre-ping for connection health
- Pool recycle every 5 minutes

For production, consider tuning PostgreSQL configuration based on your workload.

## Next Steps

1. Start the services: `docker-compose up -d`
2. Run migrations: `./db-manage.sh migrate`
3. Test the application: Visit http://localhost:3000
4. Monitor logs: `docker-compose logs -f`

Your callback-listener application is now configured with PostgreSQL!
