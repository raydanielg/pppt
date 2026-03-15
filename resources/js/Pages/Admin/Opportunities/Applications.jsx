import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { Search, Trash2, Download } from 'lucide-react';

function formatBytes(bytes) {
    const n = Number(bytes || 0);
    if (!n) return '—';
    const units = ['B', 'KB', 'MB', 'GB'];
    let v = n;
    let i = 0;
    while (v >= 1024 && i < units.length - 1) {
        v /= 1024;
        i += 1;
    }
    return `${v.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

export default function Applications({ applications, filters, hasReviewed }) {
    const flash = usePage().props.flash;
    const [q, setQ] = useState(filters?.q || '');

    const rows = useMemo(() => applications?.data || [], [applications]);

    const submitSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.opportunity-applications.index'), { q }, { preserveScroll: true, preserveState: true });
    };

    const del = (id) => {
        if (!confirm('Delete this application?')) return;
        router.delete(route('admin.opportunity-applications.destroy', id), { preserveScroll: true });
    };

    return (
        <AdminLayout title="Opportunity Applications">
            <Head title="Admin - Opportunity Applications" />

            {flash?.success ? (
                <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-black text-emerald-800">
                    {flash.success}
                </div>
            ) : null}

            <div className="rounded-2xl border border-gray-200 bg-white p-4">
                <div className="min-w-0">
                    <div className="text-sm font-black text-gray-900">All Applications</div>
                    <div className="text-xs text-gray-500">View all applications submitted by users.</div>
                </div>

                <form onSubmit={submitSearch} className="mt-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Search by user name/email or advert name..."
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                        />
                    </div>
                </form>

                <div className="mt-4 overflow-hidden rounded-2xl border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-100">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-widest text-gray-500">Applicant</th>
                                <th className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-widest text-gray-500">Opportunity</th>
                                <th className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-widest text-gray-500">File</th>
                                <th className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-widest text-gray-500">Date</th>
                                <th className="px-4 py-3 text-right text-[11px] font-black uppercase tracking-widest text-gray-500">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                            {rows.length ? (
                                rows.map((a) => (
                                    <tr key={a.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3">
                                            <div className="text-sm font-black text-gray-900 truncate">{a.user?.name || '—'}</div>
                                            <div className="text-xs text-gray-500 truncate">{a.user?.email || '—'}</div>
                                            {hasReviewed ? (
                                                <div className="mt-2">
                                                    {a.is_reviewed ? (
                                                        <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-700">
                                                            Reviewed
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-amber-800">
                                                            Pending
                                                        </span>
                                                    )}
                                                </div>
                                            ) : null}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="text-sm font-black text-gray-900 truncate">{a.opportunity?.advert_name ?? a.advert_name}</div>
                                            <div className="text-xs text-gray-500 truncate">{a.opportunity?.employer_name || '—'}</div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="text-xs font-mono text-gray-700 truncate">{a.cover_letter_original_name}</div>
                                            <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                                                {a.cover_letter_mime} • {formatBytes(a.cover_letter_size)}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-700">{new Date(a.created_at).toLocaleString()}</td>
                                        <td className="px-4 py-3 text-right">
                                            <div className="inline-flex items-center gap-2">
                                                <Link
                                                    href={route('admin.opportunity-applications.show', a.id)}
                                                    className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-black text-gray-700 hover:bg-gray-50"
                                                >
                                                    View
                                                </Link>
                                                <a
                                                    href={route('admin.opportunity-applications.download', a.id)}
                                                    className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-700 hover:bg-emerald-100"
                                                >
                                                    <Download className="h-4 w-4" />
                                                    Download
                                                </a>
                                                <button
                                                    type="button"
                                                    onClick={() => del(a.id)}
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
                                        <div className="text-sm font-black text-gray-900">No applications</div>
                                        <div className="mt-1 text-xs text-gray-500">No one has applied yet.</div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {applications?.links ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {applications.links.map((l, idx) => (
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
