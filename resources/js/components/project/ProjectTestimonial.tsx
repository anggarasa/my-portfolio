import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

interface ProjectTestimonialProps {
    testimonial: {
        text: string;
        author: string;
        position: string;
    };
}

export default function ProjectTestimonial({
    testimonial,
}: ProjectTestimonialProps) {
    return (
        <section className="animate-on-scroll py-16">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <Card className="border-border bg-card text-center">
                    <CardContent className="py-12">
                        <div className="mb-6 flex justify-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                                <Quote className="h-6 w-6 text-primary-foreground" />
                            </div>
                        </div>
                        <blockquote className="mb-6 text-lg text-muted-foreground italic">
                            "{testimonial.text}"
                        </blockquote>
                        <div className="space-y-1">
                            <p className="font-semibold">
                                {testimonial.author}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {testimonial.position}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
