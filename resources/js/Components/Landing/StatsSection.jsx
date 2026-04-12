import { useEffect, useState, useRef } from 'react';
import { Users, BookOpen, Globe, Award, TrendingUp, Clock } from 'lucide-react';

export default function StatsSection() {
    const [isVisible, setIsVisible] = useState(false);
    const [counts, setCounts] = useState({
        members: 0,
        resources: 0,
        countries: 0,
        experts: 0
    });
    const sectionRef = useRef(null);

    const stats = [
        { 
            icon: Users, 
            value: 12547, 
            suffix: '+', 
            label: 'Active Members',
            description: 'Growing community of PT professionals',
            color: 'from-blue-500 to-blue-600'
        },
        { 
            icon: BookOpen, 
            value: 583, 
            suffix: '+', 
            label: 'Educational Resources',
            description: 'Books, notes, videos & more',
            color: 'from-green-500 to-green-600'
        },
        { 
            icon: Globe, 
            value: 52, 
            suffix: '+', 
            label: 'Countries',
            description: 'Global reach across Africa & beyond',
            color: 'from-purple-500 to-purple-600'
        },
        { 
            icon: Award, 
            value: 147, 
            suffix: '+', 
            label: 'Expert Contributors',
            description: 'Top physiotherapy educators',
            color: 'from-orange-500 to-orange-600'
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
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        const duration = 2500;
        const steps = 60;
        
        const animate = () => {
            stats.forEach((stat, index) => {
                const increment = stat.value / steps;
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= stat.value) {
                        setCounts(prev => ({
                            ...prev,
                            [Object.keys(prev)[index]]: stat.value
                        }));
                        clearInterval(timer);
                    } else {
                        setCounts(prev => ({
                            ...prev,
                            [Object.keys(prev)[index]]: Math.floor(current)
                        }));
                    }
                }, duration / steps);
            });
        };

        animate();
    }, [isVisible]);

    const countValues = [counts.members, counts.resources, counts.countries, counts.experts];

    return (
        <section ref={sectionRef} className="relative py-20 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
            
            {/* Animated Grid Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }}></div>
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className={`text-center mb-16 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                        <TrendingUp className="h-4 w-4" />
                        <span>Real-Time Growth</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Our Impact in Numbers
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Trusted by physiotherapy professionals worldwide
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <div 
                            key={index}
                            className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            {/* Gradient overlay on hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}></div>
                            
                            <div className="relative">
                                <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    <stat.icon className="h-7 w-7 text-white" />
                                </div>
                                
                                <div className="flex items-baseline gap-1 mb-2">
                                    <span className="text-4xl md:text-5xl font-bold text-white">
                                        {countValues[index].toLocaleString()}
                                    </span>
                                    <span className="text-2xl font-bold text-green-400">{stat.suffix}</span>
                                </div>
                                
                                <h3 className="text-lg font-semibold text-white mb-2">{stat.label}</h3>
                                <p className="text-sm text-gray-400">{stat.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Info */}
                <div className={`mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-400 transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-green-400" />
                        <span>Updated in real-time</span>
                    </div>
                    <div className="hidden sm:block w-1 h-1 bg-gray-500 rounded-full"></div>
                    <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                            {['TZ', 'NG', 'KE', 'ZA'].map((code, i) => (
                                <div key={i} className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center text-white text-xs font-bold border-2 border-gray-800">
                                    {code}
                                </div>
                            ))}
                        </div>
                        <span>Across Africa & Beyond</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
