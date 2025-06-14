# PostgreSQL Quick Reference - Callback Listener

## 🚀 Quick Start
```bash
# Start PostgreSQL and all services
docker-compose up -d

# Check status
./db-manage.sh status

# Run migrations
./db-manage.sh migrate

# Test connection
python test-postgres.py
```

## 📋 Common Commands

### Service Management
```bash
# Start services
docker-compose up -d
./db-manage.sh start

# Stop services
docker-compose down
./db-manage.sh stop

# View logs
docker-compose logs -f postgres
./db-manage.sh logs

# Restart PostgreSQL
docker-compose restart postgres
```

### Database Operations
```bash
# Connect to database
./db-manage.sh connect
docker-compose exec postgres psql -U callback_user callback_listener

# Run migrations
./db-manage.sh migrate
make migrate

# Create migration
make migrate-create msg="Add new table"

# Backup database
./db-manage.sh backup
make db-backup file=backup.sql

# Restore database
./db-manage.sh restore backup.sql
make db-restore file=backup.sql
```

### Development
```bash
# Backend only (from backend/ directory)
cd backend && docker-compose up -d

# Full stack (from project root)
docker-compose up -d

# Check health
curl http://localhost:5001/health/
./db-manage.sh status
```

## 🔧 Configuration

### Environment Variables (.env)
```env
POSTGRES_DB=callback_listener
POSTGRES_USER=callback_user
POSTGRES_PASSWORD=callback_pass_secure_2024
DATABASE_URL=postgresql://callback_user:callback_pass_secure_2024@postgres:5432/callback_listener
```

### Connection Details
- **Host**: localhost (from host) / postgres (from containers)
- **Port**: 5432
- **Database**: callback_listener
- **Username**: callback_user
- **Password**: callback_pass_secure_2024

## 🆘 Troubleshooting

### Container won't start
```bash
# Check if port is in use
lsof -i :5432

# Reset everything
./db-manage.sh reset

# Check logs
docker-compose logs postgres
```

### Connection refused
```bash
# Wait for container to be ready
./db-manage.sh status

# Check health
docker-compose ps postgres

# Restart container
docker-compose restart postgres
```

### Migration issues
```bash
# Check migrations directory
ls -la backend/migrations/

# Initialize if needed
docker-compose exec backend flask db init

# Force migration
docker-compose exec backend flask db stamp head
```

## 📁 Important Files

- `docker-compose.yml` - Main service configuration
- `backend/docker-compose.yml` - Backend-only configuration
- `.env` - Environment variables
- `db-manage.sh` - Database management script
- `test-postgres.py` - Connection test script
- `backend/scripts/init-db.sql` - Database initialization
- `POSTGRESQL_SETUP.md` - Detailed setup guide

## 🔗 Useful URLs

- Application: http://localhost:3000
- Backend API: http://localhost:5001
- Health Check: http://localhost:5001/health/
- API Docs: http://localhost:5001/docs (if available)

## 📊 Monitoring

```bash
# Container status
docker-compose ps

# Resource usage
docker stats

# Database connections
docker-compose exec postgres psql -U callback_user callback_listener -c "SELECT * FROM pg_stat_activity;"

# Database size
docker-compose exec postgres psql -U callback_user callback_listener -c "SELECT pg_size_pretty(pg_database_size('callback_listener'));"
```
