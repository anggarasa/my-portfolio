import Lanyard from '@/components/Lanyard';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    ArrowRight,
    Code,
    Rocket,
    Sparkles,
    Target,
    Users,
    Zap,
} from 'lucide-react';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const servicesRef = useRef<HTMLDivElement>(null);
    const lanyardRef = useRef<HTMLDivElement>(null);

    const services = [
        {
            title: 'Web Development',
            description:
                'Building responsive and modern web applications using React, Laravel, and other cutting-edge technologies.',
            icon: Code,
            delay: 0.1,
        },
        {
            title: 'Mobile Development',
            description:
                'Creating cross-platform mobile applications with Flutter and native development solutions.',
            icon: Rocket,
            delay: 0.2,
        },
        {
            title: 'Full Stack Solutions',
            description:
                'End-to-end development services from database design to user interface implementation.',
            icon: Target,
            delay: 0.3,
        },
        {
            title: 'Technical Consulting',
            description:
                'Providing expert advice on technology choices, architecture decisions, and development best practices.',
            icon: Users,
            delay: 0.4,
        },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Section entrance animation
            gsap.fromTo(
                sectionRef.current,
                {
                    opacity: 0,
                    y: 50,
                },
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
                    {
                        y: 30,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: 'power2.out',
                        stagger: 0.15,
                        scrollTrigger: {
                            trigger: headerRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    },
                );
            }

            // Services grid animation
            if (servicesRef.current) {
                const serviceCards =
                    servicesRef.current.querySelectorAll('.service-card');
                gsap.fromTo(
                    serviceCards,
                    {
                        y: 50,
                        opacity: 0,
                        scale: 0.8,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.6,
                        ease: 'back.out(1.7)',
                        stagger: 0.1,
                        scrollTrigger: {
                            trigger: servicesRef.current,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse',
                        },
                    },
                );

                // Enhanced hover animations for service cards
                serviceCards.forEach((card) => {
                    const icon = card.querySelector('.service-icon');
                    const content = card.querySelector('.service-content');

                    card.addEventListener('mouseenter', () => {
                        gsap.to(card, {
                            y: -8,
                            scale: 1.02,
                            duration: 0.3,
                            ease: 'power2.out',
                        });
                        gsap.to(icon, {
                            scale: 1.1,
                            rotation: 5,
                            duration: 0.3,
                            ease: 'power2.out',
                        });
                        gsap.to(content, {
                            y: -2,
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
                        gsap.to(icon, {
                            scale: 1,
                            rotation: 0,
                            duration: 0.3,
                            ease: 'power2.out',
                        });
                        gsap.to(content, {
                            y: 0,
                            duration: 0.3,
                            ease: 'power2.out',
                        });
                    });
                });
            }

            // Lanyard animation
            if (lanyardRef.current) {
                gsap.fromTo(
                    lanyardRef.current,
                    {
                        scale: 0.8,
                        opacity: 0,
                        rotation: -10,
                    },
                    {
                        scale: 1,
                        opacity: 1,
                        rotation: 0,
                        duration: 1.2,
                        ease: 'back.out(1.7)',
                        scrollTrigger: {
                            trigger: lanyardRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    },
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="services"
            className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 py-20 lg:py-32"
        >
            {/* Enhanced Background Pattern */}
            <div className="bg-grid-pattern absolute inset-0 opacity-5"></div>

            {/* Animated Background Elements */}
            <div className="absolute -top-20 -right-20 h-40 w-40 animate-pulse rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 blur-3xl"></div>
            <div
                className="absolute -bottom-20 -left-20 h-40 w-40 animate-pulse rounded-full bg-gradient-to-br from-accent/10 to-primary/10 blur-3xl"
                style={{ animationDelay: '1s' }}
            ></div>

            {/* Floating Sparkles */}
            <div className="absolute top-1/4 left-1/4">
                <Sparkles
                    className="h-6 w-6 animate-pulse text-primary/30"
                    style={{ animationDelay: '0.5s' }}
                />
            </div>
            <div className="absolute top-3/4 right-1/4">
                <Sparkles
                    className="h-4 w-4 animate-pulse text-accent/30"
                    style={{ animationDelay: '1.5s' }}
                />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div ref={headerRef} className="mb-12 text-center">
                    <div className="header-element mb-4">
                        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                            <Zap className="h-4 w-4" />
                            Services
                        </span>
                    </div>
                    <h2 className="header-element text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                        What I Can
                        <span className="animate-gradient block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                            Do For You
                        </span>
                    </h2>
                    <p className="header-element mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
                        Professional development services tailored to bring your
                        digital ideas to life with modern technologies and best
                        practices.
                    </p>
                </div>

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* Left Column - Services */}
                    <div className="flex flex-col justify-center">
                        <div
                            ref={servicesRef}
                            className="grid grid-cols-1 gap-6 sm:grid-cols-2"
                        >
                            {services.map((service, index) => {
                                const IconComponent = service.icon;
                                return (
                                    <div
                                        key={index}
                                        className="service-card group relative overflow-hidden rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-gradient-to-br hover:from-primary/10 hover:to-accent/10 hover:shadow-lg hover:shadow-primary/20"
                                    >
                                        {/* Content */}
                                        <div className="service-content relative z-10 space-y-4">
                                            {/* Icon */}
                                            <div className="service-icon flex h-12 w-12 items-center justify-center rounded-xl bg-muted/50 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/10">
                                                <IconComponent className="h-6 w-6 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                                                {service.title}
                                            </h3>

                                            {/* Description */}
                                            <p className="text-sm leading-relaxed text-muted-foreground transition-colors duration-300">
                                                {service.description}
                                            </p>

                                            {/* Hover Arrow */}
                                            <div className="flex items-center text-primary opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                                                <ArrowRight className="h-4 w-4" />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Column - Lanyard */}
                    <div className="flex items-center justify-center">
                        <div
                            ref={lanyardRef}
                            className="relative h-[500px] w-full max-w-md lg:h-[600px]"
                        >
                            {/* Decorative Elements */}
                            <div className="absolute -top-4 -right-4 h-8 w-8 animate-pulse rounded-full bg-gradient-to-r from-primary to-accent"></div>
                            <div
                                className="absolute -bottom-4 -left-4 h-6 w-6 animate-pulse rounded-full bg-gradient-to-r from-accent to-primary"
                                style={{ animationDelay: '1s' }}
                            ></div>

                            <Lanyard
                                position={[0, 0, 15]}
                                gravity={[0, -40, 0]}
                                fov={20}
                                transparent={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
