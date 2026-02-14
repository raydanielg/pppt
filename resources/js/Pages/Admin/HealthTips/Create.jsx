import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Create({ categories = [] }) {
    const flash = usePage().props.flash;

    const form = useForm({
        health_tip_category_id: categories?.[0]?.id || '',
        title: '',
        description: '',
        content: '',
        duration: '3 min read',
        tag: '',
    });

    const submit = (e) => {
        e.preventDefault();
        form.post(route('admin.health-tips.store'));
    };

    return (
        <AdminLayout title="Create Health Tip">
            <Head title="Admin - Create Health Tip" />

            {flash?.error ? (
                <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-black text-rose-800">
                    {flash.error}
                </div>
            ) : null}

            <form onSubmit={submit} className="rounded-2xl border border-gray-200 bg-white p-5">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <div className="text-sm font-black text-gray-900">New Tip</div>
                        <div className="text-xs text-gray-500">Publish a new health tip.</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            href={route('admin.health-tips.index')}
                            className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-black text-gray-700 hover:bg-gray-50"
                        >
                            Back
                        </Link>
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-black text-white hover:bg-emerald-700 disabled:opacity-60"
                        >
                            Publish
                        </button>
                    </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div>
                        <label className="text-xs font-black uppercase tracking-widest text-gray-500">Category</label>
                        <select
                            value={form.data.health_tip_category_id}
                            onChange={(e) => form.setData('health_tip_category_id', e.target.value)}
                            className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                        >
                            {categories.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                        {form.errors.health_tip_category_id ? (
                            <div className="mt-1 text-xs font-bold text-rose-600">{form.errors.health_tip_category_id}</div>
                        ) : null}
                    </div>

                    <div>
                        <label className="text-xs font-black uppercase tracking-widest text-gray-500">Duration</label>
                        <input
                            value={form.data.duration}
                            onChange={(e) => form.setData('duration', e.target.value)}
                            className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                            placeholder="e.g. 3 min read"
                        />
                        {form.errors.duration ? (
                            <div className="mt-1 text-xs font-bold text-rose-600">{form.errors.duration}</div>
                        ) : null}
                    </div>

                    <div className="md:col-span-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-500">Title</label>
                        <input
                            value={form.data.title}
                            onChange={(e) => form.setData('title', e.target.value)}
                            className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                            placeholder="Tip title"
                        />
                        {form.errors.title ? (
                            <div className="mt-1 text-xs font-bold text-rose-600">{form.errors.title}</div>
                        ) : null}
                    </div>

                    <div className="md:col-span-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-500">Short Description</label>
                        <textarea
                            value={form.data.description}
                            onChange={(e) => form.setData('description', e.target.value)}
                            className="mt-2 h-24 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                            placeholder="Short summary"
                        />
                        {form.errors.description ? (
                            <div className="mt-1 text-xs font-bold text-rose-600">{form.errors.description}</div>
                        ) : null}
                    </div>

                    <div className="md:col-span-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-500">Content</label>
                        <textarea
                            value={form.data.content}
                            onChange={(e) => form.setData('content', e.target.value)}
                            className="mt-2 h-56 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                            placeholder="Full content"
                        />
                        {form.errors.content ? (
                            <div className="mt-1 text-xs font-bold text-rose-600">{form.errors.content}</div>
                        ) : null}
                    </div>

                    <div className="md:col-span-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-500">Tag (optional)</label>
                        <input
                            value={form.data.tag}
                            onChange={(e) => form.setData('tag', e.target.value)}
                            className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                            placeholder="e.g. posture"
                        />
                        {form.errors.tag ? (
                            <div className="mt-1 text-xs font-bold text-rose-600">{form.errors.tag}</div>
                        ) : null}
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
