import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { Plus, Search, Trash2, Pencil } from 'lucide-react';

export default function Index({ opportunities, filters }) {
    const flash = usePage().props.flash;
    const [q, setQ] = useState(filters?.q || '');

    const rows = useMemo(() => opportunities?.data || [], [opportunities]);

    const submitSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.opportunities.index'), { q }, { preserveScroll: true, preserveState: true });
    };

    const del = (id) => {
        if (!confirm('Delete this opportunity?')) return;
        router.delete(route('admin.opportunities.destroy', id), { preserveScroll: true });
    };

    return (
        <AdminLayout title="Opportunities">
            <Head title="Admin - Opportunities" />

            {flash?.success ? (
                <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-black text-emerald-800">
                    {flash.success}
                </div>
            ) : null}

            <div className="rounded-2xl border border-gray-200 bg-white p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                        <div className="text-sm font-black text-gray-900">All Opportunities</div>
                        <div className="text-xs text-gray-500">Create and manage vacancies.</div>
                    </div>

                    <Link
                        href={route('admin.opportunities.create')}
                        className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-black text-white hover:bg-emerald-700"
                    >
                        <Plus className="h-4 w-4" />
                        Create Opportunity
                    </Link>
                </div>

                <form onSubmit={submitSearch} className="mt-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Search by title, employer, remuneration..."
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                        />
                    </div>
                </form>

                <div className="mt-4 overflow-hidden rounded-2xl border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-100">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-widest text-gray-500">Title</th>
                                <th className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-widest text-gray-500">Employer</th>
                                <th className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-widest text-gray-500">Close</th>
                                <th className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-widest text-gray-500">Active</th>
                                <th className="px-4 py-3 text-right text-[11px] font-black uppercase tracking-widest text-gray-500">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                            {rows.length ? (
                                rows.map((o) => (
                                    <tr key={o.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3">
                                            <div className="text-sm font-black text-gray-900 truncate">{o.advert_name}</div>
                                            <div className="text-xs text-gray-500 truncate">Posts: {o.posts} • {o.remuneration || '—'}</div>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-700">{o.employer_name}</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">{o.close_date}</td>
                                        <td className="px-4 py-3">
                                            {o.is_active ? (
                                                <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-700">
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-gray-600">
                                                    Off
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <div className="inline-flex items-center gap-2">
                                                <Link
                                                    href={route('admin.opportunities.edit', o.id)}
                                                    className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-black text-gray-700 hover:bg-gray-50"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                    Edit
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={() => del(o.id)}
                                                    className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-black text-rose-700 hover:bg-rose-100"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-4 py-10 text-center">
                                        <div className="text-sm font-black text-gray-900">No opportunities found</div>
                                        <div className="mt-1 text-xs text-gray-500">Create your first opportunity.</div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {opportunities?.links ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {opportunities.links.map((l, idx) => (
                            <button
                                key={idx}
                                type="button"
                                disabled={!l.url}
                                onClick={() => l.url && router.visit(l.url, { preserveScroll: true, preserveState: true })}
                                className={
                                    'rounded-xl px-3 py-2 text-xs font-black border ' +
                                    (l.active
                                        ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50') +
                                    (!l.url ? ' opacity-40 cursor-not-allowed' : '')
                                }
                                dangerouslySetInnerHTML={{ __html: l.label }}
                            />
                        ))}
                    </div>
                ) : null}
            </div>
        </AdminLayout>
    );
}
