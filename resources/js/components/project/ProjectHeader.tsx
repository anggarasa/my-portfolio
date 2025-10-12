import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';

interface ProjectHeaderProps {
    project: {
        id: string;
        title: string;
        description: string;
        category: string;
        github_url: string;
        live_url: string;
    };
}

export default function ProjectHeader({ project }: ProjectHeaderProps) {
    return (
        <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
            <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <Link href="/">
                        <Button variant="ghost" size="sm" className="gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Portfolio
                        </Button>
                    </Link>
                    <div className="flex gap-3">
                        {project.github_url && (
                            <Button variant="outline" size="sm" asChild>
                                <a
                                    href={project.github_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Github className="mr-2 h-4 w-4" />
                                    Code
                                </a>
                            </Button>
                        )}
                        {project.live_url && (
                            <Button size="sm" asChild>
                                <a
                                    href={project.live_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    Live Demo
                                </a>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
