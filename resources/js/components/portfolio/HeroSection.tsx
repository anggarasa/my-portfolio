import { Button } from '@/components/ui/button';
import { Github, Instagram, Linkedin } from 'lucide-react';

export default function HeroSection() {
    const socialLinks = [
        { icon: Github, href: 'https://github.com/anggarasa', label: 'GitHub' },
        {
            icon: Linkedin,
            href: 'www.linkedin.com/in/anggara-saputra-7baa95318',
            label: 'LinkedIn',
        },
        {
            icon: Instagram,
            href: 'https://www.instagram.com/angr_sa/#',
            label: 'Instagram',
        },
    ];

    return (
        <section
            id="home"
            className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white to-gray-50 dark:from-black dark:to-gray-900"
        >
            <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                    {/* Left Content */}
                    <div className="hero-content space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-4xl leading-tight font-bold text-black md:text-6xl dark:text-white">
                                Web & Mobile Developer
                            </h1>
                            <p className="text-lg leading-relaxed text-gray-600 md:text-xl dark:text-gray-300">
                                Web and Mobile Developer skilled in PHP,
                                Laravel, React, and Flutter. I build scalable
                                digital solutions that help businesses grow.
                            </p>
                        </div>

                        {/* Social Media Links */}
                        <div className="flex space-x-4">
                            {socialLinks.map((social) => (
                                <Button
                                    key={social.label}
                                    variant="outline"
                                    size="sm"
                                    className="h-12 w-12 rounded-full border-gray-300 p-0 hover:border-black dark:border-gray-700 dark:hover:border-white"
                                    asChild
                                >
                                    <a
                                        href={social.href}
                                        target="_blank"
                                        aria-label={social.label}
                                    >
                                        <social.icon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                                    </a>
                                </Button>
                            ))}
                        </div>

                        {/* Download CV Button */}
                        <div className="pt-4">
                            <Button
                                size="lg"
                                className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                                asChild
                            >
                                <a
                                    href="/assets/docs/CV-Anggara_Saputra.pdf"
                                    download
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Download CV
                                </a>
                            </Button>
                        </div>
                    </div>

                    {/* Right Content - Profile Image */}
                    <div className="hero-image relative flex justify-center lg:justify-end">
                        <div className="relative">
                            {/* Profile Image Container */}
                            <div className="flex h-80 w-80 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
                                <div className="flex h-full w-full items-center justify-center bg-gray-300 dark:bg-gray-600">
                                    {/* <span className="text-lg text-gray-500 dark:text-gray-400">
                                        Foto
                                    </span> */}
                                    <img
                                        src="/assets/images/img_portfolio_1.jpg"
                                        alt="Profile"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -top-4 -right-4 h-8 w-8 rounded-full bg-black dark:bg-white"></div>
                            <div className="absolute -bottom-4 -left-4 h-8 w-8 rounded-full bg-black dark:bg-white"></div>
                            <div className="absolute top-1/2 -right-8 h-6 w-6 rounded-full bg-gray-400 dark:bg-gray-600"></div>
                            <div className="absolute top-1/2 -left-8 h-6 w-6 rounded-full bg-gray-400 dark:bg-gray-600"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
