import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';
import { useEffect, useMemo, useRef, useState } from 'react';

function normalizePhone(v) {
    const cleaned = (v || '').replace(/\s+/g, '').replace(/^\+/, '');
    // User enters 7XXXXXXXX, we need 2557XXXXXXXX for API
    if (cleaned && !cleaned.startsWith('255')) {
        return '255' + cleaned;
    }
    return cleaned;
}

function getCsrfToken() {
    const meta = document.querySelector('meta[name="csrf-token"]');
    return meta?.getAttribute('content') || '';
}

export default function Payment({ amount, currency, payment }) {
    const [phone, setPhone] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [apiError, setApiError] = useState(null);

    const [reference, setReference] = useState(payment?.reference || null);
    const [status, setStatus] = useState(payment?.status || null);

    const paid = status === 'completed';

    const pollTimer = useRef(null);

    const canStart = useMemo(() => {
        if (paid) return false;
        // User enters 7XXXXXXXX (9 digits), we add 255 to make 2557XXXXXXXX (12 digits)
        const n = phone.replace(/\D/g, '');
        return n.length >= 9;
    }, [paid, phone]);

    async function pollOnce() {
        const res = await fetch(route('onboarding.payment.status'), {
            credentials: 'same-origin',
            headers: { Accept: 'application/json' },
        });
        const json = await res.json();
        const st = json?.data?.status;
        const ref = json?.data?.reference;

        if (ref) setReference(ref);
        if (st) setStatus(st);

        return st;
    }

    useEffect(() => {
        if (!reference || paid) return;

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
    }, [reference, paid]);

    useEffect(() => {
        if (!paid) return;

        const t = setTimeout(() => {
            window.location.href = route('onboarding.confirm');
        }, 900);

        return () => clearTimeout(t);
    }, [paid]);

    const startPayment = async (e) => {
        e.preventDefault();

        const csrfToken = getCsrfToken();
        if (!csrfToken) {
            setApiError('CSRF token not found. Please refresh the page.');
            return;
        }

        setApiError(null);
        setSubmitting(true);

        try {
            const res = await fetch(route('onboarding.payment.start'), {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify({
                    payment_type: 'mobile',
                    phone_number:
                        normalizePhone(phone),
                }),
            });

            const json = await res.json();

            if (!res.ok || json?.status === 'error') {
                setApiError(json?.message || 'Failed to start payment');
                return;
            }

            const data = json?.data || {};

            if (data?.reference) setReference(data.reference);
            if (data?.status) setStatus(data.status);

            await pollOnce();
        } catch (err) {
            setApiError('Failed to start payment');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <GuestLayout>
            <Head title="Payment" />

            <div className="mb-6">
                <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                    Membership payment
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                    Pay {amount} {currency} to activate your membership ID.
                </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-4">
                <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">Amount</div>
                    <div className="text-sm font-semibold text-gray-900">
                        {amount} {currency}
                    </div>
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="phone" value="Phone number" />
                    <div className="mt-1 flex items-center">
                        <div className="flex-shrink-0 rounded-l-lg border border-r-0 border-gray-300 bg-gray-100 px-3 py-2 text-sm font-medium text-gray-600">
                            +255
                        </div>
                        <TextInput
                            id="phone"
                            name="phone"
                            value={phone}
                            placeholder="7XXXXXXXX"
                            className="block w-full rounded-l-none"
                            onChange={(e) => {
                                // Only allow digits, max 9 digits after 255
                                const val = e.target.value.replace(/\D/g, '').slice(0, 9);
                                setPhone(val);
                            }}
                            autoComplete="tel"
                        />
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                        Enter your number (e.g., 712345678)
                    </div>
                </div>

                <div className="mt-4">
                    <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Status</span>
                            <span
                                className={`font-medium ${
                                    paid
                                        ? 'text-emerald-700'
                                        : status === 'failed' ||
                                          status === 'expired'
                                        ? 'text-red-700'
                                        : 'text-gray-800'
                                }`}
                            >
                                {paid
                                    ? 'Paid'
                                    : status || 'Not started'}
                            </span>
                        </div>
                        {reference && (
                            <div className="mt-1 text-xs text-gray-500">
                                Ref: {reference}
                            </div>
                        )}
                    </div>
                </div>

                {apiError && (
                    <div className="mt-3">
                        <InputError message={apiError} />
                    </div>
                )}

                <form onSubmit={startPayment} className="mt-4">
                    <PrimaryButton
                        className="w-full justify-center"
                        disabled={!canStart || submitting}
                    >
                        Pay now
                    </PrimaryButton>
                </form>

                <div className="mt-3">
                    <PrimaryButton
                        className="w-full justify-center"
                        disabled={!paid}
                        onClick={() => (window.location.href = route('onboarding.confirm'))}
                        type="button"
                    >
                        Continue
                    </PrimaryButton>
                </div>

                <div className="mt-3 text-center text-xs text-gray-500">
                    <Link
                        href={route('onboarding.country')}
                        className="underline hover:text-gray-700"
                    >
                        Change country
                    </Link>
                </div>
            </div>
        </GuestLayout>
    );
}
