import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ExternalLink, Filter, Github } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    image_url?: string;
    technologies: string[];
    category: string;
    github_url: string;
    live_url: string;
}

interface Props {
    projects: Project[];
}

export default function ProjectsSection({ projects }: Props) {
    const [activeCategory, setActiveCategory] = useState('All');
    const [categories, setCategories] = useState<string[]>(['All']);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Refs for GSAP animations
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const filterRef = useRef<HTMLDivElement>(null);
    const projectsGridRef = useRef<HTMLDivElement>(null);
    const emptyStateRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Extract unique categories from projects
        const uniqueCategories = [
            'All',
            ...new Set(projects.map((project: Project) => project.category)),
        ];
        setCategories(uniqueCategories as string[]);
    }, [projects]);

    const filteredProjects =
        activeCategory === 'All'
            ? projects
            : projects.filter((project) => project.category === activeCategory);

    // GSAP Animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Section entrance animation
            gsap.fromTo(
                sectionRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 90%',
                        toggleActions: 'play none none reverse',
                    },
                },
            );

            // Header animation
            if (headerRef.current) {
                const headerElements =
                    headerRef.current.querySelectorAll('.header-element');
                gsap.fromTo(
                    headerElements,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: 'power2.out',
                        stagger: 0.1,
                        scrollTrigger: {
                            trigger: headerRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    },
                );
            }

            // Filter buttons animation
            if (filterRef.current) {
                const filterButtons =
                    filterRef.current.querySelectorAll('.filter-btn');
                gsap.fromTo(
                    filterButtons,
                    { scale: 0.8, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.6,
                        ease: 'back.out(1.7)',
                        stagger: 0.1,
                        scrollTrigger: {
                            trigger: filterRef.current,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse',
                        },
                    },
                );
            }

            // Projects grid animation
            if (projectsGridRef.current) {
                const projectCards =
                    projectsGridRef.current.querySelectorAll('.project-card');
                gsap.fromTo(
                    projectCards,
                    { y: 50, opacity: 0, scale: 0.9 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        ease: 'power2.out',
                        stagger: 0.15,
                        scrollTrigger: {
                            trigger: projectsGridRef.current,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse',
                        },
                    },
                );

                // Enhanced hover animations for project cards
                projectCards.forEach((card) => {
                    card.addEventListener('mouseenter', () => {
                        gsap.to(card, {
                            y: -8,
                            scale: 1.02,
                            duration: 0.3,
                            ease: 'power2.out',
                        });
                    });

                    card.addEventListener('mouseleave', () => {
                        gsap.to(card, {
                            y: 0,
                            scale: 1,
                            duration: 0.3,
                            ease: 'power2.out',
                        });
                    });
                });
            }

            // Empty state animation
            if (emptyStateRef.current) {
                const emptyElements =
                    emptyStateRef.current.querySelectorAll('.empty-element');
                gsap.fromTo(
                    emptyElements,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: 'power2.out',
                        stagger: 0.1,
                        scrollTrigger: {
                            trigger: emptyStateRef.current,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse',
                        },
                    },
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, [filteredProjects]);

    return (
        <section
            ref={sectionRef}
            id="projects"
            className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 py-20 lg:py-32"
        >
            {/* Background Pattern */}
            <div className="bg-grid-pattern absolute inset-0 opacity-5"></div>

            {/* Floating Background Elements */}
            <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-gradient-to-br from-accent/10 to-primary/10 blur-3xl"></div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div ref={headerRef} className="mb-16 text-center">
                    <div className="header-element mb-4">
                        <span className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                            Portfolio
                        </span>
                    </div>
                    <h2 className="header-element text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                        Featured
                        <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            Projects
                        </span>
                    </h2>
                    <p className="header-element mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
                        Explore my collection of innovative projects that
                        showcase my expertise in modern web development, mobile
                        applications, and creative problem-solving.
                    </p>
                </div>

                {/* Category Filters */}
                <div ref={filterRef} className="mb-12">
                    {/* Mobile Filter Toggle */}
                    <div className="mb-6 flex justify-center lg:hidden">
                        <Button
                            variant="outline"
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="flex items-center gap-2 border-border bg-card/50 backdrop-blur-sm"
                        >
                            <Filter className="h-4 w-4" />
                            Filter by Category
                            <ArrowRight
                                className={`h-4 w-4 transition-transform duration-300 ${isFilterOpen ? 'rotate-90' : ''}`}
                            />
                        </Button>
                    </div>

                    {/* Filter Buttons */}
                    <div
                        className={`flex flex-wrap justify-center gap-3 transition-all duration-300 ${isFilterOpen ? 'max-h-96 opacity-100' : 'max-h-96 opacity-100'} lg:opacity-100`}
                    >
                        {categories.map((category) => (
                            <Button
                                key={category}
                                variant={
                                    activeCategory === category
                                        ? 'default'
                                        : 'outline'
                                }
                                size="sm"
                                onClick={() => {
                                    setActiveCategory(category);
                                    setIsFilterOpen(false);
                                }}
                                className={`filter-btn transition-all duration-300 ${
                                    activeCategory === category
                                        ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/25'
                                        : 'border-border bg-card/50 text-muted-foreground backdrop-blur-sm hover:bg-card/80 hover:text-foreground'
                                }`}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Projects Grid */}
                {filteredProjects.length > 0 ? (
                    <div
                        ref={projectsGridRef}
                        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
                    >
                        {filteredProjects.map((project, index) => (
                            <Card
                                key={project.id}
                                className="project-card group relative overflow-hidden border-border bg-card/50 backdrop-blur-sm transition-all duration-500 hover:bg-card/80 hover:shadow-2xl hover:shadow-primary/10"
                            >
                                {/* Project Image with Overlay */}
                                <div className="relative overflow-hidden">
                                    <div className="aspect-video overflow-hidden bg-gradient-to-br from-muted/50 to-muted">
                                        <img
                                            src={
                                                project.image_url ||
                                                `/storage/projects/${project.image}`
                                            }
                                            alt={project.title}
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className="rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-primary-foreground backdrop-blur-sm">
                                            {project.category}
                                        </span>
                                    </div>

                                    {/* Action Buttons Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
                                        <div className="flex gap-3">
                                            {project.github_url && (
                                                <Button
                                                    size="sm"
                                                    variant="secondary"
                                                    className="bg-white/90 text-black hover:bg-white hover:text-black"
                                                    asChild
                                                >
                                                    <a
                                                        href={
                                                            project.github_url
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <Github className="h-4 w-4" />
                                                    </a>
                                                </Button>
                                            )}
                                            {project.live_url && (
                                                <Button
                                                    size="sm"
                                                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                                                    asChild
                                                >
                                                    <a
                                                        href={project.live_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <ExternalLink className="h-4 w-4" />
                                                    </a>
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <CardHeader className="pb-4">
                                    <CardTitle className="text-xl font-bold text-card-foreground transition-colors duration-300 group-hover:text-primary">
                                        <Link
                                            href={`/project/${project.id}`}
                                            className="cursor-pointer"
                                        >
                                            {project.title}
                                        </Link>
                                    </CardTitle>
                                    <CardDescription className="line-clamp-2 text-muted-foreground">
                                        {project.description}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    {/* Technologies */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies
                                            .slice(0, 4)
                                            .map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="rounded-full bg-gradient-to-r from-primary/10 to-accent/10 px-3 py-1 text-xs font-medium text-foreground transition-all duration-300 hover:from-primary/20 hover:to-accent/20"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        {project.technologies.length > 4 && (
                                            <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                                                +
                                                {project.technologies.length -
                                                    4}{' '}
                                                more
                                            </span>
                                        )}
                                    </div>

                                    {/* View Project Link */}
                                    <div className="pt-2">
                                        <Link
                                            href={`/project/${project.id}`}
                                            className="inline-flex items-center text-sm font-medium text-primary transition-colors duration-300 hover:text-primary/80"
                                        >
                                            View Project Details
                                            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div
                        ref={emptyStateRef}
                        className="flex flex-col items-center justify-center py-20"
                    >
                        <div className="empty-element mb-8 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 p-8">
                            <svg
                                className="h-20 w-20 text-primary"
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
                        <h3 className="empty-element mb-4 text-2xl font-bold text-foreground">
                            No Projects Found
                        </h3>
                        <p className="empty-element max-w-md text-center text-muted-foreground">
                            There are no projects in the "{activeCategory}"
                            category yet.
                            <br />
                            Please check back later or explore other categories.
                        </p>
                        <div className="empty-element mt-6">
                            <Button
                                variant="outline"
                                onClick={() => setActiveCategory('All')}
                                className="border-border bg-card/50 backdrop-blur-sm hover:bg-card/80"
                            >
                                View All Projects
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
