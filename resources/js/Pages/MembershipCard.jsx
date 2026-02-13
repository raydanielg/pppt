import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link } from '@inertiajs/react';
import { CreditCard, ChevronLeft, Download, Share2, Loader2 } from 'lucide-react';
import { useMemo, useState, useRef } from 'react';
import Barcode from 'react-barcode';
import QRCode from 'react-qr-code';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

export default function MembershipCard() {
    const { user } = usePage().props.auth;
    const [flipped, setFlipped] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const cardRef = useRef(null);
    
    const initials = (user?.name || 'P').trim().slice(0, 1).toUpperCase();
    const profileUrl = `${window.location.origin}/profile/${user?.id || 'unknown'}`;

    const handleDownload = async () => {
        if (!cardRef.current) return;
        setDownloading(true);
        try {
            // High quality PDF settings
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: [85.6, 53.98] // Standard ID card size CR80
            });

            // Capture Front
            setFlipped(false);
            await new Promise(r => setTimeout(r, 300)); // Wait for render/animation
            const frontDataUrl = await toPng(cardRef.current, {
                cacheBust: true,
                pixelRatio: 3,
                style: { transform: 'none', perspective: 'none' }
            });
            pdf.addImage(frontDataUrl, 'PNG', 0, 0, 85.6, 53.98);

            // Capture Back
            pdf.addPage([85.6, 53.98], 'landscape');
            setFlipped(true);
            await new Promise(r => setTimeout(r, 300));
            const backDataUrl = await toPng(cardRef.current, {
                cacheBust: true,
                pixelRatio: 3,
                style: { transform: 'rotateY(0deg)', perspective: 'none' } // Force back face to render flat
            });
            pdf.addImage(backDataUrl, 'PNG', 0, 0, 85.6, 53.98);

            pdf.save(`physioplanet-card-${user?.membership_number || 'member'}.pdf`);
            
            setFlipped(false); // Reset to front
        } catch (err) {
            console.error('Failed to generate PDF', err);
        } finally {
            setDownloading(false);
        }
    };

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

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link href={route('dashboard')} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        <ChevronLeft className="h-5 w-5" />
                    </Link>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-100">
                        My Membership Card
                    </h2>
                </div>
            }
        >
            <Head title="Membership Card" />

            <div className="flex flex-col items-center justify-center py-8">
                <div className="mx-auto w-full max-w-sm" style={styles.container}>
                    <div
                        ref={cardRef}
                        onClick={() => setFlipped((v) => !v)}
                        onMouseEnter={() => !downloading && setFlipped(true)}
                        onMouseLeave={() => !downloading && setFlipped(false)}
                        className="relative block h-[240px] w-full cursor-pointer rounded-[22px] text-left shadow-[0_25px_60px_rgba(0,0,0,0.35)] transition-shadow hover:shadow-[0_30px_70px_rgba(0,0,0,0.45)]"
                        style={styles.card}
                    >
                        {/* FRONT */}
                        <div
                            className="absolute inset-0 overflow-hidden rounded-[22px] text-white"
                            style={styles.face}
                        >
                            <div className="relative h-full w-full bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-600">
                                {/* Dashboard-style blur effects */}
                                <div className="absolute -left-12 -top-10 h-40 w-40 rounded-full bg-emerald-300/20 blur-3xl" />
                                <div className="absolute -bottom-12 -right-10 h-40 w-40 rounded-full bg-yellow-300/20 blur-3xl" />
                                <div className="absolute inset-0 opacity-5 [background-image:repeating-linear-gradient(135deg,rgba(255,255,255,0.18)_0,rgba(255,255,255,0.18)_2px,transparent_2px,transparent_8px)]" />

                                {/* Top White Section with Wave */}
                                <div className="absolute top-0 left-0 right-0 h-[45%] bg-white shadow-sm">
                                    <div className="absolute bottom-0 left-0 right-0 h-12 translate-y-full overflow-hidden">
                                        <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="h-full w-full">
                                            <path d="M0.00,49.98 C149.99,150.00 349.85,-49.98 500.00,49.98 L500.00,0.00 L0.00,0.00 Z" className="fill-white"></path>
                                        </svg>
                                    </div>
                                </div>

                                <div className="relative h-full w-full p-5 flex flex-col">
                                    {/* Header (On White) */}
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

                                    {/* Spacer to push content down */}
                                    <div className="h-[25%]" />

                                    {/* Profile & Info (In Green Section) */}
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

                                        {/* QR Code on Front */}
                                        <div className="rounded-lg bg-white/95 p-1 shadow-inner shrink-0 mt-2">
                                            <QRCode
                                                size={45}
                                                value={profileUrl}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* BACK */}
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
                    </div>
                </div>

                <div className="mt-8 flex gap-4">
                    <button 
                        onClick={handleDownload}
                        disabled={downloading}
                        className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:bg-emerald-700 active:scale-95 disabled:opacity-70"
                    >
                        {downloading ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                            <Download className="h-5 w-5" />
                        )}
                        <span>{downloading ? 'Preparing...' : 'Download Card'}</span>
                    </button>
                    <button className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-emerald-700 shadow-lg ring-1 ring-emerald-100 transition-all hover:bg-gray-50 active:scale-95 dark:bg-gray-800 dark:text-emerald-400 dark:ring-emerald-900/50">
                        <Share2 className="h-5 w-5" />
                        <span>Share</span>
                    </button>
                </div>

                <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                    Tap the card to view the back. You can use this ID for Physioplanet events.
                </p>
            </div>
        </AuthenticatedLayout>
    );
}
