import AboutSection from '@/components/portfolio/AboutSection';
import ContactSection from '@/components/portfolio/ContactSection';
import Footer from '@/components/portfolio/Footer';
import Header from '@/components/portfolio/Header';
import HeroSection from '@/components/portfolio/HeroSection';
import ProjectsSection from '@/components/portfolio/ProjectsSection';
import ServicesSection from '@/components/portfolio/ServicesSection';
import { Toaster } from '@/components/ui/sonner';
import { Head } from '@inertiajs/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';

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
                <Header />
                <main>
                    <HeroSection />
                    <AboutSection />
                    <ServicesSection />
                    <ProjectsSection projects={projects} />
                    <ContactSection />
                </main>
                <Footer />
                <Toaster />
            </div>
        </>
    );
}
