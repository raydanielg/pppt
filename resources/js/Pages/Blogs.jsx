import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Blogs() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-100">
                    Blogs
                </h2>
            }
        >
            <Head title="Blogs" />

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <div className="text-gray-900 dark:text-gray-100">
                    Blogs page (coming soon)
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
