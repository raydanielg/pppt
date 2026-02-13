import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { CreditCard } from 'lucide-react';
import { useMemo, useState } from 'react';
import Barcode from 'react-barcode';
import QRCode from 'react-qr-code';

export default function Membership({ user }) {
    const { post, processing } = useForm({});

    const initials = (user?.name || 'P').trim().slice(0, 1).toUpperCase();

    const [flipped, setFlipped] = useState(false);

    const styles = useMemo(
        () => ({
            container: { perspective: '1500px' },
            card: {
                transformStyle: 'preserve-3d',
                transition: 'transform 1000ms',
                transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            },
            face: {
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
            },
            back: {
                transform: 'rotateY(180deg)',
            },
        }),
        [flipped],
    );

    const submit = (e) => {
        e.preventDefault();
        post(route('onboarding.complete'));
    };

    return (
        <GuestLayout>
            <Head title="Membership" />

            <div className="mb-6">
                <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                    You’re all set
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                    Here is your membership card.
                </p>
            </div>

            <div className="mx-auto w-full max-w-sm" style={styles.container}>
                <button
                    type="button"
                    onClick={() => setFlipped((v) => !v)}
                    onMouseEnter={() => setFlipped(true)}
                    onMouseLeave={() => setFlipped(false)}
                    className="relative block h-[240px] w-full rounded-[22px] text-left shadow-[0_25px_60px_rgba(0,0,0,0.35)] focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
                    style={styles.card}
                    aria-label="Membership card"
                >
                    <div
                        className="absolute inset-0 overflow-hidden rounded-[22px] text-white"
                        style={styles.face}
                    >
                        <div className="relative h-full w-full bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-600">
                            <div className="absolute -left-12 -top-10 h-40 w-40 rounded-full bg-emerald-300/20 blur-3xl" />
                            <div className="absolute -bottom-12 -right-10 h-40 w-40 rounded-full bg-yellow-300/20 blur-3xl" />
                            <div className="absolute inset-0 opacity-5 [background-image:repeating-linear-gradient(135deg,rgba(255,255,255,0.18)_0,rgba(255,255,255,0.18)_2px,transparent_2px,transparent_8px)]" />

                            <div className="absolute top-0 left-0 right-0 h-[45%] bg-white shadow-sm">
                                <div className="absolute bottom-0 left-0 right-0 h-12 translate-y-full overflow-hidden">
                                    <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="h-full w-full">
                                        <path d="M0.00,49.98 C149.99,150.00 349.85,-49.98 500.00,49.98 L500.00,0.00 L0.00,0.00 Z" className="fill-white"></path>
                                    </svg>
                                </div>
                            </div>

                            <div className="relative h-full w-full p-5 flex flex-col">
                                <div className="relative flex items-start justify-between">
                                    <div className="flex items-center gap-2 pt-1">
                                        <CreditCard className="h-5 w-5 text-emerald-700" />
                                        <span className="text-[10px] font-black tracking-tight uppercase text-emerald-900">
                                            PHYSIOPLANET PLATFORM {user?.country}
                                        </span>
                                    </div>

                                    <div className="flex flex-col items-end">
                                        <img
                                            src="/logo.png"
                                            alt="Logo"
                                            className="h-12 w-12 rounded-xl bg-white/10 p-1 drop-shadow-sm"
                                        />
                                        <span className="text-[7px] font-bold text-emerald-800 tracking-tight italic mt-0.5">
                                            Physiotherapy is a Leaf of Life
                                        </span>
                                    </div>
                                </div>

                                <div className="h-[25%]" />

                                <div className="relative flex items-center gap-3 mt-2">
                                    <div className="h-[80px] w-[80px] shrink-0 overflow-hidden rounded-full border-4 border-white bg-emerald-900 flex items-center justify-center shadow-lg -mt-8 z-10">
                                        {user?.avatar_url ? (
                                            <img
                                                src={user.avatar_url}
                                                alt={user?.name}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-3xl font-bold text-white/90">{initials}</span>
                                        )}
                                    </div>

                                    <div className="min-w-0 flex-1 pt-2">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-yellow-200 uppercase font-bold tracking-tighter">Full Name</span>
                                            <div className="truncate text-sm font-black leading-tight uppercase text-white drop-shadow-sm">
                                                {user?.name}
                                            </div>
                                        </div>
                                        <div className="flex flex-col mt-1">
                                            <div className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-2 py-1 backdrop-blur-md border border-white/20 shadow-inner">
                                                <span className="text-[9px] text-yellow-200 uppercase font-bold tracking-tighter whitespace-nowrap">Member No:</span>
                                                <span className="text-[11px] text-white font-mono font-bold tracking-wider">
                                                    {user?.membership_number}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mt-1 flex items-center gap-1.5">
                                            <span className="text-[10px] text-yellow-200 uppercase font-bold tracking-tighter">Country:</span>
                                            <span className="text-[11px] text-white font-black uppercase tracking-tight">
                                                {user?.country}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="rounded-lg bg-white/95 p-1 shadow-inner shrink-0 mt-2">
                                        <QRCode
                                            size={45}
                                            value={`${window.location.origin}/profile/${user?.id || 'unknown'}`}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className="absolute inset-0 overflow-hidden rounded-[22px] text-white"
                        style={{ ...styles.face, ...styles.back }}
                    >
                        <div className="relative flex h-full w-full flex-col justify-between bg-gradient-to-br from-emerald-800 via-emerald-600 to-emerald-400 p-5 text-center">
                            <div className="absolute -top-10 -right-10 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
                            <div className="absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-yellow-200/10 blur-2xl" />

                            <div>
                                <div className="text-[10px] font-extrabold tracking-[0.3em] uppercase text-yellow-200 text-center">
                                    MEMBERSHIP TERMS
                                </div>
                                <div className="mt-2 text-[10px] leading-relaxed text-white/90 font-medium text-center px-2">
                                    This card is the property of <span className="font-bold text-yellow-100">Physioplanet</span>. It is non-transferable and must be presented upon request for membership benefits and events.
                                </div>
                            </div>

                            {/* Barcode in the Middle */}
                            <div className="flex flex-col items-center justify-center gap-1">
                                <div className="rounded-lg bg-white/95 p-1.5 shadow-inner">
                                    <Barcode
                                        value={user?.membership_number || '000000'}
                                        height={35}
                                        width={1.2}
                                        displayValue={false}
                                        background="transparent"
                                        margin={0}
                                    />
                                </div>
                                <span className="text-[10px] font-mono font-bold tracking-tighter opacity-80">{user?.membership_number}</span>
                            </div>

                            <div>
                                <div className="text-[10px] font-semibold text-white/70 tracking-tight">
                                    info@physioplanet.org | www.physioplanet.org
                                </div>
                            </div>
                        </div>
                    </div>
                </button>

                <div className="mt-3 text-center text-xs text-gray-500">
                    Tap the card to flip. On desktop you can also hover.
                </div>
            </div>

            <form onSubmit={submit} className="mt-6">
                <PrimaryButton
                    className="w-full justify-center"
                    disabled={processing}
                >
                    Continue to dashboard
                </PrimaryButton>
            </form>
        </GuestLayout>
    );
}
