import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link } from '@inertiajs/react';
import { Calendar as CalendarIcon, MessageSquare, BookOpen, FileText, Activity, Clock, ChevronRight } from 'lucide-react';

export default function Dashboard() {
    const user = usePage().props.auth.user;
    const today = new Date();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
    
    const monthName = today.toLocaleString('default', { month: 'long' });
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="grid gap-6 lg:grid-cols-3 lg:grid-rows-[auto_auto]">
                <div className="lg:col-span-2">
                    <div className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-600 p-6 text-white shadow-lg dark:border-emerald-900/40">
                        <div className="pointer-events-none absolute -left-14 -top-16 h-56 w-56 rounded-full bg-emerald-300/20 blur-3xl" />
                        <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-yellow-300/20 blur-3xl" />
                        <div className="pointer-events-none absolute inset-0 opacity-10 [background-image:repeating-linear-gradient(135deg,rgba(255,255,255,0.18)_0,rgba(255,255,255,0.18)_2px,transparent_2px,transparent_8px)]" />

                        <div className="relative">
                            <div className="text-sm font-semibold tracking-widest text-yellow-200">
                                Hello 👋✨
                            </div>
                            <div className="mt-2 text-2xl font-bold tracking-tight">
                                {user?.name ? (
                                    <span>
                                        {user.name}, welcome back
                                    </span>
                                ) : (
                                    <span>Welcome back</span>
                                )}
                            </div>
                            <div className="mt-2 text-sm text-white/85">
                                You’re inside{' '}
                                <span className="font-semibold text-yellow-200">
                                    Physioplanet
                                </span>
                                , your home for physiotherapy learning, community, and
                                growth.
                            </div>

                            {user?.membership_number && (
                                <Link
                                    href={route('membership.card')}
                                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-black/20 px-4 py-2 text-sm ring-1 ring-white/10 transition hover:bg-black/30 active:scale-95"
                                >
                                    <span className="text-white/70">Member No:</span>
                                    <span className="font-mono font-semibold tracking-wider">
                                        {user.membership_number}
                                    </span>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="rounded-2xl border border-gray-200 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-gray-700 dark:bg-gray-800/60 h-full">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-700">
                            <div className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-100">
                                <CalendarIcon className="h-4 w-4 text-emerald-600" />
                                <span>{monthName} {today.getFullYear()}</span>
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[11px] font-medium text-gray-400">
                            <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                        </div>
                        <div className="mt-2 grid grid-cols-7 gap-1">
                            {blanks.map(b => <div key={`b-${b}`} className="h-8" />)}
                            {days.map(day => (
                                <div 
                                    key={day} 
                                    className={`flex h-8 w-full items-center justify-center rounded-lg text-xs transition ${day === today.getDate() ? 'bg-emerald-600 font-bold text-white shadow-md' : 'text-gray-600 hover:bg-emerald-50 dark:text-gray-300 dark:hover:bg-emerald-900/20'}`}
                                >
                                    {day}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-3 space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Recent Activities */}
                        <div className="rounded-2xl border border-gray-200 bg-white/80 p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800/60">
                            <div className="flex items-center gap-2 border-b border-gray-100 pb-3 font-semibold text-gray-900 dark:border-gray-700 dark:text-gray-100">
                                <Activity className="h-4 w-4 text-blue-500" />
                                <span>Login Activities</span>
                            </div>
                            <div className="mt-4 space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/20">
                                        <Clock className="h-4 w-4" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-xs font-medium text-gray-900 dark:text-gray-100">Just now</p>
                                        <p className="truncate text-[10px] text-gray-500 dark:text-gray-400">Successful login from Tanzania</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-gray-600 dark:bg-gray-700">
                                        <Clock className="h-4 w-4" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-xs font-medium text-gray-900 dark:text-gray-100">2 hours ago</p>
                                        <p className="truncate text-[10px] text-gray-500 dark:text-gray-400">Session refreshed</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="rounded-2xl border border-gray-200 bg-white/80 p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800/60">
                            <div className="border-b border-gray-100 pb-3 font-semibold text-gray-900 dark:border-gray-700 dark:text-gray-100">
                                Quick Actions
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-3">
                                <Link href={route('forum')} className="flex flex-col items-center justify-center gap-2 rounded-xl bg-emerald-50 p-3 transition hover:bg-emerald-100 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/30">
                                    <MessageSquare className="h-5 w-5 text-emerald-600" />
                                    <span className="text-[10px] font-medium text-emerald-800 dark:text-emerald-200 text-center leading-tight">Get in Touch via Forum</span>
                                </Link>
                                <Link href={route('blogs')} className="flex flex-col items-center justify-center gap-2 rounded-xl bg-yellow-50 p-3 transition hover:bg-yellow-100 dark:bg-yellow-900/20 dark:hover:bg-yellow-900/30">
                                    <BookOpen className="h-5 w-5 text-yellow-600" />
                                    <span className="text-[10px] font-medium text-yellow-800 dark:text-yellow-200 text-center leading-tight">Read Blogs</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Recent Content */}
                    <div className="rounded-2xl border border-gray-200 bg-white/80 p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800/60">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-700">
                            <div className="font-semibold text-gray-900 dark:text-gray-100">
                                Recent Blogs & Documents
                            </div>
                            <Link href={route('docs.icons')} className="text-xs font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300">View all</Link>
                        </div>
                        <div className="mt-4 space-y-4">
                            {/* Document Item */}
                            <div className="group relative overflow-hidden rounded-2xl border border-emerald-100 bg-emerald-50/30 p-4 transition-all hover:border-emerald-200 hover:bg-emerald-50 dark:border-emerald-900/30 dark:bg-emerald-900/10 dark:hover:border-emerald-800/50">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-emerald-100 dark:bg-gray-800 dark:ring-emerald-900/50">
                                            <FileText className="h-6 w-6 text-emerald-600" />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="rounded-md bg-emerald-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">Document</span>
                                                <span className="text-[10px] text-gray-400 dark:text-gray-500">• 1 day ago</span>
                                            </div>
                                            <p className="mt-1 truncate text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-tight">Introduction to Physioplanet</p>
                                        </div>
                                    </div>
                                    <button className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 hover:shadow-md active:scale-95 sm:w-auto">
                                        <span>View Document</span>
                                        <ChevronRight className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                            </div>

                            {/* Blog Item */}
                            <div className="group relative overflow-hidden rounded-2xl border border-yellow-100 bg-yellow-50/30 p-4 transition-all hover:border-yellow-200 hover:bg-yellow-50 dark:border-yellow-900/30 dark:bg-yellow-900/10 dark:hover:border-yellow-800/50">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-yellow-100 dark:bg-gray-800 dark:ring-yellow-900/50">
                                            <BookOpen className="h-6 w-6 text-yellow-600" />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="rounded-md bg-yellow-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300">Blog Post</span>
                                                <span className="text-[10px] text-gray-400 dark:text-gray-500">• 2 days ago</span>
                                            </div>
                                            <p className="mt-1 truncate text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-tight">Latest Physiotherapy Trends 2026</p>
                                        </div>
                                    </div>
                                    <button className="flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-yellow-600 hover:shadow-md active:scale-95 sm:w-auto">
                                        <span>Read Blog</span>
                                        <ChevronRight className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
