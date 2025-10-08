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
        <section id="services" className="animate-on-scroll bg-muted/30 py-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="mb-3 text-xl font-bold text-foreground sm:text-2xl md:text-3xl">
                        Services
                    </h2>
                    <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base">
                        I offer reliable and scalable development services to
                        help businesses build, grow, and innovate in the digital
                        era.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {services.map((service, index) => (
                        <Card
                            key={index}
                            className="border-border bg-card transition-shadow duration-300 hover:shadow-lg"
                        >
                            <CardHeader className="text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-primary">
                                    <service.icon className="h-8 w-8 text-primary-foreground" />
                                </div>
                                <CardTitle className="text-xl font-semibold text-card-foreground">
                                    {service.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-center text-muted-foreground">
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
