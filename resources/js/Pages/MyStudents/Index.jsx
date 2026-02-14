import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Users } from 'lucide-react';

export default function Index() {
    return (
        <AuthenticatedLayout>
            <Head title="My Students" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-xl sm:rounded-2xl dark:bg-gray-800 border border-emerald-100 dark:border-emerald-900">
                        <div className="p-8 text-center">
                            <div className="mx-auto w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mb-6">
                                <Users className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight">
                                My Students
                            </h2>
                            <div className="max-w-md mx-auto">
                                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                                    Dhibiti na ufuatilie maendeleo ya wanafunzi wako hapa.
                                </p>
                                <div className="mt-8 flex justify-center gap-2">
                                    <div className="h-1.5 w-12 bg-emerald-500 rounded-full animate-pulse"></div>
                                    <div className="h-1.5 w-4 bg-emerald-300 rounded-full animate-pulse delay-75"></div>
                                    <div className="h-1.5 w-4 bg-emerald-200 rounded-full animate-pulse delay-150"></div>
                                </div>
                                <p className="mt-6 text-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                                    Coming Soon
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
