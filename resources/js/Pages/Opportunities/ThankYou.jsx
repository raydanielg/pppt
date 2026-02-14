import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { CheckCircle2 } from 'lucide-react';

export default function ThankYou({ vacancy }) {
    const { flash } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title="Thank You" />

            <div className="py-14 px-4 sm:px-6 lg:px-10 max-w-[1000px] mx-auto">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-xl overflow-hidden">
                    <div className="p-8 sm:p-12 text-center">
                        <div className="mx-auto w-20 h-20 rounded-[2.5rem] bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                            <CheckCircle2 className="w-10 h-10 text-emerald-700 dark:text-emerald-300" />
                        </div>

                        <h1 className="mt-6 text-3xl sm:text-4xl font-black text-gray-900 dark:text-white">
                            Thank you!
                        </h1>

                        <p className="mt-3 text-gray-600 dark:text-gray-300 text-base sm:text-lg font-semibold leading-relaxed">
                            {flash?.success ?? 'Your application has been received successfully.'}
                        </p>

                        <div className="mt-6 text-sm font-black text-gray-900 dark:text-white">
                            Position:
                        </div>
                        <div className="mt-1 text-sm sm:text-base font-black text-emerald-700 dark:text-emerald-300">
                            {vacancy.advertName}
                        </div>

                        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
                            <Link
                                href={route('opportunities')}
                                className="h-12 inline-flex items-center justify-center px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-black"
                            >
                                Back to Vacancies
                            </Link>
                            <Link
                                href={route('dashboard')}
                                className="h-12 inline-flex items-center justify-center px-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm font-black text-gray-900 dark:text-gray-100"
                            >
                                Go to Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
