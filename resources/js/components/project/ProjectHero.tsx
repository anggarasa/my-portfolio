import ProjectMeta from '@/components/project/ProjectMeta';
import { Badge } from '@/components/ui/badge';

interface ProjectHeroProps {
    project: {
        id: string;
        title: string;
        description: string;
        category: string;
        image: string;
        image_url?: string;
        role: string;
        duration: string;
        year: string;
        technologies: string[];
    };
}

export default function ProjectHero({ project }: ProjectHeroProps) {
    return (
        <section className="project-hero py-12">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Project Info */}
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <Badge variant="secondary" className="w-fit">
                                {project.category}
                            </Badge>
                            <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
                                {project.title}
                            </h1>
                            <p className="text-lg text-muted-foreground">
                                {project.description}
                            </p>
                        </div>

                        <ProjectMeta project={project} />
                    </div>

                    {/* Project Image */}
                    <div className="project-image">
                        <div className="relative overflow-hidden rounded-lg bg-muted">
                            <img
                                src={
                                    project.image_url ||
                                    `/storage/projects/${project.image}`
                                }
                                alt={project.title}
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
