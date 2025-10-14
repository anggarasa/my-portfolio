import ErrorPage from '@/components/ErrorPage';

export default function ServerErrorPage() {
    return (
        <ErrorPage
            status={500}
            title="Internal Server Error"
            description="An internal server error has occurred. Our team has been notified and is working to fix it."
            showRetry={true}
        />
    );
}
