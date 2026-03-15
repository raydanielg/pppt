import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { ArrowLeft, Download, ExternalLink } from 'lucide-react';

function formatBytes(bytes) {
    const n = Number(bytes || 0);
    if (!n) return '—';
    const units = ['B', 'KB', 'MB', 'GB'];
    let v = n;
    let i = 0;
    while (v >= 1024 && i < units.length - 1) {
        v /= 1024;
        i += 1;
    }
    return `${v.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

export default function ApplicationShow({ application, hasReviewed }) {
    const flash = usePage().props.flash;

    const isPdf = String(application?.cover_letter_mime || '').toLowerCase().includes('pdf');

    const form = useForm({
        is_reviewed: Boolean(application?.is_reviewed ?? false),
    });

    const saveReviewed = (value) => {
        form.setData('is_reviewed', value);
        form.put(route('admin.opportunity-applications.review', application.id), {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout title="Application Details">
            <Head title="Admin - Application Details" />

            {flash?.success ? (
                <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-black text-emerald-800">
                    {flash.success}
                </div>
            ) : null}

            <div className="mb-4 flex items-center justify-between gap-3">
                <Link
                    href={route('admin.opportunity-applications.index')}
                    className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-black text-gray-700 hover:bg-gray-50"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Link>

                <div className="flex items-center gap-2">
                    <a
                        href={route('admin.opportunity-applications.view', application.id)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-black text-gray-700 hover:bg-gray-50"
                    >
                        <ExternalLink className="h-4 w-4" />
                        Open
                    </a>
                    <a
                        href={route('admin.opportunity-applications.download', application.id)}
                        className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-black text-white hover:bg-emerald-700"
                    >
                        <Download className="h-4 w-4" />
                        Download
                    </a>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:col-span-2">
                    <div className="text-sm font-black text-gray-900">Applicant</div>
                    <div className="mt-3 grid gap-2">
                        <div className="text-sm font-black text-gray-900">{application.user?.name}</div>
                        <div className="text-xs text-gray-500">{application.user?.email}</div>
                    </div>

                    <div className="mt-6 text-sm font-black text-gray-900">Opportunity</div>
                    <div className="mt-3 grid gap-2">
                        <div className="text-sm font-black text-gray-900">{application.opportunity?.advert_name ?? application.advert_name}</div>
                        <div className="text-xs text-gray-500">{application.opportunity?.employer_name || '—'}</div>
                        <div className="text-xs text-gray-500">
                            Posts: {application.opportunity?.posts ?? '—'} • Open: {application.opportunity?.open_date ?? '—'} • Close: {application.opportunity?.close_date ?? '—'}
                        </div>
                        <div className="text-xs text-gray-500">Remuneration: {application.opportunity?.remuneration || '—'}</div>
                    </div>

                    <div className="mt-6 text-sm font-black text-gray-900">Cover Letter File</div>
                    <div className="mt-3 overflow-hidden rounded-2xl border border-gray-200">
                        <div className="px-4 py-3">
                            <div className="text-xs font-mono text-gray-800 break-all">{application.cover_letter_original_name}</div>
                            <div className="mt-1 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                {application.cover_letter_mime} • {formatBytes(application.cover_letter_size)}
                            </div>
                            <div className="mt-2 text-xs text-gray-500">Application ID: {application.id}</div>
                            <div className="mt-1 text-xs text-gray-500">Submitted: {new Date(application.created_at).toLocaleString()}</div>
                            <div className="mt-1 text-xs text-gray-500">Last update: {new Date(application.updated_at).toLocaleString()}</div>
                        </div>
                    </div>

                    <div className="mt-6 text-sm font-black text-gray-900">Document Preview</div>
                    <div className="mt-3 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
                        {isPdf ? (
                            <iframe
                                title="Cover letter preview"
                                src={route('admin.opportunity-applications.view', application.id)}
                                className="h-[70vh] w-full"
                            />
                        ) : (
                            <div className="p-5">
                                <div className="text-sm font-black text-gray-900">Preview not available</div>
                                <div className="mt-1 text-xs text-gray-500">
                                    This document type cannot be previewed in the browser. Use Open/Download.
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5">
                    <div className="text-sm font-black text-gray-900">Status</div>
                    <div className="mt-1 text-xs text-gray-500">Manage application state.</div>

                    {hasReviewed ? (
                        <div className="mt-4">
                            <div className="text-xs font-black uppercase tracking-widest text-gray-500">Reviewed</div>
                            <div className="mt-2 flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => saveReviewed(false)}
                                    className={
                                        'rounded-xl px-3 py-2 text-xs font-black border ' +
                                        (!form.data.is_reviewed
                                            ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                                            : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50')
                                    }
                                >
                                    Pending
                                </button>
                                <button
                                    type="button"
                                    onClick={() => saveReviewed(true)}
                                    className={
                                        'rounded-xl px-3 py-2 text-xs font-black border ' +
                                        (form.data.is_reviewed
                                            ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                                            : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50')
                                    }
                                >
                                    Reviewed
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-black text-amber-800">
                            Reviewed status not enabled yet.
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={() => {
                            if (!confirm('Delete this application?')) return;
                            router.delete(route('admin.opportunity-applications.destroy', application.id));
                        }}
                        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-xs font-black text-rose-700 hover:bg-rose-100"
                    >
                        Delete Application
                    </button>
                </div>
            </div>
        </AdminLayout>
    );
}
