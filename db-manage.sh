#!/bin/bash
# Database management script for callback-listener PostgreSQL

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default values
POSTGRES_USER=${POSTGRES_USER:-callback_user}
POSTGRES_PASSWORD=${POSTGRES_PASSWORD:-callback_pass_secure_2024}
POSTGRES_DB=${POSTGRES_DB:-callback_listener}
CONTAINER_NAME="callback-listener-postgres-1"

function print_usage() {
    echo "Usage: $0 {start|stop|reset|connect|logs|backup|restore|migrate}"
    echo ""
    echo "Commands:"
    echo "  start     - Start PostgreSQL container"
    echo "  stop      - Stop PostgreSQL container"
    echo "  reset     - Stop, remove container and volume, then start fresh"
    echo "  connect   - Connect to PostgreSQL shell"
    echo "  logs      - Show PostgreSQL logs"
    echo "  backup    - Create database backup"
    echo "  restore   - Restore database from backup"
    echo "  migrate   - Run Flask database migrations"
    echo "  status    - Check container status"
}

function start_postgres() {
    echo -e "${GREEN}Starting PostgreSQL container...${NC}"
    docker compose up -d postgres
    echo -e "${GREEN}PostgreSQL container started successfully!${NC}"
}

function stop_postgres() {
    echo -e "${YELLOW}Stopping PostgreSQL container...${NC}"
    docker compose stop postgres
    echo -e "${GREEN}PostgreSQL container stopped.${NC}"
}

function reset_postgres() {
    echo -e "${RED}Resetting PostgreSQL (this will delete all data!)${NC}"
    read -p "Are you sure? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        docker compose down postgres
        docker volume rm callback-listener_postgres_data 2>/dev/null || true
        echo -e "${GREEN}Starting fresh PostgreSQL container...${NC}"
        docker compose up -d postgres
        echo -e "${GREEN}PostgreSQL reset complete!${NC}"
    else
        echo -e "${YELLOW}Reset cancelled.${NC}"
    fi
}

function connect_postgres() {
    echo -e "${GREEN}Connecting to PostgreSQL...${NC}"
    docker exec -it $CONTAINER_NAME psql -U $POSTGRES_USER -d $POSTGRES_DB
}

function show_logs() {
    echo -e "${GREEN}Showing PostgreSQL logs...${NC}"
    docker compose logs -f postgres
}

function backup_database() {
    BACKUP_FILE="backup_$(date +%Y%m%d_%H%M%S).sql"
    echo -e "${GREEN}Creating backup: $BACKUP_FILE${NC}"
    docker exec $CONTAINER_NAME pg_dump -U $POSTGRES_USER $POSTGRES_DB > $BACKUP_FILE
    echo -e "${GREEN}Backup created: $BACKUP_FILE${NC}"
}

function restore_database() {
    if [ -z "$2" ]; then
        echo -e "${RED}Please specify backup file: $0 restore backup_file.sql${NC}"
        exit 1
    fi
    
    BACKUP_FILE=$2
    if [ ! -f "$BACKUP_FILE" ]; then
        echo -e "${RED}Backup file not found: $BACKUP_FILE${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}Restoring from backup: $BACKUP_FILE${NC}"
    docker exec -i $CONTAINER_NAME psql -U $POSTGRES_USER $POSTGRES_DB < $BACKUP_FILE
    echo -e "${GREEN}Database restored successfully!${NC}"
}

function run_migrations() {
    echo -e "${GREEN}Running Flask database migrations...${NC}"
    docker compose exec backend flask db upgrade
    echo -e "${GREEN}Migrations completed!${NC}"
}

function check_status() {
    echo -e "${GREEN}Checking container status...${NC}"
    docker compose ps postgres
    echo ""
    echo "Database connection test:"
    if docker exec $CONTAINER_NAME pg_isready -U $POSTGRES_USER -d $POSTGRES_DB > /dev/null 2>&1; then
        echo -e "${GREEN}✓ PostgreSQL is ready and accepting connections${NC}"
    else
        echo -e "${RED}✗ PostgreSQL is not ready${NC}"
    fi
}

case "$1" in
    start)
        start_postgres
        ;;
    stop)
        stop_postgres
        ;;
    reset)
        reset_postgres
        ;;
    connect)
        connect_postgres
        ;;
    logs)
        show_logs
        ;;
    backup)
        backup_database
        ;;
    restore)
        restore_database "$@"
        ;;
    migrate)
        run_migrations
        ;;
    status)
        check_status
        ;;
    *)
        print_usage
        exit 1
        ;;
esac
