import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { UploadCloud } from 'lucide-react';
import { useRef, useState } from 'react';

export default function Apply({ vacancy }) {
    const { flash } = usePage().props;
    const fileInputRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    const { data, setData, post, processing, errors, reset, progress } = useForm({
        advert_name: vacancy?.advertName ?? '',
        cover_letter: null,
    });

    const setFile = (file) => {
        if (!file) return;
        setData('cover_letter', file);
    };

    const onDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer?.files?.[0];
        setFile(file);
    };

    const onDragOver = (e) => {
        e.preventDefault();
        if (!isDragging) setIsDragging(true);
    };

    const onDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('opportunities.apply.store', vacancy.id), {
            forceFormData: true,
            onSuccess: () => {
                reset('cover_letter');
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Apply" />

            <div className="py-10 px-4 sm:px-6 lg:px-10 max-w-[1100px] mx-auto">
                {flash?.success ? (
                    <div className="mb-6 rounded-2xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-900/20 px-6 py-4 text-sm font-black text-emerald-900 dark:text-emerald-200">
                        {flash.success}
                    </div>
                ) : null}

                <div className="flex items-start justify-between gap-4 mb-6">
                    <div>
                        <div className="text-xs font-black tracking-widest uppercase text-emerald-600 dark:text-emerald-400">
                            Application Form
                        </div>
                        <h1 className="mt-2 text-2xl sm:text-3xl font-black text-gray-900 dark:text-white leading-tight">
                            {vacancy.advertName}
                        </h1>
                    </div>

                    <Link
                        href={route('opportunities.show', vacancy.id)}
                        className="h-10 inline-flex items-center px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm font-black text-gray-800 dark:text-gray-100"
                    >
                        Back
                    </Link>
                </div>

                <form onSubmit={submit} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-xl overflow-hidden">
                    <div className="p-6 sm:p-8 space-y-6">
                        <div>
                            <label className="block text-xs font-black tracking-widest uppercase text-gray-600 dark:text-gray-300 mb-2">
                                Job Title
                            </label>
                            <input
                                value={data.advert_name}
                                onChange={(e) => setData('advert_name', e.target.value)}
                                className="w-full h-12 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 text-sm font-black text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                readOnly
                            />
                            {errors.advert_name ? (
                                <div className="mt-2 text-sm font-black text-red-600">{errors.advert_name}</div>
                            ) : null}
                        </div>

                        <div>
                            <label className="block text-xs font-black tracking-widest uppercase text-gray-600 dark:text-gray-300 mb-2">
                                Upload Cover Letter
                            </label>

                            <div
                                className={`relative rounded-3xl border-2 border-dashed p-10 sm:p-12 bg-gray-50 dark:bg-gray-900/30 transition-colors ${
                                    isDragging
                                        ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-900/20'
                                        : 'border-gray-300 dark:border-gray-600'
                                }`}
                                onDrop={onDrop}
                                onDragOver={onDragOver}
                                onDragLeave={onDragLeave}
                            >
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full"
                                >
                                    <div className="flex flex-col items-center text-center">
                                        <div className="w-16 h-16 rounded-3xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                            <UploadCloud className="w-8 h-8 text-emerald-700 dark:text-emerald-300" />
                                        </div>

                                        <div className="mt-5 text-base font-black text-gray-900 dark:text-white">
                                            Drag & drop your document here
                                        </div>
                                        <div className="mt-1 text-sm font-semibold text-gray-600 dark:text-gray-400">
                                            or click to upload (PDF / DOC / DOCX, max 5MB)
                                        </div>

                                        <div className="mt-6 w-full max-w-xl rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/50 px-5 py-4">
                                            <div className="text-sm font-black text-gray-900 dark:text-white truncate">
                                                {data.cover_letter ? data.cover_letter.name : 'No file selected'}
                                            </div>
                                            <div className="mt-1 text-xs font-semibold text-gray-600 dark:text-gray-400">
                                                {data.cover_letter ? `${Math.ceil(data.cover_letter.size / 1024)} KB` : 'Your job application letter'}
                                            </div>
                                        </div>
                                    </div>
                                </button>

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                                    className="hidden"
                                />
                            </div>

                            {progress ? (
                                <div className="mt-4">
                                    <div className="flex items-center justify-between text-xs font-black tracking-widest uppercase text-gray-600 dark:text-gray-300">
                                        <div>Uploading</div>
                                        <div>{progress.percentage}%</div>
                                    </div>
                                    <div className="mt-2 h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                                        <div
                                            className="h-2 rounded-full bg-emerald-600 transition-all"
                                            style={{ width: `${progress.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            ) : null}

                            {errors.cover_letter ? (
                                <div className="mt-2 text-sm font-black text-red-600">{errors.cover_letter}</div>
                            ) : null}
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2">
                            <Link
                                href={route('opportunities.show', vacancy.id)}
                                className="h-11 inline-flex items-center px-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm font-black text-gray-800 dark:text-gray-100"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="h-11 inline-flex items-center px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-black disabled:opacity-60"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
