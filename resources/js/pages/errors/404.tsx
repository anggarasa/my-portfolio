import ErrorPage from '@/components/ErrorPage';

export default function NotFoundPage() {
    return (
        <ErrorPage
            status={404}
            title="Page Not Found"
            description="Sorry, the page you are looking for cannot be found. The page may have been moved or deleted."
        />
    );
}
