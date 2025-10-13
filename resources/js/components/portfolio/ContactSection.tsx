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
import { Github, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { useEffect } from 'react';

export default function ContactSection() {
    const { showSuccess, showError } = useToast();
    const { trackContactFormSubmission, trackExternalLink } = useAnalytics();

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

    // Show error toast if there are general errors (not field-specific)
    useEffect(() => {
        const hasGeneralError =
            Object.keys(errors).length > 0 &&
            !errors.name &&
            !errors.email &&
            !errors.message;

        if (hasGeneralError) {
            showError(
                'An error occurred while sending your message. Please try again.',
            );
        }
    }, [errors, showError]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(contact.store.url(), {
            onSuccess: () => {
                reset();
            },
            onError: (errors) => {
                // Handle specific field errors if needed
                if (errors.name || errors.email || errors.message) {
                    showError('Please check the form fields and try again.');
                }
            },
        });
    };

    const contactInfo = [
        { icon: Mail, label: 'Email', value: 'anggarasaputra273@gmail.com' },
        { icon: Phone, label: 'Phone', value: '+62 812-2424-2608' },
        { icon: MapPin, label: 'Location', value: 'West Java, Indonesia' },
    ];

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

    return (
        <section id="contact" className="animate-on-scroll bg-muted/30 py-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="mb-3 text-xl font-bold text-foreground sm:text-2xl md:text-3xl">
                        Contact Me
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Left Side - Contact Info & Social Media */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="mb-4 text-lg font-semibold text-foreground">
                                My Contact & Social Media
                            </h3>

                            {/* Contact Information */}
                            <div className="mb-6 space-y-3">
                                {contactInfo.map((info) => (
                                    <div
                                        key={info.label}
                                        className="flex items-center space-x-3"
                                    >
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                                            <info.icon className="h-5 w-5 text-primary-foreground" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                {info.label}
                                            </p>
                                            <p className="font-medium text-foreground">
                                                {info.value}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Social Media Links */}
                            <div>
                                <h4 className="mb-3 text-base font-medium text-foreground">
                                    Follow Me
                                </h4>
                                <div className="flex space-x-3">
                                    {socialLinks.map((social) => (
                                        <Button
                                            key={social.label}
                                            variant="outline"
                                            size="sm"
                                            className="h-10 w-10 rounded-full border-border p-0 hover:border-primary"
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
                                                <social.icon className="h-4 w-4 text-muted-foreground" />
                                            </a>
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Contact Form */}
                    <div>
                        <Card className="border-border bg-card">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-card-foreground">
                                    Send Message
                                </CardTitle>
                                <CardDescription className="text-muted-foreground">
                                    Get in touch with me for any project or
                                    collaboration.
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
                                            className="text-muted-foreground"
                                        >
                                            Name
                                        </Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="Your name"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData('name', e.target.value)
                                            }
                                            className={`border-border focus:border-primary ${
                                                errors.name
                                                    ? 'border-red-500'
                                                    : ''
                                            }`}
                                            required
                                        />
                                        {errors.name && (
                                            <p className="text-sm text-red-600">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="email"
                                            className="text-muted-foreground"
                                        >
                                            Email
                                        </Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="Your email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData('email', e.target.value)
                                            }
                                            className={`border-border focus:border-primary ${
                                                errors.email
                                                    ? 'border-red-500'
                                                    : ''
                                            }`}
                                            required
                                        />
                                        {errors.email && (
                                            <p className="text-sm text-red-600">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="message"
                                            className="text-muted-foreground"
                                        >
                                            Message
                                        </Label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            placeholder="Your message"
                                            value={data.message}
                                            onChange={(e) =>
                                                setData(
                                                    'message',
                                                    e.target.value,
                                                )
                                            }
                                            rows={4}
                                            className={`w-full rounded-md border bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:border-transparent focus:ring-2 focus:ring-primary focus:outline-none ${
                                                errors.message
                                                    ? 'border-red-500'
                                                    : 'border-border'
                                            }`}
                                            required
                                        />
                                        {errors.message && (
                                            <p className="text-sm text-red-600">
                                                {errors.message}
                                            </p>
                                        )}
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                                    >
                                        {processing
                                            ? 'Sending...'
                                            : 'Send Message'}
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
