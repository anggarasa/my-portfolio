import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User } from 'lucide-react';

interface ProjectMetaProps {
    project: {
        role: string;
        duration: string;
        year: string;
        technologies: string[];
    };
}

export default function ProjectMeta({ project }: ProjectMetaProps) {
    return (
        <div className="space-y-6">
            {/* Project Meta */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                        <User className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Role</p>
                        <p className="font-medium">{project.role}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                        <Clock className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Duration
                        </p>
                        <p className="font-medium">{project.duration}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                        <Calendar className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Year</p>
                        <p className="font-medium">{project.year}</p>
                    </div>
                </div>
            </div>

            {/* Technologies */}
            <div className="space-y-3">
                <h3 className="text-lg font-semibold">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                        <Badge
                            key={tech}
                            variant="outline"
                            className="px-3 py-1"
                        >
                            {tech}
                        </Badge>
                    ))}
                </div>
            </div>
        </div>
    );
}
