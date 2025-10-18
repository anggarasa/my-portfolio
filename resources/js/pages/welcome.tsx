import { SectionLoading } from '@/components/ui/loading-spinner';
import { Toaster } from '@/components/ui/sonner';
import { Head } from '@inertiajs/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { lazy, Suspense, useEffect } from 'react';

// Lazy load portfolio components
const Header = lazy(() => import('@/components/portfolio/Header'));
const Footer = lazy(() => import('@/components/portfolio/Footer'));
const HeroSection = lazy(() => import('@/components/portfolio/HeroSection'));
const AboutSection = lazy(() => import('@/components/portfolio/AboutSection'));
const ServicesSection = lazy(
    () => import('@/components/portfolio/ServicesSection'),
);
const ProjectsSection = lazy(
    () => import('@/components/portfolio/ProjectsSection'),
);
const ContactSection = lazy(
    () => import('@/components/portfolio/ContactSection'),
);

// Register GSAP plugins
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

export default function Welcome({ projects }: Props) {
    useEffect(() => {
        // GSAP Animations - Removed hero animations as they're handled in HeroSection component

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

        // Smooth scrolling for navigation links with header offset
        const handleNavClick = (e: Event) => {
            const target = e.target as HTMLAnchorElement;
            if (target.hash) {
                e.preventDefault();
                const element = document.querySelector(target.hash);
                if (element) {
                    const headerHeight = window.innerWidth < 768 ? 100 : 80; // Mobile: 100px, Desktop: 80px
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition =
                        elementPosition + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth',
                    });
                }
            }
        };

        // Add event listeners to navigation links
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach((link) => {
            link.addEventListener('click', handleNavClick);
        });

        return () => {
            navLinks.forEach((link) => {
                link.removeEventListener('click', handleNavClick);
            });
        };
    }, []);

    return (
        <>
            <Head title="Portfolio">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=inter:400,500,600,700"
                    rel="stylesheet"
                />
            </Head>

            <div className="min-h-screen bg-background text-foreground">
                <Suspense fallback={<SectionLoading />}>
                    <Header />
                </Suspense>
                <main>
                    <Suspense fallback={<SectionLoading />}>
                        <HeroSection />
                    </Suspense>
                    <Suspense fallback={<SectionLoading />}>
                        <AboutSection />
                    </Suspense>
                    <Suspense fallback={<SectionLoading />}>
                        <ServicesSection />
                    </Suspense>
                    <Suspense fallback={<SectionLoading />}>
                        <ProjectsSection projects={projects} />
                    </Suspense>
                    <Suspense fallback={<SectionLoading />}>
                        <ContactSection />
                    </Suspense>
                </main>
                <Suspense fallback={<SectionLoading />}>
                    <Footer />
                </Suspense>
                <Toaster />
            </div>
        </>
    );
}
