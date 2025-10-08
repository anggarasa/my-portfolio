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
import { Github, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
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
        <section id="contact" className="animate-on-scroll bg-muted/30 py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                        Contact Me
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                    {/* Left Side - Contact Info & Social Media */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="mb-6 text-xl font-semibold text-foreground">
                                My Contact & Social Media
                            </h3>

                            {/* Contact Information */}
                            <div className="mb-8 space-y-4">
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
                                <h4 className="mb-4 text-lg font-medium text-foreground">
                                    Follow Me
                                </h4>
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
                                                rel="noopener noreferrer"
                                                aria-label={social.label}
                                            >
                                                <social.icon className="h-5 w-5 text-muted-foreground" />
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
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="border-border focus:border-primary"
                                            required
                                        />
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
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="border-border focus:border-primary"
                                            required
                                        />
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
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={4}
                                            className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:border-transparent focus:ring-2 focus:ring-primary focus:outline-none"
                                            required
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                                    >
                                        Send Message
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
