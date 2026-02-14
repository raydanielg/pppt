import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { HeartPulse, Activity, BookOpen, Video, Clock, ChevronRight, Star } from 'lucide-react';

const ICON_MAP = {
    'Activity': Activity,
    'BookOpen': BookOpen,
    'HeartPulse': HeartPulse,
    'Video': Video,
};

export default function Index({ categories, tips }) {
    return (
        <AuthenticatedLayout>
            <Head title="Health Tips" />
            
            <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto">
                {/* Hero */}
                <div className="bg-emerald-900 rounded-[2.5rem] p-8 md:p-12 mb-16 text-white overflow-hidden relative">
                    <div className="relative z-10">
                        <h1 className="text-4xl md:text-5xl font-black mb-6">
                            Physiotherapy & <span className="text-amber-400">Health Tips</span>
                        </h1>
                        <p className="text-emerald-50/70 text-lg md:xl max-w-2xl">
                            Discover expert advice on recovery and maintaining a healthy body.
                        </p>
                    </div>
                </div>

                {/* Categories */}
                <div className="mb-16">
                    <h2 className="text-2xl font-black mb-8 uppercase">Explore Categories</h2>
                    <div className="flex flex-wrap gap-4">
                        {categories?.map((cat, i) => {
                            const IconComponent = ICON_MAP[cat.icon] || Activity;
                            return (
                                <div key={i} className="flex items-center gap-3 px-6 py-3 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                                    <IconComponent className="w-5 h-5 text-emerald-600" />
                                    <span className="font-bold text-sm">{cat.name}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Latest Tips */}
                <div className="mb-12">
                    <h2 className="text-2xl font-black mb-10 uppercase text-gray-900 dark:text-white">Latest Tips</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {tips?.data?.map((tip) => (
                            <div key={tip.id} className="bg-white dark:bg-gray-800 rounded-[2rem] overflow-hidden border border-gray-100 dark:border-gray-700 shadow-xl transition-all hover:shadow-2xl">
                                <div className="h-56 relative">
                                    <img src={tip.image} alt={tip.title} className="w-full h-full object-cover" />
                                    {tip.tag && (
                                        <div className="absolute top-4 left-4 bg-amber-400 text-amber-950 text-[10px] font-black uppercase px-4 py-1.5 rounded-full">{tip.tag}</div>
                                    )}
                                </div>
                                <div className="p-8">
                                    <div className="text-emerald-600 text-xs font-black uppercase mb-4">{tip.category?.name}</div>
                                    <h3 className="text-xl font-black mb-4">{tip.title}</h3>
                                    <p className="text-gray-500 text-sm mb-8 line-clamp-2">{tip.description}</p>
                                    
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-700 text-xs">
                                                {tip.author?.name?.charAt(0)}
                                            </div>
                                            <span className="text-[13px] font-black">{tip.author?.name}</span>
                                        </div>
                                        <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                            <span className="text-[11px] font-black">4.8</span>
                                        </div>
                                    </div>

                                    <Link 
                                        href={route('health-tips.show', { id: tip.id })}
                                        className="w-full py-3 bg-gray-50 text-emerald-600 font-black text-sm rounded-xl hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center gap-2"
                                    >
                                        Read Article
                                        <ChevronRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {tips?.links && tips?.links?.length > 3 && (
                        <div className="mt-16 flex justify-center gap-2">
                            {tips.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={`px-4 py-2 rounded-xl text-sm font-black transition-all ${
                                        link.active 
                                            ? 'bg-emerald-600 text-white shadow-lg' 
                                            : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30'
                                    } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
