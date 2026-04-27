import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';
import { useEffect, useMemo, useRef, useState } from 'react';

function normalizePhone(v) {
    return (v || '').replace(/\s+/g, '').replace(/^\+/, '');
}

export default function Payment({ amount, currency, payment }) {
    const [paymentType, setPaymentType] = useState(payment?.type || 'mobile');
    const [phone, setPhone] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [apiError, setApiError] = useState(null);

    const [reference, setReference] = useState(payment?.reference || null);
    const [status, setStatus] = useState(payment?.status || null);

    const paid = status === 'completed';

    const pollTimer = useRef(null);

    const canStart = useMemo(() => {
        if (paid) return false;
        if (paymentType === 'card') return true;

        const n = normalizePhone(phone);
        return n.length >= 10;
    }, [paid, paymentType, phone]);

    async function pollOnce() {
        const res = await fetch(route('onboarding.payment.status'), {
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

    const startPayment = async (e) => {
        e.preventDefault();

        setApiError(null);
        setSubmitting(true);

        try {
            const res = await fetch(route('onboarding.payment.start'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': document
                        .querySelector('meta[name="csrf-token"]')
                        ?.getAttribute('content'),
                },
                body: JSON.stringify({
                    payment_type: paymentType,
                    phone_number:
                        paymentType === 'mobile'
                            ? normalizePhone(phone)
                            : null,
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

            if (paymentType === 'card' && data?.payment_url) {
                window.location.href = data.payment_url;
                return;
            }

            if (paymentType === 'mobile') {
                await pollOnce();
            }
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
                    <InputLabel value="Payment method" />
                    <div className="mt-2 grid grid-cols-2 gap-2">
                        <button
                            type="button"
                            onClick={() => setPaymentType('mobile')}
                            className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                                paymentType === 'mobile'
                                    ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
                                    : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            Mobile Money
                        </button>
                        <button
                            type="button"
                            onClick={() => setPaymentType('card')}
                            className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                                paymentType === 'card'
                                    ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
                                    : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            Card
                        </button>
                    </div>
                </div>

                {paymentType === 'mobile' && (
                    <div className="mt-4">
                        <InputLabel htmlFor="phone" value="Phone number" />
                        <TextInput
                            id="phone"
                            name="phone"
                            value={phone}
                            placeholder="2557XXXXXXXX"
                            className="mt-1 block w-full"
                            onChange={(e) => setPhone(e.target.value)}
                            autoComplete="tel"
                        />
                        <div className="mt-1 text-xs text-gray-500">
                            Use format: 255XXXXXXXXX
                        </div>
                    </div>
                )}

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
                        {paymentType === 'card'
                            ? 'Continue to card checkout'
                            : 'Request USSD push'}
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
