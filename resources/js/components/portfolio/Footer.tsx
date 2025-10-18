import { Button } from '@/components/ui/button';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    ArrowUp,
    Github,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    Phone,
    Sparkles,
} from 'lucide-react';
import { useEffect, useRef } from 'react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const socialRef = useRef<HTMLDivElement>(null);
    const scrollToTopRef = useRef<HTMLButtonElement>(null);

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

    const quickLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Services', href: '#services' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const scrollToSection = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    };

    useEffect(() => {
        if (!footerRef.current) return;

        const ctx = gsap.context(() => {
            // Set initial states
            gsap.set(
                [contentRef.current, socialRef.current, scrollToTopRef.current],
                {
                    opacity: 0,
                    y: 30,
                },
            );

            // Animate footer elements on scroll
            ScrollTrigger.create({
                trigger: footerRef.current,
                start: 'top 80%',
                end: 'bottom bottom',
                onEnter: () => {
                    gsap.to(contentRef.current, {
                        duration: 0.8,
                        opacity: 1,
                        y: 0,
                        ease: 'power3.out',
                    });

                    gsap.to(socialRef.current, {
                        duration: 0.6,
                        opacity: 1,
                        y: 0,
                        ease: 'power3.out',
                        delay: 0.2,
                    });

                    gsap.to(scrollToTopRef.current, {
                        duration: 0.6,
                        opacity: 1,
                        y: 0,
                        ease: 'power3.out',
                        delay: 0.4,
                    });
                },
            });

            // Scroll to top button animation
            ScrollTrigger.create({
                trigger: document.body,
                start: 'top -100px',
                end: 'bottom bottom',
                onUpdate: (self) => {
                    const progress = self.progress;
                    if (progress > 0.3) {
                        gsap.to(scrollToTopRef.current, {
                            duration: 0.3,
                            scale: 1,
                            opacity: 1,
                            ease: 'power2.out',
                        });
                    } else {
                        gsap.to(scrollToTopRef.current, {
                            duration: 0.3,
                            scale: 0.8,
                            opacity: 0,
                            ease: 'power2.out',
                        });
                    }
                },
            });

            // Social button hover animations
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

            // Scroll to top button hover animation
            const scrollButton = scrollToTopRef.current;
            if (scrollButton) {
                const scrollHoverTl = gsap.timeline({ paused: true });

                scrollHoverTl.to(scrollButton, {
                    duration: 0.3,
                    scale: 1.1,
                    rotation: 5,
                    ease: 'power2.out',
                    force3D: true,
                });

                scrollButton.addEventListener('mouseenter', () =>
                    scrollHoverTl.play(),
                );
                scrollButton.addEventListener('mouseleave', () =>
                    scrollHoverTl.reverse(),
                );
            }
        }, footerRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            {/* Scroll to Top Button */}
            <Button
                ref={scrollToTopRef}
                onClick={scrollToTop}
                className="fixed right-6 bottom-6 z-50 h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-xl"
                size="sm"
            >
                <ArrowUp className="h-4 w-4" />
            </Button>

            <footer
                ref={footerRef}
                className="relative bg-gradient-to-br from-muted via-muted to-muted/80 py-12 text-muted-foreground"
            >
                {/* Background decorative elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-primary/5 blur-2xl"></div>
                    <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-accent/5 blur-2xl"></div>
                </div>

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div ref={contentRef} className="space-y-8">
                        {/* Main Footer Content */}
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {/* Brand Section */}
                            <div className="space-y-4 lg:col-span-2">
                                <div className="flex items-center space-x-3">
                                    <div className="relative">
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 blur-sm"></div>
                                        <div className="relative h-12 w-12 rounded-full border-2 border-primary/20 bg-white shadow-lg">
                                            <img
                                                src="/assets/icons/ic_logo_favicon.png"
                                                alt="Anggara Saputra Logo"
                                                className="h-full w-full object-contain p-1"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-foreground">
                                            Anggara Saputra
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Web & Mobile Developer
                                        </p>
                                    </div>
                                </div>

                                <p className="max-w-md text-sm leading-relaxed">
                                    Passionate developer crafting exceptional
                                    digital experiences with modern
                                    technologies. Transforming ideas into
                                    scalable solutions that drive business
                                    growth.
                                </p>

                                {/* Contact Info */}
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2 text-sm">
                                        <Mail className="h-4 w-4 text-primary" />
                                        <a
                                            href="mailto:anggara.saputra@example.com"
                                            className="transition-colors hover:text-foreground"
                                        >
                                            anggara.saputra@example.com
                                        </a>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm">
                                        <Phone className="h-4 w-4 text-primary" />
                                        <a
                                            href="tel:+6281234567890"
                                            className="transition-colors hover:text-foreground"
                                        >
                                            +62 812 3456 7890
                                        </a>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm">
                                        <MapPin className="h-4 w-4 text-primary" />
                                        <span>Jakarta, Indonesia</span>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div className="space-y-4">
                                <h4 className="text-base font-semibold text-foreground">
                                    Quick Links
                                </h4>
                                <ul className="space-y-2">
                                    {quickLinks.map((link) => (
                                        <li key={link.name}>
                                            <button
                                                onClick={() =>
                                                    scrollToSection(link.href)
                                                }
                                                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                            >
                                                {link.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Services */}
                            <div className="space-y-4">
                                <h4 className="text-base font-semibold text-foreground">
                                    Services
                                </h4>
                                <ul className="space-y-2">
                                    <li className="text-sm text-muted-foreground">
                                        Web Development
                                    </li>
                                    <li className="text-sm text-muted-foreground">
                                        Mobile Apps
                                    </li>
                                    <li className="text-sm text-muted-foreground">
                                        Full Stack Solutions
                                    </li>
                                    <li className="text-sm text-muted-foreground">
                                        Technical Consulting
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-border/50"></div>

                        {/* Bottom Section */}
                        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
                            {/* Copyright */}
                            <div className="flex items-center space-x-2 text-sm">
                                <Sparkles className="h-4 w-4 text-primary" />
                                <span>
                                    © {new Date().getFullYear()} Anggara
                                    Saputra. All rights reserved.
                                </span>
                            </div>

                            {/* Social Links */}
                            <div
                                ref={socialRef}
                                className="flex items-center space-x-3"
                            >
                                <span className="text-sm font-medium text-muted-foreground">
                                    Follow me:
                                </span>
                                <div className="flex space-x-2">
                                    {socialLinks.map((social) => (
                                        <Button
                                            key={social.label}
                                            variant="outline"
                                            size="sm"
                                            className="h-9 w-9 rounded-full border-border bg-background/50 p-0 backdrop-blur-sm transition-all duration-300 hover:border-primary hover:bg-primary/10 hover:shadow-lg"
                                            asChild
                                        >
                                            <a
                                                href={social.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={social.label}
                                            >
                                                <social.icon className="h-4 w-4 text-muted-foreground transition-colors hover:text-primary" />
                                            </a>
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
