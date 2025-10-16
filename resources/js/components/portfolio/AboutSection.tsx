import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const techGridRef = useRef<HTMLDivElement>(null);
    const floatingIconsRef = useRef<HTMLDivElement>(null);

    const technologies = [
        {
            name: 'PHP',
            icon: '/assets/icons/ic_php.svg',
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-50 dark:bg-purple-950/20',
            borderColor: 'border-purple-200 dark:border-purple-800',
        },
        {
            name: 'JavaScript',
            icon: '/assets/icons/ic_javascript.svg',
            color: 'from-yellow-500 to-yellow-600',
            bgColor: 'bg-yellow-50 dark:bg-yellow-950/20',
            borderColor: 'border-yellow-200 dark:border-yellow-800',
        },
        {
            name: 'Dart',
            icon: '/assets/icons/ic_dart.svg',
            color: 'from-cyan-500 to-cyan-600',
            bgColor: 'bg-cyan-50 dark:bg-cyan-950/20',
            borderColor: 'border-cyan-200 dark:border-cyan-800',
        },
        {
            name: 'ExpressJS',
            icon: '/assets/icons/ic_express.svg',
            color: 'from-gray-500 to-gray-600',
            bgColor: 'bg-gray-100 dark:bg-gray-400/20',
            borderColor: 'border-gray-200 dark:border-gray-800',
        },
        {
            name: 'NodeJS',
            icon: '/assets/icons/ic_node.svg',
            color: 'from-green-500 to-green-600',
            bgColor: 'bg-green-50 dark:bg-green-950/20',
            borderColor: 'border-green-200 dark:border-green-800',
        },
        {
            name: 'TailwindCSS',
            icon: '/assets/icons/ic_tailwindcss.svg',
            color: 'from-teal-500 to-teal-600',
            bgColor: 'bg-teal-50 dark:bg-teal-950/20',
            borderColor: 'border-teal-200 dark:border-teal-800',
        },
    ];

    const floatingTechs = [
        {
            name: 'React',
            icon: '/assets/icons/ic_react.svg',
            position: 'top-right',
        },
        {
            name: 'Laravel',
            icon: '/assets/icons/ic_laravel.svg',
            position: 'bottom-left',
        },
        {
            name: 'TypeScript',
            icon: '/assets/icons/ic_typescript.svg',
            position: 'top-left',
        },
        {
            name: 'Flutter',
            icon: '/assets/icons/ic_flutter.svg',
            position: 'bottom-right',
        },
    ];

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

            // Profile image animation
            if (profileRef.current) {
                gsap.fromTo(
                    profileRef.current,
                    { scale: 0.8, opacity: 0, rotation: -10 },
                    {
                        scale: 1,
                        opacity: 1,
                        rotation: 0,
                        duration: 1.2,
                        ease: 'back.out(1.7)',
                        scrollTrigger: {
                            trigger: profileRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    },
                );
            }

            // Floating icons animation
            if (floatingIconsRef.current) {
                const floatingIcons =
                    floatingIconsRef.current.querySelectorAll('.floating-icon');

                gsap.fromTo(
                    floatingIcons,
                    { scale: 0, rotation: -180, opacity: 0 },
                    {
                        scale: 1,
                        rotation: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: 'back.out(1.7)',
                        stagger: 0.15,
                        scrollTrigger: {
                            trigger: floatingIconsRef.current,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse',
                        },
                    },
                );

                // Continuous floating animation
                floatingIcons.forEach((icon, index) => {
                    gsap.to(icon, {
                        y: 'random(-10, 10)',
                        rotation: 'random(-5, 5)',
                        duration: 'random(2, 4)',
                        ease: 'power1.inOut',
                        repeat: -1,
                        yoyo: true,
                        delay: index * 0.2,
                    });
                });

                // Enhanced hover effects
                floatingIcons.forEach((icon) => {
                    icon.addEventListener('mouseenter', () => {
                        gsap.to(icon, {
                            scale: 1.2,
                            rotation: 10,
                            duration: 0.3,
                            ease: 'power2.out',
                        });
                    });

                    icon.addEventListener('mouseleave', () => {
                        gsap.to(icon, {
                            scale: 1,
                            rotation: 0,
                            duration: 0.3,
                            ease: 'power2.out',
                        });
                    });
                });
            }

            // Content animation
            if (contentRef.current) {
                const contentElements =
                    contentRef.current.querySelectorAll('.content-element');

                gsap.fromTo(
                    contentElements,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: 'power2.out',
                        stagger: 0.1,
                        scrollTrigger: {
                            trigger: contentRef.current,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse',
                        },
                    },
                );
            }

            // Tech grid animation
            if (techGridRef.current) {
                const techCards =
                    techGridRef.current.querySelectorAll('.tech-card');

                gsap.fromTo(
                    techCards,
                    { y: 50, opacity: 0, scale: 0.8 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.6,
                        ease: 'back.out(1.7)',
                        stagger: 0.08,
                        scrollTrigger: {
                            trigger: techGridRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    },
                );

                // Enhanced hover animations
                techCards.forEach((card) => {
                    card.addEventListener('mouseenter', () => {
                        gsap.to(card, {
                            y: -8,
                            scale: 1.05,
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
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="about"
            className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 py-20 lg:py-32"
        >
            {/* Background Pattern */}
            <div className="bg-grid-pattern absolute inset-0 opacity-5"></div>

            {/* Floating Background Elements */}
            <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-gradient-to-br from-accent/10 to-primary/10 blur-3xl"></div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-16 text-center">
                    <div className="content-element mb-4">
                        <span className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                            About Me
                        </span>
                    </div>
                    <h2 className="content-element text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                        Crafting Digital
                        <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            Experiences
                        </span>
                    </h2>
                    <p className="content-element mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
                        I'm a passionate Full Stack Developer dedicated to
                        creating exceptional digital solutions. With expertise
                        in modern technologies and a keen eye for detail, I
                        transform ideas into powerful, scalable applications
                        that deliver outstanding user experiences.
                    </p>
                </div>

                {/* Main Content Layout */}
                <div className="space-y-16">
                    {/* Profile Section - Centered */}
                    <div className="flex justify-center">
                        <div className="relative" ref={profileRef}>
                            {/* Main Profile Image */}
                            <div className="relative h-72 w-72 overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 p-1 shadow-2xl lg:h-80 lg:w-80">
                                <div className="h-full w-full overflow-hidden rounded-3xl bg-card">
                                    <img
                                        src="/assets/images/img_portfolio_2.jpg"
                                        alt="Profile"
                                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                    />
                                </div>

                                {/* Decorative Elements */}
                                <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-gradient-to-r from-primary to-accent"></div>
                                <div className="absolute -bottom-2 -left-2 h-4 w-4 rounded-full bg-gradient-to-r from-accent to-primary"></div>
                            </div>

                            {/* Floating Technology Icons */}
                            <div
                                ref={floatingIconsRef}
                                className="absolute inset-0"
                            >
                                {floatingTechs.map((tech, index) => (
                                    <div
                                        key={tech.name}
                                        className={`floating-icon absolute flex h-16 w-16 cursor-pointer items-center justify-center rounded-2xl bg-card/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 ${
                                            tech.position === 'top-right'
                                                ? '-top-6 -right-6'
                                                : tech.position ===
                                                    'bottom-left'
                                                  ? '-bottom-6 -left-6'
                                                  : tech.position === 'top-left'
                                                    ? '-top-6 -left-6'
                                                    : '-right-6 -bottom-6'
                                        }`}
                                    >
                                        <img
                                            src={tech.icon}
                                            alt={tech.name}
                                            className="h-8 w-8 transition-transform duration-300"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div ref={contentRef} className="mx-auto max-w-4xl">
                        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
                            {/* Left Column - About Content */}
                            <div className="space-y-8">
                                <div className="content-element">
                                    <h3 className="text-2xl font-bold text-foreground lg:text-3xl">
                                        My Journey in Tech
                                    </h3>
                                </div>

                                <div className="content-element space-y-4 text-muted-foreground">
                                    <p className="leading-relaxed">
                                        I specialize in building robust web
                                        applications and mobile solutions. My
                                        expertise spans across the full
                                        development stack, from backend APIs to
                                        frontend interfaces and mobile
                                        applications.
                                    </p>

                                    <p className="leading-relaxed">
                                        I'm passionate about clean code, user
                                        experience, and staying up-to-date with
                                        the latest technologies. Every project
                                        is an opportunity to learn, innovate,
                                        and deliver solutions that make a real
                                        difference.
                                    </p>
                                </div>

                                {/* Skills Tags */}
                                <div className="content-element">
                                    <h4 className="mb-4 text-lg font-semibold text-foreground">
                                        Core Expertise
                                    </h4>
                                    <div className="flex flex-wrap gap-3">
                                        {[
                                            'Full Stack Development',
                                            'Mobile Development',
                                            'API Development',
                                            'Database Design',
                                            'DevOps',
                                        ].map((skill) => (
                                            <span
                                                key={skill}
                                                className="rounded-full bg-gradient-to-r from-primary/10 to-accent/10 px-4 py-2 text-sm font-medium text-foreground transition-all duration-300 hover:from-primary/20 hover:to-accent/20"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Technologies */}
                            <div className="content-element">
                                <h4 className="mb-6 text-lg font-semibold text-foreground">
                                    Technologies I Master
                                </h4>

                                <div
                                    ref={techGridRef}
                                    className="grid grid-cols-2 gap-4"
                                >
                                    {technologies.map((tech, index) => (
                                        <div
                                            key={tech.name}
                                            className={`tech-card group relative overflow-hidden rounded-2xl border ${tech.borderColor} bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/10`}
                                        >
                                            {/* Background Gradient */}
                                            <div
                                                className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
                                            ></div>

                                            {/* Content */}
                                            <div className="relative z-10 flex flex-col items-center space-y-3">
                                                <div
                                                    className={`flex h-14 w-14 items-center justify-center rounded-xl ${tech.bgColor} transition-all duration-300 group-hover:scale-110`}
                                                >
                                                    <img
                                                        src={tech.icon}
                                                        alt={tech.name}
                                                        className="h-7 w-7 transition-transform duration-300 group-hover:scale-110"
                                                    />
                                                </div>
                                                <span className="text-center text-sm font-semibold text-foreground transition-colors duration-300">
                                                    {tech.name}
                                                </span>
                                            </div>

                                            {/* Hover Border Effect */}
                                            <div
                                                className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-br ${tech.color} opacity-0 transition-opacity duration-300 group-hover:opacity-20`}
                                                style={{
                                                    backgroundClip:
                                                        'padding-box',
                                                    WebkitBackgroundClip:
                                                        'padding-box',
                                                }}
                                            ></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
