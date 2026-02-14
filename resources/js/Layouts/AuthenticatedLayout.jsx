import { Link, usePage } from '@inertiajs/react';
import { User, Star, LogOut, Search, Bell, MessageSquare, LayoutDashboard, HeartPulse, Microscope, Library, Newspaper, Image, Briefcase, FileText, Users } from 'lucide-react';
import { useState } from 'react';

const NavItem = ({ href, active, children, icon: Icon, badge }) => {
    return (
        <Link
            href={href}
            className={
                'group flex items-center rounded-lg p-2 text-base font-normal transition ' +
                (active
                    ? 'bg-green-50 text-green-800 dark:bg-gray-700 dark:text-white'
                    : 'text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700')
            }
        >
            {Icon && (
                <Icon
                    className={
                        'h-5 w-5 flex-shrink-0 transition duration-75 ' +
                        (active
                            ? 'text-green-700 dark:text-white'
                            : 'text-gray-400 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white')
                    }
                />
            )}
            <span className="ms-3 flex-1 whitespace-nowrap">{children}</span>
            {typeof badge !== 'undefined' && (
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-xs font-semibold text-green-800 dark:bg-green-200 dark:text-green-900">
                    {badge}
                </span>
            )}
        </Link>
    );
};

const IconOverview = (props) => (
    <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
    </svg>
);

const IconDoc = (props) => (
    <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            fillRule="evenodd"
            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
            clipRule="evenodd"
        />
    </svg>
);

const IconLock = (props) => (
    <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            fillRule="evenodd"
            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
            clipRule="evenodd"
        />
    </svg>
);

