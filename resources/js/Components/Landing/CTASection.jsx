import { useEffect, useState, useRef } from 'react';
import { ArrowRight, Sparkles, Rocket, Zap, CheckCircle, Users } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function CTASection() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    const benefits = [
        'Free membership registration',
        'Access to 500+ resources',
        'Join community discussions',
        'Get career opportunities',
        'Connect with 10K+ professionals'
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

    return (
        <section ref={sectionRef} className="relative py-24 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-500 to-teal-500"></div>
            
            {/* Animated Shapes */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-full blur-3xl animate-spin" style={{animationDuration: '30s'}}></div>
                
                {/* Floating icons */}
                <Rocket className="absolute top-20 left-20 h-16 w-16 text-white/20 animate-bounce" style={{animationDuration: '3s'}} />
                <Zap className="absolute bottom-20 right-20 h-20 w-20 text-yellow-300/30 animate-pulse" />
                <Sparkles className="absolute top-40 right-40 h-12 w-12 text-white/20 animate-spin" style={{animationDuration: '10s'}} />
            </div>

            <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <div className={`text-center transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-5 py-2 rounded-full text-sm font-semibold mb-8 border border-white/30">
                        <Rocket className="h-4 w-4" />
                        <span>Launch Your Career Today</span>
                    </div>

                    {/* Heading */}
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        Ready to Transform Your{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-100">
                            Physiotherapy Career?
                        </span>
                    </h2>

                    <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto">
                        Join Africa's largest physiotherapy community today and unlock unlimited access to resources, connections, and opportunities.
                    </p>

                    {/* Benefits Grid */}
                    <div className={`grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        {benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20">
                                <CheckCircle className="h-5 w-5 text-yellow-300 flex-shrink-0" />
                                <span className="text-white text-sm font-medium">{benefit}</span>
                            </div>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <Link
                            href={route('register')}
                            className="group relative overflow-hidden bg-white text-green-600 px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 flex items-center gap-2 transform hover:-translate-y-1"
                        >
                            <span className="relative z-10">Get Started Free</span>
                            <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        </Link>

                        <Link
                            href={route('pen')}
                            className="group bg-green-700/50 backdrop-blur-sm text-white border-2 border-white/50 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 hover:border-white transition-all duration-300 flex items-center gap-2"
                        >
                            <Sparkles className="h-5 w-5" />
                            <span>Explore PEN Network</span>
                        </Link>
                    </div>

                    {/* Trust Indicator */}
                    <div className={`mt-12 flex items-center justify-center gap-4 transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <div className="flex -space-x-3">
                            {['A', 'B', 'C', 'D', 'E'].map((letter, i) => (
                                <div key={i} className="w-10 h-10 rounded-full bg-white/20 border-2 border-green-500 flex items-center justify-center text-white text-sm font-bold backdrop-blur-sm">
                                    {letter}
                                </div>
                            ))}
                        </div>
                        <div className="text-white/80 text-sm">
                            <span className="font-bold text-white">10,000+</span> professionals already joined
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
