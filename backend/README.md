# CallbackListener Backend

A Flask-based webhook capture and logging service that allows you to create unique URLs to capture and inspect HTTP requests in real-time.

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Python 3.11+ (for local development)
- uv (Python package manager) - `curl -LsSf https://astral.sh/uv/install.sh | sh`

### Development Setup

1. **Clone and navigate to the backend directory:**
   ```bash
   cd /Users/payorayo/AI_PROJECTS/callback_listener/backend
   ```

2. **Set up environment:**
   ```bash
   make setup-dev
   ```

3. **Start the development environment:**
   ```bash
   make dev
   ```

The application will be available at `http://localhost:5000`

### Quick Commands

```bash
# Start development environment
make dev

# Run tests
make test

# Check code quality
make lint format

# View logs
make logs

# Stop services
make stop

# Reset database
make db-reset
```

## 📋 Features

- **Webhook URL Generation**: Create unique URLs to capture HTTP requests
- **Request Logging**: Store and retrieve detailed request information
- **Multi-method Support**: Capture GET, POST, PUT, DELETE, and other HTTP methods
- **Real-time Capture**: Immediate request logging and retrieval
- **RESTful API**: Clean API for integration with frontend applications
- **Health Monitoring**: Built-in health check endpoints
- **Docker Support**: Complete containerization for development and deployment

## 🏗️ Architecture

### Core Components

- **Flask Application**: Main web server with modular blueprint structure
- **PostgreSQL Database**: Primary data storage with SQLAlchemy ORM
- **RESTful API**: Endpoints for path management and request retrieval
- **Webhook Receiver**: Captures any HTTP method and logs details
- **Health Checks**: Monitoring endpoints for application health

### Project Structure

```
backend/
├── app/
│   ├── api/                 # API blueprints
│   │   ├── health.py       # Health check endpoints
│   │   ├── paths.py        # Path management API
│   │   └── webhooks.py     # Webhook capture endpoint
│   ├── models/             # Database models
│   │   ├── path.py         # Path model
│   │   └── request.py      # Request model
│   ├── services/           # Business logic layer
│   └── utils/              # Utility functions
├── tests/                  # Test suite
├── scripts/                # Development scripts
├── migrations/             # Database migrations
├── docker-compose.yml      # Development environment
├── Dockerfile             # Application container
├── Makefile               # Development commands
└── requirements.txt       # Python dependencies
```

## 🔌 API Endpoints

### Path Management

#### Create a new webhook path
```http
POST /api/paths
Content-Type: application/json

{
  "path_id": "my-custom-webhook"  // Optional
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "path_id": "my-custom-webhook",
    "created_at": "2025-05-30T10:00:00Z",
    "updated_at": "2025-05-30T10:00:00Z",
    "request_count": 0
  }
}
```

#### Get requests for a path
```http
GET /api/paths/{path_id}/logs?limit=100&offset=0&include_body=true
```

**Response:**
```json
{
  "success": true,
  "data": {
    "path": { /* path info */ },
    "requests": [
      {
        "id": "456e7890-e89b-12d3-a456-426614174000",
        "method": "POST",
        "headers": {"Content-Type": "application/json"},
        "body": "{\"key\": \"value\"}",
        "query_params": {"param": "value"},
        "ip_address": "192.168.1.1",
        "user_agent": "Mozilla/5.0...",
        "timestamp": "2025-05-30T10:01:00Z"
      }
    ],
    "pagination": {
      "limit": 100,
      "offset": 0,
      "total": 1
    }
  }
}
```

#### Get specific request
```http
GET /api/paths/{path_id}/logs/{request_id}
```

### Webhook Capture

#### Capture any HTTP request
```http
[ANY METHOD] /webhook/{path_id}
```

All request details are automatically captured and logged.

**Response:**
```json
{
  "success": true,
  "message": "Request captured successfully",
  "data": {
    "request_id": "789e1234-e89b-12d3-a456-426614174000",
    "timestamp": "2025-05-30T10:02:00Z",
    "method": "POST"
  }
}
```

### Health Checks

- `GET /health/` - Basic health check
- `GET /health/ready` - Readiness check (includes DB connectivity)
- `GET /health/live` - Liveness check

## 🧪 Testing

### Running Tests

```bash
# All tests with coverage
make test

# Local tests (requires local database)
make test-local

# Specific test categories
make test-unit
make test-api
make test-services

# Generate coverage report
make test-coverage
```

### Test Structure

- **Unit Tests**: Model and utility function tests
- **API Tests**: Endpoint integration tests
- **Service Tests**: Business logic tests
- **Integration Tests**: Full application flow tests

### Test Coverage

The project maintains >85% test coverage with comprehensive testing of:
- Database models and relationships
- API endpoints and error handling
- Service layer business logic
- Utility functions
- Error scenarios and edge cases