const IconMessage = (props) => (
    <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z" />
        <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
    </svg>
);

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const counts = usePage().props.counts || {};
    const unreadMessages = Number(counts.messages_unread || 0);
    const isAdmin = !!user?.is_admin;

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const userInitials = (user?.name || 'P').trim().slice(0, 1).toUpperCase();

    return (
        <div className="min-h-screen bg-gray-100 font-sans dark:bg-gray-900">
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/40 sm:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside
                id="default-sidebar"
                className={
                    'fixed left-0 top-0 z-40 h-screen w-64 transform transition-transform sm:translate-x-0 ' +
                    (sidebarOpen ? 'translate-x-0' : '-translate-x-full')
                }
                aria-label="Sidenav"
            >
                <div className="flex h-full flex-col overflow-y-auto border-r border-gray-200 bg-white px-3 py-5 dark:border-gray-700 dark:bg-gray-800">
                    <Link
                        href="/"
                        className="mb-4 flex items-center gap-2 rounded-lg px-2 py-2 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                        <img
                            src="/logo.png"
                            alt="Physioplanet"
                            className="h-9 w-9 rounded-xl bg-white/10 p-1 ring-1 ring-black/5 dark:ring-white/10"
                        />
                        <div className="min-w-0">
                            <div className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                                Physioplanet
                            </div>
                            <div className="truncate text-xs text-gray-500 dark:text-gray-400">
                                {user?.email}
                            </div>
                        </div>
                    </Link>

                    <ul className="space-y-2">
                        <li>
                            <NavItem
                                href={route('dashboard')}
                                active={route().current('dashboard')}
                                icon={LayoutDashboard}
                            >
                                Overview
                            </NavItem>
                        </li>

                        <li>
                            <NavItem
                                href={route('messages')}
                                active={route().current('messages')}
                                icon={MessageSquare}
                                badge={unreadMessages > 0 ? unreadMessages : undefined}
                            >
                                Messages
                            </NavItem>
                        </li>

                    </ul>

                    {isAdmin ? (
                        <ul className="mt-5 space-y-2 border-t border-gray-200 pt-5 dark:border-gray-700">
                            <li>
                                <NavItem
                                    href={route('admin.dashboard')}
                                    active={route().current('admin.dashboard')}
                                    icon={LayoutDashboard}
                                >
                                    Admin Dashboard
                                </NavItem>
                            </li>

                            <li className="pt-2">
                                <div className="px-2 text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                                    Content Management
                                </div>
                            </li>

                            <li>
                                <NavItem
                                    href={route('admin.health-tips.index')}
                                    active={route().current('admin.health-tips.index') || route().current('admin.health-tips.create') || route().current('admin.health-tip-categories.index')}
                                    icon={HeartPulse}
                                >
                                    Health Tips
                                </NavItem>
                            </li>
                            <li>
                                <NavItem
                                    href={route('admin.research-tips.index')}
                                    active={route().current('admin.research-tips.index') || route().current('admin.research-tips.create') || route().current('admin.research-tip-categories.index')}
                                    icon={Microscope}
                                >
                                    Research Tips
                                </NavItem>
                            </li>
                            <li>
                                <NavItem
                                    href={route('admin.hot-news.index')}
                                    active={route().current('admin.hot-news.index') || route().current('admin.hot-news.create') || route().current('admin.hot-news-categories.index')}
                                    icon={Newspaper}
                                >
                                    Hot News
                                </NavItem>
                            </li>
                            <li>
                                <NavItem
                                    href={route('admin.gallery-images.index')}
                                    active={route().current('admin.gallery-images.index') || route().current('admin.gallery-categories.index')}
                                    icon={Image}
                                >
                                    Gallery
                                </NavItem>
                            </li>
                            <li>
                                <NavItem
                                    href={route('admin.opportunities.index')}
                                    active={route().current('admin.opportunities.index') || route().current('admin.opportunities.create') || route().current('admin.opportunities.edit')}
                                    icon={Briefcase}
                                >
                                    Opportunities
                                </NavItem>
                            </li>

                            <li className="pt-2">
                                <div className="px-2 text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                                    Users
                                </div>
                            </li>

                            <li>
                                <NavItem
                                    href={route('admin.users.index')}
                                    active={route().current('admin.users.index') || route().current('admin.users.edit')}
                                    icon={Users}
                                >
                                    Users Management
                                </NavItem>
                            </li>

                            <li>
                                <NavItem
                                    href={route('docs.icons')}
                                    active={route().current('docs.icons')}
                                    icon={FileText}
                                >
                                    Docs
                                </NavItem>
                            </li>
                        </ul>
                    ) : (
                        <ul className="mt-5 space-y-2 border-t border-gray-200 pt-5 dark:border-gray-700">
                            <li>
                                <NavItem
                                    href={route('health-tips')}
                                    active={route().current('health-tips')}
                                    icon={HeartPulse}
                                >
                                    Health Tips
                                </NavItem>
                            </li>
                            <li>
                                <NavItem
                                    href={route('research-tips')}
                                    active={route().current('research-tips')}
                                    icon={Microscope}
                                >
                                    Research Tips
                                </NavItem>
                            </li>
                            <li>
                                <NavItem
                                    href={route('pt-library')}
                                    active={route().current('pt-library')}
                                    icon={Library}
                                >
                                    PT. Library
                                </NavItem>
                            </li>
                            <li>
                                <NavItem
                                    href={route('hot-news')}
                                    active={route().current('hot-news')}
                                    icon={Newspaper}
                                >
                                    Hot News
                                </NavItem>
                            </li>
                            <li>
                                <NavItem
                                    href={route('gallery')}
                                    active={route().current('gallery')}
                                    icon={Image}
                                >
                                    Gallery
                                </NavItem>
                            </li>
                            <li>
                                <NavItem
                                    href={route('opportunities')}
                                    active={route().current('opportunities')}
                                    icon={Briefcase}
                                >
                                    Opportunities
                                </NavItem>
                            </li>
                        </ul>
                    )}

                    <div className="mt-auto border-t border-gray-200 pt-4 dark:border-gray-700">
                        <div className="px-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                            {user?.name}
                        </div>
                        <div className="mt-3 space-y-2 px-2">
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="block w-full rounded-lg p-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                            >
                                Log Out
                            </Link>
                        </div>
                    </div>
                </div>
            </aside>

            <div className="sm:ms-64">
                <header className="sticky top-0 z-20 border-b border-emerald-800/50 bg-emerald-900 shadow-lg shadow-emerald-900/20">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
                        <div className="flex min-w-0 items-center gap-4">
                            <button
                                type="button"
                                onClick={() => setSidebarOpen(true)}
                                className="inline-flex items-center rounded-lg p-2 text-emerald-100 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400 sm:hidden"
                                aria-controls="default-sidebar"
                                aria-label="Open sidebar"
                            >
                                <svg
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                    />
                                </svg>
                            </button>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-4">
                            {/* Desktop Search (Mock) */}
                            <div className="hidden lg:relative lg:block">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Search className="h-4 w-4 text-emerald-100" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-64 rounded-xl border-none bg-white/20 py-2 pl-10 pr-3 text-sm text-white placeholder-white/70 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-400 backdrop-blur-sm transition-all shadow-inner"
                                    placeholder="Search everything..."
                                />
                            </div>

                            {/* Notifications (Mock) */}
                            <button className="relative rounded-xl p-2 text-white hover:bg-white/10 transition-colors">
                                <Bell className="h-5 w-5 drop-shadow-sm" />
                                <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-amber-400 ring-2 ring-emerald-900 shadow-sm" />
                            </button>

                            {/* Messages Link Icon with Badge */}
                            <Link 
                                href={route('messages')}
                                className="relative rounded-xl p-2 text-white hover:bg-white/10 transition-colors"
                            >
                                <MessageSquare className="h-5 w-5 drop-shadow-sm" />
                                {unreadMessages > 0 ? (
                                    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-400 px-1 text-[11px] font-black leading-none text-emerald-950 ring-2 ring-emerald-900 shadow-md">
                                        {unreadMessages}
                                    </span>
                                ) : null}
                            </Link>

                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setUserMenuOpen((v) => !v)}
                                    className="flex items-center gap-3 rounded-xl bg-white/10 p-1 text-left ring-1 ring-white/20 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all backdrop-blur-sm shadow-sm"
                                    aria-label="Open user menu"
                                >
                                    <div className="h-9 w-9 overflow-hidden rounded-lg bg-emerald-600 ring-2 border-emerald-400/50 shadow-md">
                                        {user?.avatar_url ? (
                                            <img
                                                src={user.avatar_url}
                                                alt={user?.name}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center font-black text-white text-sm">
                                                {userInitials}
                                            </div>
                                        )}
                                    </div>

                                    <div className="hidden min-w-0 pr-2 lg:block">
                                        <div className="truncate text-xs font-black text-white uppercase tracking-wider drop-shadow-sm">
                                            {user?.name}
                                        </div>
                                        <div className="flex items-center gap-1 text-[10px] text-emerald-100 font-bold drop-shadow-sm">
                                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-sm"></span>
                                            Online
                                        </div>
                                    </div>

                                    <svg
                                        aria-hidden="true"
                                        className="h-4 w-4 mr-1 text-emerald-300"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>

                                {userMenuOpen && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-20"
                                            onClick={() => setUserMenuOpen(false)}
                                        />
                                        <div className="absolute right-0 z-30 mt-2 w-56 overflow-hidden rounded-2xl border border-emerald-800/50 bg-emerald-900 shadow-2xl ring-1 ring-white/10 animate-in fade-in zoom-in duration-150">
                                            <div className="px-4 py-3 border-b border-white/5">
                                                <p className="text-xs font-medium text-emerald-300 uppercase tracking-widest">User Account</p>
                                                <p className="truncate text-sm font-bold text-white mt-1">{user?.email}</p>
                                            </div>

                                            <div className="p-1.5">
                                                <Link
                                                    href={route('profile.edit')}
                                                    className="group flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-emerald-100 hover:bg-white/10 transition-colors"
                                                    onClick={() => setUserMenuOpen(false)}
                                                >
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-800 text-emerald-300 group-hover:bg-emerald-700">
                                                        <User className="h-4 w-4" />
                                                    </div>
                                                    <span className="font-bold">My Profile</span>
                                                </Link>

                                                <Link
                                                    href={route('reviews')}
                                                    className="group flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-emerald-100 hover:bg-white/10 transition-colors"
                                                    onClick={() => setUserMenuOpen(false)}
                                                >
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-800 text-emerald-300 group-hover:bg-emerald-700">
                                                        <Star className="h-4 w-4" />
                                                    </div>
                                                    <span className="font-bold">Reviews</span>
                                                </Link>

                                            </div>

                                            <div className="border-t border-white/5 p-1.5 mt-1">
                                                <Link
                                                    href={route('logout')}
                                                    method="post"
                                                    as="button"
                                                    className="group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-red-300 hover:bg-red-500/10 transition-colors text-left"
                                                    onClick={() => setUserMenuOpen(false)}
                                                >
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 text-red-400 group-hover:bg-red-500/20">
                                                        <LogOut className="h-4 w-4" />
                                                    </div>
                                                    <span className="font-bold">Log Out</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                <main className="min-h-[calc(100vh-72px)] bg-gradient-to-b from-emerald-50/60 via-gray-50 to-gray-100 px-4 py-6 dark:from-gray-900 dark:via-gray-950 dark:to-black sm:px-6 lg:px-10">
                    <div className="mx-auto w-full max-w-[1600px]">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
