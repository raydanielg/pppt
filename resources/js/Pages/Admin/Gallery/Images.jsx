import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useMemo } from 'react';
import { UploadCloud, Trash2 } from 'lucide-react';

export default function Images({ categories = [], images }) {
    const flash = usePage().props.flash;

    const rows = useMemo(() => images?.data || [], [images]);

    const form = useForm({
        gallery_category_id: categories?.[0]?.id || '',
        title: '',
        description: '',
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        form.post(route('admin.gallery-images.store'), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => form.reset('title', 'description', 'image'),
        });
    };

    const del = (id) => {
        if (!confirm('Delete this image?')) return;
        router.delete(route('admin.gallery-images.destroy', id), { preserveScroll: true });
    };

    return (
        <AdminLayout title="Gallery Images">
            <Head title="Admin - Gallery Images" />

            {flash?.success ? (
                <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-black text-emerald-800">
                    {flash.success}
                </div>
            ) : null}

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:col-span-1">
                    <div className="text-sm font-black text-gray-900">Upload Image</div>
                    <div className="mt-1 text-xs text-gray-500">Add a new image to the gallery.</div>

                    <form onSubmit={submit} className="mt-4 space-y-4">
                        <div>
                            <label className="text-xs font-black uppercase tracking-widest text-gray-500">Category</label>
                            <select
                                value={form.data.gallery_category_id}
                                onChange={(e) => form.setData('gallery_category_id', e.target.value)}
                                className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                            >
                                {categories.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                            {form.errors.gallery_category_id ? (
                                <div className="mt-1 text-xs font-bold text-rose-600">{form.errors.gallery_category_id}</div>
                            ) : null}
                        </div>

                        <div>
                            <label className="text-xs font-black uppercase tracking-widest text-gray-500">Title (optional)</label>
                            <input
                                value={form.data.title}
                                onChange={(e) => form.setData('title', e.target.value)}
                                className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                                placeholder="Image title"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-black uppercase tracking-widest text-gray-500">Description (optional)</label>
                            <textarea
                                value={form.data.description}
                                onChange={(e) => form.setData('description', e.target.value)}
                                className="mt-2 h-24 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                                placeholder="Short description"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-black uppercase tracking-widest text-gray-500">Image File</label>
                            <div className="mt-2 rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-4">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => form.setData('image', e.target.files?.[0] || null)}
                                    className="block w-full text-sm"
                                />
                                {form.errors.image ? (
                                    <div className="mt-1 text-xs font-bold text-rose-600">{form.errors.image}</div>
                                ) : null}
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
                    <div className="text-sm font-black text-gray-900">All Images</div>
                    <div className="mt-1 text-xs text-gray-500">Latest uploads.</div>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        {rows.length ? (
                            rows.map((img) => (
                                <div key={img.id} className="rounded-2xl border border-gray-200 overflow-hidden bg-white">
                                    <div className="aspect-[4/3] bg-gray-50">
                                        <img src={img.image_url} alt={img.title || 'Gallery image'} className="h-full w-full object-cover" />
                                    </div>
                                    <div className="p-4">
                                        <div className="text-xs font-black text-gray-900 truncate">{img.title || 'Untitled'}</div>
                                        <div className="mt-1 text-[10px] font-black uppercase tracking-widest text-gray-500">
                                            {img.category?.name || '—'}
                                        </div>
                                        {img.description ? (
                                            <div className="mt-2 text-xs text-gray-500 line-clamp-2">{img.description}</div>
                                        ) : null}
                                        <div className="mt-3 flex justify-end">
                                            <button
                                                type="button"
                                                onClick={() => del(img.id)}
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
                                <div className="text-sm font-black text-gray-900">No images yet</div>
                                <div className="mt-1 text-xs text-gray-500">Upload your first image.</div>
                            </div>
                        )}
                    </div>

                    {images?.links ? (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {images.links.map((l, idx) => (
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
