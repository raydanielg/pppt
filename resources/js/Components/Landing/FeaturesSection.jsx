import { useEffect, useState, useRef } from 'react';
import { HeartPulse, BookOpen, MessageSquare, GraduationCap, Newspaper, Briefcase, ArrowRight, Zap, Shield, Globe } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function FeaturesSection() {
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const sectionRef = useRef(null);

    const features = [
        {
            icon: HeartPulse,
            title: 'Health Tips',
            subtitle: 'Daily Wellness',
            description: 'Expert health advice and wellness tips from certified physiotherapists. Stay updated with evidence-based practices.',
            color: 'from-red-500 to-red-600',
            bgColor: 'bg-red-50',
            link: route('health-tips'),
            stats: '200+ Articles'
        },
        {
            icon: BookOpen,
            title: 'PT Library',
            subtitle: 'Knowledge Hub',
            description: 'Access comprehensive physiotherapy books, notes, and learning materials curated by top educators.',
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-50',
            link: route('pt-library'),
            stats: '500+ Resources'
        },
        {
            icon: MessageSquare,
            title: 'Community Forum',
            subtitle: 'Connect & Share',
            description: 'Connect with professionals, share knowledge, discuss cases, and grow your professional network.',
            color: 'from-green-500 to-green-600',
            bgColor: 'bg-green-50',
            link: route('forum'),
            stats: '5K+ Discussions'
        },
        {
            icon: GraduationCap,
            title: 'PEN Network',
            subtitle: 'Educator Platform',
            description: 'Join our Physiotherapy Educator Network. Create content, share expertise, and earn recognition.',
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-50',
            link: route('pen'),
            stats: '100+ Educators',
            badge: 'NEW'
        },
        {
            icon: Newspaper,
            title: 'Hot News',
            subtitle: 'Latest Updates',
            description: 'Stay informed with the latest news, research, and trends in physiotherapy across Africa and globally.',
            color: 'from-orange-500 to-orange-600',
            bgColor: 'bg-orange-50',
            link: route('hot-news'),
            stats: 'Daily Updates'
        },
        {
            icon: Briefcase,
            title: 'Opportunities',
            subtitle: 'Career Growth',
            description: 'Discover jobs, scholarships, internships, and professional development opportunities.',
            color: 'from-teal-500 to-teal-600',
            bgColor: 'bg-teal-50',
            link: route('opportunities'),
            stats: '50+ Openings'
        }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} id="features" className="relative py-24 bg-gray-50 overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-20 right-20 w-64 h-64 bg-green-200/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-20 w-48 h-48 bg-blue-200/30 rounded-full blur-3xl"></div>
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className={`text-center mb-16 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        <Zap className="h-4 w-4" />
                        <span>Platform Features</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Everything You Need to Excel
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        A complete ecosystem designed for physiotherapy professionals and students
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <Link
                            key={index}
                            href={feature.link}
                            className={`group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {/* Background Gradient on Hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                            
                            {/* Badge */}
                            {feature.badge && (
                                <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                    {feature.badge}
                                </div>
                            )}

                            <div className="relative">
                                {/* Icon */}
                                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-gray-200 group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}>
                                    <feature.icon className="h-8 w-8 text-white" />
                                </div>

                                {/* Content */}
                                <p className="text-sm font-medium text-gray-500 mb-1 uppercase tracking-wider">{feature.subtitle}</p>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">{feature.title}</h3>
                                <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>

                                {/* Stats */}
                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                    <Shield className="h-4 w-4 text-green-500" />
                                    <span>{feature.stats}</span>
                                </div>

                                {/* CTA */}
                                <div className="flex items-center gap-2 text-green-600 font-semibold group-hover:gap-3 transition-all">
                                    <span>Explore</span>
                                    <ArrowRight className={`h-5 w-5 transition-transform duration-300 ${hoveredIndex === index ? 'translate-x-1' : ''}`} />
                                </div>
                            </div>

                            {/* Corner Decoration */}
                            <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-opacity duration-500`}></div>
                        </Link>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className={`mt-16 text-center transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="inline-flex items-center gap-3 bg-white rounded-2xl p-2 pr-6 shadow-lg border border-gray-100">
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                                    {String.fromCharCode(64 + i)}
                                </div>
                            ))}
                        </div>
                        <p className="text-gray-600">Join <span className="font-bold text-gray-900">10,000+</span> professionals today</p>
                        <Link 
                            href={route('register')} 
                            className="ml-4 bg-green-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-green-700 transition-colors"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
