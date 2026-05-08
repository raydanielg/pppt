import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router, usePage, useForm } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { Search, Pencil, Plus, X } from 'lucide-react';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

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

const PaymentStatusBadge = ({ status }) => {
    const key = String(status || '').toLowerCase();
    const cls =
        key === 'completed'
            ? 'bg-emerald-100 text-emerald-700'
            : key === 'pending'
                ? 'bg-amber-100 text-amber-700'
                : 'bg-red-100 text-red-700';

    return (
        <span className={`inline-flex items-center rounded-full px-2 py-1 text-[10px] font-black uppercase tracking-widest ${cls}`}>
            {status || 'Not Started'}
        </span>
    );
};

export default function Index({ users, filters }) {
    const flash = usePage().props.flash;
    const [q, setQ] = useState(filters?.q || '');
    const [showCreateModal, setShowCreateModal] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        country: 'Tanzania',
        membership_number: '',
        membership_payment_status: 'pending',
    });

    const rows = useMemo(() => users?.data || [], [users]);

    const submitSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.users.index'), { q }, { preserveScroll: true, preserveState: true });
    };

    const submitCreate = (e) => {
        e.preventDefault();
        post(route('admin.users.store'), {
            onSuccess: () => {
                setShowCreateModal(false);
                reset();
            },
        });
    };

    return (
        <AdminLayout title="Users Management">
            <Head title="Admin - Users" />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-black text-gray-900">Users Management</h2>
                    <p className="mt-1 text-sm text-gray-500">Search, edit user profiles and manage roles.</p>
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-black text-white hover:bg-emerald-700 transition-colors"
                >
                    <Plus className="h-4 w-4" />
                    Create User
                </button>
            </div>

            {flash?.success ? (
                <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-black text-emerald-800">
                    {flash.success}
                </div>
            ) : null}

            <div className="rounded-2xl border border-gray-200 bg-white p-4">
                <form onSubmit={submitSearch} className="mb-4">
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

                <div className="overflow-hidden rounded-2xl border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-100">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-widest text-gray-500">User</th>
                                <th className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-widest text-gray-500">Member No</th>
                                <th className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-widest text-gray-500">Country</th>
                                <th className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-widest text-gray-500">Payment</th>
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
                                            <PaymentStatusBadge status={u.membership_payment_status} />
                                        </td>
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
                                    <td colSpan={6} className="px-4 py-10 text-center">
                                        <div className="text-sm font-black text-gray-900">No users found</div>
                                        <div className="mt-1 text-xs text-gray-500">Try a different search query.</div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                {users?.links && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {users.links.map((link, i) => (
                            <button
                                key={i}
                                onClick={() => link.url && router.visit(link.url)}
                                disabled={!link.url}
                                className={`rounded-lg px-3 py-1.5 text-xs font-black transition-colors ${
                                    link.active
                                        ? 'bg-emerald-600 text-white'
                                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 disabled:opacity-50'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Create User Modal */}
            <Modal show={showCreateModal} onClose={() => setShowCreateModal(false)}>
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-black text-gray-900">Create New User</h3>
                        <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-500">
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <form onSubmit={submitCreate} className="space-y-4">
                        <div>
                            <InputLabel htmlFor="name" value="Full Name" />
                            <TextInput
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="email" value="Email Address" />
                            <TextInput
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="password" value="Password" />
                            <TextInput
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <InputLabel htmlFor="country" value="Country" />
                                <TextInput
                                    id="country"
                                    value={data.country}
                                    onChange={(e) => setData('country', e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.country} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="membership_number" value="Membership No" />
                                <TextInput
                                    id="membership_number"
                                    value={data.membership_number}
                                    onChange={(e) => setData('membership_number', e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.membership_number} className="mt-2" />
                            </div>
                        </div>

                        <div>
                            <InputLabel htmlFor="membership_payment_status" value="Payment Status" />
                            <select
                                id="membership_payment_status"
                                value={data.membership_payment_status}
                                onChange={(e) => setData('membership_payment_status', e.target.value)}
                                className="mt-1 block w-full rounded-xl border-gray-200 bg-gray-50 py-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                            >
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                                <option value="failed">Failed</option>
                            </select>
                            <InputError message={errors.membership_payment_status} className="mt-2" />
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setShowCreateModal(false)}
                                className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-black text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <PrimaryButton disabled={processing}>
                                Create User
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>
        </AdminLayout>
    );
}
