#!/usr/bin/env python3
"""
PostgreSQL Connection Test Script for Callback Listener

This script tests the PostgreSQL connection and basic database operations.
Run this after setting up PostgreSQL to ensure everything is working correctly.
"""

import os
import sys
import time
import psycopg2
from psycopg2 import sql
from urllib.parse import urlparse


def parse_database_url(database_url):
    """Parse database URL into connection parameters."""
    parsed = urlparse(database_url)
    return {
        'host': parsed.hostname,
        'port': parsed.port or 5432,
        'database': parsed.path[1:] if parsed.path else '',
        'user': parsed.username,
        'password': parsed.password
    }


def test_connection(db_params, max_retries=30, retry_delay=2):
    """Test PostgreSQL connection with retries."""
    print(f"Testing connection to PostgreSQL...")
    print(f"Host: {db_params['host']}:{db_params['port']}")
    print(f"Database: {db_params['database']}")
    print(f"User: {db_params['user']}")
    print("-" * 50)
    
    for attempt in range(1, max_retries + 1):
        try:
            conn = psycopg2.connect(**db_params)
            cursor = conn.cursor()
            
            # Test basic query
            cursor.execute("SELECT version();")
            version = cursor.fetchone()[0]
            
            print(f"✅ Connection successful!")
            print(f"PostgreSQL version: {version}")
            
            # Test database operations
            test_database_operations(cursor)
            
            cursor.close()
            conn.close()
            return True
            
        except psycopg2.OperationalError as e:
            print(f"❌ Attempt {attempt}/{max_retries} failed: {e}")
            if attempt < max_retries:
                print(f"Retrying in {retry_delay} seconds...")
                time.sleep(retry_delay)
            else:
                print("❌ Max retries exceeded. Connection failed.")
                return False
        except Exception as e:
            print(f"❌ Unexpected error: {e}")
            return False


def test_database_operations(cursor):
    """Test basic database operations."""
    print("\nTesting database operations...")
    
    try:
        # Test table creation
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS test_table (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        """)
        print("✅ Table creation successful")
        
        # Test insert
        cursor.execute("""
            INSERT INTO test_table (name) VALUES (%s) RETURNING id;
        """, ("Test Connection",))
        test_id = cursor.fetchone()[0]
        print(f"✅ Insert successful (ID: {test_id})")
        
        # Test select
        cursor.execute("SELECT name, created_at FROM test_table WHERE id = %s;", (test_id,))
        result = cursor.fetchone()
        print(f"✅ Select successful: {result}")
        
        # Test update
        cursor.execute("""
            UPDATE test_table SET name = %s WHERE id = %s;
        """, ("Updated Test Connection", test_id))
        print("✅ Update successful")
        
        # Test delete
        cursor.execute("DELETE FROM test_table WHERE id = %s;", (test_id,))
        print("✅ Delete successful")
        
        # Clean up test table
        cursor.execute("DROP TABLE test_table;")
        print("✅ Cleanup successful")
        
        # Commit all changes
        cursor.connection.commit()
        print("✅ All database operations completed successfully!")
        
    except Exception as e:
        print(f"❌ Database operation failed: {e}")
        cursor.connection.rollback()


def test_flask_database_url():
    """Test using Flask database URL format."""
    database_url = os.getenv('DATABASE_URL')
    
    if not database_url:
        print("❌ DATABASE_URL environment variable not set")
        return False
    
    if database_url.startswith('sqlite'):
        print("⚠️  Database URL is set to SQLite, not PostgreSQL")
        print(f"Current URL: {database_url}")
        return False
    
    if not database_url.startswith('postgresql'):
        print(f"❌ Invalid database URL format: {database_url}")
        return False
    
    print(f"✅ Database URL format is correct: {database_url}")
    
    # Parse and test connection
    db_params = parse_database_url(database_url)
    return test_connection(db_params)


def check_docker_services():
    """Check if Docker services are running."""
    print("Checking Docker services...")
    
    try:
        import docker
        client = docker.from_env()
        
        # Check for PostgreSQL container
        containers = client.containers.list()
        postgres_containers = [c for c in containers if c.image.tags and 'postgres' in c.image.tags[0]]
        
        if postgres_containers:
            container = postgres_containers[0]
            print(f"✅ PostgreSQL container found: {container.name}")
            print(f"Status: {container.status}")
            print(f"Image: {container.image.tags[0] if container.image.tags else 'Unknown'}")
            return True
        else:
            print("❌ No PostgreSQL containers found")
            print("Please run: docker-compose up -d postgres")
            return False
            
    except ImportError:
        print("⚠️  Docker module not available, skipping container check")
        return True
    except Exception as e:
        print(f"❌ Error checking Docker services: {e}")
        return False


def main():
    """Main test function."""
    print("=" * 60)
    print("PostgreSQL Setup Test for Callback Listener")
    print("=" * 60)
    
    # Load environment variables
    if os.path.exists('.env'):
        from dotenv import load_dotenv
        load_dotenv()
        print("✅ Loaded environment variables from .env")
    else:
        print("⚠️  No .env file found, using system environment")
    
    print()
    
    # Check Docker services
    if not check_docker_services():
        return 1
    
    print()
    
    # Test database connection
    if not test_flask_database_url():
        return 1
    
    print()
    print("=" * 60)
    print("🎉 All tests passed! PostgreSQL setup is working correctly.")
    print("=" * 60)
    print()
    print("Next steps:")
    print("1. Run database migrations: ./db-manage.sh migrate")
    print("2. Start your application: docker-compose up -d")
    print("3. Test your API endpoints")
    
    return 0


if __name__ == "__main__":
    sys.exit(main())
