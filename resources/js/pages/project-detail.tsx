import ProjectChallenges from '@/components/project/ProjectChallenges';
import ProjectCTA from '@/components/project/ProjectCTA';
import ProjectDemo from '@/components/project/ProjectDemo';
import ProjectFeatures from '@/components/project/ProjectFeatures';
import ProjectGallery from '@/components/project/ProjectGallery';
import ProjectHeader from '@/components/project/ProjectHeader';
import ProjectHero from '@/components/project/ProjectHero';
import ProjectOverview from '@/components/project/ProjectOverview';
import { Head } from '@inertiajs/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface ProjectDetailProps {
    project: {
        id: number;
        title: string;
        description: string;
        longDescription: string;
        image: string;
        images: string[];
        technologies: string[];
        category: string;
        github: string;
        live: string;
        duration: string;
        year: string;
        role: string;
        challenges: string[];
        solutions: string[];
        features: string[];
        demoAccounts?: {
            role: string;
            email: string;
            password: string;
            description?: string;
        }[];
        testimonial?: {
            text: string;
            author: string;
            position: string;
        };
    };
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
    useEffect(() => {
        // GSAP Animations
        const tl = gsap.timeline();

        // Initial animations
        tl.from('.project-hero', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power2.out',
        }).from(
            '.project-image',
            {
                duration: 1,
                scale: 0.9,
                opacity: 0,
                ease: 'power2.out',
            },
            '-=0.5',
        );

        // Scroll-triggered animations
        gsap.utils.toArray('.animate-on-scroll').forEach((element: any) => {
            gsap.fromTo(
                element,
                {
                    y: 50,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none reverse',
                    },
                },
            );
        });
    }, []);

    return (
        <>
            <Head title={`${project.title} - Project Detail`}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=inter:400,500,600,700"
                    rel="stylesheet"
                />
            </Head>

            <div className="min-h-screen bg-background text-foreground">
                <ProjectHeader project={project} />

                <main>
                    <ProjectHero project={project} />

                    {/* Project Overview */}
                    <section className="animate-on-scroll bg-muted/30 py-16">
                        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                                <ProjectOverview
                                    longDescription={project.longDescription}
                                />
                                <ProjectFeatures features={project.features} />
                            </div>
                        </div>
                    </section>

                    {/* Project Images Gallery */}
                    {project.images && project.images.length > 0 && (
                        <ProjectGallery
                            images={project.images}
                            projectTitle={project.title}
                        />
                    )}

                    {/* Challenges & Solutions */}
                    <section className="animate-on-scroll bg-muted/30 py-16">
                        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                            <ProjectChallenges
                                challenges={project.challenges}
                                solutions={project.solutions}
                            />
                        </div>
                    </section>

                    {/* Demo Accounts */}
                    {project.demoAccounts &&
                        project.demoAccounts.length > 0 && (
                            <ProjectDemo
                                demoAccounts={project.demoAccounts}
                                liveUrl={project.live}
                            />
                        )}

                    {/* Testimonial - Commented out until project management feature is implemented */}
                    {/* {project.testimonial && (
                        <ProjectTestimonial testimonial={project.testimonial} />
                    )} */}

                    <ProjectCTA />
                </main>
            </div>
        </>
    );
}
