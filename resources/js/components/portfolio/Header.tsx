import { Button } from '@/components/ui/button';
import { useAppearance } from '@/hooks/use-appearance';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Briefcase,
    Mail,
    Menu,
    Moon,
    Palette,
    Sparkles,
    Sun,
    User,
    X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const { appearance, updateAppearance } = useAppearance();

    // Refs for GSAP animations
    const headerRef = useRef<HTMLElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLElement>(null);
    const themeButtonRef = useRef<HTMLButtonElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const mobileMenuItemsRef = useRef<HTMLDivElement>(null);

    const toggleTheme = () => {
        updateAppearance(appearance === 'dark' ? 'light' : 'dark');

        // Animate theme toggle
        gsap.to(themeButtonRef.current, {
            duration: 0.3,
            scale: 0.9,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut',
        });
    };

    const navItems = [
        {
            name: 'Home',
            href: '#home',
            icon: Sparkles,
        },
        {
            name: 'About',
            href: '#about',
            icon: User,
        },
        {
            name: 'Services',
            href: '#services',
            icon: Palette,
        },
        {
            name: 'Projects',
            href: '#projects',
            icon: Briefcase,
        },
        {
            name: 'Contact',
            href: '#contact',
            icon: Mail,
        },
    ];

    // Handle scroll effects
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsScrolled(scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // GSAP animations
    useEffect(() => {
        if (!headerRef.current) return;

        const ctx = gsap.context(() => {
            // Initial header animation
            gsap.fromTo(
                headerRef.current,
                {
                    y: -100,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                },
            );

            // Logo animation
            gsap.fromTo(
                logoRef.current,
                {
                    scale: 0.8,
                    opacity: 0,
                },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.6,
                    delay: 0.2,
                    ease: 'back.out(1.7)',
                },
            );

            // Navigation items animation
            const navButtons = navRef.current?.querySelectorAll('button');
            if (navButtons) {
                gsap.fromTo(
                    navButtons,
                    {
                        y: -20,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.5,
                        delay: 0.4,
                        stagger: 0.1,
                        ease: 'power3.out',
                    },
                );
            }

            // Theme button animation
            gsap.fromTo(
                themeButtonRef.current,
                {
                    scale: 0,
                    rotation: 180,
                },
                {
                    scale: 1,
                    rotation: 0,
                    duration: 0.6,
                    delay: 0.6,
                    ease: 'back.out(1.7)',
                },
            );

            // Scroll-triggered animations
            ScrollTrigger.create({
                trigger: document.body,
                start: 'top -100px',
                end: 'bottom bottom',
                onUpdate: (self) => {
                    const progress = self.progress;
                    if (progress > 0.1) {
                        gsap.to(headerRef.current, {
                            duration: 0.3,
                            backgroundColor: 'rgba(var(--background), 0.95)',
                            backdropFilter: 'blur(20px)',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                            ease: 'power2.out',
                        });
                    } else {
                        gsap.to(headerRef.current, {
                            duration: 0.3,
                            backgroundColor: 'rgba(var(--background), 0.8)',
                            backdropFilter: 'blur(12px)',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                            ease: 'power2.out',
                        });
                    }
                },
            });
        }, headerRef);

        return () => ctx.revert();
    }, []);

    // Mobile menu animations
    useEffect(() => {
        if (!mobileMenuRef.current || !mobileMenuItemsRef.current) return;

        if (isMenuOpen) {
            // Open animation
            gsap.set(mobileMenuRef.current, { display: 'block' });
            gsap.fromTo(
                mobileMenuRef.current,
                {
                    height: 0,
                    opacity: 0,
                },
                {
                    height: 'auto',
                    opacity: 1,
                    duration: 0.4,
                    ease: 'power3.out',
                },
            );

            const mobileButtons =
                mobileMenuItemsRef.current?.querySelectorAll('button');
            if (mobileButtons) {
                gsap.fromTo(
                    mobileButtons,
                    {
                        x: -20,
                        opacity: 0,
                    },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.3,
                        delay: 0.1,
                        stagger: 0.1,
                        ease: 'power3.out',
                    },
                );
            }
        } else {
            // Close animation
            const mobileButtons =
                mobileMenuItemsRef.current?.querySelectorAll('button');
            if (mobileButtons) {
                gsap.to(mobileButtons, {
                    x: -20,
                    opacity: 0,
                    duration: 0.2,
                    stagger: 0.05,
                    ease: 'power3.in',
                });
            }

            gsap.to(mobileMenuRef.current, {
                height: 0,
                opacity: 0,
                duration: 0.3,
                delay: 0.1,
                ease: 'power3.in',
                onComplete: () => {
                    gsap.set(mobileMenuRef.current, { display: 'none' });
                },
            });
        }
    }, [isMenuOpen]);

    // Smooth scroll to section
    const scrollToSection = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
        setIsMenuOpen(false);
    };

    return (
        <header
            ref={headerRef}
            className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? 'border-b border-border/50 bg-background/95 shadow-lg backdrop-blur-xl'
                    : 'border-b border-border/30 bg-background/80 backdrop-blur-md'
            }`}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div ref={logoRef} className="flex-shrink-0">
                        <button
                            onClick={() => scrollToSection('#home')}
                            className="group flex items-center space-x-2 transition-all duration-300 hover:scale-105"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 blur-sm transition-all duration-300 group-hover:blur-md"></div>
                                <div className="relative h-10 w-10 rounded-full border-2 border-primary/20 bg-white shadow-lg transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-xl">
                                    <img
                                        src="/assets/icons/ic_logo_favicon.png"
                                        alt="Anggara Saputra Logo"
                                        className="h-full w-full object-contain p-1"
                                    />
                                </div>
                            </div>
                            <h1 className="text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                                Anggara Saputra
                            </h1>
                        </button>
                    </div>

                    {/* Desktop Navigation */}
                    <nav ref={navRef} className="hidden space-x-1 md:flex">
                        {navItems.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => scrollToSection(item.href)}
                                className="group relative rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:bg-accent/50 hover:text-foreground"
                            >
                                <span className="flex items-center space-x-2">
                                    <item.icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                                    <span>{item.name}</span>
                                </span>
                            </button>
                        ))}
                    </nav>

                    {/* Theme Toggle & Mobile Menu Button */}
                    <div className="flex items-center space-x-2">
                        {/* Theme Toggle */}
                        <Button
                            ref={themeButtonRef}
                            variant="ghost"
                            size="sm"
                            onClick={toggleTheme}
                            className="group relative h-10 w-10 rounded-full border border-border/50 bg-background/50 text-muted-foreground backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:text-foreground hover:shadow-lg"
                        >
                            <div className="relative">
                                {appearance === 'dark' ? (
                                    <Sun className="h-4 w-4 transition-transform duration-500 group-hover:rotate-180" />
                                ) : (
                                    <Moon className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-12" />
                                )}
                            </div>

                            {/* Theme indicator */}
                            <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-gradient-to-r from-primary to-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                        </Button>

                        {/* Mobile menu button */}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="group relative h-10 w-10 rounded-full border border-border/50 bg-background/50 text-muted-foreground backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:text-foreground hover:shadow-lg md:hidden"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <div className="relative">
                                {isMenuOpen ? (
                                    <X className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
                                ) : (
                                    <Menu className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                                )}
                            </div>
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div
                    ref={mobileMenuRef}
                    className="overflow-hidden md:hidden"
                    style={{ display: 'none' }}
                >
                    <div
                        ref={mobileMenuItemsRef}
                        className="space-y-1 border-t border-border/50 bg-background/95 px-2 pt-4 pb-4 backdrop-blur-xl"
                    >
                        {navItems.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => scrollToSection(item.href)}
                                className="group flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-left text-muted-foreground transition-all duration-300 hover:bg-accent/50 hover:text-foreground"
                            >
                                <item.icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                                <span className="flex-1 font-medium">
                                    {item.name}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    );
}
