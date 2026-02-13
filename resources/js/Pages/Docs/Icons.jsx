import { Icons } from '@/components/docs/icons';
import { IconsFallback } from '@/components/docs/icons-fallback';
import { Head } from '@inertiajs/react';
import { Suspense } from 'react';

export default function IconsPage() {
    return (
        <>
            <Head title="Icons" />

            <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
                <div className="mx-auto w-full max-w-6xl px-6 py-10">
                    <div className="mb-8">
                        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
                            Icons
                        </h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Lucide Icons animated with Motion.
                        </p>
                    </div>

                    <div className="overflow-hidden rounded-2xl bg-white/90 shadow-xl ring-1 ring-black/5 backdrop-blur">
                        <div className="p-6 sm:p-8">
                            <h2 className="text-lg font-semibold text-gray-900">
                                List of icons
                            </h2>
                            <p className="mt-1 text-sm text-gray-600">
                                Browse a small curated set. Add more as needed.
                            </p>

                            <div className="mt-6">
                                <Suspense fallback={<IconsFallback />}>
                                    <Icons />
                                </Suspense>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
