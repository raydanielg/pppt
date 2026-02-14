import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Briefcase, Building2, Calendar, ClipboardList, GraduationCap, Wallet } from 'lucide-react';

export default function Show({ vacancy }) {
    const { flash } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title="Post Details" />

            <div className="py-10 px-4 sm:px-6 lg:px-10 max-w-[1600px] mx-auto">
                {flash?.success ? (
                    <div className="mb-6 rounded-2xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-900/20 px-6 py-4 text-sm font-black text-emerald-900 dark:text-emerald-200">
                        {flash.success}
                    </div>
                ) : null}

                <div className="flex items-center justify-between gap-4 mb-6">
                    <div>
                        <div className="text-xs font-black tracking-widest uppercase text-emerald-600 dark:text-emerald-400">
                            Post Details
                        </div>
                        <h1 className="mt-2 text-2xl sm:text-3xl font-black text-gray-900 dark:text-white leading-tight">
                            {vacancy.advertName}
                        </h1>
                        {vacancy.isClosed ? (
                            <div className="mt-3">
                                <span className="inline-flex items-center px-4 py-2 rounded-2xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200 text-xs font-black tracking-widest uppercase">
                                    Closed
                                </span>
                            </div>
                        ) : null}
                    </div>

                    <Link
                        href={route('opportunities')}
                        className="h-10 inline-flex items-center px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm font-black text-gray-800 dark:text-gray-100"
                    >
                        Back
                    </Link>
                </div>

                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-xl overflow-hidden">
                    <div className="px-6 sm:px-8 py-6 border-b border-gray-100 dark:border-gray-700">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                    <Building2 className="w-5 h-5 text-emerald-700 dark:text-emerald-300" />
                                </div>
                                <div>
                                    <div className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">
                                        Employer
                                    </div>
                                    <div className="text-sm font-black text-gray-900 dark:text-white">
                                        {vacancy.employerName}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                    <Briefcase className="w-5 h-5 text-emerald-700 dark:text-emerald-300" />
                                </div>
                                <div>
                                    <div className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">
                                        Positions
                                    </div>
                                    <div className="text-sm font-black text-gray-900 dark:text-white">
                                        {vacancy.posts} Positions
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                    <Calendar className="w-5 h-5 text-emerald-700 dark:text-emerald-300" />
                                </div>
                                <div>
                                    <div className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">
                                        Close Date
                                    </div>
                                    <div className="text-sm font-black text-gray-900 dark:text-white">
                                        {vacancy.closeDate}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 sm:p-8 space-y-6">
                        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/30 p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-9 h-9 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                                    <Calendar className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                                </div>
                                <div className="text-sm font-black text-gray-900 dark:text-white">Application Period</div>
                            </div>
                            <div className="text-sm font-black text-gray-900 dark:text-white">
                                {vacancy.openDate} - {vacancy.closeDate}
                            </div>
                        </div>

                        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/30 p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-9 h-9 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                                    <ClipboardList className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                                </div>
                                <div className="text-sm font-black text-gray-900 dark:text-white">Duties and Responsibilities</div>
                            </div>
                            <ul className="space-y-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                                {(vacancy.duties ?? []).map((duty, idx) => (
                                    <li key={idx} className="leading-relaxed">
                                        {duty}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/30 p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-9 h-9 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                                    <GraduationCap className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                                </div>
                                <div className="text-sm font-black text-gray-900 dark:text-white">Qualifications</div>
                            </div>
                            <ul className="space-y-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                                {(vacancy.qualifications ?? []).map((q, idx) => (
                                    <li key={idx} className="leading-relaxed">
                                        {q}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/30 p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-9 h-9 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                                    <Wallet className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                                </div>
                                <div className="text-sm font-black text-gray-900 dark:text-white">Remuneration</div>
                            </div>
                            <div className="text-sm font-black text-gray-900 dark:text-white">{vacancy.remuneration}</div>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2">
                            <Link
                                href={route('opportunities')}
                                className="h-10 inline-flex items-center px-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm font-black text-gray-800 dark:text-gray-100"
                            >
                                Cancel
                            </Link>
                            {vacancy.isClosed ? (
                                <span className="h-10 inline-flex items-center px-5 rounded-xl bg-gray-100 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-sm font-black">
                                    Closed
                                </span>
                            ) : (
                                <Link
                                    href={route('opportunities.apply', vacancy.id)}
                                    className="h-10 inline-flex items-center px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-black"
                                >
                                    Apply Now
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
