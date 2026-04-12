import { Link } from '@inertiajs/react';
import { HeartPulse, Menu, X, ChevronDown, Sparkles, Heart, BookOpen, MessageSquare, Newspaper, Briefcase } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header({ auth }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#', active: true },
        { name: 'Features', href: '#features' },
        { name: 'About', href: '#about' },
        { name: 'Testimonials', href: '#testimonials' },
        { 
            name: 'Platform', 
            href: '#',
            dropdown: [
                { name: 'Health Tips', href: route('health-tips'), icon: Heart, color: 'text-red-500' },
                { name: 'PT Library', href: route('pt-library'), icon: BookOpen, color: 'text-blue-500' },
                { name: 'Forum', href: route('forum'), icon: MessageSquare, color: 'text-green-500' },
                { name: 'Hot News', href: route('hot-news'), icon: Newspaper, color: 'text-orange-500' },
                { name: 'Opportunities', href: route('opportunities'), icon: Briefcase, color: 'text-purple-500' },
            ]
        },
    ];

    return (
        <header 
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                scrolled 
                    ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' 
                    : 'bg-transparent py-5'
            }`}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href={route('home')} className="flex items-center gap-3 group">
                        <div className="relative w-12 h-12 transition-all duration-300 group-hover:scale-105">
                            <img 
                                src="/logo.png" 
                                alt="PHYSIOPLANET Logo" 
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div>
                            <span className={`text-2xl font-bold transition-colors duration-300 ${
                                scrolled ? 'text-gray-900' : 'text-gray-900'
                            }`}>
                                PHYSIOPLANET
                            </span>
                            <span className={`hidden sm:block text-xs -mt-1 transition-colors duration-300 ${
                                scrolled ? 'text-gray-500' : 'text-gray-600'
                            }`}>
                                Connect. Learn. Grow.
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link, index) => (
                            <div 
                                key={index} 
                                className="relative"
                                onMouseEnter={() => link.dropdown && setActiveDropdown(index)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <Link
                                    href={link.href}
                                    className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                                        link.active 
                                            ? (scrolled ? 'text-green-600' : 'text-green-600') 
                                            : (scrolled ? 'text-gray-700 hover:text-green-600 hover:bg-green-50' : 'text-gray-700 hover:text-green-600 hover:bg-white/50')
                                    }`}
                                >
                                    {link.name}
                                    {link.dropdown && (
                                        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${activeDropdown === index ? 'rotate-180' : ''}`} />
                                    )}
                                </Link>

                                {/* Dropdown Menu */}
                                {link.dropdown && activeDropdown === index && (
                                    <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                        <div className="px-4 py-2 border-b border-gray-100 mb-2">
                                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Platform Features</span>
                                        </div>
                                        {link.dropdown.map((item, i) => {
                                            const IconComponent = item.icon;
                                            return (
                                                <Link
                                                    key={i}
                                                    href={item.href}
                                                    className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 transition-colors"
                                                >
                                                    <IconComponent className={`h-5 w-5 ${item.color}`} />
                                                    <span className="font-medium text-gray-700">{item.name}</span>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* PEN Badge */}
                        <Link 
                            href={route('pen')} 
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                                scrolled 
                                    ? 'text-green-600 hover:bg-green-50' 
                                    : 'text-green-600 hover:bg-white/50'
                            }`}
                        >
                            <Sparkles className="h-4 w-4" />
                            PEN
                        </Link>
                    </nav>

                    {/* CTA Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        {auth?.user ? (
                            <Link
                                href={route('dashboard')}
                                className="bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-green-200 transition-all duration-300 transform hover:-translate-y-0.5"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className={`font-semibold transition-colors duration-300 ${
                                        scrolled ? 'text-gray-700 hover:text-green-600' : 'text-gray-700 hover:text-green-600'
                                    }`}
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-green-200 transition-all duration-300 transform hover:-translate-y-0.5"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className={`lg:hidden p-2 rounded-lg transition-colors duration-300 ${
                            scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-700 hover:bg-white/50'
                        }`}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`lg:hidden overflow-hidden transition-all duration-300 ${
                    mobileMenuOpen ? 'max-h-screen opacity-100 mt-4' : 'max-h-0 opacity-0'
                }`}>
                    <div className={`rounded-2xl p-4 ${scrolled ? 'bg-gray-50' : 'bg-white/95 backdrop-blur-md'}`}>
                        <nav className="flex flex-col gap-2">
                            {navLinks.map((link, index) => (
                                <div key={index}>
                                    <Link
                                        href={link.href}
                                        className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                                            link.active 
                                                ? 'text-green-600 bg-green-50' 
                                                : 'text-gray-700 hover:bg-green-50 hover:text-green-600'
                                        }`}
                                        onClick={() => !link.dropdown && setMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                    {link.dropdown && (
                                        <div className="ml-4 mt-2 space-y-1">
                                            {link.dropdown.map((item, i) => {
                                                const IconComponent = item.icon;
                                                return (
                                                    <Link
                                                        key={i}
                                                        href={item.href}
                                                        className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:text-green-600 rounded-lg transition-colors"
                                                        onClick={() => setMobileMenuOpen(false)}
                                                    >
                                                        <IconComponent className={`h-5 w-5 ${item.color}`} />
                                                        {item.name}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            ))}
                            
                            <div className="border-t border-gray-200 my-3 pt-3">
                                <Link 
                                    href={route('pen')}
                                    className="flex items-center gap-2 px-4 py-3 text-green-600 font-medium"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <Sparkles className="h-4 w-4" />
                                    PEN Network
                                </Link>
                            </div>

                            <div className="border-t border-gray-200 pt-3 flex flex-col gap-2">
                                {auth?.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="bg-green-600 text-white px-4 py-3 rounded-xl font-semibold text-center"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="text-gray-700 font-semibold px-4 py-3 text-center"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="bg-green-600 text-white px-4 py-3 rounded-xl font-semibold text-center"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Get Started
                                        </Link>
                                    </>
                                )}
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}
