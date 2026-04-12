import { useEffect, useState, useRef } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, MessageCircle, ThumbsUp } from 'lucide-react';

export default function TestimonialsSection() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRef = useRef(null);

    const testimonials = [
        {
            id: 1,
            name: 'Dr. Sarah Johnson',
            role: 'Senior Physiotherapist',
            location: 'Nairobi, Kenya',
            image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200',
            content: 'PHYSIOPLANET has completely transformed how I access educational resources. The PT Library saved me countless hours of research, and the community forum has connected me with brilliant minds across Africa.',
            rating: 5,
            likes: 234,
            tags: ['PT Library', 'Community']
        },
        {
            id: 2,
            name: 'James Mwangi',
            role: 'PT Student',
            location: 'University of Nairobi',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
            content: 'As a student, PHYSIOPLANET has been my secret weapon. The notes and resources here helped me ace my exams. The PEN Network is giving me opportunities I never thought possible as a student.',
            rating: 5,
            likes: 189,
            tags: ['Student Resources', 'PEN']
        },
        {
            id: 3,
            name: 'Dr. Amara Okafor',
            role: 'Clinical Instructor',
            location: 'Lagos, Nigeria',
            image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200',
            content: 'Being part of PEN has expanded my professional network exponentially. I\'ve collaborated with educators from 5 different countries. This platform is truly revolutionizing physiotherapy education in Africa.',
            rating: 5,
            likes: 312,
            tags: ['PEN', 'Networking']
        },
        {
            id: 4,
            name: 'Dr. Peter Mwesigwa',
            role: 'Sports Physiotherapist',
            location: 'Kampala, Uganda',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
            content: 'The Health Tips section is gold! I recommend specific articles to my clients all the time. The quality of content here rivals international platforms, but it\'s tailored for our African context.',
            rating: 5,
            likes: 156,
            tags: ['Health Tips', 'Content Quality']
        },
        {
            id: 5,
            name: 'Grace Mutua',
            role: 'Recent Graduate',
            location: 'Moi University, Kenya',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
            content: 'I found my first job through the Opportunities section! The platform doesn\'t just educate—it opens doors. I\'m now a proud contributor to the PT Library, giving back to the community that helped me.',
            rating: 5,
            likes: 278,
            tags: ['Opportunities', 'Career Growth']
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

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section ref={sectionRef} id="testimonials" className="relative py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }}></div>
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className={`text-center mb-16 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                        <MessageCircle className="h-4 w-4" />
                        <span>Member Stories</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        What Our Community Says
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Join thousands of satisfied physiotherapy professionals transforming their careers
                    </p>
                </div>

                {/* Featured Testimonial */}
                <div className={`max-w-4xl mx-auto mb-16 transition-all duration-1000 delay-200 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10">
                        <Quote className="absolute top-8 left-8 h-12 w-12 text-green-500/30" />
                        
                        <div className="relative">
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <div className="flex-shrink-0">
                                    <div className="relative">
                                        <img 
                                            src={testimonials[activeIndex].image} 
                                            alt={testimonials[activeIndex].name}
                                            className="w-24 h-24 rounded-2xl object-cover border-4 border-green-500/30"
                                        />
                                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                            <Star className="h-4 w-4 text-white fill-white" />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex-1 text-center md:text-left">
                                    <div className="flex items-center justify-center md:justify-start gap-1 mb-3">
                                        {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                                            <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-xl md:text-2xl text-white leading-relaxed mb-6">
                                        "{testimonials[activeIndex].content}"
                                    </p>
                                    <div className="flex flex-col md:flex-row items-center gap-4">
                                        <div>
                                            <h4 className="font-bold text-white text-lg">{testimonials[activeIndex].name}</h4>
                                            <p className="text-green-400">{testimonials[activeIndex].role}</p>
                                            <p className="text-gray-500 text-sm">{testimonials[activeIndex].location}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            {testimonials[activeIndex].tags.map((tag, i) => (
                                                <span key={i} className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="flex items-center justify-between mt-8 pt-8 border-t border-white/10">
                            <div className="flex items-center gap-2">
                                <ThumbsUp className="h-5 w-5 text-green-500" />
                                <span className="text-gray-400">{testimonials[activeIndex].likes} people found this helpful</span>
                            </div>
                            <div className="flex gap-2">
                                <button 
                                    onClick={prevSlide}
                                    className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                                >
                                    <ChevronLeft className="h-6 w-6" />
                                </button>
                                <button 
                                    onClick={nextSlide}
                                    className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                                >
                                    <ChevronRight className="h-6 w-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Testimonial Thumbnails */}
                <div className={`flex justify-center gap-4 transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    {testimonials.map((testimonial, index) => (
                        <button
                            key={testimonial.id}
                            onClick={() => setActiveIndex(index)}
                            className={`relative w-16 h-16 rounded-xl overflow-hidden transition-all duration-300 ${
                                activeIndex === index 
                                    ? 'ring-4 ring-green-500 scale-110' 
                                    : 'opacity-50 hover:opacity-75'
                            }`}
                        >
                            <img 
                                src={testimonial.image} 
                                alt={testimonial.name}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
