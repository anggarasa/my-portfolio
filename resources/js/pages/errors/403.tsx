import ErrorPage from '@/components/ErrorPage';

export default function ForbiddenPage() {
    return (
        <ErrorPage
            status={403}
            title="Access Denied"
            description="You do not have permission to access this page. Please log in with an account that has the appropriate access."
        />
    );
}
