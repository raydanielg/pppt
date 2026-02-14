import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function ComingSoon({ title }) {
    return (
        <AuthenticatedLayout>
            <Head title={title} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-center">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                                {title}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                Coming Soon... Tunatengeneza mambo mazuri hapa.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
