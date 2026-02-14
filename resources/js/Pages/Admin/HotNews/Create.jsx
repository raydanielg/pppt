import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Create({ categories = [] }) {
    const flash = usePage().props.flash;

    const form = useForm({
        title: '',
        summary: '',
        content: '',
        category: categories?.[0]?.name || 'General',
        author_name: 'PhysioPlanet Editor',
        is_hot: false,
    });

    const submit = (e) => {
        e.preventDefault();
        form.post(route('admin.hot-news.store'));
    };

    return (
        <AdminLayout title="Create News">
            <Head title="Admin - Create News" />

            <form onSubmit={submit} className="rounded-2xl border border-gray-200 bg-white p-5">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <div className="text-sm font-black text-gray-900">New Post</div>
                        <div className="text-xs text-gray-500">Publish a news post.</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            href={route('admin.hot-news.index')}
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

                {flash?.error ? (
                    <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-black text-rose-800">
                        {flash.error}
                    </div>
                ) : null}

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

                    <div className="md:col-span-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-500">Title</label>
                        <input
                            value={form.data.title}
                            onChange={(e) => form.setData('title', e.target.value)}
                            className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                            placeholder="News title"
                        />
                        {form.errors.title ? (
                            <div className="mt-1 text-xs font-bold text-rose-600">{form.errors.title}</div>
                        ) : null}
                    </div>

                    <div className="md:col-span-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-500">Summary (optional)</label>
                        <textarea
                            value={form.data.summary}
                            onChange={(e) => form.setData('summary', e.target.value)}
                            className="mt-2 h-24 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                            placeholder="Short summary"
                        />
                        {form.errors.summary ? (
                            <div className="mt-1 text-xs font-bold text-rose-600">{form.errors.summary}</div>
                        ) : null}
                    </div>

                    <div className="md:col-span-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-500">Content</label>
                        <textarea
                            value={form.data.content}
                            onChange={(e) => form.setData('content', e.target.value)}
                            className="mt-2 h-64 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                            placeholder="Full content"
                        />
                        {form.errors.content ? (
                            <div className="mt-1 text-xs font-bold text-rose-600">{form.errors.content}</div>
                        ) : null}
                    </div>

                    <div className="md:col-span-2">
                        <label className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-black text-gray-700">
                            <input
                                type="checkbox"
                                checked={!!form.data.is_hot}
                                onChange={(e) => form.setData('is_hot', e.target.checked)}
                                className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                            />
                            Mark as Hot (Trending)
                        </label>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
