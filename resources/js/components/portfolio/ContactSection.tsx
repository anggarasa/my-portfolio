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
import { Github, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
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
        { icon: Mail, label: 'Email', value: 'contact@example.com' },
        { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
        { icon: MapPin, label: 'Location', value: 'New York, USA' },
    ];

    const socialLinks = [
        { icon: Github, href: '#', label: 'GitHub' },
        { icon: Linkedin, href: '#', label: 'LinkedIn' },
        { icon: Twitter, href: '#', label: 'Twitter' },
    ];

    return (
        <section
            id="contact"
            className="animate-on-scroll bg-gray-50 py-20 dark:bg-gray-900"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-black md:text-4xl dark:text-white">
                        Contact Me
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                    {/* Left Side - Contact Info & Social Media */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="mb-6 text-xl font-semibold text-black dark:text-white">
                                My Contact & Social Media
                            </h3>

                            {/* Contact Information */}
                            <div className="mb-8 space-y-4">
                                {contactInfo.map((info) => (
                                    <div
                                        key={info.label}
                                        className="flex items-center space-x-3"
                                    >
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black dark:bg-white">
                                            <info.icon className="h-5 w-5 text-white dark:text-black" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {info.label}
                                            </p>
                                            <p className="font-medium text-gray-900 dark:text-white">
                                                {info.value}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Social Media Links */}
                            <div>
                                <h4 className="mb-4 text-lg font-medium text-black dark:text-white">
                                    Follow Me
                                </h4>
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
                                                aria-label={social.label}
                                            >
                                                <social.icon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                                            </a>
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Contact Form */}
                    <div>
                        <Card className="border-gray-200 bg-white dark:border-gray-800 dark:bg-black">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-black dark:text-white">
                                    Send Message
                                </CardTitle>
                                <CardDescription className="text-gray-600 dark:text-gray-300">
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
                                            className="text-gray-700 dark:text-gray-300"
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
                                            className="border-gray-300 focus:border-black dark:border-gray-700 dark:focus:border-white"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="email"
                                            className="text-gray-700 dark:text-gray-300"
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
                                            className="border-gray-300 focus:border-black dark:border-gray-700 dark:focus:border-white"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="message"
                                            className="text-gray-700 dark:text-gray-300"
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
                                            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-transparent focus:ring-2 focus:ring-black focus:outline-none dark:border-gray-700 dark:bg-black dark:text-white dark:placeholder-gray-400 dark:focus:ring-white"
                                            required
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
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
