import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ opportunity }) {
    const form = useForm({
        advert_name: opportunity.advert_name || '',
        posts: opportunity.posts || 1,
        employer_name: opportunity.employer_name || '',
        open_date: opportunity.open_date || new Date().toISOString().slice(0, 10),
        close_date: opportunity.close_date || new Date().toISOString().slice(0, 10),
        remuneration: opportunity.remuneration || '',
        is_active: !!opportunity.is_active,
        duties_text: opportunity.duties_text || '',
        qualifications_text: opportunity.qualifications_text || '',
    });

    const submit = (e) => {
        e.preventDefault();
        form.put(route('admin.opportunities.update', opportunity.id));
    };

    return (
        <AdminLayout title="Edit Opportunity">
            <Head title="Admin - Edit Opportunity" />

            <form onSubmit={submit} className="rounded-2xl border border-gray-200 bg-white p-5">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <div className="text-sm font-black text-gray-900">Edit Vacancy</div>
                        <div className="text-xs text-gray-500">Update the opportunity details.</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            href={route('admin.opportunities.index')}
                            className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-black text-gray-700 hover:bg-gray-50"
                        >
                            Back
                        </Link>
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-black text-white hover:bg-emerald-700 disabled:opacity-60"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div className="md:col-span-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-500">Title</label>
                        <input
                            value={form.data.advert_name}
                            onChange={(e) => form.setData('advert_name', e.target.value)}
                            className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                        />
                        {form.errors.advert_name ? (
                            <div className="mt-1 text-xs font-bold text-rose-600">{form.errors.advert_name}</div>
                        ) : null}
                    </div>

                    <div>
                        <label className="text-xs font-black uppercase tracking-widest text-gray-500">Employer</label>
                        <input
                            value={form.data.employer_name}
                            onChange={(e) => form.setData('employer_name', e.target.value)}
                            className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                        />
                        {form.errors.employer_name ? (
                            <div className="mt-1 text-xs font-bold text-rose-600">{form.errors.employer_name}</div>
                        ) : null}
                    </div>

                    <div>
                        <label className="text-xs font-black uppercase tracking-widest text-gray-500">Posts</label>
                        <input
                            type="number"
                            min={1}
                            value={form.data.posts}
                            onChange={(e) => form.setData('posts', e.target.value)}
                            className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                        />
                        {form.errors.posts ? (
                            <div className="mt-1 text-xs font-bold text-rose-600">{form.errors.posts}</div>
                        ) : null}
                    </div>

                    <div>
                        <label className="text-xs font-black uppercase tracking-widest text-gray-500">Open Date</label>
                        <input
                            type="date"
                            value={form.data.open_date}
                            onChange={(e) => form.setData('open_date', e.target.value)}
                            className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                        />
                        {form.errors.open_date ? (
                            <div className="mt-1 text-xs font-bold text-rose-600">{form.errors.open_date}</div>
                        ) : null}
                    </div>

                    <div>
                        <label className="text-xs font-black uppercase tracking-widest text-gray-500">Close Date</label>
                        <input
                            type="date"
                            value={form.data.close_date}
                            onChange={(e) => form.setData('close_date', e.target.value)}
                            className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                        />
                        {form.errors.close_date ? (
                            <div className="mt-1 text-xs font-bold text-rose-600">{form.errors.close_date}</div>
                        ) : null}
                    </div>

                    <div>
                        <label className="text-xs font-black uppercase tracking-widest text-gray-500">Remuneration (optional)</label>
                        <input
                            value={form.data.remuneration}
                            onChange={(e) => form.setData('remuneration', e.target.value)}
                            className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                        />
                    </div>

                    <div className="flex items-end">
                        <label className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-black text-gray-700">
                            <input
                                type="checkbox"
                                checked={!!form.data.is_active}
                                onChange={(e) => form.setData('is_active', e.target.checked)}
                                className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                            />
                            Active (visible to users)
                        </label>
                    </div>

                    <div className="md:col-span-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-500">Duties (one per line)</label>
                        <textarea
                            value={form.data.duties_text}
                            onChange={(e) => form.setData('duties_text', e.target.value)}
                            className="mt-2 h-40 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-mono focus:border-emerald-500 focus:ring-emerald-500"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-500">Qualifications (one per line)</label>
                        <textarea
                            value={form.data.qualifications_text}
                            onChange={(e) => form.setData('qualifications_text', e.target.value)}
                            className="mt-2 h-40 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-mono focus:border-emerald-500 focus:ring-emerald-500"
                        />
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
