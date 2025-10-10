import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

interface ProjectCTAProps {
    // No specific props needed for this component
}

export default function ProjectCTA({}: ProjectCTAProps) {
    return (
        <section className="animate-on-scroll bg-primary py-16">
            <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                <h2 className="mb-4 text-2xl font-bold text-primary-foreground">
                    Interested in Working Together?
                </h2>
                <p className="mb-8 text-primary-foreground/80">
                    Let's discuss how I can help bring your next project to
                    life.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                    <Button size="lg" variant="secondary" asChild>
                        <Link href="/#contact">Get In Touch</Link>
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="border-white/20 bg-white text-black hover:bg-white/90 hover:text-black"
                        asChild
                    >
                        <Link href="/">View More Projects</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
