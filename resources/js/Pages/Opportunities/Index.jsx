import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';

export default function Index({ vacancies = [], appliedIds = [] }) {
    const appliedSet = useMemo(() => new Set((appliedIds ?? []).map((id) => Number(id))), [appliedIds]);

    const [search, setSearch] = useState('');
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return vacancies;

        return vacancies.filter((v) => {
            const haystack = `${v.advertName} ${v.employerName} ${v.closeDate}`.toLowerCase();
            return haystack.includes(q);
        });
    }, [vacancies, search]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const safePage = Math.min(page, totalPages);

    const pageRows = useMemo(() => {
        const start = (safePage - 1) * pageSize;
        return filtered.slice(start, start + pageSize);
    }, [filtered, pageSize, safePage]);

    const showingFrom = filtered.length === 0 ? 0 : (safePage - 1) * pageSize + 1;
    const showingTo = Math.min(filtered.length, safePage * pageSize);

    return (
        <AuthenticatedLayout>
            <Head title="Opportunities" />
            <div className="py-10 px-4 sm:px-6 lg:px-10 max-w-[1600px] mx-auto">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-xl overflow-hidden">
                    <div className="px-6 sm:px-8 py-6 border-b border-gray-100 dark:border-gray-700">
                        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
                            All Vacancies
                        </h1>
                    </div>

                    <div className="px-6 sm:px-8 py-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-3">
                            <div className="text-sm font-semibold text-gray-700 dark:text-gray-200">Show:</div>
                            <select
                                value={pageSize}
                                onChange={(e) => {
                                    setPageSize(Number(e.target.value));
                                    setPage(1);
                                }}
                                className="h-10 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 text-sm font-semibold text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            >
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                            </select>
                            <div className="text-sm font-semibold text-gray-700 dark:text-gray-200">entries</div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="text-sm font-semibold text-gray-700 dark:text-gray-200">Search:</div>
                            <input
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setPage(1);
                                }}
                                placeholder="Search vacancies..."
                                className="h-10 w-full md:w-80 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 text-sm font-semibold text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left">
                            <thead className="bg-gray-50 dark:bg-gray-900/40 border-y border-gray-200 dark:border-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-[11px] font-black tracking-widest uppercase text-gray-600 dark:text-gray-300 w-[80px]">
                                        S/N
                                    </th>
                                    <th className="px-6 py-3 text-[11px] font-black tracking-widest uppercase text-gray-600 dark:text-gray-300 min-w-[520px]">
                                        Advert Name
                                    </th>
                                    <th className="px-6 py-3 text-[11px] font-black tracking-widest uppercase text-gray-600 dark:text-gray-300 min-w-[220px]">
                                        Employer Name
                                    </th>
                                    <th className="px-6 py-3 text-[11px] font-black tracking-widest uppercase text-gray-600 dark:text-gray-300 min-w-[140px]">
                                        Close Date
                                    </th>
                                    <th className="px-6 py-3 text-[11px] font-black tracking-widest uppercase text-gray-600 dark:text-gray-300 min-w-[160px]">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {pageRows.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-6 py-12 text-center text-sm font-semibold text-gray-500 dark:text-gray-400"
                                        >
                                            No vacancies found.
                                        </td>
                                    </tr>
                                ) : (
                                    pageRows.map((v, idx) => (
                                        <tr key={v.id} className="hover:bg-gray-50/70 dark:hover:bg-gray-900/30 transition-colors">
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-200">
                                                {(safePage - 1) * pageSize + idx + 1}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-black text-gray-900 dark:text-white">
                                                    {v.advertName}
                                                </div>
                                                <div className="mt-1 text-xs font-semibold text-gray-600 dark:text-gray-400">
                                                    Number of Posts: {v.posts}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-200">
                                                {v.employerName}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-200">
                                                {v.closeDate}
                                            </td>
                                            <td className="px-6 py-4">
                                                {v.isClosed ? (
                                                    <span className="h-10 inline-flex items-center px-5 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200 text-xs font-black tracking-wide uppercase">
                                                        Closed
                                                    </span>
                                                ) : appliedSet.has(Number(v.id)) ? (
                                                    <span className="h-10 inline-flex items-center px-5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-200 text-xs font-black tracking-wide uppercase">
                                                        Applied
                                                    </span>
                                                ) : (
                                                    <Link
                                                        href={route('opportunities.show', v.id)}
                                                        className="h-10 inline-flex items-center px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black tracking-wide uppercase shadow-sm shadow-emerald-600/20"
                                                    >
                                                        View
                                                    </Link>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="px-6 sm:px-8 py-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between border-t border-gray-100 dark:border-gray-700">
                        <div className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                            Showing {showingFrom} to {showingTo} of {filtered.length} entries
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                disabled={safePage <= 1}
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                className="h-10 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm font-black text-gray-800 dark:text-gray-100 disabled:opacity-50"
                            >
                                Prev
                            </button>
                            <div className="text-sm font-black text-gray-700 dark:text-gray-200 px-2">
                                {safePage} / {totalPages}
                            </div>
                            <button
                                type="button"
                                disabled={safePage >= totalPages}
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                className="h-10 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm font-black text-gray-800 dark:text-gray-100 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
