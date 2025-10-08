import { Progress } from '@/components/ui/progress';

export default function AboutSection() {
    const skills = [
        { name: 'React', percentage: 90 },
        { name: 'Laravel', percentage: 85 },
        { name: 'TypeScript', percentage: 80 },
        { name: 'Node.js', percentage: 75 },
    ];

    const technologies = ['React', 'Laravel', 'TypeScript', 'Node.js'];

    return (
        <section
            id="about"
            className="animate-on-scroll bg-white py-20 dark:bg-black"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                    {/* Left Content - Profile Image & Technologies */}
                    <div className="space-y-8">
                        {/* Profile Image */}
                        <div className="flex justify-center lg:justify-start">
                            <div className="relative">
                                <div className="flex h-64 w-64 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
                                    <div className="flex h-full w-full items-center justify-center bg-gray-300 dark:bg-gray-600">
                                        {/* <span className="text-lg text-gray-500 dark:text-gray-400">
                                            Foto
                                        </span> */}
                                        <img
                                            src="/assets/images/img_portfolio_2.jpg"
                                            alt="Profile"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                </div>

                                {/* Technology Icons */}
                                <div className="absolute -top-2 -right-2 flex h-12 w-12 items-center justify-center rounded-lg bg-black dark:bg-white">
                                    <span className="text-xs font-bold text-white dark:text-black">
                                        R
                                    </span>
                                </div>
                                <div className="absolute -bottom-2 -left-2 flex h-12 w-12 items-center justify-center rounded-lg bg-black dark:bg-white">
                                    <span className="text-xs font-bold text-white dark:text-black">
                                        L
                                    </span>
                                </div>
                                <div className="absolute top-1/2 -right-6 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-400 dark:bg-gray-600">
                                    <span className="text-xs font-bold text-white">
                                        T
                                    </span>
                                </div>
                                <div className="absolute top-1/2 -left-6 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-400 dark:bg-gray-600">
                                    <span className="text-xs font-bold text-white">
                                        N
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Technology Labels */}
                        <div className="text-center lg:text-left">
                            <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                                Mastered Technology
                            </p>
                            <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
                                {technologies.map((tech) => (
                                    <span
                                        key={tech}
                                        className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Content - About Text & Skills */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold text-black md:text-4xl dark:text-white">
                                About Me
                            </h2>
                            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                                Description about me. I am a passionate
                                developer with expertise in modern web
                                technologies. I love creating innovative
                                solutions and helping businesses achieve their
                                digital goals. With years of experience in
                                full-stack development, I bring both technical
                                skills and creative vision to every project.
                            </p>
                        </div>

                        {/* Skills Progress */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-black dark:text-white">
                                My Skills
                            </h3>
                            <div className="space-y-4">
                                {skills.map((skill) => (
                                    <div key={skill.name} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-gray-700 dark:text-gray-300">
                                                {skill.name}
                                            </span>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                {skill.percentage}%
                                            </span>
                                        </div>
                                        <Progress
                                            value={skill.percentage}
                                            className="h-2 bg-gray-200 dark:bg-gray-800"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
