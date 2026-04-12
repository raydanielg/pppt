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

    // Transform is_hot to boolean before submission
    form.transform((data) => ({
        ...data,
        is_hot: data.is_hot === true || data.is_hot === 'on' || data.is_hot === 1,
    }));

    const submit = (e) => {
        e.preventDefault();
        
        // Clear previous errors
        form.clearErrors();
        
        form.post(route('admin.hot-news.store'), {
            onError: (errors) => {
                console.log('Validation errors:', errors);
            },
            onSuccess: () => {
                form.reset();
            },
        });
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
                            disabled={form.processing || !form.data.title || !form.data.content}
                            className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-black text-white hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {form.processing ? (
                                <>
                                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Publishing...
                                </>
                            ) : (
                                'Publish'
                            )}
                        </button>
                    </div>
                </div>

                {/* Global Error Summary */}
                {(flash?.error || Object.keys(form.errors).length > 0) && (
                    <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-4">
                        <div className="flex items-start gap-3">
                            <svg className="h-5 w-5 text-rose-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <h3 className="text-sm font-black text-rose-800 mb-1">
                                    {flash?.error || 'Please fix the following errors:'}
                                </h3>
                                {Object.keys(form.errors).length > 0 && (
                                    <ul className="text-xs text-rose-700 list-disc list-inside space-y-1">
                                        {Object.entries(form.errors).map(([field, error]) => (
                                            <li key={field}>
                                                <span className="font-bold capitalize">{field}:</span> {Array.isArray(error) ? error[0] : error}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div>
                        <label className="text-xs font-black uppercase tracking-widest text-gray-500">
                            Category <span className="text-rose-500">*</span>
                        </label>
                        <select
                            name="category"
                            id="category"
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
                            type="text"
                            name="author_name"
                            id="author_name"
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
                        <label className="text-xs font-black uppercase tracking-widest text-gray-500">
                            Title <span className="text-rose-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
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
                            name="summary"
                            id="summary"
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
                        <label className="text-xs font-black uppercase tracking-widest text-gray-500">
                            Content <span className="text-rose-500">*</span>
                        </label>
                        <textarea
                            name="content"
                            id="content"
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
                        <label className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-black text-gray-700 cursor-pointer hover:bg-gray-50 transition-colors">
                            <input
                                type="checkbox"
                                name="is_hot"
                                id="is_hot"
                                checked={form.data.is_hot === true}
                                onChange={(e) => form.setData('is_hot', e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                            />
                            <span>Mark as Hot (Trending)</span>
                        </label>
                        {form.errors.is_hot ? (
                            <div className="mt-1 text-xs font-bold text-rose-600">{form.errors.is_hot}</div>
                        ) : null}
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
