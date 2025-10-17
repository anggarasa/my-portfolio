import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAnalytics } from '@/hooks/use-analytics';
import { useToast } from '@/hooks/use-toast';
import contact from '@/routes/contact';
import { useForm } from '@inertiajs/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Github,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    Phone,
    Send,
    Sparkles,
} from 'lucide-react';
import { useEffect, useRef } from 'react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
    const { showSuccess, showError } = useToast();
    const { trackContactFormSubmission, trackExternalLink } = useAnalytics();

    // GSAP refs
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const contactInfoRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLDivElement>(null);
    const floatingElementsRef = useRef<HTMLDivElement>(null);

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        recentlySuccessful,
    } = useForm({
        name: '',
        email: '',
        message: '',
    });

    // GSAP Animations
    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Set initial states
            gsap.set(
                [headerRef.current, contactInfoRef.current, formRef.current],
                {
                    opacity: 0,
                    y: 50,
                },
            );

            gsap.set('.floating-contact-element', {
                opacity: 0,
                scale: 0,
                rotation: 45,
            });

            // Create main timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
            });

            // Animate elements
            tl.to(headerRef.current, {
                duration: 1,
                opacity: 1,
                y: 0,
                ease: 'power3.out',
            })
                .to(
                    contactInfoRef.current,
                    {
                        duration: 0.8,
                        opacity: 1,
                        y: 0,
                        ease: 'power3.out',
                    },
                    '-=0.6',
                )
                .to(
                    formRef.current,
                    {
                        duration: 0.8,
                        opacity: 1,
                        y: 0,
                        ease: 'power3.out',
                    },
                    '-=0.4',
                )
                .to(
                    '.floating-contact-element',
                    {
                        duration: 0.6,
                        opacity: 1,
                        scale: 1,
                        rotation: 0,
                        ease: 'back.out(1.7)',
                        stagger: 0.1,
                    },
                    '-=0.6',
                );

            // Continuous floating animation
            gsap.to('.floating-contact-element', {
                duration: 4,
                y: '+=20',
                rotation: '+=10',
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                stagger: 0.5,
                force3D: true,
            });

            // Form field animations on focus
            const formInputs =
                formRef.current?.querySelectorAll('input, textarea');
            formInputs?.forEach((input) => {
                input.addEventListener('focus', () => {
                    gsap.to(input, {
                        duration: 0.3,
                        scale: 1.02,
                        ease: 'power2.out',
                    });
                });

                input.addEventListener('blur', () => {
                    gsap.to(input, {
                        duration: 0.3,
                        scale: 1,
                        ease: 'power2.out',
                    });
                });
            });

            // Social button hover animations
            const socialButtons = contactInfoRef.current?.querySelectorAll('a');
            socialButtons?.forEach((button) => {
                button.addEventListener('mouseenter', () => {
                    gsap.to(button, {
                        duration: 0.3,
                        scale: 1.1,
                        rotation: 5,
                        ease: 'power2.out',
                    });
                });

                button.addEventListener('mouseleave', () => {
                    gsap.to(button, {
                        duration: 0.3,
                        scale: 1,
                        rotation: 0,
                        ease: 'power2.out',
                    });
                });
            });

            // Contact info cards hover animations
            const contactCards =
                contactInfoRef.current?.querySelectorAll('.contact-card');
            contactCards?.forEach((card) => {
                card.addEventListener('mouseenter', () => {
                    gsap.to(card, {
                        duration: 0.3,
                        y: -5,
                        scale: 1.02,
                        ease: 'power2.out',
                    });
                });

                card.addEventListener('mouseleave', () => {
                    gsap.to(card, {
                        duration: 0.3,
                        y: 0,
                        scale: 1,
                        ease: 'power2.out',
                    });
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Show toast messages based on form state
    useEffect(() => {
        if (recentlySuccessful) {
            showSuccess(
                'Your message has been sent successfully! I will respond as soon as possible.',
            );
            // Track successful form submission
            trackContactFormSubmission();
        }
    }, [recentlySuccessful, showSuccess, trackContactFormSubmission]);

    // Show error toast for validation errors
    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            // Check if there are field-specific validation errors
            const hasFieldErrors =
                errors.name || errors.email || errors.message;

            if (hasFieldErrors) {
                // Show specific validation error messages
                const errorMessages = [];
                if (errors.name) errorMessages.push(`Name: ${errors.name}`);
                if (errors.email) errorMessages.push(`Email: ${errors.email}`);
                if (errors.message)
                    errorMessages.push(`Message: ${errors.message}`);

                showError(
                    `Please fix the following errors:\n${errorMessages.join('\n')}`,
                );
            } else if ((errors as any).general) {
                // Show general error message from backend
                showError((errors as any).general);
            } else {
                // Show fallback error message
                showError(
                    'An error occurred while sending your message. Please try again or contact me directly via email.',
                );
            }
        }
    }, [errors, showError]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(contact.store.url(), {
            onSuccess: () => {
                reset();
            },
            onError: (errors) => {
                // Error handling is now done in useEffect above
                // This ensures consistent error display
                console.log('Form submission errors:', errors);
            },
        });
    };

    const contactInfo = [
        {
            icon: Mail,
            label: 'Email Address',
            value: 'anggarasaputra273@gmail.com',
            href: 'mailto:anggarasaputra273@gmail.com',
            gradient: 'from-blue-500 via-blue-600 to-cyan-500',
            bgGradient: 'from-blue-500/10 via-blue-600/10 to-cyan-500/10',
            iconBg: 'bg-gradient-to-br from-blue-500 to-cyan-500',
            iconColor: 'text-white',
            hoverShadow: 'hover:shadow-blue-500/25',
            description: 'Send me an email anytime',
        },
        {
            icon: Phone,
            label: 'Phone Number',
            value: '+62 812-2424-2608',
            href: 'https://wa.me/6281224242608',
            gradient: 'from-emerald-500 via-green-500 to-teal-500',
            bgGradient: 'from-emerald-500/10 via-green-500/10 to-teal-500/10',
            iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-500',
            iconColor: 'text-white',
            hoverShadow: 'hover:shadow-emerald-500/25',
            description: 'Chat with me on WhatsApp',
        },
        {
            icon: MapPin,
            label: 'Location',
            value: 'West Java, Indonesia',
            href: 'https://maps.app.goo.gl/52CFUWFE1WvK1GgB6',
            gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
            bgGradient:
                'from-violet-500/10 via-purple-500/10 to-fuchsia-500/10',
            iconBg: 'bg-gradient-to-br from-violet-500 to-fuchsia-500',
            iconColor: 'text-white',
            hoverShadow: 'hover:shadow-violet-500/25',
            description: 'Based in Indonesia',
        },
    ];

    const socialLinks = [
        {
            icon: Github,
            href: 'https://github.com/anggarasa',
            label: 'GitHub',
            color: 'hover:bg-gray-900 hover:text-white',
        },
        {
            icon: Linkedin,
            href: 'https://www.linkedin.com/in/anggara-saputra-7baa95318',
            label: 'LinkedIn',
            color: 'hover:bg-blue-600 hover:text-white',
        },
        {
            icon: Instagram,
            href: 'https://www.instagram.com/angr_sa/#',
            label: 'Instagram',
            color: 'hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white',
        },
    ];

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 py-20 lg:py-32"
        >
            {/* Background Pattern */}
            <div className="bg-grid-pattern absolute inset-0 opacity-5"></div>

            {/* Floating Background Elements */}
            <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-gradient-to-br from-accent/10 to-primary/10 blur-3xl"></div>

            {/* Floating decorative elements */}
            <div
                ref={floatingElementsRef}
                className="pointer-events-none absolute inset-0"
            >
                <div className="floating-contact-element absolute top-20 left-10 h-4 w-4 rounded-full bg-primary/20"></div>
                <div className="floating-contact-element absolute top-40 right-20 h-6 w-6 rounded-full bg-accent/20"></div>
                <div className="floating-contact-element absolute bottom-40 left-20 h-3 w-3 rounded-full bg-secondary/20"></div>
                <div className="floating-contact-element absolute right-10 bottom-20 h-5 w-5 rounded-full bg-primary/20"></div>
                <div className="floating-contact-element absolute top-1/3 right-1/3 h-2 w-2 rounded-full bg-accent/20"></div>
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div ref={headerRef} className="mb-16 text-center">
                    <div className="mb-4">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                            <Sparkles className="mr-2 h-3 w-3" />
                            Get In Touch
                        </span>
                    </div>
                    <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                        Let's Work
                        <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            Together
                        </span>
                    </h2>
                    <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
                        Ready to bring your ideas to life? I'm here to help you
                        create exceptional digital experiences. Let's discuss
                        your project and make something amazing together.
                    </p>
                </div>

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* Left Side - Contact Info & Social Media */}
                    <div ref={contactInfoRef} className="space-y-8">
                        {/* Contact Information Cards */}
                        <div>
                            <h3 className="mb-8 text-2xl font-bold text-foreground">
                                Contact Information
                            </h3>
                            <div className="space-y-6">
                                {contactInfo.map((info, index) => (
                                    <a
                                        key={info.label}
                                        href={info.href}
                                        target="_blank"
                                        className={`contact-card group relative block overflow-hidden rounded-3xl bg-gradient-to-br ${info.bgGradient} p-6 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl ${info.hoverShadow}`}
                                        style={{
                                            animationDelay: `${index * 0.1}s`,
                                        }}
                                    >
                                        {/* Background Pattern */}
                                        <div className="absolute inset-0 opacity-5">
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                                        </div>

                                        {/* Content */}
                                        <div className="relative z-10 flex items-center space-x-5">
                                            {/* Icon Container */}
                                            <div
                                                className={`flex items-center justify-center rounded-2xl ${info.iconBg} h-16 min-h-[4rem] w-16 min-w-[4rem] shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 sm:h-16 sm:w-16`}
                                            >
                                                <info.icon
                                                    className={`h-8 w-8 ${info.iconColor} transition-all duration-300`}
                                                />
                                            </div>

                                            {/* Text Content */}
                                            <div className="flex-1 space-y-1">
                                                <p className="text-sm font-semibold text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                                                    {info.label}
                                                </p>
                                                <p className="text-lg font-bold text-foreground transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:bg-clip-text group-hover:text-transparent">
                                                    {info.value}
                                                </p>
                                                <p className="text-xs text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">
                                                    {info.description}
                                                </p>
                                            </div>

                                            {/* Arrow Icon */}
                                            <div className="opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                                                    <svg
                                                        className="h-4 w-4 text-foreground"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M9 5l7 7-7 7"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Hover Effect Overlay */}
                                        <div
                                            className={`absolute inset-0 bg-gradient-to-br ${info.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-10`}
                                        ></div>

                                        {/* Border Effect */}
                                        <div
                                            className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${info.gradient} p-[1px] opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                                        >
                                            <div className="h-full w-full rounded-3xl bg-card/50 backdrop-blur-sm"></div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Social Media Links */}
                        <div>
                            <h4 className="mb-6 text-xl font-bold text-foreground">
                                Follow Me
                            </h4>
                            <div className="flex space-x-4">
                                {socialLinks.map((social) => (
                                    <Button
                                        key={social.label}
                                        variant="outline"
                                        size="lg"
                                        className={`group h-14 w-14 rounded-2xl border-border bg-background/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 ${social.color}`}
                                        asChild
                                    >
                                        <a
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={social.label}
                                            onClick={() =>
                                                trackExternalLink(
                                                    social.href,
                                                    social.label,
                                                )
                                            }
                                        >
                                            <social.icon className="h-6 w-6 text-muted-foreground transition-colors duration-300 group-hover:text-white" />
                                        </a>
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Contact Form */}
                    <div ref={formRef}>
                        <Card className="border-border bg-card/50 shadow-xl backdrop-blur-sm">
                            <CardHeader className="pb-6">
                                <CardTitle className="flex items-center text-2xl font-bold text-card-foreground">
                                    <Send className="mr-3 h-6 w-6 text-primary" />
                                    Send Message
                                </CardTitle>
                                <CardDescription className="text-base text-muted-foreground">
                                    Have a project in mind? Let's discuss how we
                                    can work together to bring your vision to
                                    life.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="name"
                                            className="text-sm font-semibold text-foreground"
                                        >
                                            Full Name
                                        </Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="Enter your full name (minimum 3 characters)"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData('name', e.target.value)
                                            }
                                            className={`h-12 rounded-xl border-border bg-background/50 backdrop-blur-sm transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                                                errors.name
                                                    ? 'border-red-500 bg-red-50/50 focus:border-red-500 focus:ring-red-500/20 dark:bg-red-950/20'
                                                    : ''
                                            }`}
                                            required
                                        />
                                        {errors.name && (
                                            <div className="flex items-center space-x-2 text-sm text-red-600">
                                                <svg
                                                    className="h-4 w-4 flex-shrink-0"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                <span>{errors.name}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="email"
                                            className="text-sm font-semibold text-foreground"
                                        >
                                            Email Address
                                        </Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="Enter your valid email address"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData('email', e.target.value)
                                            }
                                            className={`h-12 rounded-xl border-border bg-background/50 backdrop-blur-sm transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                                                errors.email
                                                    ? 'border-red-500 bg-red-50/50 focus:border-red-500 focus:ring-red-500/20 dark:bg-red-950/20'
                                                    : ''
                                            }`}
                                            required
                                        />
                                        {errors.email && (
                                            <div className="flex items-center space-x-2 text-sm text-red-600">
                                                <svg
                                                    className="h-4 w-4 flex-shrink-0"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                <span>{errors.email}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="message"
                                            className="text-sm font-semibold text-foreground"
                                        >
                                            Message
                                        </Label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            placeholder="Tell me about your project or idea... (minimum 10 characters)"
                                            value={data.message}
                                            onChange={(e) =>
                                                setData(
                                                    'message',
                                                    e.target.value,
                                                )
                                            }
                                            rows={5}
                                            className={`w-full rounded-xl border bg-background/50 px-4 py-3 text-foreground placeholder-muted-foreground backdrop-blur-sm transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none ${
                                                errors.message
                                                    ? 'border-red-500 bg-red-50/50 focus:border-red-500 focus:ring-red-500/20 dark:bg-red-950/20'
                                                    : 'border-border'
                                            }`}
                                            required
                                        />
                                        {errors.message && (
                                            <div className="flex items-center space-x-2 text-sm text-red-600">
                                                <svg
                                                    className="h-4 w-4 flex-shrink-0"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                <span>{errors.message}</span>
                                            </div>
                                        )}
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="group h-12 w-full rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50"
                                    >
                                        {processing ? (
                                            <div className="flex items-center">
                                                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                                Sending...
                                            </div>
                                        ) : (
                                            <div className="flex items-center">
                                                <Send className="mr-2 h-4 w-4" />
                                                Send Message
                                            </div>
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
