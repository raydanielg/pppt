import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useMemo } from 'react';
import { UploadCloud, Trash2, Download } from 'lucide-react';

export default function Books({ books, categories = [] }) {
    const flash = usePage().props.flash;
    const rows = useMemo(() => books?.data || [], [books]);

    const form = useForm({
        title: '',
        description: '',
        library_category_id: categories?.[0]?.id || '',
        cover_image: null,
        pdf_file: null,
    });

    const submit = (e) => {
        e.preventDefault();
        form.post(route('admin.library.books.store'), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => form.reset('title', 'description', 'library_category_id', 'cover_image', 'pdf_file'),
        });
    };

    const del = (id) => {
        if (!confirm('Delete this book?')) return;
        router.delete(route('admin.library.books.destroy', id), { preserveScroll: true });
    };

    return (
        <AdminLayout title="Library - Books">
            <Head title="Admin - Library Books" />

            {flash?.success ? (
                <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-black text-emerald-800">
                    {flash.success}
                </div>
            ) : null}

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:col-span-1">
                    <div className="text-sm font-black text-gray-900">Upload Book</div>
                    <div className="mt-1 text-xs text-gray-500">Upload a new PDF book with optional cover image.</div>

                    <form onSubmit={submit} className="mt-4 space-y-4">
                        <div>
                            <label className="text-xs font-black uppercase tracking-widest text-gray-500">Title</label>
                            <input
                                value={form.data.title}
                                onChange={(e) => form.setData('title', e.target.value)}
                                className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                                placeholder="Book title"
                            />
                            {form.errors.title ? <div className="mt-1 text-xs font-bold text-rose-600">{form.errors.title}</div> : null}
                        </div>

                        <div>
                            <label className="text-xs font-black uppercase tracking-widest text-gray-500">Category</label>
                            <select
                                value={form.data.library_category_id}
                                onChange={(e) => form.setData('library_category_id', e.target.value)}
                                className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                            >
                                {categories.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                            {form.errors.library_category_id ? (
                                <div className="mt-1 text-xs font-bold text-rose-600">{form.errors.library_category_id}</div>
                            ) : null}
                        </div>

                        <div>
                            <label className="text-xs font-black uppercase tracking-widest text-gray-500">Description (optional)</label>
                            <textarea
                                value={form.data.description}
                                onChange={(e) => form.setData('description', e.target.value)}
                                className="mt-2 h-24 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                                placeholder="Short description"
                            />
                            {form.errors.description ? <div className="mt-1 text-xs font-bold text-rose-600">{form.errors.description}</div> : null}
                        </div>

                        <div>
                            <label className="text-xs font-black uppercase tracking-widest text-gray-500">Cover Image (optional)</label>
                            <div className="mt-2 rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-4">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => form.setData('cover_image', e.target.files?.[0] || null)}
                                    className="block w-full text-sm"
                                />
                                {form.errors.cover_image ? <div className="mt-1 text-xs font-bold text-rose-600">{form.errors.cover_image}</div> : null}
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-black uppercase tracking-widest text-gray-500">PDF File</label>
                            <div className="mt-2 rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-4">
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    onChange={(e) => form.setData('pdf_file', e.target.files?.[0] || null)}
                                    className="block w-full text-sm"
                                />
                                {form.errors.pdf_file ? <div className="mt-1 text-xs font-bold text-rose-600">{form.errors.pdf_file}</div> : null}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={form.processing}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-black text-white hover:bg-emerald-700 disabled:opacity-60"
                        >
                            <UploadCloud className="h-4 w-4" />
                            Upload
                        </button>

                        {form.progress ? (
                            <div className="text-xs font-black text-gray-600">Uploading... {form.progress.percentage}%</div>
                        ) : null}
                    </form>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:col-span-2">
                    <div className="text-sm font-black text-gray-900">All Books</div>
                    <div className="mt-1 text-xs text-gray-500">Latest uploads.</div>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        {rows.length ? (
                            rows.map((b) => (
                                <div key={b.id} className="rounded-2xl border border-gray-200 overflow-hidden bg-white">
                                    <div className="aspect-[4/3] bg-gray-50">
                                        {b.cover_image_url || b.cover_image ? (
                                            <img
                                                src={b.cover_image_url ?? b.cover_image}
                                                alt={b.title}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="h-full w-full flex items-center justify-center text-xs font-black text-gray-400">No cover</div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <div className="text-xs font-black text-gray-900 truncate">{b.title}</div>
                                        <div className="mt-1 text-[10px] font-black uppercase tracking-widest text-gray-500">{b.library_category?.name ?? b.category ?? '—'}</div>
                                        <div className="mt-2 text-xs text-gray-500 line-clamp-2">{b.description || '—'}</div>

                                        <div className="mt-3 flex items-center justify-between">
                                            <a
                                                href={b.pdf_download_url ?? b.pdf_url}
                                                className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-700 hover:bg-emerald-100"
                                                download
                                            >
                                                <Download className="h-4 w-4" />
                                                PDF
                                            </a>

                                            <button
                                                type="button"
                                                onClick={() => del(b.id)}
                                                className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-black text-rose-700 hover:bg-rose-100"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="sm:col-span-2 rounded-2xl border border-gray-200 bg-gray-50 p-10 text-center">
                                <div className="text-sm font-black text-gray-900">No books yet</div>
                                <div className="mt-1 text-xs text-gray-500">Upload your first book.</div>
                            </div>
                        )}
                    </div>

                    {books?.links ? (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {books.links.map((l, idx) => (
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
            </div>
        </AdminLayout>
    );
}
