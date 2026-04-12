import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link } from '@inertiajs/react';
import { Calendar as CalendarIcon, MessageSquare, BookOpen, FileText, Activity, Clock, ChevronRight, Briefcase, Image, HeartPulse, Microscope, Library, Newspaper } from 'lucide-react';

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
                                <Link
                                    href={route('messages')}
                                    className="group flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-3 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900/20 dark:hover:bg-gray-900/30"
                                >
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-300 dark:ring-emerald-900/50">
                                        <MessageSquare className="h-5 w-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="truncate text-xs font-black text-gray-900 dark:text-gray-100">Messages</div>
                                        <div className="truncate text-[10px] text-gray-500 dark:text-gray-400">Chat with members</div>
                                    </div>
                                </Link>

                                <Link
                                    href={route('forum')}
                                    className="group flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-3 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900/20 dark:hover:bg-gray-900/30"
                                >
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700 ring-1 ring-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:ring-blue-900/50">
                                        <MessageSquare className="h-5 w-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="truncate text-xs font-black text-gray-900 dark:text-gray-100">Forum</div>
                                        <div className="truncate text-[10px] text-gray-500 dark:text-gray-400">Join discussions</div>
                                    </div>
                                </Link>

                                <Link
                                    href={route('opportunities')}
                                    className="group flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-3 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900/20 dark:hover:bg-gray-900/30"
                                >
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700 ring-1 ring-amber-100 dark:bg-amber-900/20 dark:text-amber-300 dark:ring-amber-900/50">
                                        <Briefcase className="h-5 w-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="truncate text-xs font-black text-gray-900 dark:text-gray-100">Opportunities</div>
                                        <div className="truncate text-[10px] text-gray-500 dark:text-gray-400">Find vacancies</div>
                                    </div>
                                </Link>

                                <Link
                                    href={route('gallery')}
                                    className="group flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-3 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900/20 dark:hover:bg-gray-900/30"
                                >
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-fuchsia-50 text-fuchsia-700 ring-1 ring-fuchsia-100 dark:bg-fuchsia-900/20 dark:text-fuchsia-300 dark:ring-fuchsia-900/50">
                                        <Image className="h-5 w-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="truncate text-xs font-black text-gray-900 dark:text-gray-100">Gallery</div>
                                        <div className="truncate text-[10px] text-gray-500 dark:text-gray-400">View photos</div>
                                    </div>
                                </Link>

                                <Link
                                    href={route('health-tips')}
                                    className="group flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-3 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900/20 dark:hover:bg-gray-900/30"
                                >
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-300 dark:ring-emerald-900/50">
                                        <HeartPulse className="h-5 w-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="truncate text-xs font-black text-gray-900 dark:text-gray-100">Health Tips</div>
                                        <div className="truncate text-[10px] text-gray-500 dark:text-gray-400">Daily guidance</div>
                                    </div>
                                </Link>

                                <Link
                                    href={route('research-tips')}
                                    className="group flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-3 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900/20 dark:hover:bg-gray-900/30"
                                >
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100 dark:bg-indigo-900/20 dark:text-indigo-300 dark:ring-indigo-900/50">
                                        <Microscope className="h-5 w-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="truncate text-xs font-black text-gray-900 dark:text-gray-100">Research Tips</div>
                                        <div className="truncate text-[10px] text-gray-500 dark:text-gray-400">Improve research</div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Recent Content - POWER DESIGN */}
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg shadow-gray-100 dark:border-gray-700 dark:bg-gray-800/60">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-200">
                                    <Library className="h-5 w-5" />
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900 dark:text-gray-100">Recent Content</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">Blogs, documents & research</div>
                                </div>
                            </div>
                            <Link 
                                href={route('docs.icons')} 
                                className="group flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
                            >
                                View all
                                <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        <div className="mt-5 grid gap-4 md:grid-cols-2">
                            {/* Document Card */}
                            <Link 
                                href={route('docs.icons')}
                                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-100 hover:border-emerald-200 hover:-translate-y-1 dark:border-gray-700 dark:bg-gray-900/20"
                            >
                                {/* Hover Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                
                                <div className="relative flex items-start gap-4">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-600 ring-1 ring-emerald-200 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 dark:from-emerald-900/30 dark:to-emerald-900/50 dark:text-emerald-300 dark:ring-emerald-800">
                                        <FileText className="h-7 w-7" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">Document</span>
                                            <span className="text-[10px] text-gray-400 dark:text-gray-500 flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                1 day ago
                                            </span>
                                        </div>
                                        <h4 className="text-sm font-black text-gray-900 dark:text-gray-100 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                                            Introduction to Physioplanet
                                        </h4>
                                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                                            Quick guide to get started with the platform and explore features.
                                        </p>
                                    </div>
                                </div>
                                
                                {/* View Button */}
                                <div className="relative mt-4 flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        Click to view
                                    </span>
                                    <span className="inline-flex items-center gap-1 rounded-xl bg-emerald-600 px-4 py-2 text-[11px] font-black text-white shadow-lg shadow-emerald-200 group-hover:bg-emerald-700 group-hover:shadow-emerald-300 transition-all duration-300">
                                        View
                                        <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </div>
                            </Link>

                            {/* Blog Post Card */}
                            <Link 
                                href={route('blogs')}
                                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-500 hover:shadow-xl hover:shadow-amber-100 hover:border-amber-200 hover:-translate-y-1 dark:border-gray-700 dark:bg-gray-900/20"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 via-amber-500/0 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                
                                <div className="relative flex items-start gap-4">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 text-amber-600 ring-1 ring-amber-200 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 dark:from-amber-900/30 dark:to-amber-900/50 dark:text-amber-300 dark:ring-amber-800">
                                        <BookOpen className="h-7 w-7" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">Blog Post</span>
                                            <span className="text-[10px] text-gray-400 dark:text-gray-500 flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                2 days ago
                                            </span>
                                        </div>
                                        <h4 className="text-sm font-black text-gray-900 dark:text-gray-100 line-clamp-1 group-hover:text-amber-700 transition-colors">
                                            Latest Physiotherapy Trends 2026
                                        </h4>
                                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                                            Highlights and new practices in physiotherapy industry this year.
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="relative mt-4 flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        Click to read
                                    </span>
                                    <span className="inline-flex items-center gap-1 rounded-xl bg-amber-500 px-4 py-2 text-[11px] font-black text-white shadow-lg shadow-amber-200 group-hover:bg-amber-600 group-hover:shadow-amber-300 transition-all duration-300">
                                        Read
                                        <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </div>
                            </Link>

                            {/* Research Card */}
                            <Link 
                                href={route('research-tips')}
                                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-100 hover:border-indigo-200 hover:-translate-y-1 dark:border-gray-700 dark:bg-gray-900/20"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-indigo-500/0 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                
                                <div className="relative flex items-start gap-4">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 text-indigo-600 ring-1 ring-indigo-200 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 dark:from-indigo-900/30 dark:to-indigo-900/50 dark:text-indigo-300 dark:ring-indigo-800">
                                        <Microscope className="h-7 w-7" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">Research</span>
                                            <span className="text-[10px] text-gray-400 dark:text-gray-500 flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                3 days ago
                                            </span>
                                        </div>
                                        <h4 className="text-sm font-black text-gray-900 dark:text-gray-100 line-clamp-1 group-hover:text-indigo-700 transition-colors">
                                            How to write a strong proposal
                                        </h4>
                                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                                            Simple structure and tips for writing successful research proposals.
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="relative mt-4 flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        Click to open
                                    </span>
                                    <span className="inline-flex items-center gap-1 rounded-xl bg-indigo-600 px-4 py-2 text-[11px] font-black text-white shadow-lg shadow-indigo-200 group-hover:bg-indigo-700 group-hover:shadow-indigo-300 transition-all duration-300">
                                        Open
                                        <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </div>
                            </Link>

                            {/* News Card */}
                            <Link 
                                href={route('hot-news')}
                                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-500 hover:shadow-xl hover:shadow-rose-100 hover:border-rose-200 hover:-translate-y-1 dark:border-gray-700 dark:bg-gray-900/20"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/0 via-rose-500/0 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                
                                <div className="relative flex items-start gap-4">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-50 to-rose-100 text-rose-600 ring-1 ring-rose-200 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 dark:from-rose-900/30 dark:to-rose-900/50 dark:text-rose-300 dark:ring-rose-800">
                                        <Newspaper className="h-7 w-7" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-rose-700 dark:bg-rose-900/40 dark:text-rose-300">News</span>
                                            <span className="text-[10px] text-gray-400 dark:text-gray-500 flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                4 days ago
                                            </span>
                                        </div>
                                        <h4 className="text-sm font-black text-gray-900 dark:text-gray-100 line-clamp-1 group-hover:text-rose-700 transition-colors">
                                            Updates in Physioplanet
                                        </h4>
                                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                                            Latest announcements, changes and important updates for members.
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="relative mt-4 flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        Click to view
                                    </span>
                                    <span className="inline-flex items-center gap-1 rounded-xl bg-rose-600 px-4 py-2 text-[11px] font-black text-white shadow-lg shadow-rose-200 group-hover:bg-rose-700 group-hover:shadow-rose-300 transition-all duration-300">
                                        View
                                        <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
