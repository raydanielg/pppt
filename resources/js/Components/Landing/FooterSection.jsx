import { HeartPulse, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowRight, Send } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function FooterSection() {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setEmail('');
        }
    };

    const platformLinks = [
        { name: 'Health Tips', href: route('health-tips') },
        { name: 'PT Library', href: route('pt-library') },
        { name: 'Community Forum', href: route('forum') },
        { name: 'Hot News', href: route('hot-news') },
        { name: 'Opportunities', href: route('opportunities') },
        { name: 'Gallery', href: route('gallery') },
    ];

    const companyLinks = [
        { name: 'About PEN', href: route('pen') },
        { name: 'About Us', href: '#about' },
        { name: 'Careers', href: '#' },
        { name: 'Press Kit', href: '#' },
        { name: 'Partners', href: '#' },
    ];

    const supportLinks = [
        { name: 'Help Center', href: '#' },
        { name: 'Contact Us', href: '#contact' },
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Service', href: '#' },
        { name: 'Cookie Policy', href: '#' },
    ];

    const socialLinks = [
        { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:bg-blue-600' },
        { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:bg-sky-500' },
        { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:bg-pink-600' },
        { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:bg-blue-700' },
        { icon: Youtube, href: '#', label: 'YouTube', color: 'hover:bg-red-600' },
    ];

    return (
        <footer className="bg-gray-950 text-gray-400">
            {/* Newsletter Section */}
            <div className="border-b border-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">Stay Updated</h3>
                            <p className="text-gray-400">Get the latest physiotherapy news, resources, and opportunities delivered to your inbox.</p>
                        </div>
                        <form onSubmit={handleSubscribe} className="flex gap-3">
                            <div className="relative flex-1">
                                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full bg-gray-900 border border-gray-700 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-green-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center gap-2"
                            >
                                {subscribed ? 'Subscribed!' : 'Subscribe'}
                                <Send className="h-4 w-4" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
                    {/* Brand Column */}
                    <div className="col-span-2 lg:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-14 h-14 bg-white rounded-xl p-1.5 shadow-lg">
                                <img 
                                    src="/logo.png" 
                                    alt="PHYSIOPLANET Logo" 
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div>
                                <span className="text-2xl font-bold text-white">PHYSIOPLANET</span>
                                <p className="text-xs text-gray-500">Connect. Learn. Grow.</p>
                            </div>
                        </div>
                        <p className="text-sm leading-relaxed mb-6 max-w-sm">
                            Africa's leading physiotherapy platform empowering professionals through education, community, and career opportunities.
                        </p>
                        
                        {/* Contact Info */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm">
                                <MapPin className="h-4 w-4 text-green-500" />
                                <span>Dar es Salaam, Tanzania</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <Phone className="h-4 w-4 text-green-500" />
                                <span>+255 626 371 854</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <Mail className="h-4 w-4 text-green-500" />
                                <span>info@physioplanet.org</span>
                            </div>
                        </div>
                    </div>

                    {/* Platform Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Platform</h4>
                        <ul className="space-y-3 text-sm">
                            {platformLinks.map((link, index) => (
                                <li key={index}>
                                    <Link href={link.href} className="hover:text-green-400 transition-colors flex items-center gap-2 group">
                                        <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Company</h4>
                        <ul className="space-y-3 text-sm">
                            {companyLinks.map((link, index) => (
                                <li key={index}>
                                    <Link href={link.href} className="hover:text-green-400 transition-colors flex items-center gap-2 group">
                                        <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Support</h4>
                        <ul className="space-y-3 text-sm">
                            {supportLinks.map((link, index) => (
                                <li key={index}>
                                    <Link href={link.href} className="hover:text-green-400 transition-colors flex items-center gap-2 group">
                                        <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Social & Copyright */}
                <div className="border-t border-gray-800 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        {/* Social Links */}
                        <div className="flex gap-3">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    aria-label={social.label}
                                    className={`w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 ${social.color} hover:text-white transition-all duration-300 transform hover:-translate-y-1`}
                                >
                                    <social.icon className="h-5 w-5" />
                                </a>
                            ))}
                        </div>

                        {/* Copyright */}
                        <div className="text-center md:text-right">
                            <p className="text-sm">
                                © {new Date().getFullYear()} PHYSIOPLANET. All rights reserved.
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                An initiative by PhysioPlanet Africa
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-gray-900 py-4">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span>All systems operational</span>
                    </div>
                    <div className="flex gap-6">
                        <span>Made with ❤️ for PT professionals</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
