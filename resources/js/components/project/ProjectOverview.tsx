interface ProjectOverviewProps {
    longDescription: string;
}

export default function ProjectOverview({
    longDescription,
}: ProjectOverviewProps) {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Project Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="leading-relaxed text-muted-foreground">
                    {longDescription}
                </p>
            </div>
        </div>
    );
}
