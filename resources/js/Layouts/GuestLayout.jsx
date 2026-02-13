import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-green-50 via-white to-yellow-50 px-4 py-10 sm:px-6 sm:justify-center sm:py-0">
            <div>
                <Link href="/">
                    <img
                        src="/logo.png"
                        alt="Physioplanet"
                        className="h-20 w-20 object-contain"
                    />
                </Link>
            </div>

            <div className="mt-6 w-full max-w-md overflow-hidden bg-white/90 px-5 py-6 shadow-xl ring-1 ring-black/5 backdrop-blur sm:max-w-lg sm:rounded-xl sm:px-8">
                {children}
            </div>
        </div>
    );
}
