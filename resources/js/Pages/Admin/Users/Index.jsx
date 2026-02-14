import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { Search, Pencil } from 'lucide-react';

const RoleBadge = ({ name }) => {
    const key = String(name || '').toLowerCase();
    const cls =
        key === 'admin'
            ? 'bg-rose-100 text-rose-700'
            : key === 'editor'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-100 text-gray-700';

    return (
        <span className={`inline-flex items-center rounded-full px-2 py-1 text-[10px] font-black uppercase tracking-widest ${cls}`}>
            {name}
        </span>
    );
};

export default function Index({ users, filters }) {
    const flash = usePage().props.flash;
    const [q, setQ] = useState(filters?.q || '');

    const rows = useMemo(() => users?.data || [], [users]);

    const submitSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.users.index'), { q }, { preserveScroll: true, preserveState: true });
    };

    return (
        <AdminLayout title="Users Management">
            <Head title="Admin - Users" />

            {flash?.success ? (
                <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-black text-emerald-800">
                    {flash.success}
                </div>
            ) : null}

            <div className="rounded-2xl border border-gray-200 bg-white p-4">
                <div className="text-sm font-black text-gray-900">All Users</div>
                <div className="mt-1 text-xs text-gray-500">Search, edit user profiles and manage roles.</div>

                <form onSubmit={submitSearch} className="mt-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Search by name, email, member number, country..."
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                        />
                    </div>
                </form>

                <div className="mt-4 overflow-hidden rounded-2xl border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-100">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-widest text-gray-500">User</th>
                                <th className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-widest text-gray-500">Member No</th>
                                <th className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-widest text-gray-500">Country</th>
                                <th className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-widest text-gray-500">Roles</th>
                                <th className="px-4 py-3 text-right text-[11px] font-black uppercase tracking-widest text-gray-500">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                            {rows.length ? (
                                rows.map((u) => (
                                    <tr key={u.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3">
                                            <div className="text-sm font-black text-gray-900 truncate">{u.name}</div>
                                            <div className="text-xs text-gray-500 truncate">{u.email}</div>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-700">{u.membership_number || '—'}</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">{u.country || '—'}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex flex-wrap gap-2">
                                                {(u.roles || []).length ? (
                                                    u.roles.map((r) => <RoleBadge key={r} name={r} />)
                                                ) : (
                                                    <span className="text-xs text-gray-400">—</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <Link
                                                href={route('admin.users.edit', u.id)}
                                                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-black text-gray-700 hover:bg-gray-50"
                                            >
                                                <Pencil className="h-4 w-4" />
                                                Edit
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-4 py-10 text-center">
                                        <div className="text-sm font-black text-gray-900">No users found</div>
                                        <div className="mt-1 text-xs text-gray-500">Try a different search query.</div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {users?.links ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {users.links.map((l, idx) => (
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
