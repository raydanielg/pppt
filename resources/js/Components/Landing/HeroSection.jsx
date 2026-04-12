import { Link } from '@inertiajs/react';
import { HeartPulse, BookOpen, Users, Newspaper, Star, ArrowRight, Play, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function HeroSection({ auth }) {
    const [isVisible, setIsVisible] = useState(false);
    const [count, setCount] = useState(0);

    useEffect(() => {
        setIsVisible(true);
        // Animated counter
        const target = 10000;
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, []);

    const liveActivities = [
        { icon: BookOpen, text: "New PT Resource: Muscular System Notes", time: "2 min ago", color: "bg-blue-100 text-blue-600" },
        { icon: Users, text: "+50 New Members Joined Today", time: "5 min ago", color: "bg-green-100 text-green-600" },
        { icon: Newspaper, text: "Latest: Back Pain Prevention Tips", time: "12 min ago", color: "bg-purple-100 text-purple-600" },
    ];

    return (
        <section className="relative min-h-screen pt-20 overflow-hidden bg-white">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-200/40 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-green-300/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-green-100/50 to-blue-100/50 rounded-full blur-3xl animate-spin" style={{animationDuration: '20s'}}></div>
                
                {/* Floating particles */}
                {[...Array(6)].map((_, i) => (
                    <div 
                        key={i}
                        className="absolute w-4 h-4 bg-green-400/30 rounded-full animate-bounce"
                        style={{
                            left: `${10 + i * 15}%`,
                            top: `${20 + (i % 3) * 25}%`,
                            animationDelay: `${i * 0.5}s`,
                            animationDuration: '3s'
                        }}
                    />
                ))}
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 lg:pt-24">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Content */}
                    <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-green-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                            <Sparkles className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                            <span>PEN Launch: April 12, 2026</span>
                            <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">NEW</span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] mb-6">
                            <span className="inline-block hover:text-green-600 transition-colors duration-300">Connect.</span>{' '}
                            <span className="inline-block text-green-600 hover:scale-105 transition-transform duration-300">Learn.</span>{' '}
                            <span className="inline-block hover:text-green-600 transition-colors duration-300">Grow.</span>
                        </h1>

                        {/* Description */}
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-xl">
                            Africa's largest physiotherapy community with{' '}
                            <span className="font-bold text-green-600">{count.toLocaleString()}+</span>{' '}
                            professionals. Access premium educational resources, connect with experts, and advance your career.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-10">
                            <Link
                                href={route('register')}
                                className="group relative overflow-hidden bg-gradient-to-r from-green-600 to-green-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-green-200 transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-1"
                            >
                                <span className="relative z-10">Join PHYSIOPLANET</span>
                                <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                                <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            </Link>
                            
                            <Link
                                href={route('pen')}
                                className="group bg-white text-green-600 border-2 border-green-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-green-50 transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-1"
                            >
                                <Play className="h-5 w-5 group-hover:scale-110 transition-transform" />
                                Explore PEN
                            </Link>
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-6 border-t border-gray-200">
                            <div className="flex -space-x-3">
                                {[
                                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
                                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
                                    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
                                    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
                                ].map((src, i) => (
                                    <img 
                                        key={i} 
                                        src={src} 
                                        alt={`Member ${i + 1}`}
                                        className="w-12 h-12 rounded-full border-3 border-white shadow-md object-cover hover:scale-110 transition-transform cursor-pointer"
                                    />
                                ))}
                                <div className="w-12 h-12 rounded-full border-3 border-white bg-green-600 flex items-center justify-center text-white text-sm font-bold shadow-md">
                                    +9k
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center gap-1 mb-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                                    ))}
                                    <span className="ml-2 font-bold text-gray-900">4.9/5</span>
                                </div>
                                <p className="text-sm text-gray-500">From 2,000+ verified reviews</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Interactive Card */}
                    <div className={`relative transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                        <div className="relative">
                            {/* Main Card */}
                            <div className="bg-white rounded-3xl shadow-2xl shadow-green-100/50 p-6 lg:p-8 border border-gray-100">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-2 shadow-lg shadow-green-200">
                                            <img 
                                                src="/logo.png" 
                                                alt="PHYSIOPLANET" 
                                                className="w-full h-full object-contain rounded-lg"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-lg">PHYSIOPLANET</h3>
                                            <p className="text-sm text-gray-500 flex items-center gap-1">
                                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                                Live Now
                                            </p>
                                        </div>
                                    </div>
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                                        PRO
                                    </span>
                                </div>

                                {/* Live Activity Feed */}
                                <div className="space-y-4">
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Live Activity</p>
                                    {liveActivities.map((activity, index) => (
                                        <div 
                                            key={index} 
                                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer group"
                                            style={{animationDelay: `${index * 0.2}s`}}
                                        >
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${activity.color} group-hover:scale-110 transition-transform`}>
                                                <activity.icon className="h-5 w-5" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">{activity.text}</p>
                                                <p className="text-xs text-gray-500">{activity.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Quick Stats */}
                                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
                                    {[
                                        { value: '500+', label: 'Resources' },
                                        { value: '50+', label: 'Countries' },
                                        { value: '24/7', label: 'Support' }
                                    ].map((stat, index) => (
                                        <div key={index} className="text-center">
                                            <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                                            <p className="text-xs text-gray-500">{stat.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Floating Elements */}
                            <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 animate-bounce" style={{animationDuration: '3s'}}>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                                        <Star className="h-5 w-5 text-white fill-white" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">4.9 Rating</p>
                                        <p className="text-xs text-gray-500">Top Rated Platform</p>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-green-600 to-green-500 rounded-2xl p-4 shadow-xl text-white" style={{animation: 'pulse 2s infinite'}}>
                                <p className="font-bold text-sm">🔥 Trending Now</p>
                                <p className="text-xs opacity-90">PEN Network Launch</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
