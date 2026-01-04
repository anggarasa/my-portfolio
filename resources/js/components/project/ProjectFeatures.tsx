import { CheckCircle } from 'lucide-react';

interface ProjectFeaturesProps {
    features: string[] | null;
}

export default function ProjectFeatures({ features }: ProjectFeaturesProps) {
    const safeFeatures = features ?? [];

    if (safeFeatures.length === 0) {
        return null;
    }

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold">Key Features</h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {safeFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                        <span className="text-muted-foreground">{feature}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
