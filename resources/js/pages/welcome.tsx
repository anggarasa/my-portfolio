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

export default function Welcome() {
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
            <Head title="Portfolio - My Name">
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
                    <ProjectsSection />
                    <ContactSection />
                </main>
                <Footer />
                <Toaster />
            </div>
        </>
    );
}
