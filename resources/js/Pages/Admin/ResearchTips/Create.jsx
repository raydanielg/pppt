import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Create({ categories = [] }) {
    const flash = usePage().props.flash;

    const form = useForm({
        title: '',
        author_name: '',
        abstract: '',
        content: '',
        category: categories?.[0]?.name || 'General',
        read_time: '5 min read',
        published_date: new Date().toISOString().slice(0, 10),
    });

    const submit = (e) => {
        e.preventDefault();
        form.post(route('admin.research-tips.store'));
    };

    return (
        <AdminLayout title="Create Research Tip">
            <Head title="Admin - Create Research Tip" />

            {flash?.error ? (
                <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-black text-rose-800">
                    {flash.error}
                </div>
            ) : null}

            <form onSubmit={submit} className="rounded-2xl border border-gray-200 bg-white p-5">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <div className="text-sm font-black text-gray-900">New Research Tip</div>
                        <div className="text-xs text-gray-500">Publish a new research tip.</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            href={route('admin.research-tips.index')}
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
                            value={form.data.category}
                            onChange={(e) => form.setData('category', e.target.value)}
                            className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                        >
                            {[...new Set(['General', ...categories.map((c) => c.name)])].map((name) => (
                                <option key={name} value={name}>
                                    {name}
                                </option>
                            ))}
                        </select>
                        {form.errors.category ? (
                            <div className="mt-1 text-xs font-bold text-rose-600">{form.errors.category}</div>
                        ) : null}
                    </div>

                    <div>
                        <label className="text-xs font-black uppercase tracking-widest text-gray-500">Published Date</label>
                        <input
                            type="date"
                            value={form.data.published_date}
                            onChange={(e) => form.setData('published_date', e.target.value)}
                            className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                        />
                        {form.errors.published_date ? (
                            <div className="mt-1 text-xs font-bold text-rose-600">{form.errors.published_date}</div>
                        ) : null}
                    </div>

                    <div>
                        <label className="text-xs font-black uppercase tracking-widest text-gray-500">Author</label>
                        <input
                            value={form.data.author_name}
                            onChange={(e) => form.setData('author_name', e.target.value)}
                            className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                            placeholder="Author name"
                        />
                        {form.errors.author_name ? (
                            <div className="mt-1 text-xs font-bold text-rose-600">{form.errors.author_name}</div>
                        ) : null}
                    </div>

                    <div>
                        <label className="text-xs font-black uppercase tracking-widest text-gray-500">Read Time (optional)</label>
                        <input
                            value={form.data.read_time}
                            onChange={(e) => form.setData('read_time', e.target.value)}
                            className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                            placeholder="e.g. 5 min read"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-500">Title</label>
                        <input
                            value={form.data.title}
                            onChange={(e) => form.setData('title', e.target.value)}
                            className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                            placeholder="Title"
                        />
                        {form.errors.title ? (
                            <div className="mt-1 text-xs font-bold text-rose-600">{form.errors.title}</div>
                        ) : null}
                    </div>

                    <div className="md:col-span-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-500">Abstract</label>
                        <textarea
                            value={form.data.abstract}
                            onChange={(e) => form.setData('abstract', e.target.value)}
                            className="mt-2 h-24 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                            placeholder="Short abstract"
                        />
                        {form.errors.abstract ? (
                            <div className="mt-1 text-xs font-bold text-rose-600">{form.errors.abstract}</div>
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
                </div>
            </form>
        </AdminLayout>
    );
}
