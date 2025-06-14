# CallbackListener

A modern, full-stack webhook capture and monitoring platform built with Flask, PostgreSQL, Next.js, and Docker. Create unique URLs to capture and inspect HTTP requests in real-time with a beautiful dashboard interface.

![CallbackListener Dashboard](https://img.shields.io/badge/Status-Production%20Ready-brightgreen) ![Version](https://img.shields.io/badge/Version-1.0.0-blue) ![License](https://img.shields.io/badge/License-MIT-yellow)

## 🚀 Quick Start

### Prerequisites
- **Docker Desktop** - [Install Docker Desktop](https://www.docker.com/products/docker-desktop/)
- **Git** - [Install Git](https://git-scm.com/downloads)

### One-Command Setup

```bash
# Clone the repository
git clone https://github.com/hectorleondev/callback-listener.git
cd callback-listener

# Start all services (PostgreSQL + Backend + Frontend)
docker compose up -d

# Run database migrations
./db-manage.sh migrate

# Check status
./db-manage.sh status
```

### Access the Application

- **Frontend Dashboard**: http://localhost:3000
- **Backend API**: http://localhost:5001
- **API Documentation**: http://localhost:5001/docs
- **Health Checks**: http://localhost:5001/health/

### Quick Test

```bash
# Create a test webhook
curl -X POST http://localhost:5001/api/paths \
  -H "Content-Type: application/json" \
  -d '{"path_id": "my-test-webhook"}'

# Send a test request
curl -X POST http://localhost:5001/webhook/my-test-webhook \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello CallbackListener!", "timestamp": "'$(date -Iseconds)'"}'

# View captured request in dashboard
open http://localhost:3000/webhooks/my-test-webhook
```

## 📋 Features

### 🎯 Core Functionality
- **🔗 Webhook URL Generation**: Create unique URLs instantly
- **📊 Real-time Dashboard**: Beautiful, responsive web interface
- **📝 Request Logging**: Capture and store all HTTP request details
- **🔍 Advanced Filtering**: Search and filter captured requests
- **⚡ Live Updates**: Real-time request capture without page refresh
- **📱 Multi-device Support**: Works on desktop, tablet, and mobile

### 🛡️ Enterprise Features
- **🗄️ PostgreSQL Integration**: Production-ready database with connection pooling
- **🐳 Full Docker Support**: Complete containerization for all services
- **📈 Health Monitoring**: Built-in health checks and monitoring endpoints
- **🔒 Data Validation**: Comprehensive input validation and sanitization
- **📊 Analytics Dashboard**: Request statistics and performance metrics
- **💾 Data Persistence**: Reliable data storage with backup capabilities

### 🔧 Developer Experience
- **📚 Comprehensive API**: RESTful API with OpenAPI documentation
- **🧪 Testing Suite**: Full test coverage for backend and frontend
- **🛠️ Management Tools**: Database and container management scripts
- **📖 Rich Documentation**: Detailed setup and usage guides
- **🔄 Hot Reload**: Fast development with instant updates

## 🏗️ Architecture

### Technology Stack

#### Backend
- **Framework**: Flask 3.0 with Blueprint architecture
- **Database**: PostgreSQL 15 with SQLAlchemy ORM
- **API**: RESTful API with JSON responses
- **Validation**: Marshmallow for data serialization
- **Server**: Gunicorn for production deployment
- **Container**: Docker with multi-stage builds

#### Frontend  
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5.6 with strict configuration
- **Styling**: Tailwind CSS 3.4 with custom design system
- **UI Components**: Radix UI primitives with custom styling
- **State Management**: React hooks with custom stores
- **Build Tool**: Turbopack for fast development

#### Infrastructure
- **Database**: PostgreSQL 15 Alpine with persistent volumes
- **Orchestration**: Docker Compose for service management
- **Networking**: Isolated Docker networks with health checks
- **Storage**: Named Docker volumes for data persistence

### System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │    │                 │
│   Frontend      │    │   Backend       │    │   PostgreSQL    │
│   Next.js       │◄──►│   Flask         │◄──►│   Database      │
│   Port: 3000    │    │   Port: 5001    │    │   Port: 5432    │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        │                       │                       │
        │                       │                       │
        └───────────────────────┼───────────────────────┘
                                │
                    ┌─────────────────┐
                    │                 │
                    │ Docker Network  │
                    │ callback-network│
                    │                 │
                    └─────────────────┘
```

### Project Structure

```
callback-listener/
├── 📁 backend/                 # Flask API server
│   ├── app/                   # Application code
│   ├── tests/                 # Test suite
│   ├── migrations/            # Database migrations
│   ├── scripts/               # Management scripts
│   ├── docker-compose.yml     # Backend services
│   ├── Dockerfile            # Backend container
│   └── README.md             # Backend documentation
├── 📁 frontend/               # Next.js dashboard
│   ├── app/                  # Next.js App Router
│   ├── components/           # UI components
│   ├── features/             # Feature modules
│   ├── lib/                  # Utilities and stores
│   ├── docker-compose.yml    # Frontend services
│   ├── Dockerfile           # Frontend container
│   └── README.md            # Frontend documentation
├── 📄 docker-compose.yml      # Full stack orchestration
├── 🛠️ db-manage.sh           # Database management script
├── 🧪 test-postgres.py       # Database testing utility
├── 📚 Documentation/          # Comprehensive guides
│   ├── POSTGRESQL_SETUP.md
│   ├── POSTGRES_QUICK_REF.md
│   └── ...
└── 📖 README.md              # This file
```

## 🔌 API Reference

### Quick API Overview

#### Webhook Management
```http
# Create webhook
POST /api/paths
{
  "path_id": "my-webhook"  // optional
}

# List all webhooks
GET /api/paths

# Get webhook details
GET /api/paths/{path_id}

# Delete webhook
DELETE /api/paths/{path_id}
```

#### Request Capture
```http
# Capture any HTTP request (automatically logged)
[ANY_METHOD] /webhook/{path_id}

# Get captured requests
GET /api/paths/{path_id}/logs?limit=50&offset=0

# Get specific request
GET /api/paths/{path_id}/logs/{request_id}
```

#### Dashboard & Health
```http
# Dashboard statistics
GET /api/dashboard/stats

# Health checks
GET /health/           # Basic health
GET /health/ready      # Readiness (includes DB)
GET /health/live       # Liveness
```

For complete API documentation, visit: http://localhost:5001/docs

## 🗄️ Database

### PostgreSQL Configuration

The application uses PostgreSQL 15 with the following setup:

- **Connection Pooling**: 10 connections, 20 overflow
- **Health Checks**: Automatic connection validation  
- **Migrations**: Managed with Flask-Migrate/Alembic
- **Backup/Restore**: Automated backup mechanisms
- **Data Persistence**: Docker volumes for reliable storage

### Database Management

```bash
# Quick database operations
./db-manage.sh status      # Check database health
./db-manage.sh migrate     # Run migrations
./db-manage.sh backup      # Create backup
./db-manage.sh connect     # Connect to database
./db-manage.sh reset       # Reset database (WARNING: deletes data)

# Detailed operations
./db-manage.sh --help      # See all available commands
```

### Schema Overview

```sql
-- Webhook paths
CREATE TABLE paths (
    id UUID PRIMARY KEY,
    path_id VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Captured requests
CREATE TABLE requests (
    id UUID PRIMARY KEY,
    path_id UUID REFERENCES paths(id),
    method VARCHAR(10) NOT NULL,
    headers JSONB,
    body TEXT,
    query_params JSONB,
    ip_address INET,
    user_agent TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🧪 Testing

### Running Tests

```bash
# Backend tests
cd backend
make test                 # All tests with coverage
make test-local          # Local tests
make test-unit           # Unit tests only
make test-api            # API tests only

# Frontend tests
cd frontend
npm test                 # All tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report
```

### Test Coverage

- **Backend**: >85% coverage (models, API, services)
- **Frontend**: Component and integration tests
- **E2E**: Full workflow testing

## 🛠️ Development

### Local Development Setup

#### Option 1: Full Docker Development (Recommended)
```bash
# Start all services
docker compose up -d

# View logs
docker compose logs -f

# Stop services
docker compose down
```

#### Option 2: Mixed Development (Backend Docker, Frontend Local)
```bash
# Start backend services
cd backend && docker compose up -d

# Start frontend locally
cd frontend && npm run dev
```

#### Option 3: Full Local Development
```bash
# Backend (requires PostgreSQL installed locally)
cd backend
make setup-dev
make run

# Frontend
cd frontend
npm install
npm run dev
```

### Development Tools

```bash
# Backend quality checks
cd backend
make lint                # Code linting
make format              # Code formatting
make security-check      # Security scanning
make quick-test          # Full quality check

# Frontend quality checks
cd frontend
npm run lint             # ESLint
npm run type-check       # TypeScript checking
npm run format           # Prettier formatting
```

### Git Workflow

```bash
# 1. Create feature branch
git checkout -b feature/my-feature

# 2. Make changes with tests
# ... code changes ...

# 3. Run quality checks
cd backend && make quick-test
cd frontend && npm run lint && npm run type-check

# 4. Commit with conventional format
git commit -m "feat(webhooks): add real-time updates"

# 5. Push and create PR
git push origin feature/my-feature
```

## 🚀 Deployment

### Production Deployment

#### Quick Production Setup
```bash
# 1. Clone repository
git clone https://github.com/hectorleondev/callback-listener.git
cd callback-listener

# 2. Configure environment
cp .env.example .env
# Edit .env with production values

# 3. Deploy with Docker
docker compose up -d

# 4. Run migrations
./db-manage.sh migrate

# 5. Verify deployment
curl http://localhost:3000/api/health
curl http://localhost:5001/health/
```

#### Environment Configuration

```env
# Database
POSTGRES_DB=callback_listener
POSTGRES_USER=callback_user
POSTGRES_PASSWORD=your_secure_password_here
DATABASE_URL=postgresql://callback_user:your_secure_password_here@postgres:5432/callback_listener

# Backend
SECRET_KEY=your_secure_secret_key_here
LOG_LEVEL=WARNING
FLASK_ENV=production

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:5001
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=production
```

#### Production Checklist

- [ ] **Security**: Update default passwords
- [ ] **SSL/TLS**: Configure HTTPS certificates  
- [ ] **Reverse Proxy**: Set up Nginx/Apache
- [ ] **Monitoring**: Configure health checks
- [ ] **Backups**: Set up automated backups
- [ ] **Logging**: Configure centralized logging
- [ ] **Scaling**: Configure load balancing if needed

### Deployment Options

#### 1. Self-Hosted with Docker
```bash
# Production docker-compose
version: '3.8'
services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

  backend:
    image: callback-listener-backend:latest
    environment:
      FLASK_ENV: production
      DATABASE_URL: ${DATABASE_URL}
      SECRET_KEY: ${SECRET_KEY}
    depends_on:
      - postgres
    restart: unless-stopped

  frontend:
    image: callback-listener-frontend:latest
    environment:
      NODE_ENV: production
      NEXT_PUBLIC_API_URL: ${NEXT_PUBLIC_API_URL}
    depends_on:
      - backend
    restart: unless-stopped
```

#### 2. Cloud Deployment (AWS/GCP/Azure)
- **Database**: Managed PostgreSQL (RDS/Cloud SQL)
- **Backend**: Container service (ECS/Cloud Run)
- **Frontend**: Static hosting (S3/Cloud Storage) + CDN
- **Load Balancer**: Application Load Balancer
- **Monitoring**: CloudWatch/Stackdriver

#### 3. Platform as a Service
- **Heroku**: Deploy with buildpacks
- **Railway**: Docker-based deployment
- **Vercel**: Frontend deployment
- **Render**: Full-stack deployment

## 📊 Monitoring & Operations

### Health Monitoring

```bash
# Application health
curl http://localhost:3000/api/health    # Frontend health
curl http://localhost:5001/health/       # Backend health
curl http://localhost:5001/health/ready  # Backend + DB health

# Database health
./db-manage.sh status

# Container health
docker compose ps
docker stats
```

### Logging

```bash
# Application logs
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f postgres

# Database logs
./db-manage.sh logs

# System logs
docker system events
```

### Performance Monitoring

Key metrics to monitor:
- **Request Rate**: Webhooks captured per minute
- **Response Time**: API endpoint performance  
- **Database Performance**: Query execution time
- **Error Rate**: Failed requests percentage
- **Resource Usage**: CPU, memory, disk usage

### Backup Strategy

```bash
# Manual backup
./db-manage.sh backup

# Automated backup (add to cron)
0 2 * * * cd /path/to/callback-listener && ./db-manage.sh backup

# Backup verification
./db-manage.sh restore backup_20250614_194430.sql --dry-run
```

## 🔐 Security

### Security Features

- ✅ **Input Validation**: All inputs validated and sanitized
- ✅ **SQL Injection Protection**: Parameterized queries with SQLAlchemy
- ✅ **XSS Prevention**: Content Security Policy headers
- ✅ **CORS Configuration**: Configurable cross-origin resource sharing
- ✅ **Security Headers**: X-Frame-Options, X-Content-Type-Options, etc.
- ✅ **Environment Isolation**: Docker network isolation

### Security Recommendations

#### Production Security
```bash
# 1. Use strong passwords
export POSTGRES_PASSWORD=$(openssl rand -base64 32)
export SECRET_KEY=$(openssl rand -hex 32)

# 2. Configure firewall
ufw allow 22/tcp     # SSH
ufw allow 80/tcp     # HTTP
ufw allow 443/tcp    # HTTPS
ufw deny 5432/tcp    # Block direct DB access

# 3. SSL/TLS configuration
# Use Let's Encrypt or commercial certificates

# 4. Regular updates
docker compose pull && docker compose up -d
```

#### Network Security
- **Database**: Not exposed to public internet
- **API**: Rate limiting recommended for production
- **Frontend**: Served over HTTPS in production
- **Internal**: Services communicate over Docker network

## 📚 Documentation

### Available Documentation

- **[Main README](README.md)**: This file - project overview
- **[Backend README](backend/README.md)**: Detailed backend documentation
- **[Frontend README](frontend/README.md)**: Detailed frontend documentation
- **[PostgreSQL Setup](POSTGRESQL_SETUP.md)**: Database setup guide
- **[Quick Reference](POSTGRES_QUICK_REF.md)**: Daily operation commands
- **[Deployment Success](POSTGRESQL_DEPLOYMENT_SUCCESS.md)**: Deployment verification

### API Documentation

- **Interactive Docs**: http://localhost:5001/docs (Swagger UI)
- **ReDoc Format**: http://localhost:5001/redoc
- **OpenAPI Spec**: http://localhost:5001/openapi.yaml

### Getting Help

1. **📖 Check Documentation**: Review relevant README files
2. **🔍 Search Issues**: Look for similar problems in GitHub issues
3. **💬 Ask Questions**: Create a GitHub issue with details
4. **🐛 Report Bugs**: Use the bug report template

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Contributing Workflow

1. **🍴 Fork the repository**
2. **🌟 Create feature branch**: `git checkout -b feature/amazing-feature`
3. **💻 Make your changes** with appropriate tests
4. **✅ Run quality checks**: 
   ```bash
   cd backend && make quick-test
   cd frontend && npm run lint && npm run type-check
   ```
5. **📝 Update documentation** if needed
6. **💾 Commit changes**: Use [conventional commits](https://conventionalcommits.org/)
7. **🚀 Push to branch**: `git push origin feature/amazing-feature`
8. **📬 Submit pull request**

### Code Standards

- **Backend**: Python PEP 8, type hints, comprehensive tests
- **Frontend**: TypeScript strict mode, React best practices
- **Commits**: Conventional commit format
- **Documentation**: Update relevant README files
- **Tests**: Maintain >85% test coverage

### Development Environment

```bash
# Set up development environment
git clone https://github.com/yourusername/callback-listener.git
cd callback-listener

# Backend setup
cd backend
make setup-dev

# Frontend setup  
cd ../frontend
npm install

# Start development
docker compose up -d
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Roadmap

### Current Version (v1.0)
- ✅ Full-stack webhook capture platform
- ✅ PostgreSQL database integration
- ✅ Modern React dashboard
- ✅ Docker containerization
- ✅ Comprehensive documentation

### Planned Features (v1.1)
- [ ] **Real-time WebSocket Updates**: Live request streaming
- [ ] **Advanced Filtering**: Complex search and filter options
- [ ] **Export Functionality**: JSON, CSV, and XML export
- [ ] **Request Replay**: Replay captured requests
- [ ] **Custom Response Configuration**: Configure webhook responses
- [ ] **API Authentication**: Token-based API access

### Future Features (v2.0)
- [ ] **Multi-tenant Support**: Multiple isolated environments
- [ ] **Webhook Transformation**: Transform requests before logging
- [ ] **Integration Webhooks**: Forward requests to external services
- [ ] **Advanced Analytics**: Charts, graphs, and insights
- [ ] **Collaboration Features**: Team management and sharing
- [ ] **Enterprise SSO**: SAML/OAuth integration
- [ ] **Rate Limiting**: Configurable rate limits per webhook
- [ ] **Custom Domains**: Use your own domain for webhooks

## 📞 Support & Community

### Getting Support

- **🐛 Bug Reports**: [Create an issue](https://github.com/hectorleondev/callback-listener/issues/new?template=bug_report.md)
- **💡 Feature Requests**: [Request a feature](https://github.com/hectorleondev/callback-listener/issues/new?template=feature_request.md)
- **❓ Questions**: [Ask in Discussions](https://github.com/hectorleondev/callback-listener/discussions)
- **📚 Documentation**: Check the comprehensive documentation above

### Community

- **⭐ Star the repository** if you find it useful
- **🍴 Fork and contribute** to help improve the project
- **📢 Share with others** who might benefit from webhook monitoring
- **💬 Join discussions** to help shape the future of the project

### Acknowledgments

Built with ❤️ using:
- [Flask](https://flask.palletsprojects.com/) - Backend framework
- [PostgreSQL](https://postgresql.org/) - Database
- [Next.js](https://nextjs.org/) - Frontend framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Docker](https://docker.com/) - Containerization
- [TypeScript](https://typescriptlang.org/) - Type safety

---

<div align="center">

**CallbackListener** - The modern webhook monitoring platform

[🌟 Star on GitHub](https://github.com/hectorleondev/callback-listener) • [📚 Documentation](https://github.com/hectorleondev/callback-listener#documentation) • [🐛 Report Bug](https://github.com/hectorleondev/callback-listener/issues) • [💡 Request Feature](https://github.com/hectorleondev/callback-listener/issues)

Made with ❤️ by the CallbackListener community

</div>
