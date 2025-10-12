<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $projects = [
            [
                'title' => 'ThreadLoop',
                'description' => 'A modern social media platform built with Laravel and Livewire, enabling users to share content, interact, and connect with others worldwide.',
                'long_description' => 'ThreadLoop is a comprehensive social media platform that revolutionizes digital communication and content sharing. Built with Laravel 12 and Livewire, it provides real-time interactions, advanced content management, and robust social features. The platform supports text posts, images, and videos with intelligent algorithms and comprehensive user management. Features include a weighted feed algorithm, Cloudinary integration for media optimization, and comprehensive security with two-factor authentication.',
                'image' => '/assets/images/img_threadloop.png',
                'images' => [
                    '/assets/images/img_threadloop_1.png',
                    '/assets/images/img_threadloop_2.png',
                    '/assets/images/img_threadloop_3.png'
                ],
                'technologies' => ['Laravel 12', 'Livewire', 'Tailwind CSS 4', 'MySQL', 'Cloudinary'],
                'category' => 'Web App',
                'github_url' => 'https://github.com/anggarasa/thread-loop',
                'live_url' => 'https://threadloop.web.id/',
                'duration' => '1 months',
                'year' => '2025',
                'role' => 'Full Stack Developer',
                'challenges' => [
                    'Implementing weighted feed algorithm with performance optimization',
                    'Building real-time notification system',
                    'Optimizing database queries for large-scale interactions',
                    'Managing media uploads and CDN integration'
                ],
                'solutions' => [
                    'Developed intelligent feed algorithm with 70% likes and 30% comments weighting',
                    'Utilized Laravel Broadcasting with Pusher for real-time notifications',
                    'Implemented strategic database indexing and query optimization',
                    'Integrated Cloudinary for automated media optimization and global CDN'
                ],
                'features' => [
                    'Multi-format content sharing (text, images, videos)',
                    'Weighted feed algorithm for content discovery',
                    'Real-time notifications and social interactions',
                    'User authentication with 2FA support',
                    'Follow/unfollow system with user profiles',
                    'Interactive comments and likes system',
                    'Media management with Cloudinary integration',
                    'Responsive design for all devices'
                ],
                'demo_accounts' => [
                    [
                        'role' => 'Admin',
                        'email' => 'admin@threadloop.com',
                        'password' => 'password',
                        'description' => 'Example account for demonstration purposes'
                    ]
                ],
                'testimonial' => [
                    'text' => 'ThreadLoop has revolutionized our community engagement. The platform\'s intelligent feed algorithm and real-time features have significantly increased user interaction and content discovery.',
                    'author' => 'Sarah Johnson',
                    'position' => 'Community Manager at TechCorp'
                ],
                'status' => 'published',
                'sort_order' => 1,
                'featured' => true,
            ],
            [
                'title' => 'Website Kasir',
                'description' => 'A comprehensive cashier system built with Laravel 12 and modern technologies to support business operational efficiency and ease of use.',
                'long_description' => 'Website Kasir is a comprehensive point-of-sale (POS) system designed to enhance business operational efficiency. Built with modern Laravel 12 technology, this system provides a complete solution for managing sales, inventory, customers, and financial reports. With its intuitive interface and role-based access control system, businesses can easily manage their operations and make data-driven decisions. The system supports multi-user functionality with different access levels for Super Admin and Admin roles, ensuring optimal security and control.',
                'image' => '/assets/images/img_web_kasir.png',
                'images' => [
                    '/assets/images/img_web_kasir_1.png',
                    '/assets/images/img_web_kasir_2.png',
                    '/assets/images/img_web_kasir_3.png'
                ],
                'technologies' => ['Laravel 12', 'Livewire 3', 'TailwindCSS 4', 'MySQL'],
                'category' => 'Web App',
                'github_url' => 'https://github.com/anggarasa/Web-Kasir',
                'live_url' => 'https://web-kasir-phi.vercel.app/',
                'duration' => '2 months',
                'year' => '2025',
                'role' => 'Full Stack Developer',
                'challenges' => [
                    'Creating intuitive POS interface for quick transactions',
                    'Implementing secure payment processing',
                    'Managing inventory synchronization',
                    'Generating comprehensive financial reports'
                ],
                'solutions' => [
                    'Designed streamlined UI with keyboard shortcuts for speed',
                    'Integrated secure payment gateways with encryption',
                    'Built real-time inventory tracking system',
                    'Created automated reporting with data visualization'
                ],
                'features' => [
                    'Role-based access control (Super Admin & Admin)',
                    'CRUD User Admin management',
                    'CRUD Customer management',
                    'CRUD Product management',
                    'Payment input and processing',
                    'Payment history tracking and reporting'
                ],
                'demo_accounts' => [
                    [
                        'role' => 'Super Admin',
                        'email' => 'SuperAdmin@gmail.com',
                        'password' => 'admin123',
                        'description' => 'Full access to all features: CRUD User Admin, Customer, Product, Payment input, and Payment History'
                    ],
                    [
                        'role' => 'Admin',
                        'email' => 'admin1@gmail.com',
                        'password' => 'admin123',
                        'description' => 'Access to: CRUD Customer, Product, Payment input, and Payment History'
                    ]
                ],
                'testimonial' => [
                    'text' => 'Web Cashier has revolutionized our business operations. The system is reliable, user-friendly, and has significantly improved our efficiency.',
                    'author' => 'Michael Chen',
                    'position' => 'Store Manager at RetailPlus'
                ],
                'status' => 'published',
                'sort_order' => 2,
                'featured' => true,
            ],
            [
                'title' => 'AppSos API',
                'description' => 'REST API for social media applications with authentication, posting, comments, likes, and notifications.',
                'long_description' => 'AppSos API is a comprehensive backend solution for social media platforms. Built with Node.js, Express, TypeScript, and Prisma, it provides essential social media features including user authentication, post management, social interactions, and real-time notifications. The API includes secure file uploads and comprehensive documentation for easy integration.',
                'image' => '/assets/images/img_appsos_api.png',
                'images' => [
                    '/assets/images/img_appsos_api_1.png',
                    '/assets/images/img_appsos_api_2.png',
                    '/assets/images/img_appsos_api_3.png'
                ],
                'technologies' => ['Node.js', 'Express.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'JWT', 'Supabase'],
                'category' => 'Back End',
                'github_url' => 'https://github.com/anggarasa/AppSos-API',
                'live_url' => 'https://app-sos-docs.vercel.app/',
                'duration' => '1 months',
                'year' => '2025',
                'role' => 'Backend Developer',
                'challenges' => [
                    'Designing scalable database schema for social media features',
                    'Implementing secure authentication and authorization',
                    'Optimizing API performance for high traffic',
                    'Creating comprehensive API documentation'
                ],
                'solutions' => [
                    'Used PostgreSQL with optimized indexing strategies',
                    'Implemented JWT-based authentication with refresh tokens',
                    'Applied caching and database query optimization',
                    'Created interactive API documentation with Swagger'
                ],
                'features' => [
                    'JWT-based user authentication and authorization',
                    'Post creation, editing, and deletion with image support',
                    'Social interactions (like, comment, save posts)',
                    'Follow/unfollow system for user connections',
                    'Real-time notifications for user activities',
                    'Secure file upload with Supabase integration',
                    'Comprehensive API documentation'
                ],
                'testimonial' => [
                    'text' => 'AppSos API has been instrumental in building our social platform. The documentation is excellent and the API is incredibly reliable and fast.',
                    'author' => 'David Rodriguez',
                    'position' => 'CTO at SocialTech'
                ],
                'status' => 'published',
                'sort_order' => 3,
                'featured' => false,
            ],
        ];

        foreach ($projects as $projectData) {
            Project::create($projectData);
        }
    }
}
