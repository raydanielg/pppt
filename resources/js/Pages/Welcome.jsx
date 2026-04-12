import { Head } from '@inertiajs/react';
import Header from '@/Components/Landing/Header';
import HeroSection from '@/Components/Landing/HeroSection';
import StatsSection from '@/Components/Landing/StatsSection';
import FeaturesSection from '@/Components/Landing/FeaturesSection';
import AboutSection from '@/Components/Landing/AboutSection';
import TestimonialsSection from '@/Components/Landing/TestimonialsSection';
import CTASection from '@/Components/Landing/CTASection';
import FooterSection from '@/Components/Landing/FooterSection';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="PHYSIOPLANET - Africa's Leading Physiotherapy Community">
                <meta name="description" content="Join Africa's largest physiotherapy community. Access educational resources, connect with professionals, and advance your career with PHYSIOPLANET." />
                <meta name="keywords" content="physiotherapy, physical therapy, Africa, education, PT library, health tips, physiotherapist" />
            </Head>
            
            <div className="min-h-screen bg-white">
                <Header auth={auth} />
                <HeroSection />
                <StatsSection />
                <FeaturesSection />
                <AboutSection />
                <TestimonialsSection />
                <CTASection />
                <FooterSection />
            </div>
        </>
    );
}
