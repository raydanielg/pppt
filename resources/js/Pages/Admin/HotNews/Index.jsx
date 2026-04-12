import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { Plus, Search, Trash2, Pencil, Calendar, TrendingUp, ExternalLink } from 'lucide-react';

export default function Index({ news, filters }) {
    const flash = usePage().props.flash;
    const [q, setQ] = useState(filters?.q || '');

    const rows = useMemo(() => news?.data || [], [news]);

    const submitSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.hot-news.index'), { q }, { preserveScroll: true, preserveState: true });
    };

    const del = (id) => {
        if (!confirm('Delete this news item?')) return;
        router.delete(route('admin.hot-news.destroy', id), { preserveScroll: true });
    };

    return (
        <AdminLayout title="Hot News">
            <Head title="Admin - Hot News" />

            {flash?.success ? (
                <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-black text-emerald-800">
                    {flash.success}
                </div>
            ) : null}

            <div className="rounded-2xl border border-gray-200 bg-white p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                        <div className="text-sm font-black text-gray-900">All News</div>
                        <div className="text-xs text-gray-500">Manage news posts and announcements.</div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link
                            href={route('admin.hot-news-categories.index')}
                            className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-black text-gray-700 hover:bg-gray-50"
                        >
                            Categories
                        </Link>
                        <Link
                            href={route('admin.hot-news.create')}
                            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-black text-white hover:bg-emerald-700"
                        >
                            <Plus className="h-4 w-4" />
                            Create News
                        </Link>
                    </div>
                </div>

                <form onSubmit={submitSearch} className="mt-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Search by title, summary, content, author, category..."
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                        />
                    </div>
                </form>

                {/* News Cards Grid */}
                <div className="mt-4 grid gap-3">
                    {rows.length ? (
                        rows.map((n) => (
                            <div
                                key={n.id}
                                className="group rounded-2xl border border-gray-200 bg-white p-4 hover:shadow-lg hover:border-emerald-200 transition-all duration-300"
                            >
                                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                                    {/* Content Section */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start gap-3">
                                            {/* Hot Badge */}
                                            {n.is_hot && (
                                                <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-sm">
                                                    <TrendingUp className="h-3 w-3" />
                                                    Hot
                                                </span>
                                            )}
                                            {/* Category Badge */}
                                            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-700">
                                                {n.category}
                                            </span>
                                        </div>

                                        <h3 className="mt-2 text-base font-black text-gray-900 leading-tight line-clamp-2 group-hover:text-emerald-700 transition-colors">
                                            {n.title}
                                        </h3>

                                        <p className="mt-1.5 text-sm text-gray-500 line-clamp-2">
                                            {n.summary || n.content?.substring(0, 120) + '...'}
                                        </p>

                                        <div className="mt-3 flex items-center gap-4 text-xs text-gray-400">
                                            <span className="flex items-center gap-1.5">
                                                <span className="font-medium text-gray-600">By:</span> {n.author_name}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Calendar className="h-3.5 w-3.5" />
                                                {new Date(n.created_at).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Actions Section - Grouped Buttons */}
                                    <div className="flex items-center gap-0 lg:pt-1">
                                        {/* Edit Button - Left */}
                                        <Link
                                            href={route('admin.hot-news.edit', n.id)}
                                            className="inline-flex items-center gap-1.5 rounded-l-xl border border-gray-200 bg-white px-3 py-2 text-xs font-black text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-all -mr-px"
                                        >
                                            <Pencil className="h-3.5 w-3.5" />
                                            Edit
                                        </Link>

                                        {/* View Button - Middle */}
                                        <Link
                                            href={route('hot-news.show', n.slug)}
                                            target="_blank"
                                            className="inline-flex items-center gap-1.5 border border-gray-200 bg-white px-3 py-2 text-xs font-black text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all -mr-px"
                                        >
                                            <ExternalLink className="h-3.5 w-3.5" />
                                            View
                                        </Link>

                                        {/* Delete Button - Right */}
                                        <button
                                            type="button"
                                            onClick={() => del(n.id)}
                                            className="inline-flex items-center gap-1.5 rounded-r-xl border border-gray-200 bg-white px-3 py-2 text-xs font-black text-rose-600 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 transition-all"
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-10 text-center">
                            <div className="mx-auto w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
                                <Search className="h-6 w-6 text-gray-400" />
                            </div>
                            <div className="text-sm font-black text-gray-900">No news found</div>
                            <div className="mt-1 text-xs text-gray-500">Create your first news post.</div>
                            <Link
                                href={route('admin.hot-news.create')}
                                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-black text-white hover:bg-emerald-700"
                            >
                                <Plus className="h-4 w-4" />
                                Create News
                            </Link>
                        </div>
                    )}
                </div>

                {news?.links ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {news.links.map((l, idx) => (
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
