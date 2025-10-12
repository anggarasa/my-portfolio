import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ProjectGalleryProps {
    images: string[];
    projectTitle: string;
}

export default function ProjectGallery({
    images,
    projectTitle,
}: ProjectGalleryProps) {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    const openLightbox = (index: number) => {
        setSelectedImage(index);
    };

    const closeLightbox = () => {
        setSelectedImage(null);
    };

    const nextImage = () => {
        if (selectedImage !== null) {
            setSelectedImage((selectedImage + 1) % images.length);
        }
    };

    const prevImage = () => {
        if (selectedImage !== null) {
            setSelectedImage(
                selectedImage === 0 ? images.length - 1 : selectedImage - 1,
            );
        }
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (selectedImage === null) return;

            switch (event.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    prevImage();
                    break;
                case 'ArrowRight':
                    nextImage();
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [selectedImage]);

    return (
        <>
            <section className="animate-on-scroll py-16">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <h2 className="mb-8 text-center text-2xl font-bold">
                        Project Gallery
                    </h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className="group cursor-pointer overflow-hidden rounded-lg bg-muted transition-transform duration-300 hover:scale-105"
                                onClick={() => openLightbox(index)}
                            >
                                <img
                                    src={
                                        image.startsWith('http')
                                            ? image
                                            : `/storage/projects/${image}`
                                    }
                                    alt={`${projectTitle} - Screenshot ${index + 1}`}
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox Modal */}
            {selectedImage !== null && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
                    onClick={closeLightbox}
                >
                    <div
                        className="relative max-h-[90vh] max-w-[90vw]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-4 right-4 z-10 border border-white/20 bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 hover:text-white"
                            onClick={closeLightbox}
                        >
                            <X className="h-6 w-6" />
                        </Button>

                        {/* Navigation Buttons */}
                        {images.length > 1 && (
                            <>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="absolute top-1/2 left-4 z-10 -translate-y-1/2 border border-white/20 bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 hover:text-white"
                                    onClick={prevImage}
                                >
                                    <ChevronLeft className="h-6 w-6" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="absolute top-1/2 right-4 z-10 -translate-y-1/2 border border-white/20 bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 hover:text-white"
                                    onClick={nextImage}
                                >
                                    <ChevronRight className="h-6 w-6" />
                                </Button>
                            </>
                        )}

                        {/* Image */}
                        <img
                            src={
                                images[selectedImage].startsWith('http')
                                    ? images[selectedImage]
                                    : `/storage/projects/${images[selectedImage]}`
                            }
                            alt={`${projectTitle} - Screenshot ${selectedImage + 1}`}
                            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
                        />

                        {/* Image Counter */}
                        {images.length > 1 && (
                            <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/20 bg-black/70 px-4 py-2 text-sm text-white backdrop-blur-sm">
                                {selectedImage + 1} / {images.length}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
