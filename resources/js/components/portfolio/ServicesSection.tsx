import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Code, Server, Smartphone } from 'lucide-react';

export default function ServicesSection() {
    const services = [
        {
            icon: Code,
            title: 'Web Development',
            description:
                'Custom web applications built with modern technologies like React, Laravel, and Node.js.',
        },
        {
            icon: Server,
            title: 'Backend Development',
            description:
                'Robust server-side applications and APIs built with Laravel, Node.js, and modern backend technologies.',
        },
        {
            icon: Smartphone,
            title: 'Mobile Development',
            description:
                'Responsive mobile applications that work seamlessly across all devices.',
        },
    ];

    return (
        <section
            id="services"
            className="animate-on-scroll bg-gray-50 py-20 dark:bg-gray-900"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-black md:text-4xl dark:text-white">
                        Services
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                        I offer reliable and scalable development services to
                        help businesses build, grow, and innovate in the digital
                        era.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {services.map((service, index) => (
                        <Card
                            key={index}
                            className="border-gray-200 bg-white transition-shadow duration-300 hover:shadow-lg dark:border-gray-800 dark:bg-black"
                        >
                            <CardHeader className="text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-black dark:bg-white">
                                    <service.icon className="h-8 w-8 text-white dark:text-black" />
                                </div>
                                <CardTitle className="text-xl font-semibold text-black dark:text-white">
                                    {service.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-center text-gray-600 dark:text-gray-300">
                                    {service.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
