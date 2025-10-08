import { Button } from '@/components/ui/button';
import { useAppearance } from '@/hooks/use-appearance';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { appearance, updateAppearance } = useAppearance();

    const toggleTheme = () => {
        updateAppearance(appearance === 'dark' ? 'light' : 'dark');
    };

    const navItems = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Services', href: '#services' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <header className="fixed top-0 right-0 left-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <h1 className="text-xl font-bold text-foreground">
                            Anggara Saputra
                        </h1>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden space-x-8 md:flex">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
                            >
                                {item.name}
                            </a>
                        ))}
                    </nav>

                    {/* Theme Toggle & Mobile Menu Button */}
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={toggleTheme}
                            className="text-muted-foreground hover:text-foreground"
                        >
                            {appearance === 'dark' ? (
                                <Sun className="h-5 w-5" />
                            ) : (
                                <Moon className="h-5 w-5" />
                            )}
                        </Button>

                        {/* Mobile menu button */}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-foreground md:hidden"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="space-y-1 border-t border-border bg-background px-2 pt-2 pb-3">
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="block px-3 py-2 text-muted-foreground transition-colors duration-200 hover:text-foreground"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
