import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { ExternalLink, Github } from 'lucide-react';
import { useState } from 'react';

export default function ProjectsSection() {
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = ['All', 'Web App', 'Mobile App', 'Back End'];

    const projects = [
        {
            id: 1,
            title: 'ThreadLoop',
            description:
                'A modern social media platform built with Laravel and Livewire, allowing users to share content, interact, and connect with other users around the world.',
            image: '/assets/images/img_threadloop.png',
            technologies: ['Laravel', 'MySQL', 'TailwindCSS', 'Livewire'],
            category: 'Web App',
            github: 'https://github.com/anggarasa/thread-loop',
            live: 'https://thread-loop.vercel.app/',
        },
        {
            id: 2,
            title: 'Web Cashier',
            description:
                'A cashier website built using Laravel version 12 with modern technology to support ease and efficiency of business operations.',
            image: '/assets/images/img_web_kasir.png',
            technologies: ['Laravel', 'MySQL', 'TailwindCSS', 'Livewire'],
            category: 'Web App',
            github: 'https://github.com/anggarasa/Web-Kasir',
            live: 'https://web-kasir-phi.vercel.app/',
        },
        {
            id: 3,
            title: 'AppSos API',
            description:
                'This API provides complete features for social media platforms such as user authentication, posting, commenting, liking, saving, following, and notifications.',
            image: '/assets/images/img_appsos_api.png',
            technologies: ['ExpressJS', 'PostgreSQL', 'TypeScript', 'Prisma'],
            category: 'Back End',
            github: 'https://github.com/anggarasa/AppSos-API',
            live: 'https://app-sos-docs.vercel.app/',
        },
    ];

    const filteredProjects =
        activeCategory === 'All'
            ? projects
            : projects.filter((project) => project.category === activeCategory);

    return (
        <section
            id="projects"
            className="animate-on-scroll bg-background py-16"
        >
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="mb-3 text-xl font-bold text-foreground sm:text-2xl md:text-3xl">
                        My Projects
                    </h2>
                    <p className="mx-auto mb-6 max-w-2xl text-sm text-muted-foreground sm:text-base">
                        Description of my recent projects. Here are some of the
                        amazing projects I've worked on that showcase my skills
                        and expertise.
                    </p>

                    {/* Category Filters */}
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map((category) => (
                            <Button
                                key={category}
                                variant={
                                    activeCategory === category
                                        ? 'default'
                                        : 'outline'
                                }
                                size="sm"
                                onClick={() => setActiveCategory(category)}
                                className={`${
                                    activeCategory === category
                                        ? 'bg-primary text-primary-foreground'
                                        : 'border-border text-muted-foreground'
                                }`}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Projects Grid */}
                {filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredProjects.map((project) => (
                            <Card
                                key={project.id}
                                className="overflow-hidden border-border bg-card transition-shadow duration-300 hover:shadow-lg"
                            >
                                {/* Project Image */}
                                <div className="flex aspect-video items-center justify-center bg-muted">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="h-full w-full object-cover"
                                    />
                                </div>

                                <CardHeader>
                                    <CardTitle className="text-xl font-semibold text-card-foreground">
                                        <Link
                                            href={`/project/${project.id}`}
                                            className="cursor-pointer transition-colors duration-200 hover:text-primary hover:underline"
                                        >
                                            {project.title}
                                        </Link>
                                    </CardTitle>
                                    <CardDescription className="text-muted-foreground">
                                        {project.description}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    {/* Technologies */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1 border-border hover:bg-muted"
                                            asChild
                                        >
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Github className="mr-2 h-4 w-4" />
                                                Code
                                            </a>
                                        </Button>
                                        <Button
                                            size="sm"
                                            className="flex-1 bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                                            asChild
                                        >
                                            <a
                                                href={project.live}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <ExternalLink className="mr-2 h-4 w-4" />
                                                Live Demo
                                            </a>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="mb-6 rounded-full bg-gray-100 p-6 dark:bg-gray-800">
                            <svg
                                className="h-16 w-16 text-gray-400 dark:text-gray-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <h3 className="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-300">
                            No Projects Found
                        </h3>
                        <p className="text-center text-gray-500 dark:text-gray-400">
                            There are no projects in the "{activeCategory}"
                            category yet.
                            <br />
                            Please check back later or explore other categories.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
