import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target } from 'lucide-react';

interface ProjectChallengesProps {
    challenges: string[] | null;
    solutions: string[] | null;
}

export default function ProjectChallenges({
    challenges,
    solutions,
}: ProjectChallengesProps) {
    const safeChallenges = challenges ?? [];
    const safeSolutions = solutions ?? [];

    if (safeChallenges.length === 0 && safeSolutions.length === 0) {
        return null;
    }

    return (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Challenges */}
            {safeChallenges.length > 0 && (
                <Card className="border-border bg-card">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Target className="h-5 w-5 text-red-500" />
                            Challenges
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {safeChallenges.map((challenge, index) => (
                                <li
                                    key={index}
                                    className="flex items-start gap-3"
                                >
                                    <div className="mt-1 h-2 w-2 rounded-full bg-red-500" />
                                    <span className="text-muted-foreground">
                                        {challenge}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            )}

            {/* Solutions */}
            {safeSolutions.length > 0 && (
                <Card className="border-border bg-card">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Target className="h-5 w-5 text-green-500" />
                            Solutions
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {safeSolutions.map((solution, index) => (
                                <li
                                    key={index}
                                    className="flex items-start gap-3"
                                >
                                    <div className="mt-1 h-2 w-2 rounded-full bg-green-500" />
                                    <span className="text-muted-foreground">
                                        {solution}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
