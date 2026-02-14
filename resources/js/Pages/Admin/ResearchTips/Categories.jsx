import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Trash2, Plus } from 'lucide-react';

export default function Categories({ categories = [] }) {
    const flash = usePage().props.flash;

    const form = useForm({
        name: '',
        icon: '',
    });

    const submit = (e) => {
        e.preventDefault();
        form.post(route('admin.research-tip-categories.store'), {
            preserveScroll: true,
            onSuccess: () => form.reset(),
        });
    };

    const del = (id) => {
        if (!confirm('Delete this category? Existing research tips will keep the category name but this category entry will be removed.')) return;
        router.delete(route('admin.research-tip-categories.destroy', id), { preserveScroll: true });
    };

    return (
        <AdminLayout title="Research Tip Categories">
            <Head title="Admin - Research Tip Categories" />

            {flash?.success ? (
                <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-black text-emerald-800">
                    {flash.success}
                </div>
            ) : null}

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:col-span-1">
                    <div className="text-sm font-black text-gray-900">Create Category</div>
                    <div className="mt-1 text-xs text-gray-500">Used to organize research tips.</div>

                    <form onSubmit={submit} className="mt-4 space-y-4">
                        <div>
                            <label className="text-xs font-black uppercase tracking-widest text-gray-500">Name</label>
                            <input
                                value={form.data.name}
                                onChange={(e) => form.setData('name', e.target.value)}
                                className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                                placeholder="e.g. Methodology"
                            />
                            {form.errors.name ? (
                                <div className="mt-1 text-xs font-bold text-rose-600">{form.errors.name}</div>
                            ) : null}
                        </div>

                        <div>
                            <label className="text-xs font-black uppercase tracking-widest text-gray-500">Icon (optional)</label>
                            <input
                                value={form.data.icon}
                                onChange={(e) => form.setData('icon', e.target.value)}
                                className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                                placeholder="lucide icon name"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={form.processing}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-black text-white hover:bg-emerald-700 disabled:opacity-60"
                        >
                            <Plus className="h-4 w-4" />
                            Add Category
                        </button>
                    </form>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:col-span-2">
                    <div className="text-sm font-black text-gray-900">All Categories</div>
                    <div className="mt-1 text-xs text-gray-500">Manage existing categories.</div>

                    <div className="mt-4 overflow-hidden rounded-2xl border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-100">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-widest text-gray-500">Name</th>
                                    <th className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-widest text-gray-500">Slug</th>
                                    <th className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-widest text-gray-500">Icon</th>
                                    <th className="px-4 py-3 text-right text-[11px] font-black uppercase tracking-widest text-gray-500">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 bg-white">
                                {categories.length ? (
                                    categories.map((c) => (
                                        <tr key={c.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 text-sm font-black text-gray-900">{c.name}</td>
                                            <td className="px-4 py-3 text-xs font-mono text-gray-600">{c.slug}</td>
                                            <td className="px-4 py-3 text-xs text-gray-600">{c.icon || '—'}</td>
                                            <td className="px-4 py-3 text-right">
                                                <button
                                                    type="button"
                                                    onClick={() => del(c.id)}
                                                    className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-black text-rose-700 hover:bg-rose-100"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="px-4 py-10 text-center">
                                            <div className="text-sm font-black text-gray-900">No categories</div>
                                            <div className="mt-1 text-xs text-gray-500">Create your first category.</div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
