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

export default function ContactSection() {
    const { showSuccess, showError } = useToast();
    const { trackContactFormSubmission, trackExternalLink } = useAnalytics();

    // Simple refs for styling
    const sectionRef = useRef<HTMLElement>(null);

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

    // Simple CSS-based animations - no complex GSAP needed for static content

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
            description: 'Send me an email anytime',
        },
        {
            icon: Phone,
            label: 'Phone Number',
            value: '+62 812-2424-2608',
            href: 'https://wa.me/6281224242608',
            description: 'Chat with me on WhatsApp',
        },
        {
            icon: MapPin,
            label: 'Location',
            value: 'West Java, Indonesia',
            href: null,
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

            {/* Background Elements */}
            <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-gradient-to-br from-accent/10 to-primary/10 blur-3xl"></div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-16 text-center">
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
                    <div className="space-y-8">
                        {/* Contact Information */}
                        <div>
                            <h3 className="mb-6 text-xl font-semibold text-foreground">
                                Contact Information
                            </h3>
                            <div className="space-y-4">
                                {contactInfo.map((info) => {
                                    if (info.href) {
                                        return (
                                            <a
                                                key={info.label}
                                                href={info.href}
                                                target="_blank"
                                                className="flex items-center space-x-3 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted"
                                            >
                                                <info.icon className="h-5 w-5 text-primary" />
                                                <div>
                                                    <p className="font-medium text-foreground">
                                                        {info.value}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {info.description}
                                                    </p>
                                                </div>
                                            </a>
                                        );
                                    } else {
                                        return (
                                            <div
                                                key={info.label}
                                                className="flex items-center space-x-3 rounded-lg border border-border bg-card p-4"
                                            >
                                                <info.icon className="h-5 w-5 text-primary" />
                                                <div>
                                                    <p className="font-medium text-foreground">
                                                        {info.value}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {info.description}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                        </div>

                        {/* Social Media Links */}
                        <div>
                            <h4 className="mb-4 text-lg font-semibold text-foreground">
                                Follow Me
                            </h4>
                            <div className="flex space-x-3">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card transition-colors hover:bg-muted"
                                        onClick={() =>
                                            trackExternalLink(
                                                social.href,
                                                social.label,
                                            )
                                        }
                                    >
                                        <social.icon className="h-5 w-5 text-muted-foreground" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Contact Form */}
                    <div>
                        <Card className="border-border bg-card">
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
                                            className={`h-12 rounded-lg border-border bg-background transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 ${
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
                                            className={`h-12 rounded-lg border-border bg-background transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 ${
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
                                            className={`w-full rounded-lg border bg-background px-4 py-3 text-foreground placeholder-muted-foreground transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none ${
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
                                        className="h-12 w-full rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
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
