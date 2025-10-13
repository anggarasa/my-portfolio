import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';

declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
        dataLayer?: any[];
    }
}

export function useAnalytics() {
    const { url, component } = usePage();

    // Track page views
    useEffect(() => {
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('config', 'GA_MEASUREMENT_ID', {
                page_path: url,
                page_title: document.title,
            });
        }
    }, [url]);

    const trackEvent = (
        eventName: string,
        parameters: Record<string, any> = {},
    ) => {
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', eventName, parameters);
        }
    };

    const trackProjectView = (projectTitle: string, projectId: string) => {
        trackEvent('project_view', {
            project_title: projectTitle,
            project_id: projectId,
            event_category: 'engagement',
        });
    };

    const trackContactFormSubmission = () => {
        trackEvent('contact_form_submit', {
            event_category: 'conversion',
        });
    };

    const trackDownload = (fileName: string, fileType: string) => {
        trackEvent('file_download', {
            file_name: fileName,
            file_type: fileType,
            event_category: 'engagement',
        });
    };

    const trackCustomEvent = (
        eventName: string,
        customParameters: Record<string, any> = {},
    ) => {
        trackEvent(eventName, {
            event_category: 'custom',
            event_label: eventName,
            ...customParameters,
        });
    };

    const trackScrollDepth = (depth: number) => {
        trackEvent('scroll_depth', {
            scroll_depth: depth,
            event_category: 'engagement',
        });
    };

    const trackTimeOnPage = (timeInSeconds: number) => {
        trackEvent('time_on_page', {
            time_on_page: timeInSeconds,
            event_category: 'engagement',
        });
    };

    const trackExternalLink = (url: string, linkText: string) => {
        trackEvent('external_link_click', {
            link_url: url,
            link_text: linkText,
            event_category: 'outbound',
        });
    };

    const trackSearch = (searchTerm: string, resultsCount: number = 0) => {
        trackEvent('search', {
            search_term: searchTerm,
            results_count: resultsCount,
            event_category: 'engagement',
        });
    };

    const trackVideoPlay = (videoTitle: string, videoDuration?: number) => {
        trackEvent('video_play', {
            video_title: videoTitle,
            video_duration: videoDuration,
            event_category: 'engagement',
        });
    };

    const trackVideoComplete = (videoTitle: string, videoDuration: number) => {
        trackEvent('video_complete', {
            video_title: videoTitle,
            video_duration: videoDuration,
            event_category: 'engagement',
        });
    };

    return {
        trackEvent,
        trackProjectView,
        trackContactFormSubmission,
        trackDownload,
        trackCustomEvent,
        trackScrollDepth,
        trackTimeOnPage,
        trackExternalLink,
        trackSearch,
        trackVideoPlay,
        trackVideoComplete,
    };
}

// Hook for tracking scroll depth
export function useScrollTracking() {
    const { trackScrollDepth } = useAnalytics();

    useEffect(() => {
        const trackedDepths = new Set<number>();
        const depths = [25, 50, 75, 90, 100];

        const handleScroll = () => {
            const scrollTop =
                window.pageYOffset || document.documentElement.scrollTop;
            const docHeight =
                document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = Math.round((scrollTop / docHeight) * 100);

            depths.forEach((depth) => {
                if (scrollPercent >= depth && !trackedDepths.has(depth)) {
                    trackedDepths.add(depth);
                    trackScrollDepth(depth);
                }
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [trackScrollDepth]);
}

// Hook for tracking time on page
export function useTimeTracking() {
    const { trackTimeOnPage } = useAnalytics();

    useEffect(() => {
        const startTime = Date.now();

        const handleBeforeUnload = () => {
            const timeSpent = Math.round((Date.now() - startTime) / 1000);
            if (timeSpent > 0) {
                trackTimeOnPage(timeSpent);
            }
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                const timeSpent = Math.round((Date.now() - startTime) / 1000);
                if (timeSpent > 0) {
                    trackTimeOnPage(timeSpent);
                }
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            document.removeEventListener(
                'visibilitychange',
                handleVisibilityChange,
            );
        };
    }, [trackTimeOnPage]);
}
