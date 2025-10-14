import ErrorPage from '@/components/ErrorPage';

export default function ServiceUnavailablePage() {
    return (
        <ErrorPage
            status={503}
            title="Service Unavailable"
            description="The server is currently under maintenance or experiencing overload. Please try again in a few moments."
            showRetry={true}
        />
    );
}
