import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Download, ArrowLeft } from 'lucide-react';

export default function Notes({ notes, categories = [], filters = {} }) {
    return (
        <AuthenticatedLayout>
            <Head title="PT Library - Notes" />

            <div className="py-8 px-4 sm:px-6 lg:px-10 max-w-[1400px] mx-auto">
                <div className="flex items-center justify-between gap-4 mb-8">
                    <div>
                        <div className="text-xs font-black uppercase tracking-widest text-emerald-700">PT Library</div>
                        <h1 className="mt-2 text-3xl font-black text-gray-900">Notes</h1>
                    </div>

                    <Link
                        href={route('pt-library')}
                        className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-xs font-black text-gray-800 hover:bg-gray-50"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Books
                    </Link>
                </div>

                <div className="mb-6 grid gap-3 md:grid-cols-3">
                    <input
                        value={filters.search ?? ''}
                        onChange={(e) =>
                            router.visit(route('pt-library.notes'), {
                                data: { search: e.target.value, category: filters.category ?? '' },
                                preserveState: true,
                                preserveScroll: true,
                                replace: true,
                            })
                        }
                        placeholder="Search notes..."
                        className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold"
                    />

                    <select
                        value={filters.category ?? ''}
                        onChange={(e) =>
                            router.visit(route('pt-library.notes'), {
                                data: { search: filters.search ?? '', category: e.target.value },
                                preserveState: true,
                                preserveScroll: true,
                                replace: true,
                            })
                        }
                        className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold"
                    >
                        <option value="">All Categories</option>
                        {categories.map((c) => (
                            <option key={c.id} value={c.slug}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid gap-4">
                    {notes?.length ? (
                        notes.map((n) => (
                            <div key={n.id} className="rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-sm flex items-center justify-between gap-6">
                                <div className="min-w-0">
                                    <div className="text-lg font-black text-gray-900 truncate">{n.title}</div>
                                    <div className="mt-1 text-xs font-black uppercase tracking-widest text-gray-400">
                                        {(n.library_category?.name ?? n.category ?? 'General')} {n.file_size ? `• ${n.file_size}` : ''}
                                    </div>
                                    {n.description ? <div className="mt-3 text-sm text-gray-600 line-clamp-2">{n.description}</div> : null}
                                </div>

                                <a
                                    href={n.file_download_url ?? n.file_url}
                                    download
                                    className="shrink-0 inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-xs font-black text-white hover:bg-emerald-700"
                                >
                                    <Download className="h-4 w-4" />
                                    Download
                                </a>
                            </div>
                        ))
                    ) : (
                        <div className="rounded-[1.5rem] border border-gray-100 bg-white p-10 text-center">
                            <div className="text-sm font-black text-gray-900">No notes yet</div>
                            <div className="mt-1 text-xs text-gray-500">Admin can upload notes from the Admin Panel.</div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
