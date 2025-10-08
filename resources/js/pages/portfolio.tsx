import AboutSection from '@/components/portfolio/AboutSection';
import ContactSection from '@/components/portfolio/ContactSection';
import Footer from '@/components/portfolio/Footer';
import Header from '@/components/portfolio/Header';
import HeroSection from '@/components/portfolio/HeroSection';
import ProjectsSection from '@/components/portfolio/ProjectsSection';
import ServicesSection from '@/components/portfolio/ServicesSection';
import { Head } from '@inertiajs/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function PortfolioLanding() {
    useEffect(() => {
        // GSAP Animations
        const tl = gsap.timeline();

        // Initial animations
        tl.from('.hero-content', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power2.out',
        }).from(
            '.hero-image',
            {
                duration: 1,
                scale: 0.8,
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

        // Smooth scrolling for navigation links
        const handleNavClick = (e: Event) => {
            const target = e.target as HTMLAnchorElement;
            if (target.hash) {
                e.preventDefault();
                const element = document.querySelector(target.hash);
                if (element) {
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
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
            <Head title="Portfolio - My Name">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=inter:400,500,600,700"
                    rel="stylesheet"
                />
            </Head>

            <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
                <Header />
                <main>
                    <HeroSection />
                    <AboutSection />
                    <ServicesSection />
                    <ProjectsSection />
                    <ContactSection />
                </main>
                <Footer />
            </div>
        </>
    );
}
