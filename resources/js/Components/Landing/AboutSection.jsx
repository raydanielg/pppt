import { useEffect, useState, useRef } from 'react';
import { GraduationCap, Users, Target, Lightbulb, CheckCircle, ArrowRight, Play, Award, Globe, BookOpen } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function AboutSection() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const sectionRef = useRef(null);

    const tabs = [
        {
            icon: Target,
            title: 'Our Mission',
            content: 'To democratize physiotherapy education across Africa by providing accessible, high-quality resources and fostering a collaborative professional community.'
        },
        {
            icon: Lightbulb,
            title: 'Our Vision',
            content: 'To become the leading digital platform for physiotherapy professionals in Africa, driving innovation and excellence in healthcare education.'
        },
        {
            icon: Award,
            title: 'Our Values',
            content: 'Excellence, Collaboration, Innovation, Accessibility, and Integrity guide everything we do at PHYSIOPLANET.'
        }
    ];

    const highlights = [
        { icon: GraduationCap, value: '50+', label: 'Universities Partnered' },
        { icon: BookOpen, value: '10K+', label: 'Students Reached' },
        { icon: Globe, value: '15+', label: 'African Countries' },
        { icon: Users, value: '98%', label: 'Satisfaction Rate' }
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
        <section ref={sectionRef} id="about" className="relative py-24 bg-white overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-green-50/50 to-transparent"></div>
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Side - Visual */}
                    <div className={`relative transition-all duration-1000 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                        {/* Main Image Card */}
                        <div className="relative bg-gradient-to-br from-green-500 to-green-600 rounded-3xl p-1 shadow-2xl">
                            <div className="bg-white rounded-[22px] overflow-hidden">
                                <div className="relative h-64 bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="w-20 h-20 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                            <GraduationCap className="h-10 w-10 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900">PHYSIOPLANET</h3>
                                        <p className="text-gray-600">Transforming PT Education</p>
                                    </div>
                                    {/* Floating badges */}
                                    <div className="absolute top-4 left-4 bg-white rounded-xl px-4 py-2 shadow-lg flex items-center gap-2 animate-pulse">
                                        <Award className="h-5 w-5 text-yellow-500" />
                                        <span className="font-semibold text-sm">Top Rated</span>
                                    </div>
                                    <div className="absolute bottom-4 right-4 bg-green-600 text-white rounded-xl px-4 py-2 shadow-lg">
                                        <span className="font-bold">Est. 2024</span>
                                    </div>
                                </div>
                                
                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 gap-4 p-6">
                                    {highlights.slice(0, 4).map((item, index) => (
                                        <div key={index} className="bg-gray-50 rounded-xl p-4 text-center hover:bg-green-50 transition-colors">
                                            <item.icon className="h-6 w-6 text-green-600 mx-auto mb-2" />
                                            <p className="text-2xl font-bold text-gray-900">{item.value}</p>
                                            <p className="text-xs text-gray-500">{item.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Floating Elements */}
                        <div className="absolute -top-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 animate-bounce" style={{animationDuration: '4s'}}>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                    <Users className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">Community</p>
                                    <p className="text-sm text-gray-500">Growing daily</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Content */}
                    <div className={`transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                            <Target className="h-4 w-4" />
                            <span>About PHYSIOPLANET</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            Building the Future of{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400">
                                Physiotherapy Education
                            </span>
                        </h2>

                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            PHYSIOPLANET is more than a platform—it's a movement dedicated to advancing physiotherapy education and professional development across Africa and beyond.
                        </p>

                        {/* Tabs */}
                        <div className="bg-gray-50 rounded-2xl p-2 mb-8">
                            <div className="flex gap-2">
                                {tabs.map((tab, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveTab(index)}
                                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                                            activeTab === index 
                                                ? 'bg-white text-green-600 shadow-md' 
                                                : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                    >
                                        <tab.icon className="h-4 w-4" />
                                        <span className="hidden sm:inline">{tab.title}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-6 border border-green-100 mb-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                    {(() => {
                                        const IconComponent = tabs[activeTab].icon;
                                        return <IconComponent className="h-6 w-6 text-white" />;
                                    })()}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{tabs[activeTab].title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{tabs[activeTab].content}</p>
                                </div>
                            </div>
                        </div>

                        {/* Feature List */}
                        <div className="grid sm:grid-cols-2 gap-4 mb-8">
                            {[
                                'Quality Educational Content',
                                'Professional Networking',
                                'Career Opportunities',
                                'Continuous Learning Support'
                            ].map((item, index) => (
                                <div key={index} className="flex items-center gap-3 group">
                                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-600 transition-colors">
                                        <CheckCircle className="h-5 w-5 text-green-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <span className="text-gray-700 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href={route('pen')}
                                className="group inline-flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition-all duration-300 shadow-lg shadow-green-200"
                            >
                                <span>Join PEN Network</span>
                                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <button className="group inline-flex items-center justify-center gap-2 bg-white text-gray-700 border-2 border-gray-200 px-8 py-4 rounded-xl font-bold hover:border-green-600 hover:text-green-600 transition-all duration-300">
                                <Play className="h-5 w-5" />
                                <span>Watch Video</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
