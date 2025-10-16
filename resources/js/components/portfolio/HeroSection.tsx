import { Button } from '@/components/ui/button';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    ArrowRight,
    Download,
    Github,
    Instagram,
    Linkedin,
    Sparkles,
} from 'lucide-react';
import { useEffect, useRef } from 'react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
    const heroRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const socialRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const floatingElementsRef = useRef<HTMLDivElement>(null);

    const socialLinks = [
        { icon: Github, href: 'https://github.com/anggarasa', label: 'GitHub' },
        {
            icon: Linkedin,
            href: 'https://www.linkedin.com/in/anggara-saputra-7baa95318',
            label: 'LinkedIn',
        },
        {
            icon: Instagram,
            href: 'https://www.instagram.com/angr_sa/#',
            label: 'Instagram',
        },
    ];

    useEffect(() => {
        if (!heroRef.current) return;

        const ctx = gsap.context(() => {
            // Set initial states
            gsap.set(
                [
                    titleRef.current,
                    subtitleRef.current,
                    socialRef.current,
                    ctaRef.current,
                ],
                {
                    opacity: 0,
                    y: 30,
                },
            );

            gsap.set(imageRef.current, {
                opacity: 0,
                scale: 0.8,
                rotation: 5,
            });

            gsap.set('.floating-element', {
                opacity: 0,
                scale: 0,
            });

            // Create main timeline
            const tl = gsap.timeline();

            // Animate content elements
            tl.to(titleRef.current, {
                duration: 1,
                opacity: 1,
                y: 0,
                ease: 'power3.out',
            })
                .to(
                    subtitleRef.current,
                    {
                        duration: 0.8,
                        opacity: 1,
                        y: 0,
                        ease: 'power3.out',
                    },
                    '-=0.6',
                )
                .to(
                    socialRef.current,
                    {
                        duration: 0.6,
                        opacity: 1,
                        y: 0,
                        ease: 'power3.out',
                    },
                    '-=0.4',
                )
                .to(
                    ctaRef.current,
                    {
                        duration: 0.6,
                        opacity: 1,
                        y: 0,
                        ease: 'power3.out',
                    },
                    '-=0.3',
                );

            // Animate image
            tl.to(
                imageRef.current,
                {
                    duration: 1.2,
                    opacity: 1,
                    scale: 1,
                    rotation: 0,
                    ease: 'power3.out',
                },
                '-=1',
            );

            // Animate floating elements
            tl.to(
                '.floating-element',
                {
                    duration: 0.8,
                    opacity: 1,
                    scale: 1,
                    ease: 'back.out(1.7)',
                    stagger: 0.1,
                },
                '-=0.8',
            );

            // Continuous floating animation for decorative elements - improved performance
            gsap.to('.floating-element', {
                duration: 4,
                y: '+=15',
                rotation: '+=5',
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                stagger: 0.8,
                force3D: true, // Enable hardware acceleration
            });

            // Improved parallax effect with better performance
            ScrollTrigger.create({
                trigger: heroRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.5, // Reduced scrub value for smoother animation
                onUpdate: (self) => {
                    const progress = self.progress;
                    // Use transform3d for better performance
                    gsap.set(imageRef.current, {
                        y: progress * 30,
                        force3D: true,
                    });
                    gsap.set('.floating-element', {
                        y: progress * 20,
                        force3D: true,
                    });
                },
            });

            // Hover animations for social buttons - improved performance
            socialRef.current?.querySelectorAll('a').forEach((button) => {
                const hoverTl = gsap.timeline({ paused: true });

                hoverTl.to(button, {
                    duration: 0.3,
                    scale: 1.1,
                    rotation: 5,
                    ease: 'power2.out',
                    force3D: true,
                });

                button.addEventListener('mouseenter', () => hoverTl.play());
                button.addEventListener('mouseleave', () => hoverTl.reverse());
            });

            // CTA button hover animation - improved performance
            const ctaButton = ctaRef.current?.querySelector('a');
            if (ctaButton) {
                const ctaHoverTl = gsap.timeline({ paused: true });

                ctaHoverTl.to(ctaButton, {
                    duration: 0.3,
                    scale: 1.05,
                    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                    ease: 'power2.out',
                    force3D: true,
                });

                ctaButton.addEventListener('mouseenter', () =>
                    ctaHoverTl.play(),
                );
                ctaButton.addEventListener('mouseleave', () =>
                    ctaHoverTl.reverse(),
                );
            }
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={heroRef}
            id="home"
            className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/30 pt-16"
        >
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/5 blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/5 blur-2xl"></div>
            </div>

            {/* Floating decorative elements */}
            <div
                ref={floatingElementsRef}
                className="pointer-events-none absolute inset-0"
            >
                <div className="floating-element absolute top-20 left-10 h-4 w-4 rounded-full bg-primary/20"></div>
                <div className="floating-element absolute top-40 right-20 h-6 w-6 rounded-full bg-accent/20"></div>
                <div className="floating-element absolute bottom-40 left-20 h-3 w-3 rounded-full bg-secondary/20"></div>
                <div className="floating-element absolute right-10 bottom-20 h-5 w-5 rounded-full bg-primary/20"></div>
                <div className="floating-element absolute top-1/3 right-1/3 h-2 w-2 rounded-full bg-accent/20"></div>
            </div>

            <div className="relative z-10 mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
                    {/* Left Content */}
                    <div ref={contentRef} className="space-y-6">
                        {/* Greeting */}
                        <div className="flex items-center space-x-2 text-xs font-medium text-primary">
                            <Sparkles className="h-3 w-3" />
                            <span>Hello, I'm Anggara Saputra</span>
                        </div>

                        {/* Main Title */}
                        <div className="space-y-3">
                            <h1
                                ref={titleRef}
                                className="text-2xl leading-tight font-bold text-foreground sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
                            >
                                <span className="block">Web & Mobile</span>
                                <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                    Developer
                                </span>
                            </h1>

                            <p
                                ref={subtitleRef}
                                className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg"
                            >
                                Passionate developer crafting exceptional
                                digital experiences with{' '}
                                <span className="font-semibold text-foreground">
                                    PHP
                                </span>
                                ,{' '}
                                <span className="font-semibold text-foreground">
                                    Laravel
                                </span>
                                ,{' '}
                                <span className="font-semibold text-foreground">
                                    React
                                </span>
                                , and{' '}
                                <span className="font-semibold text-foreground">
                                    Flutter
                                </span>
                                . I transform ideas into scalable solutions that
                                drive business growth.
                            </p>
                        </div>

                        {/* Social Media Links */}
                        <div
                            ref={socialRef}
                            className="flex items-center space-x-3"
                        >
                            <span className="text-xs font-medium text-muted-foreground">
                                Follow me:
                            </span>
                            <div className="flex space-x-2">
                                {socialLinks.map((social) => (
                                    <Button
                                        key={social.label}
                                        variant="outline"
                                        size="sm"
                                        className="group h-9 w-9 rounded-full border-border bg-background/50 p-0 backdrop-blur-sm transition-all duration-300 hover:border-primary hover:bg-primary/10 hover:shadow-lg"
                                        asChild
                                    >
                                        <a
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={social.label}
                                        >
                                            <social.icon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                                        </a>
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div
                            ref={ctaRef}
                            className="flex flex-col gap-3 sm:flex-row sm:items-center"
                        >
                            <Button
                                size="default"
                                className="group bg-primary text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-xl"
                                asChild
                            >
                                <a
                                    href="/assets/docs/CV-Anggara_Saputra.pdf"
                                    download
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Download className="mr-2 h-3 w-3" />
                                    Download CV
                                </a>
                            </Button>

                            <Button
                                variant="outline"
                                size="default"
                                className="group border-border bg-background/50 backdrop-blur-sm transition-all duration-300 hover:bg-accent hover:text-accent-foreground"
                                asChild
                            >
                                <a href="#about">
                                    View My Work
                                    <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
                                </a>
                            </Button>
                        </div>
                    </div>

                    {/* Right Content - Profile Image */}
                    <div className="relative flex justify-center lg:justify-end">
                        <div ref={imageRef} className="relative">
                            {/* Main Profile Image Container */}
                            <div className="relative h-56 w-56 sm:h-64 sm:w-64 md:h-72 md:w-72 lg:h-80 lg:w-80">
                                {/* Background gradient */}
                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 blur-xl"></div>

                                {/* Image container */}
                                <div className="relative h-full w-full overflow-hidden rounded-full border-3 border-background shadow-xl">
                                    <img
                                        src="/assets/images/img_portfolio_1.jpg"
                                        alt="Anggara Saputra - Web & Mobile Developer"
                                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                                    />

                                    {/* Overlay gradient */}
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-primary/10 to-transparent"></div>
                                </div>

                                {/* Floating decorative elements */}
                                <div className="floating-element absolute -top-4 -right-4 h-8 w-8 rounded-full bg-primary shadow-lg"></div>
                                <div className="floating-element absolute -bottom-4 -left-4 h-8 w-8 rounded-full bg-accent shadow-lg"></div>
                                <div className="floating-element absolute top-1/2 -right-8 h-6 w-6 rounded-full bg-secondary shadow-lg"></div>
                                <div className="floating-element absolute top-1/2 -left-8 h-6 w-6 rounded-full bg-primary shadow-lg"></div>

                                {/* Tech stack badges */}
                                <div className="floating-element absolute -top-3 left-3 rounded-full bg-background px-2 py-1 text-xs font-medium text-foreground shadow-lg">
                                    React
                                </div>
                                <div className="floating-element absolute right-3 -bottom-3 rounded-full bg-background px-2 py-1 text-xs font-medium text-foreground shadow-lg">
                                    Laravel
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
