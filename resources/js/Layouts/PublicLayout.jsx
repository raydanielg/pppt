import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Menu, X, User, LogIn, Home, Newspaper, Briefcase, HeartPulse, Microscope, Library, ChevronDown } from 'lucide-react';

const NavLink = ({ href, icon: Icon, children, active = false }) => (
    <Link
        href={href}
        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold transition-all ${
            active
                ? 'bg-emerald-100 text-emerald-700'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
        }`}
    >
        {Icon && <Icon className="h-4 w-4" />}
        {children}
    </Link>
);

export default function PublicLayout({ children, title }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [platformOpen, setPlatformOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { auth } = usePage().props;
    const user = auth?.user;

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Platform dropdown items
    const platformItems = [
        { href: route('health-tips'), label: 'Health Tips', icon: HeartPulse, active: route().current('health-tips') },
        { href: route('research-tips'), label: 'Research', icon: Microscope, active: route().current('research-tips') },
        { href: route('pt-library'), label: 'Library', icon: Library, active: route().current('pt-library') },
    ];

    const mainNav = [
        { href: route('hot-news'), label: 'Hot News', icon: Newspaper, active: route().current('hot-news') || route().current('hot-news.show') },
        { href: route('pen'), label: 'PEN', icon: Briefcase, active: route().current('pen') },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className={`sticky top-0 z-50 transition-all duration-300 ${
                scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'
            }`}>
                <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-200">
                                <img src="/logo.png" alt="PhysioPlanet" className="w-7 h-7 object-contain" />
                            </div>
                            <span className="font-black text-lg text-gray-900 hidden sm:block">PHYSIOPLANET</span>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden lg:flex items-center gap-1">
                            <NavLink href={route('home')} icon={Home} active={route().current('home')}>
                                Home
                            </NavLink>
                            {mainNav.map((item) => (
                                <NavLink key={item.href} {...item}>
                                    {item.label}
                                </NavLink>
                            ))}

                            {/* Platform Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setPlatformOpen(!platformOpen)}
                                    onMouseEnter={() => setPlatformOpen(true)}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold transition-all ${
                                        platformItems.some(item => item.active)
                                            ? 'bg-emerald-100 text-emerald-700'
                                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                    }`}
                                >
                                    Platform
                                    <ChevronDown className={`h-4 w-4 transition-transform ${platformOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {platformOpen && (
                                    <div
                                        onMouseLeave={() => setPlatformOpen(false)}
                                        className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50"
                                    >
                                        {platformItems.map((item) => (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                className={`flex items-center gap-3 px-4 py-3 text-sm font-bold transition-all ${
                                                    item.active
                                                        ? 'bg-emerald-50 text-emerald-700'
                                                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                                }`}
                                            >
                                                <item.icon className="h-4 w-4" />
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </nav>

                        {/* Auth Buttons */}
                        <div className="flex items-center gap-2">
                            {user ? (
                                <div className="flex items-center gap-3">
                                    <Link
                                        href={route('dashboard')}
                                        className="hidden sm:flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200"
                                    >
                                        <User className="h-4 w-4" />
                                        Dashboard
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Link
                                        href={route('login')}
                                        className="hidden sm:flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-xl text-sm font-bold transition-colors"
                                    >
                                        <LogIn className="h-4 w-4" />
                                        Log In
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200"
                                    >
                                        <User className="h-4 w-4" />
                                        <span className="hidden sm:inline">Join Free</span>
                                    </Link>
                                </div>
                            )}

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
                            >
                                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden border-t border-gray-100 bg-white">
                        <div className="max-w-[1600px] mx-auto px-4 py-4 space-y-1">
                            <NavLink href={route('home')} icon={Home} active={route().current('home')}>
                                Home
                            </NavLink>
                            {mainNav.map((item) => (
                                <NavLink key={item.href} {...item}>
                                    {item.label}
                                </NavLink>
                            ))}

                            {/* Platform Section - Mobile */}
                            <div className="pt-2 mt-2 border-t border-gray-100">
                                <div className="px-3 py-2 text-xs font-black text-gray-400 uppercase tracking-widest">Platform</div>
                                {platformItems.map((item) => (
                                    <NavLink key={item.href} {...item}>
                                        {item.label}
                                    </NavLink>
                                ))}
                            </div>

                            {!user && (
                                <div className="pt-4 border-t border-gray-100 mt-4 space-y-1">
                                    <NavLink href={route('login')} icon={LogIn}>Log In</NavLink>
                                    <NavLink href={route('register')} icon={User}>Create Account</NavLink>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </header>

            {/* Page Title */}
            {title && (
                <div className="bg-white border-b border-gray-200">
                    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-6">
                        <h1 className="text-2xl font-black text-gray-900">{title}</h1>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main>{children}</main>

            {/* Simple Footer */}
            <footer className="bg-white border-t border-gray-200 mt-20">
                <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-8">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <img src="/logo.png" alt="PhysioPlanet" className="w-8 h-8" />
                            <span className="font-bold text-gray-900">PHYSIOPLANET</span>
                        </div>
                        <p className="text-sm text-gray-500">
                            © {new Date().getFullYear()} PhysioPlanet. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
