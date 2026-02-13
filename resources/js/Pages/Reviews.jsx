import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Star } from 'lucide-react';

const Stars = ({ rating = 0 }) => {
    const value = Math.max(0, Math.min(5, Number(rating) || 0));

    return (
        <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    className={
                        'h-4 w-4 ' +
                        (i < value
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-300 dark:text-gray-700')
                    }
                />
            ))}
        </div>
    );
};

export default function Reviews({ reviews = [], stats = null }) {
    const count = stats?.count ?? reviews.length;
    const avgRating = Number(stats?.avg_rating ?? 0);
    const byCategory = stats?.by_category || [];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-white">
                    Reviews
                </h2>
            }
        >
            <Head title="Reviews" />

            <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl border border-gray-200 bg-white/60 p-5 shadow-sm backdrop-blur dark:border-gray-700 dark:bg-gray-900/40">
                        <div className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                            Total Reviews
                        </div>
                        <div className="mt-2 text-3xl font-black text-gray-900 dark:text-white">
                            {count}
                        </div>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white/60 p-5 shadow-sm backdrop-blur dark:border-gray-700 dark:bg-gray-900/40">
                        <div className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                            Average Rating
                        </div>
                        <div className="mt-2 flex items-center justify-between gap-4">
                            <div className="text-3xl font-black text-gray-900 dark:text-white">
                                {avgRating.toFixed(2)}
                            </div>
                            <Stars rating={count > 0 ? Math.round(avgRating) : 0} />
                        </div>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white/60 p-5 shadow-sm backdrop-blur dark:border-gray-700 dark:bg-gray-900/40">
                        <div className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                            Top Categories
                        </div>
                        <div className="mt-3 space-y-2">
                            {byCategory.slice(0, 3).map((row) => (
                                <div key={row.category} className="flex items-center justify-between gap-4">
                                    <div className="min-w-0 truncate text-sm font-bold text-gray-800 dark:text-gray-100">
                                        {row.category}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-black text-gray-500 dark:text-gray-400">
                                            {row.count}
                                        </span>
                                        <span className="rounded-full bg-amber-400/20 px-2 py-0.5 text-xs font-black text-amber-700 dark:text-amber-300">
                                            {row.avg_rating}
                                        </span>
                                    </div>
                                </div>
                            ))}

                            {byCategory.length === 0 && (
                                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    No categories yet
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white/60 p-6 shadow-sm backdrop-blur dark:border-gray-700 dark:bg-gray-900/40">
                    <div className="mb-5 flex items-end justify-between gap-4">
                        <div>
                            <div className="text-lg font-black text-gray-900 dark:text-white">Latest Reviews</div>
                            <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                What members are saying across different areas
                            </div>
                        </div>
                    </div>

                    {reviews.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-gray-300 p-10 text-center dark:border-gray-700">
                            <div className="text-sm font-black text-gray-900 dark:text-white">
                                No reviews yet
                            </div>
                            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                This page will automatically list real reviews once members start submitting them.
                            </div>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-200/60 dark:divide-gray-800">
                            {reviews.map((r) => (
                                <div key={r.id} className="py-5 first:pt-0 last:pb-0">
                                    <div className="flex items-start justify-between gap-6">
                                        <div className="flex min-w-0 items-start gap-4">
                                            <div className="h-12 w-12 overflow-hidden rounded-2xl bg-emerald-600 ring-1 ring-black/5 shadow-sm dark:ring-white/10">
                                                <img
                                                    src={r.user?.avatar_url}
                                                    alt={r.user?.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>

                                            <div className="min-w-0">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <div className="truncate text-sm font-black text-gray-900 dark:text-white">
                                                        {r.user?.name || 'Unknown'}
                                                    </div>
                                                    <span className="rounded-full bg-emerald-700/10 px-2 py-0.5 text-xs font-black text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-200">
                                                        {r.category}
                                                    </span>
                                                </div>

                                                {r.title && (
                                                    <div className="mt-1 text-sm font-bold text-gray-900 dark:text-gray-100">
                                                        {r.title}
                                                    </div>
                                                )}

                                                {r.body && (
                                                    <div className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                                                        {r.body}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex shrink-0 flex-col items-end gap-1">
                                            <div className="flex items-center gap-2">
                                                <Stars rating={r.rating} />
                                                <span className="text-xs font-black text-gray-600 dark:text-gray-400">
                                                    {r.rating}/5
                                                </span>
                                            </div>
                                            <div className="text-xs font-bold text-gray-500 dark:text-gray-400">
                                                {r.created_at ? new Date(r.created_at).toLocaleDateString() : ''}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
