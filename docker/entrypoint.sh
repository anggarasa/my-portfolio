#!/bin/bash
set -e

# ==============================================================================
# Laravel Docker Entrypoint Script
# Prepares the application before starting the main process
# ==============================================================================

echo "🚀 Starting Laravel application setup..."

# ------------------------------------------------------------------------------
# Create required storage directories
# ------------------------------------------------------------------------------
echo "📁 Creating storage directories..."
mkdir -p /var/www/html/storage/app/public
mkdir -p /var/www/html/storage/framework/cache/data
mkdir -p /var/www/html/storage/framework/sessions
mkdir -p /var/www/html/storage/framework/testing
mkdir -p /var/www/html/storage/framework/views
mkdir -p /var/www/html/storage/logs
mkdir -p /var/www/html/bootstrap/cache

# ------------------------------------------------------------------------------
# Set correct permissions for www-data user
# ------------------------------------------------------------------------------
echo "🔐 Setting correct permissions..."
chown -R www-data:www-data /var/www/html/storage
chown -R www-data:www-data /var/www/html/bootstrap/cache
chmod -R 775 /var/www/html/storage
chmod -R 775 /var/www/html/bootstrap/cache

# ------------------------------------------------------------------------------
# Create storage symlink (public/storage -> storage/app/public)
# ------------------------------------------------------------------------------
echo "🔗 Creating storage symlink..."
if [ ! -L /var/www/html/public/storage ]; then
    php artisan storage:link --force 2>/dev/null || true
fi

# ------------------------------------------------------------------------------
# Run database migrations if enabled
# Set RUN_MIGRATIONS=true environment variable to enable
# ------------------------------------------------------------------------------
if [ "${RUN_MIGRATIONS:-false}" = "true" ]; then
    echo "🗄️ Running database migrations..."
    php artisan migrate --force || echo "⚠️ Migrations failed or already up to date"
fi

# ------------------------------------------------------------------------------
# Run database seeders if enabled (first deployment)
# Set RUN_SEEDERS=true environment variable to enable
# ------------------------------------------------------------------------------
if [ "${RUN_SEEDERS:-false}" = "true" ]; then
    echo "🌱 Running database seeders..."
    php artisan db:seed --force || echo "⚠️ Seeders failed or already seeded"
fi

# ------------------------------------------------------------------------------
# Cache Laravel configuration, routes, and views
# ------------------------------------------------------------------------------
echo "⚡ Optimizing Laravel for production..."

# Clear any existing cache first
php artisan config:clear 2>/dev/null || true
php artisan route:clear 2>/dev/null || true
php artisan view:clear 2>/dev/null || true
php artisan cache:clear 2>/dev/null || true

# Generate new cache (after migrations so database is ready)
php artisan config:cache || echo "⚠️ Config cache failed"
php artisan route:cache || echo "⚠️ Route cache failed"
php artisan view:cache || echo "⚠️ View cache failed"

# Generate application key if not set
if [ -z "${APP_KEY}" ] || [ "${APP_KEY}" = "" ]; then
    echo "⚠️ Warning: APP_KEY is not set. Application may not work correctly."
fi

# Verify Vite build assets exist
if [ ! -d "/var/www/html/public/build" ]; then
    echo "❌ ERROR: Vite build assets not found in /var/www/html/public/build"
    echo "   This will cause 500 errors when loading the application."
fi

if [ ! -f "/var/www/html/public/build/.vite/manifest.json" ]; then
    echo "❌ ERROR: Vite manifest not found at /var/www/html/public/build/.vite/manifest.json"
    echo "   This will cause 500 errors when loading the application."
fi

# ------------------------------------------------------------------------------
# Final checks
# ------------------------------------------------------------------------------
echo "✅ Laravel application setup complete!"
echo "📍 Application is ready at port 80"

# Execute the main command (supervisord)
exec "$@"
