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
            className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted/20"
        >
            <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                    {/* Left Content */}
                    <div className="hero-content space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-4xl leading-tight font-bold text-foreground md:text-6xl">
                                Web & Mobile Developer
                            </h1>
                            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
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
                                    className="h-12 w-12 rounded-full border-border p-0 hover:border-primary"
                                    asChild
                                >
                                    <a
                                        href={social.href}
                                        target="_blank"
                                        aria-label={social.label}
                                    >
                                        <social.icon className="h-5 w-5 text-muted-foreground" />
                                    </a>
                                </Button>
                            ))}
                        </div>

                        {/* Download CV Button */}
                        <div className="pt-4">
                            <Button
                                size="lg"
                                className="bg-primary text-primary-foreground hover:bg-primary/90"
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
                            <div className="flex h-80 w-80 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-muted to-muted/50">
                                <div className="flex h-full w-full items-center justify-center bg-muted/30">
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
                            <div className="absolute -top-4 -right-4 h-8 w-8 rounded-full bg-primary"></div>
                            <div className="absolute -bottom-4 -left-4 h-8 w-8 rounded-full bg-primary"></div>
                            <div className="absolute top-1/2 -right-8 h-6 w-6 rounded-full bg-muted-foreground/30"></div>
                            <div className="absolute top-1/2 -left-8 h-6 w-6 rounded-full bg-muted-foreground/30"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
