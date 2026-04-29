import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { UploadCloud, CreditCard, CheckCircle } from 'lucide-react';
import { useRef, useState, useEffect, useMemo } from 'react';

function normalizePhone(v) {
    const cleaned = (v || '').replace(/\s+/g, '').replace(/^\+/, '');
    if (cleaned && !cleaned.startsWith('255')) {
        return '255' + cleaned;
    }
    return cleaned;
}

function getCsrfToken() {
    const meta = document.querySelector('meta[name="csrf-token"]');
    return meta?.getAttribute('content') || '';
}

export default function Apply({ vacancy, payment }) {
    const { flash } = usePage().props;
    const fileInputRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    // Payment states
    const [phone, setPhone] = useState('');
    const [paymentStatus, setPaymentStatus] = useState(payment?.status || null);
    const [paymentReference, setPaymentReference] = useState(payment?.reference || null);
    const [paying, setPaying] = useState(false);
    const [payError, setPayError] = useState(null);
    const pollTimer = useRef(null);

    const { data, setData, post, processing, errors, reset, progress } = useForm({
        advert_name: vacancy?.advertName ?? '',
        cover_letter: null,
    });

    const hasPaid = paymentStatus === 'completed';

    const canPay = useMemo(() => {
        const n = phone.replace(/\D/g, '');
        return n.length >= 9;
    }, [phone]);

    // Poll payment status
    async function pollOnce() {
        const res = await fetch(route('opportunities.payment.status', vacancy.id), {
            credentials: 'same-origin',
            headers: { Accept: 'application/json' },
        });
        const json = await res.json();
        const st = json?.data?.payment_status;
        const ref = json?.data?.payment_reference;

        if (ref) setPaymentReference(ref);
        if (st) setPaymentStatus(st);

        return st;
    }

    useEffect(() => {
        if (!paymentReference || hasPaid) return;

        let cancelled = false;

        async function run() {
            await pollOnce();
            if (cancelled) return;

            pollTimer.current = setInterval(async () => {
                const st = await pollOnce();
                if (st === 'completed' && pollTimer.current) {
                    clearInterval(pollTimer.current);
                    pollTimer.current = null;
                }
            }, 3500);
        }

        run();

        return () => {
            cancelled = true;
            if (pollTimer.current) {
                clearInterval(pollTimer.current);
                pollTimer.current = null;
            }
        };
    }, [paymentReference, hasPaid]);

    const startPayment = async () => {
        const csrfToken = getCsrfToken();
        if (!csrfToken) {
            setPayError('CSRF token not found. Please refresh.');
            return;
        }

        setPayError(null);
        setPaying(true);

        try {
            const res = await fetch(route('opportunities.payment.start', vacancy.id), {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify({
                    phone_number: normalizePhone(phone),
                }),
            });

            const json = await res.json();

            if (!res.ok || json?.status === 'error') {
                setPayError(json?.message || 'Failed to start payment');
                return;
            }

            const data = json?.data || {};
            if (data?.reference) setPaymentReference(data.reference);
            if (data?.status) setPaymentStatus(data.status);

            await pollOnce();
        } catch (err) {
            setPayError('Failed to start payment');
        } finally {
            setPaying(false);
        }
    };

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
        if (!hasPaid) {
            setPayError('Please complete payment before submitting your application.');
            return;
        }
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
                        {/* Payment Section */}
                        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/30 p-5">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                    <CreditCard className="w-5 h-5 text-emerald-700 dark:text-emerald-300" />
                                </div>
                                <div>
                                    <div className="text-sm font-black text-gray-900 dark:text-white">Application Fee</div>
                                    <div className="text-xs text-gray-600 dark:text-gray-400">10,000 TZS required per job application</div>
                                </div>
                            </div>

                            {!hasPaid ? (
                                <>
                                    <div className="mb-4">
                                        <label className="block text-xs font-black tracking-widest uppercase text-gray-600 dark:text-gray-300 mb-2">
                                            Phone number for payment
                                        </label>
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 rounded-l-xl border border-r-0 border-gray-300 bg-gray-100 px-3 py-2 text-sm font-medium text-gray-600">
                                                +255
                                            </div>
                                            <input
                                                value={phone}
                                                placeholder="7XXXXXXXX"
                                                className="block w-full rounded-l-none rounded-r-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                                onChange={(e) => {
                                                    const val = e.target.value.replace(/\D/g, '').slice(0, 9);
                                                    setPhone(val);
                                                }}
                                            />
                                        </div>
                                        <div className="mt-1 text-xs text-gray-500">Enter your number (e.g., 712345678)</div>
                                    </div>

                                    {paymentStatus && paymentStatus !== 'completed' && (
                                        <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                                            Payment status: <span className="font-black">{paymentStatus}</span>
                                            {paymentReference && <div className="text-xs mt-1">Ref: {paymentReference}</div>}
                                        </div>
                                    )}

                                    {payError && (
                                        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                            {payError}
                                        </div>
                                    )}

                                    <button
                                        type="button"
                                        onClick={startPayment}
                                        disabled={!canPay || paying}
                                        className="w-full h-11 inline-flex items-center justify-center rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-black disabled:opacity-60"
                                    >
                                        {paying ? 'Processing...' : 'Pay 10,000 TZS now'}
                                    </button>
                                </>
                            ) : (
                                <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-3">
                                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                                    <div className="text-sm font-black text-emerald-800 dark:text-emerald-200">
                                        Payment completed
                                        {paymentReference && <span className="font-normal text-emerald-600 ml-2">({paymentReference})</span>}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Application Form - Only shown after payment */}
                        <div className={hasPaid ? '' : 'opacity-50 pointer-events-none'}>
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

                            <div className="mt-6">
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
                                disabled={processing || !hasPaid || !data.cover_letter}
                                className="h-11 inline-flex items-center px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-black disabled:opacity-60"
                            >
                                Submit Application
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
