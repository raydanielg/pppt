import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Clock, Star, ArrowLeft, Share2, Bookmark, MessageCircle, ChevronRight, Activity, Calendar } from 'lucide-react';

export default function Show() {
    const tip = {
        title: "Proper Posture at the Desk",
        category: "Ergonomics",
        published_at: "Feb 12, 2026",
        duration: "5 min read",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200",
        author: {
            name: "Dr. Sarah Chen",
            avatar: "https://i.pravatar.cc/150?u=sarah",
            role: "Senior Physiotherapist",
            rating: 4.8
        },
        content: `<div class="space-y-6"><p class="text-lg leading-relaxed">Sitting at a desk for long periods can lead to various musculoskeletal issues, particularly in the neck, back, and shoulders. Maintaining proper posture is crucial for preventing chronic pain and improving long-term health.</p><h3 class="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight mt-8">1. Adjust Your Chair Height</h3><p class="text-lg leading-relaxed">Your chair should be at a height where your feet are flat on the floor and your knees are at a 90-degree angle. If your feet don't reach the floor, use a footrest.</p><h3 class="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight mt-8">2. Position Your Monitor</h3><p class="text-lg leading-relaxed">The top of your monitor screen should be at or slightly below eye level. This prevents you from tilting your head up or down, which can strain your neck muscles.</p><h3 class="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight mt-8">3. Keep Your Back Supported</h3><p class="text-lg leading-relaxed">Use a chair that provides good lumbar support. If your chair doesn't have it, a small pillow or rolled-up towel behind your lower back can help maintain the natural curve of your spine.</p><div class="bg-emerald-50 dark:bg-emerald-900/20 p-8 rounded-[2rem] border border-emerald-100 dark:border-emerald-800/50 my-10 shadow-inner"><h4 class="font-black text-emerald-800 dark:text-emerald-200 mb-3 italic uppercase tracking-widest text-sm">Pro Tip:</h4><p class="text-emerald-700 dark:text-emerald-300 font-medium">Follow the 20-20-20 rule: Every 20 minutes, look at something 20 feet away for 20 seconds to reduce eye strain and remind yourself to check your posture.</p></div></div>`
    };

    const relatedPosts = [
        {
            id: 2,
            title: "Essential Stretches for Runners",
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=300",
            category: "Exercises"
        },
        {
            id: 3,
            title: "Post-Surgery Knee Recovery",
            image: "https://images.unsplash.com/photo-1576091160550-2173dad99901?auto=format&fit=crop&q=80&w=300",
            category: "Rehabilitation"
        },
        {
            id: 4,
            title: "Mindful Breathing Techniques",
            image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=300",
            category: "Wellness"
        }
    ];

    return (
        <AuthenticatedLayout>
            <Head title={`${tip.title} - Health Tips`} />
            
            <div className="py-8 px-4 sm:px-6 lg:px-10 max-w-[1600px] mx-auto">
                <Link 
                    href={route('health-tips')} 
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-emerald-600 font-bold text-sm mb-8 transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Health Tips
                </Link>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Main Content (Left) */}
                    <div className="flex-1 max-w-4xl">
                        <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-gray-700 shadow-xl shadow-gray-200/50 dark:shadow-none">
                            <div className="relative h-[400px]">
                                <img 
                                    src={tip.image} 
                                    alt={tip.title} 
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-6 left-6">
                                    <span className="bg-amber-400 text-amber-950 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg border border-amber-300">
                                        {tip.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-8 md:p-12">
                                <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-400 text-sm font-bold border-b border-gray-50 dark:border-gray-700 pb-8">
                                    <div className="flex items-center gap-3">
                                        <img 
                                            src={tip.author.avatar} 
                                            alt={tip.author.name} 
                                            className="w-12 h-12 rounded-full ring-4 ring-emerald-50 dark:ring-emerald-900/30 object-cover"
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-gray-900 dark:text-white font-black">{tip.author.name}</span>
                                            <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded-md mt-0.5 w-fit">
                                                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                                <span className="text-[11px] text-amber-700 dark:text-amber-400 font-black">{tip.author.rating}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-emerald-500" />
                                        {tip.published_at}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-emerald-500" />
                                        {tip.duration}
                                    </div>
                                    <div className="ml-auto flex gap-2">
                                        <button className="p-2.5 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-900/30 text-gray-400 hover:text-emerald-600 transition-all">
                                            <Share2 className="w-5 h-5" />
                                        </button>
                                        <button className="p-2.5 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-900/30 text-gray-400 hover:text-emerald-600 transition-all">
                                            <Bookmark className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-8 leading-tight">
                                    {tip.title}
                                </h1>

                                <div 
                                    className="prose prose-emerald dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed text-lg"
                                    dangerouslySetInnerHTML={{ __html: tip.content }}
                                />

                                <div className="mt-12 pt-8 border-t border-gray-50 dark:border-gray-700 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="flex -space-x-3">
                                            {[1, 2, 3].map(i => (
                                                <img key={i} className="w-10 h-10 rounded-full border-4 border-white dark:border-gray-800 object-cover" src={`https://i.pravatar.cc/150?u=${i+10}`} alt="user" />
                                            ))}
                                            <div className="w-10 h-10 rounded-full border-4 border-white dark:border-gray-800 bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-[10px] font-black text-emerald-600">+12</div>
                                        </div>
                                        <span className="text-xs font-bold text-gray-400 italic">People are talking about this</span>
                                    </div>
                                    <button className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl transition-all shadow-lg shadow-emerald-500/20">
                                        <MessageCircle className="w-5 h-5" />
                                        Join Discussion
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar (Right) */}
                    <aside className="w-full lg:w-80 flex flex-col gap-8">
                        {/* Related Posts */}
                        <div className="bg-white dark:bg-gray-800 rounded-[2rem] p-8 border border-gray-100 dark:border-gray-700 shadow-xl shadow-gray-200/50 dark:shadow-none">
                            <h2 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-6 flex items-center gap-3">
                                <div className="w-1.5 h-6 bg-amber-400 rounded-full"></div>
                                Related <span className="text-emerald-600">Posts</span>
                            </h2>
                            <div className="flex flex-col gap-6">
                                {relatedPosts.map((post) => (
                                    <Link 
                                        key={post.id}
                                        href="#"
                                        className="group flex gap-4"
                                    >
                                        <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                                            <img 
                                                src={post.image} 
                                                alt={post.title} 
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="flex flex-col justify-center min-w-0">
                                            <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1">
                                                {post.category}
                                            </span>
                                            <h3 className="text-sm font-black text-gray-900 dark:text-white group-hover:text-emerald-600 transition-colors leading-snug line-clamp-2">
                                                {post.title}
                                            </h3>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <button className="w-full mt-8 py-3 border-2 border-dashed border-gray-100 dark:border-gray-700 rounded-2xl text-gray-400 hover:text-emerald-600 hover:border-emerald-600 dark:hover:text-emerald-400 dark:hover:border-emerald-400 font-bold text-sm transition-all">
                                View More Tips
                            </button>
                        </div>

                        {/* Quick Action Card */}
                        <div className="bg-emerald-900 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                            <h3 className="text-xl font-black mb-4 relative z-10 leading-tight">Need a professional Consultation?</h3>
                            <p className="text-emerald-100/70 text-sm mb-6 relative z-10">Get in touch with Dr. Sarah Chen for a personalized recovery plan.</p>
                            <button className="w-full py-4 bg-amber-400 text-amber-950 font-black rounded-2xl hover:bg-amber-300 transition-all shadow-lg relative z-10 flex items-center justify-center gap-2">
                                Book Now
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </aside>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
