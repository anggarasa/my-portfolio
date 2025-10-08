import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

export default function AboutSection() {
    const techIconsRef = useRef<HTMLDivElement>(null);
    const techCardsRef = useRef<HTMLDivElement>(null);

    const technologies = [
        {
            name: 'PHP',
            icon: '/assets/icons/ic_php.svg',
            color: 'from-purple-500 to-purple-600',
        },
        {
            name: 'JavaScript',
            icon: '/assets/icons/ic_javascript.svg',
            color: 'from-yellow-500 to-yellow-600',
        },
        {
            name: 'Dart',
            icon: '/assets/icons/ic_dart.svg',
            color: 'from-cyan-500 to-cyan-600',
        },
        {
            name: 'ExpressJS',
            icon: '/assets/icons/ic_express.svg',
            color: 'from-gray-500 to-gray-600',
        },
        {
            name: 'NodeJS',
            icon: '/assets/icons/ic_node.svg',
            color: 'from-green-500 to-green-600',
        },
        {
            name: 'TailwindCSS',
            icon: '/assets/icons/ic_tailwindcss.svg',
            color: 'from-teal-500 to-teal-600',
        },
    ];

    useEffect(() => {
        if (techIconsRef.current) {
            const icons = techIconsRef.current.querySelectorAll('.tech-icon');

            // Stagger animation for tech icons
            gsap.fromTo(
                icons,
                {
                    scale: 0,
                    rotation: -180,
                    opacity: 0,
                },
                {
                    scale: 1,
                    rotation: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'back.out(1.7)',
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: techIconsRef.current,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none reverse',
                    },
                },
            );

            // Hover animations
            icons.forEach((icon) => {
                icon.addEventListener('mouseenter', () => {
                    gsap.to(icon, {
                        scale: 1.1,
                        rotation: 5,
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

        // Tech Cards Animation
        if (techCardsRef.current) {
            const cards = techCardsRef.current.querySelectorAll('.tech-card');

            // Initial animation for tech cards
            gsap.fromTo(
                cards,
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
                    ease: 'power2.out',
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: techCardsRef.current,
                        start: 'top 85%',
                        end: 'bottom 15%',
                        toggleActions: 'play none none reverse',
                    },
                },
            );

            // Enhanced hover animations for cards
            cards.forEach((card) => {
                card.addEventListener('mouseenter', () => {
                    gsap.to(card, {
                        y: -5,
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
    }, []);

    return (
        <section
            id="about"
            className="animate-on-scroll bg-white py-20 dark:bg-black"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                    {/* Left Content - Profile Image & Technologies */}
                    <div className="space-y-8">
                        {/* Profile Image */}
                        <div className="flex justify-center lg:justify-start">
                            <div className="relative" ref={techIconsRef}>
                                <div className="flex h-64 w-64 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
                                    <div className="flex h-full w-full items-center justify-center bg-gray-300 dark:bg-gray-600">
                                        {/* <span className="text-lg text-gray-500 dark:text-gray-400">
                                            Foto
                                        </span> */}
                                        <img
                                            src="/assets/images/img_portfolio_2.jpg"
                                            alt="Profile"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                </div>

                                {/* Technology Icons - Improved Layout with Animation */}
                                {/* React Icon - Top Right */}
                                <div className="tech-icon absolute -top-4 -right-4 flex h-14 w-14 cursor-pointer items-center justify-center rounded-xl shadow-lg">
                                    <img
                                        src="/assets/icons/ic_react.svg"
                                        alt="React"
                                        className="h-8 w-8"
                                    />
                                </div>

                                {/* Laravel Icon - Bottom Left */}
                                <div className="tech-icon absolute -bottom-4 -left-4 flex h-14 w-14 cursor-pointer items-center justify-center rounded-xl shadow-lg">
                                    <img
                                        src="/assets/icons/ic_laravel.svg"
                                        alt="Laravel"
                                        className="h-8 w-8"
                                    />
                                </div>

                                {/* TypeScript Icon - Top Left */}
                                <div className="tech-icon absolute -top-4 -left-4 flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl shadow-lg">
                                    <img
                                        src="/assets/icons/ic_typescript.svg"
                                        alt="TypeScript"
                                        className="h-7 w-7"
                                    />
                                </div>

                                {/* Flutter Icon - Bottom Right */}
                                <div className="tech-icon absolute -right-4 -bottom-4 flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl shadow-lg">
                                    <img
                                        src="/assets/icons/ic_flutter.svg"
                                        alt="Flutter"
                                        className="h-7 w-7"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Technology Labels - Improved Design */}
                        <div className="text-center lg:text-left">
                            <p className="mb-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                                Mastered Technology
                            </p>
                            <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
                                {technologies.map((tech) => (
                                    <span
                                        key={tech.name}
                                        className="rounded-full bg-gradient-to-r from-gray-100 to-gray-200 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-shadow duration-200 hover:shadow-md dark:from-gray-800 dark:to-gray-700 dark:text-gray-300"
                                    >
                                        {tech.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Content - About Text & Skills */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold text-black md:text-4xl dark:text-white">
                                About Me
                            </h2>
                            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                                I’m a dedicated Full Stack Developer with
                                expertise in modern web and mobile technologies.
                                I specialize in building efficient, scalable,
                                and user-friendly digital solutions using PHP,
                                Laravel, React, and Flutter. With hands-on
                                experience in real-world projects, I bring both
                                technical precision and creative problem-solving
                                to every product I build.
                            </p>
                        </div>

                        {/* Technologies Cards */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-black dark:text-white">
                                Technologies I Master
                            </h3>
                            <div
                                ref={techCardsRef}
                                className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
                            >
                                {technologies.map((tech, index) => (
                                    <div
                                        key={tech.name}
                                        className="tech-card group relative overflow-hidden rounded-xl bg-white p-4 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl dark:bg-gray-800"
                                        style={{
                                            animationDelay: `${index * 0.1}s`,
                                        }}
                                    >
                                        {/* Gradient Background */}
                                        <div
                                            className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
                                        ></div>

                                        {/* Content */}
                                        <div className="relative z-10 flex flex-col items-center space-y-2">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 transition-all duration-300 group-hover:scale-110 group-hover:bg-white dark:bg-gray-700 group-hover:dark:bg-gray-600">
                                                <img
                                                    src={tech.icon}
                                                    alt={tech.name}
                                                    className="h-6 w-6 transition-all duration-300 group-hover:scale-110"
                                                />
                                            </div>
                                            <span className="text-center text-sm font-medium text-gray-700 transition-colors duration-300 group-hover:text-gray-900 dark:text-gray-300 group-hover:dark:text-white">
                                                {tech.name}
                                            </span>
                                        </div>

                                        {/* Hover Effect Border */}
                                        <div
                                            className={`absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-br ${tech.color} opacity-0 transition-opacity duration-300 group-hover:opacity-20`}
                                            style={{
                                                backgroundClip: 'padding-box',
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
        </section>
    );
}
