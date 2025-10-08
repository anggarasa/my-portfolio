import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { ExternalLink, Github } from 'lucide-react';
import { useState } from 'react';

export default function ProjectsSection() {
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = ['All', 'Web App', 'Mobile App', 'Design'];

    const projects = [
        {
            id: 1,
            title: 'E-Commerce Platform',
            description:
                'A full-stack e-commerce solution with modern UI and secure payment integration.',
            image: '/api/placeholder/400/300',
            technologies: ['React', 'Laravel'],
            category: 'Web App',
            github: '#',
            live: '#',
        },
        {
            id: 2,
            title: 'Task Management App',
            description:
                'A collaborative task management application with real-time updates and team features.',
            image: '/api/placeholder/400/300',
            technologies: ['React', 'Node.js'],
            category: 'Web App',
            github: '#',
            live: '#',
        },
        {
            id: 3,
            title: 'Mobile Banking App',
            description:
                'A secure mobile banking application with biometric authentication and transaction management.',
            image: '/api/placeholder/400/300',
            technologies: ['React Native', 'Laravel'],
            category: 'Mobile App',
            github: '#',
            live: '#',
        },
        {
            id: 4,
            title: 'Portfolio Website',
            description:
                'A modern portfolio website with dark mode and smooth animations.',
            image: '/api/placeholder/400/300',
            technologies: ['React', 'TailwindCSS'],
            category: 'Design',
            github: '#',
            live: '#',
        },
    ];

    const filteredProjects =
        activeCategory === 'All'
            ? projects
            : projects.filter((project) => project.category === activeCategory);

    return (
        <section
            id="projects"
            className="animate-on-scroll bg-white py-20 dark:bg-black"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-black md:text-4xl dark:text-white">
                        My Projects
                    </h2>
                    <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                        Description of my recent projects. Here are some of the
                        amazing projects I've worked on that showcase my skills
                        and expertise.
                    </p>

                    {/* Category Filters */}
                    <div className="flex flex-wrap justify-center gap-4">
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
                                        ? 'bg-black text-white dark:bg-white dark:text-black'
                                        : 'border-gray-300 text-gray-700 dark:border-gray-700 dark:text-gray-300'
                                }`}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {filteredProjects.map((project) => (
                        <Card
                            key={project.id}
                            className="overflow-hidden border-gray-200 bg-white transition-shadow duration-300 hover:shadow-lg dark:border-gray-800 dark:bg-black"
                        >
                            {/* Project Image */}
                            <div className="flex aspect-video items-center justify-center bg-gray-200 dark:bg-gray-800">
                                <span className="text-gray-500 dark:text-gray-400">
                                    Image
                                </span>
                            </div>

                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-black dark:text-white">
                                    {project.title}
                                </CardTitle>
                                <CardDescription className="text-gray-600 dark:text-gray-300">
                                    {project.description}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                {/* Technologies */}
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1 border-gray-300 dark:border-gray-700"
                                        asChild
                                    >
                                        <a href={project.github}>
                                            <Github className="mr-2 h-4 w-4" />
                                            Code
                                        </a>
                                    </Button>
                                    <Button
                                        size="sm"
                                        className="flex-1 bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                                        asChild
                                    >
                                        <a href={project.live}>
                                            <ExternalLink className="mr-2 h-4 w-4" />
                                            Live Demo
                                        </a>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
