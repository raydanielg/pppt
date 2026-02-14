import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

const Toggle = ({ checked, onChange, label }) => {
    return (
        <label className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-black text-gray-700">
            <input
                type="checkbox"
                checked={!!checked}
                onChange={(e) => onChange(e.target.checked)}
                className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
            />
            {label}
        </label>
    );
};

export default function Edit({ user, allRoles = [] }) {
    const flash = usePage().props.flash;

    const form = useForm({
        name: user.name || '',
        email: user.email || '',
        country: user.country || '',
        membership_number: user.membership_number || '',
        onboarding_completed: !!user.onboarding_completed,
        roles: Array.isArray(user.roles) ? user.roles : [],
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        form.put(route('admin.users.update', user.id));
    };

    const toggleRole = (role) => {
        const name = String(role || '').trim();
        if (!name) return;
        const existing = new Set(form.data.roles);
        if (existing.has(name)) existing.delete(name);
        else existing.add(name);
        form.setData('roles', Array.from(existing));
    };

    return (
        <AdminLayout title="Edit User">
            <Head title="Admin - Edit User" />

            {flash?.success ? (
                <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-black text-emerald-800">
                    {flash.success}
                </div>
            ) : null}

            <form onSubmit={submit} className="rounded-2xl border border-gray-200 bg-white p-5">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <div className="text-sm font-black text-gray-900">User Details</div>
                        <div className="mt-1 text-xs text-gray-500">Update profile fields, membership, roles, and password.</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            href={route('admin.users.index')}
                            className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-black text-gray-700 hover:bg-gray-50"
                        >
                            Back
                        </Link>
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-black text-white hover:bg-emerald-700 disabled:opacity-60"
                        >
                            Save
                        </button>
                    </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div>
                        <label className="text-xs font-black uppercase tracking-widest text-gray-500">Name</label>
                        <input
                            value={form.data.name}
                            onChange={(e) => form.setData('name', e.target.value)}
                            className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                        />
                        {form.errors.name ? (
                            <div className="mt-1 text-xs font-bold text-rose-600">{form.errors.name}</div>
                        ) : null}
                    </div>

                    <div>
                        <label className="text-xs font-black uppercase tracking-widest text-gray-500">Email</label>
                        <input
                            value={form.data.email}
                            onChange={(e) => form.setData('email', e.target.value)}
                            className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                        />
                        {form.errors.email ? (
                            <div className="mt-1 text-xs font-bold text-rose-600">{form.errors.email}</div>
                        ) : null}
                    </div>

                    <div>
                        <label className="text-xs font-black uppercase tracking-widest text-gray-500">Country</label>
                        <input
                            value={form.data.country}
                            onChange={(e) => form.setData('country', e.target.value)}
                            className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                        />
                    </div>

                    <div>
                        <label className="text-xs font-black uppercase tracking-widest text-gray-500">Member Number</label>
                        <input
                            value={form.data.membership_number}
                            onChange={(e) => form.setData('membership_number', e.target.value)}
                            className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                        />
                    </div>

                    <div className="md:col-span-2 flex flex-wrap gap-2">
                        <Toggle
                            checked={form.data.onboarding_completed}
                            onChange={(v) => form.setData('onboarding_completed', v)}
                            label="Onboarding Completed"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <div className="text-xs font-black uppercase tracking-widest text-gray-500">Roles</div>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {allRoles.length ? (
                                allRoles.map((r) => (
                                    <button
                                        key={r.id}
                                        type="button"
                                        onClick={() => toggleRole(r.name)}
                                        className={
                                            'rounded-full px-3 py-2 text-[11px] font-black uppercase tracking-widest border transition ' +
                                            (form.data.roles.includes(r.name)
                                                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                                                : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50')
                                        }
                                    >
                                        {r.name}
                                    </button>
                                ))
                            ) : (
                                <div className="text-xs text-gray-500">No roles defined yet.</div>
                            )}
                        </div>
                        {form.errors.roles ? (
                            <div className="mt-1 text-xs font-bold text-rose-600">{form.errors.roles}</div>
                        ) : null}
                    </div>

                    <div className="md:col-span-2">
                        <div className="text-xs font-black uppercase tracking-widest text-gray-500">Reset Password (optional)</div>
                        <input
                            type="password"
                            value={form.data.password}
                            onChange={(e) => form.setData('password', e.target.value)}
                            className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                            placeholder="Enter new password"
                        />
                        {form.errors.password ? (
                            <div className="mt-1 text-xs font-bold text-rose-600">{form.errors.password}</div>
                        ) : null}
                        <div className="mt-1 text-[11px] text-gray-500">Leave empty to keep current password.</div>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
