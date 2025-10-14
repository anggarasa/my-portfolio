# My Portfolio

A modern, responsive portfolio website built with Laravel 12 and React, featuring a comprehensive admin panel for project management and contact handling.

## 🚀 Features

### Public Features

- **Responsive Design**: Modern, mobile-first design with Tailwind CSS 4
- **Project Showcase**: Detailed project pages with galleries, features, and technologies
- **Contact Form**: Integrated contact system with email notifications
- **SEO Optimized**: Built-in SEO service with meta tags, structured data, and sitemap
- **Analytics Integration**: Google Analytics 4 and Google Tag Manager support
- **Performance Monitoring**: Real-time performance tracking and metrics
- **Dark/Light Theme**: Theme switching capability
- **Smooth Animations**: GSAP-powered animations and transitions

### Admin Features

- **Dashboard**: Comprehensive overview with statistics and metrics
- **Project Management**: Full CRUD operations for projects
- **Contact Management**: View, reply to, and manage contact messages
- **Reply System**: Draft and send replies to contacts
- **Performance Dashboard**: Monitor system performance and health
- **Analytics Dashboard**: Track website performance and user engagement

## 🛠️ Tech Stack

### Backend

- **Laravel 12**: PHP framework
- **Inertia.js**: Modern monolith approach
- **Laravel Fortify**: Authentication system
- **SQLite**: Database (easily configurable for other databases)
- **Laravel Wayfinder**: Enhanced routing

### Frontend

- **React 19**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS 4**: Styling framework
- **Radix UI**: Accessible component primitives
- **GSAP**: Animation library
- **Lucide React**: Icon library

### Development Tools

- **Vite**: Build tool and dev server
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Pest**: Testing framework

## 📋 Prerequisites

- PHP 8.2 or higher
- Node.js 18 or higher
- Composer
- NPM or Yarn

## 🚀 Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/anggarasa/my-portfolio.git
    cd my-portfolio
    ```

2. **Install PHP dependencies**

    ```bash
    composer install
    ```

3. **Install Node.js dependencies**

    ```bash
    npm install
    ```

4. **Environment setup**

    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

5. **Database setup**

    ```bash
    # SQLite database is already created
    # For other databases, update .env and run:
    php artisan migrate
    ```

6. **Seed the database**

    ```bash
    php artisan db:seed
    ```

7. **Storage setup**
    ```bash
    php artisan storage:link
    ```

## 🏃‍♂️ Running the Application

### Development Mode

```bash
# Start all services concurrently
composer run dev
```

This command will start:

- Laravel development server (http://localhost:8000)
- Queue worker
- Vite development server

### Production Build

```bash
# Build frontend assets
npm run build

# Start production server
php artisan serve
```

### SSR Mode (Optional)

```bash
composer run dev:ssr
```

## 📁 Project Structure

```
my-portfolio/
├── app/
│   ├── Http/Controllers/     # API controllers
│   ├── Models/              # Eloquent models
│   ├── Services/            # Business logic services
│   └── Mail/                # Email templates
├── database/
│   ├── migrations/          # Database migrations
│   └── seeders/            # Database seeders
├── resources/
│   ├── js/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── layouts/        # Layout components
│   │   └── hooks/          # Custom React hooks
│   └── css/                # Stylesheets
├── routes/
│   ├── web.php             # Web routes
│   └── auth.php            # Authentication routes
└── public/
    ├── assets/             # Static assets
    └── storage/            # File storage
```

## 🔧 Configuration

### Environment Variables

Key environment variables to configure:

```env
APP_NAME="My Portfolio"
APP_URL=http://localhost:8000

# Database
DB_CONNECTION=sqlite
DB_DATABASE=database/database.sqlite

# Mail Configuration
MAIL_MAILER=smtp
MAIL_HOST=your-smtp-host
MAIL_PORT=587
MAIL_USERNAME=your-email
MAIL_PASSWORD=your-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@yourdomain.com
MAIL_FROM_NAME="${APP_NAME}"

# Google Analytics (Optional)
GOOGLE_ANALYTICS_GA4_ID=your-ga4-id
GOOGLE_ANALYTICS_GTAG_ID=your-gtag-id
```

### Admin Access

Create an admin user:

```bash
php artisan tinker
```

```php
use App\Models\User;
User::create([
    'name' => 'Admin User',
    'email' => 'admin@example.com',
    'password' => bcrypt('password'),
    'email_verified_at' => now(),
]);
```

## 📊 Features Overview

### Project Management

- Create, edit, and delete projects
- Upload project images and galleries
- Set project status (draft, published, archived)
- Organize projects by categories
- Featured project highlighting

### Contact System

- Contact form with validation
- Email notifications for new messages
- Admin panel for message management
- Reply system with draft functionality
- Message status tracking (new, read, replied)

### Performance Monitoring

- Real-time system metrics
- Database query performance tracking
- Memory usage monitoring
- Slow operation detection
- Performance reports and analytics

### SEO Features

- Dynamic meta tags
- Structured data (JSON-LD)
- XML sitemap generation
- Robots.txt configuration
- Open Graph and Twitter Card support

## 🧪 Testing

Run the test suite:

```bash
php artisan test
```

## 📝 API Documentation

### Public Routes

- `GET /` - Homepage
- `GET /project/{id}` - Project detail page
- `POST /contact` - Submit contact form

### Admin Routes (Authenticated)

- `GET /dashboard` - Admin dashboard
- `GET /admin/projects` - Project management
- `GET /admin/contacts` - Contact management
- `GET /admin/performance` - Performance monitoring

## 🚀 Deployment

### Production Deployment

1. **Build assets**

    ```bash
    npm run build
    ```

2. **Optimize Laravel**

    ```bash
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache
    ```

3. **Set up web server**
    - Configure Apache/Nginx to serve from `public/` directory
    - Set up SSL certificate
    - Configure environment variables

### Docker Deployment (Optional)

```dockerfile
FROM php:8.2-fpm
# Add your Docker configuration here
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👨‍💻 Author

**Anggara Saputra**

- Email: anggarasaputra273@gmail.com
- GitHub: [@anggarasa](https://github.com/anggarasa)
- LinkedIn: [Anggara Saputra](https://www.linkedin.com/in/anggara-saputra-7baa95318)

## 🙏 Acknowledgments

- Laravel team for the amazing framework
- React team for the powerful UI library
- Tailwind CSS for the utility-first CSS framework
- All open-source contributors who made this project possible

---

⭐ If you found this project helpful, please give it a star!
