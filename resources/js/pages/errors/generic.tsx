import ErrorPage from '@/components/ErrorPage';

interface GenericErrorPageProps {
    status?: number;
    title?: string;
    description?: string;
}

export default function GenericErrorPage({
    status = 500,
    title = 'An Error Occurred',
    description = 'Sorry, an unexpected error has occurred. Please try again or contact the administrator if the problem persists.',
}: GenericErrorPageProps) {
    return (
        <ErrorPage
            status={status}
            title={title}
            description={description}
            showRetry={true}
        />
    );
}
