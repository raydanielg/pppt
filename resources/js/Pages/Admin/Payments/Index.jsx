import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useMemo, useState } from 'react';

export default function Index({ filters, payments }) {
    const [q, setQ] = useState(filters?.q || '');
    const [status, setStatus] = useState(filters?.status || '');

    const rows = payments?.data || [];

    const statuses = useMemo(
        () => [
            { value: '', label: 'All' },
            { value: 'completed', label: 'Completed' },
            { value: 'pending', label: 'Pending' },
            { value: 'failed', label: 'Failed' },
            { value: 'expired', label: 'Expired' },
        ],
        [],
    );

    const applyFilters = (e) => {
        e?.preventDefault?.();
        router.get(
            route('admin.payments.index'),
            { q: q || undefined, status: status || undefined },
            { preserveScroll: true, preserveState: true },
        );
    };

    return (
        <AdminLayout title="Payments">
            <Head title="Payments" />

            <div className="rounded-xl border border-gray-200 bg-white p-4">
                <form onSubmit={applyFilters} className="flex flex-col gap-3 md:flex-row md:items-end">
                    <div className="flex-1">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-500">
                            Search
                        </label>
                        <input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
                            placeholder="Name, email, membership, reference..."
                        />
                    </div>

                    <div className="w-full md:w-56">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-500">
                            Status
                        </label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
                        >
                            {statuses.map((s) => (
                                <option key={s.value} value={s.value}>
                                    {s.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-black text-white hover:bg-emerald-700"
                    >
                        Apply
                    </button>
                </form>
            </div>

            <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-white">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-widest text-gray-500">
                                    User
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-widest text-gray-500">
                                    Type
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-widest text-gray-500">
                                    Status
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-widest text-gray-500">
                                    Reference
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-widest text-gray-500">
                                    Paid at
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-widest text-gray-500">
                                    Details
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {rows.map((r, idx) => (
                                <tr key={idx} className="hover:bg-gray-50">
                                    <td className="px-4 py-3">
                                        <div className="text-sm font-black text-gray-900">{r.name}</div>
                                        <div className="text-xs text-gray-500">{r.email}</div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={
                                            'inline-flex rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ' +
                                            (r.type === 'registration'
                                                ? 'bg-blue-50 text-blue-700'
                                                : 'bg-purple-50 text-purple-700')
                                        }>
                                            {r.type.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={
                                                'inline-flex rounded-full px-2 py-1 text-xs font-black ' +
                                                (r.status === 'completed'
                                                    ? 'bg-emerald-50 text-emerald-700'
                                                    : r.status === 'failed' || r.status === 'expired'
                                                      ? 'bg-red-50 text-red-700'
                                                      : 'bg-gray-100 text-gray-700')
                                            }
                                        >
                                            {r.status || '—'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700 font-mono">{r.reference || '—'}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">{r.paid_at ? new Date(r.paid_at).toLocaleString() : '—'}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">
                                        {r.extra_info || (r.type === 'registration' ? 'Membership Registration' : '—')}
                                    </td>
                                </tr>
                            ))}

                            {rows.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-4 py-8 text-center text-sm text-gray-500">
                                        No payments found.
                                    </td>
                                </tr>
                            ) : null}
                        </tbody>
                    </table>
                </div>

                {payments?.links?.length ? (
                    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-gray-200 bg-white px-4 py-3">
                        <div className="text-xs text-gray-500">
                            Page {payments.current_page} of {payments.last_page}
                        </div>
                        <div className="flex flex-wrap gap-1">
                            {payments.links.map((l, idx) => (
                                <Link
                                    key={idx}
                                    href={l.url || '#'}
                                    preserveScroll
                                    preserveState
                                    className={
                                        'rounded-lg px-3 py-1 text-sm ' +
                                        (l.active
                                            ? 'bg-emerald-600 text-white'
                                            : l.url
                                              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                              : 'bg-gray-50 text-gray-400')
                                    }
                                    dangerouslySetInnerHTML={{ __html: l.label }}
                                />
                            ))}
                        </div>
                    </div>
                ) : null}
            </div>
        </AdminLayout>
    );
}
