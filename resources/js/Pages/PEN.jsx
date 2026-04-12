import { Head, Link } from '@inertiajs/react';
import { BookOpen, Users, Globe, TrendingUp, DollarSign, Award, GraduationCap, Heart, CheckCircle, Menu, X, Phone, Mail, Calendar } from 'lucide-react';
import { useState } from 'react';

export default function PEN({ auth }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const benefits = [
        {
            icon: Users,
            title: 'Professional Networks',
            description: 'Opportunity to build strong professional networks locally and internationally'
        },
        {
            icon: TrendingUp,
            title: 'Personal Growth',
            description: 'Personal and professional growth through active engagement and collaboration'
        },
        {
            icon: Award,
            title: 'Lasting Impact',
            description: 'A platform to contribute knowledge and leave a lasting impact on society'
        },
        {
            icon: DollarSign,
            title: 'Income Opportunities',
            description: 'Income generation opportunities through content development and partnerships'
        },
        {
            icon: Globe,
            title: 'Priority Access',
            description: 'Priority access to opportunities arising from PHYSIOPLANET and PEN activities'
        },
        {
            icon: CheckCircle,
            title: 'Free Registration',
            description: 'Free registration into the PHYSIOPLANET system'
        },
        {
            icon: Heart,
            title: 'Recognition',
            description: 'Recognition and visibility as a content creator and contributor'
        },
        {
            icon: GraduationCap,
            title: 'Skill Development',
            description: 'Opportunity to develop teaching, research, and digital content skills'
        },
        {
            icon: Users,
            title: 'Mentorship',
            description: 'Access to mentorship and collaboration with experienced professionals'
        },
        {
            icon: BookOpen,
            title: 'Advancing Education',
            description: 'Contribution to advancing physiotherapy education in Africa and beyond'
        }
    ];

    const requirements = [
        'Must be a member of PHYSIOPLANET (PPT) or willing to become one',
        'Must be a physiotherapist or have proven experience in teaching physiotherapy-related courses',
        'Must demonstrate passion, commitment, and creativity',
        'Must be 18 years of age or older',
        'Must be a recognized citizen of their respective country (with valid identification)',
        'Must be willing to actively participate in content creation and teamwork',
        'Basic digital skills (e.g., preparing documents, presentations, or videos) are an added advantage'
    ];

    return (
        <>
            <Head title="Physiotherapy Educator Network (PEN)" />
            <div className="min-h-screen bg-white">
                {/* Navigation */}
                <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="bg-green-600 text-white p-2 rounded-lg">
                                    <BookOpen className="h-6 w-6" />
                                </div>
                                <span className="text-xl font-bold text-gray-900">PEN</span>
                            </div>
                            
                            <div className="hidden md:flex items-center gap-8">
                                <a href="#about" className="text-gray-600 hover:text-green-600 transition">About</a>
                                <a href="#benefits" className="text-gray-600 hover:text-green-600 transition">Benefits</a>
                                <a href="#requirements" className="text-gray-600 hover:text-green-600 transition">Requirements</a>
                                <a href="#contact" className="text-gray-600 hover:text-green-600 transition">Contact</a>
                            </div>

                            <div className="hidden md:flex items-center gap-4">
                                {auth?.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="text-gray-600 hover:text-green-600 transition font-medium"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition"
                                        >
                                            Join PEN
                                        </Link>
                                    </>
                                )}
                            </div>

                            <button
                                className="md:hidden p-2 text-gray-600"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>

                        {/* Mobile Menu */}
                        {mobileMenuOpen && (
                            <div className="md:hidden py-4 border-t border-gray-100">
                                <div className="flex flex-col gap-4">
                                    <a href="#about" className="text-gray-600 hover:text-green-600 transition">About</a>
                                    <a href="#benefits" className="text-gray-600 hover:text-green-600 transition">Benefits</a>
                                    <a href="#requirements" className="text-gray-600 hover:text-green-600 transition">Requirements</a>
                                    <a href="#contact" className="text-gray-600 hover:text-green-600 transition">Contact</a>
                                    <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
                                        {auth?.user ? (
                                            <Link
                                                href={route('dashboard')}
                                                className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium text-center hover:bg-green-700 transition"
                                            >
                                                Dashboard
                                            </Link>
                                        ) : (
                                            <>
                                                <Link
                                                    href={route('login')}
                                                    className="text-gray-600 hover:text-green-600 transition font-medium text-center"
                                                >
                                                    Log in
                                                </Link>
                                                <Link
                                                    href={route('register')}
                                                    className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium text-center hover:bg-green-700 transition"
                                                >
                                                    Join PEN
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-br from-green-50 via-white to-green-50">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-4xl mx-auto">
                            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                                <Calendar className="h-4 w-4" />
                                <span>Official Launch: April 12th, 2026</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                                Physiotherapy Educator Network
                                <span className="block text-green-600">(PEN)</span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                A movement aimed at strengthening knowledge sharing, improving education standards, 
                                and making physiotherapy resources more accessible across communities.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href={route('register')}
                                    className="bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-700 transition shadow-lg shadow-green-200"
                                >
                                    Join PEN Today
                                </Link>
                                <a
                                    href="#about"
                                    className="bg-white text-green-600 border-2 border-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-50 transition"
                                >
                                    Learn More
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* About/Mission Section */}
                <section id="about" className="py-20 bg-white">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                    Our Mission
                                </h2>
                                <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                                    <p>
                                        The primary mission of PEN is to bring together passionate individuals in the field 
                                        of physiotherapy and related disciplines to collaboratively develop high-quality educational content.
                                    </p>
                                    <p>
                                        This includes the creation and sharing of notes, PDF materials, PowerPoint presentations, 
                                        instructional videos, posters, and other learning resources that will be uploaded and 
                                        accessed through our PHYSIOPLANET system.
                                    </p>
                                    <p className="font-medium text-green-700">
                                        PEN is not just a team—it is a movement. Let us work together to educate, inspire, and transform lives.
                                    </p>
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-2xl p-8 lg:p-12">
                                <div className="bg-white rounded-xl p-6 shadow-sm">
                                    <h3 className="font-semibold text-gray-900 mb-4">What We Create</h3>
                                    <ul className="space-y-3">
                                        {['Educational Notes', 'PDF Materials', 'PowerPoint Presentations', 'Instructional Videos', 'Educational Posters', 'Learning Resources'].map((item, index) => (
                                            <li key={index} className="flex items-center gap-3 text-gray-600">
                                                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section id="benefits" className="py-20 bg-gray-50">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Benefits of Joining PEN
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Discover the numerous advantages of becoming a member of the Physiotherapy Educator Network
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition border border-gray-100">
                                    <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                        <benefit.icon className="h-6 w-6 text-green-600" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Requirements Section */}
                <section id="requirements" className="py-20 bg-white">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                    Basic Requirements to Join PEN
                                </h2>
                                <p className="text-lg text-gray-600">
                                    Are you ready to become part of our growing community?
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 lg:p-12 border border-green-100">
                                <ul className="space-y-4">
                                    {requirements.map((requirement, index) => (
                                        <li key={index} className="flex items-start gap-4">
                                            <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-sm">
                                                {index + 1}
                                            </div>
                                            <p className="text-gray-700 pt-1">{requirement}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-green-600">
                    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Ready to Shape the Future of Physiotherapy Education?
                        </h2>
                        <p className="text-xl text-green-100 mb-8">
                            Join our community of educators, innovators, and change-makers today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href={route('register')}
                                className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition shadow-lg"
                            >
                                Join PEN Now
                            </Link>
                            <Link
                                href={route('login')}
                                className="bg-green-700 text-white border-2 border-green-500 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-800 transition"
                            >
                                Member Login
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer id="contact" className="bg-gray-900 text-gray-300 py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-3 gap-12">
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="bg-green-600 text-white p-2 rounded-lg">
                                        <BookOpen className="h-5 w-5" />
                                    </div>
                                    <span className="text-xl font-bold text-white">PEN</span>
                                </div>
                                <p className="text-gray-400 mb-4">
                                    Physiotherapy Educator Network - Building a community of educators, 
                                    innovators, and change-makers shaping the future of physiotherapy education.
                                </p>
                                <p className="text-sm text-gray-500">
                                    An initiative by PHYSIOPLANET
                                </p>
                            </div>
                            
                            <div>
                                <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                                <ul className="space-y-2">
                                    <li><a href="#about" className="hover:text-green-400 transition">About PEN</a></li>
                                    <li><a href="#benefits" className="hover:text-green-400 transition">Benefits</a></li>
                                    <li><a href="#requirements" className="hover:text-green-400 transition">Requirements</a></li>
                                    <li><Link href={route('register')} className="hover:text-green-400 transition">Join Now</Link></li>
                                </ul>
                            </div>
                            
                            <div>
                                <h4 className="text-white font-semibold mb-4">Contact Us</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3">
                                        <Users className="h-5 w-5 text-green-500" />
                                        <span>Amos Paschal, CEO</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <Phone className="h-5 w-5 text-green-500" />
                                        <span>+255 626 371 854</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <Mail className="h-5 w-5 text-green-500" />
                                        <span>PHYSIOPLANET</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
                            <p className="text-gray-500">
                                © {new Date().getFullYear()} Physiotherapy Educator Network (PEN). All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
