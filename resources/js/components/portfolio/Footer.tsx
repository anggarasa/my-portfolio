export default function Footer() {
    return (
        <footer className="bg-muted py-8 text-muted-foreground">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <p className="text-sm">
                        © {new Date().getFullYear()} Anggara Saputra. All
                        rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