## 🛠️ Development

### Local Development

```bash
# Install dependencies (using uv for faster installs)
make install

# Run application locally
make run

# Open Flask shell
make shell

# Database operations
make migrate              # Run migrations
make migrate-create msg="description"  # Create migration
make db-reset            # Reset database
```

### Code Quality

```bash
# Format code
make format

# Run linting
make lint

# Security checks
make security-check

# Complete quality check
make quick-test
```

### Git Hooks

Pre-commit hooks are configured to:
- Format code with Black and isort
- Run linting with flake8
- Check for security issues
- Validate changelog updates
- Run tests before push

Install hooks:
```bash
make install-hooks
```

## 🐳 Docker

### Development Environment

```bash
# Start all services
docker-compose up --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Reset with clean volumes
docker-compose down -v
```

### Production Build

```bash
# Build production image
make build

# Run with production settings
make run-prod
```

## 📊 Database

### Models

#### Path
- Represents a unique webhook endpoint
- Contains path_id, creation timestamps
- One-to-many relationship with Request

#### Request
- Stores captured HTTP request details
- Includes method, headers, body, query parameters
- Client information (IP, User-Agent)
- Timestamp for request ordering

### Migrations

```bash
# Create migration
flask db migrate -m "Description"

# Apply migrations
flask db upgrade

# Rollback migration
flask db downgrade
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `FLASK_ENV` | Environment (development/testing/production) | development |
| `FLASK_DEBUG` | Enable debug mode | false |
| `DATABASE_URL` | PostgreSQL connection string | localhost connection |
| `SECRET_KEY` | Flask secret key | generated |
| `LOG_LEVEL` | Logging level | INFO |

### Configuration Files

- `.env.example` - Environment template
- `app/config.py` - Application configuration
- `docker-compose.yml` - Development services
- `docker-compose.test.yml` - Test environment

## 📈 Monitoring

### Health Endpoints

- `/health/` - Application status
- `/health/ready` - Ready for traffic (DB connected)
- `/health/live` - Application is alive

### Logging

Structured logging with:
- Request/response logging
- Error tracking
- Performance metrics
- Business event logging

### Metrics

Monitor:
- Request capture rate
- Response times
- Database performance
- Error rates

## 🚀 Deployment

### Production Checklist

```bash
# Pre-deployment checks
make deploy-check

# Build production image
make build

# Security verification
make security-check
```

### Environment Setup

1. Set production environment variables
2. Configure database connection
3. Set up reverse proxy (nginx)
4. Configure SSL/TLS
5. Set up monitoring

### CI/CD Pipeline

The application includes configuration for:
- Automated testing
- Code quality checks
- Security scanning
- Docker image building
- Deployment automation

## 📚 API Documentation

### Response Format

All API responses follow this structure:

```json
{
  "success": boolean,
  "data": object,           // On success
  "error": string,          // On error
  "details": object         // Additional error details (optional)
}
```

### Error Handling

- `400` - Bad Request (validation errors)
- `404` - Not Found (path/request not found)
- `405` - Method Not Allowed
- `413` - Payload Too Large
- `500` - Internal Server Error

### Rate Limiting

Currently no rate limiting is implemented. Consider adding rate limiting for production use based on:
- IP address
- API key
- Path-specific limits

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes with tests
4. Run quality checks: `make quick-test`
5. Update CHANGELOG.md
6. Submit pull request

### Code Standards

- Follow PEP 8 (enforced by Black)
- Write comprehensive tests
- Update documentation
- Use meaningful commit messages
- Keep functions small and focused

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔍 Troubleshooting

### Common Issues

**Database Connection Errors:**
```bash
# Check database status
make health

# Reset database
make db-reset

# View database logs
make logs-db
```

**Port Already in Use:**
```bash
# Stop all services
make stop

# Check running processes
lsof -i :5000
```

**Migration Errors:**
```bash
# Reset migrations
rm -rf migrations/
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
```

### Debug Mode

```bash
# Enable debug logging
export FLASK_DEBUG=true
export LOG_LEVEL=DEBUG

# Run with verbose output
make dev
```

## 📞 Support

For issues and questions:
1. Check this README
2. Review the CHANGELOG.md
3. Check existing issues
4. Create a new issue with details

## 🎯 Roadmap

### Planned Features

- [ ] Real-time WebSocket updates
- [ ] Request filtering and search
- [ ] Export functionality (JSON, CSV)
- [ ] Rate limiting and security features
- [ ] Request replay functionality
- [ ] Custom response configuration
- [ ] Webhook transformation rules
- [ ] API authentication
- [ ] Multi-tenant support
- [ ] Performance optimization

### Version 2.0 Goals

- Enhanced security features
- Real-time collaboration
- Advanced analytics
- Enterprise features
- API versioning
- Webhook templates
