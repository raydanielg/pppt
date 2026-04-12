import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Flame, Calendar, Clock, ChevronRight, Share2, Eye, TrendingUp, CheckCircle2 } from 'lucide-react';

export default function Index({ news, hot_news: hotNewsProp }) {
    // Ensure hot_news is always an array
    const hot_news = hotNewsProp || [];
    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
        email: '',
    });

    const handleSubscribe = (e) => {
        e.preventDefault();
        post(route('newsletter.subscribe'), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <PublicLayout>
            <Head title="Hot News" />
            
            <div className="py-8 px-4 sm:px-6 lg:px-10 max-w-[1600px] mx-auto">
                {/* Hero / Hot News Section - POWER DESIGN */}
                <div className="mb-20">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="p-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-lg shadow-orange-200">
                            <Flame className="w-7 h-7 text-white animate-pulse" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black uppercase tracking-tight text-gray-900 dark:text-white">Hot News</h2>
                            <p className="text-sm text-gray-500 font-medium">Breaking stories from the world of physiotherapy</p>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-6">
                        {hot_news && hot_news.length > 0 ? hot_news.map((item, index) => (
                            <Link 
                                key={item.id} 
                                href={route('hot-news.show', item.slug)}
                                className={`group relative rounded-3xl overflow-hidden transition-all duration-700 hover:shadow-3xl ${
                                    index === 0 ? 'lg:row-span-2 aspect-[4/5] lg:aspect-auto lg:h-full min-h-[500px]' : 'aspect-[16/10] min-h-[280px]'
                                }`}
                            >
                                {/* Image Container with Aspect Ratio */}
                                <div className="absolute inset-0 overflow-hidden">
                                    <img 
                                        src={item.image} 
                                        alt={item.title} 
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out" 
                                        loading={index === 0 ? "eager" : "lazy"}
                                    />
                                    {/* Multi-layer Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10"></div>
                                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/30"></div>
                                    {/* Hover Overlay Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-orange-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                                
                                {/* Content Overlay */}
                                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                                    {/* Category Badge */}
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-black uppercase rounded-full shadow-lg">
                                            {item.category}
                                        </span>
                                        <div className="flex items-center gap-2 text-white/80 text-xs font-bold uppercase tracking-wider bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </div>
                                    </div>
                                    
                                    {/* Title */}
                                    <h3 className={`font-black text-white leading-tight group-hover:text-amber-300 transition-colors duration-300 drop-shadow-lg ${
                                        index === 0 ? 'text-3xl md:text-4xl lg:text-5xl' : 'text-xl md:text-2xl lg:text-3xl'
                                    }`}>
                                        {item.title}
                                    </h3>
                                    
                                    {/* Summary for main article */}
                                    {index === 0 && (
                                        <p className="mt-4 text-white/80 text-base md:text-lg line-clamp-2 max-w-2xl font-medium leading-relaxed">
                                            {item.summary}
                                        </p>
                                    )}
                                    
                                    {/* Read More Indicator */}
                                    <div className="mt-6 flex items-center gap-2 text-amber-400 font-bold text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                                        <span>Read Full Story</span>
                                        <ChevronRight className="w-5 h-5" />
                                    </div>
                                </div>
                                
                                {/* Corner Decoration */}
                                <div className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <Share2 className="w-5 h-5 text-white" />
                                </div>
                            </Link>
                        )) : (
                            <div className="lg:col-span-2 flex flex-col items-center justify-center py-20 text-center">
                                <div className="w-20 h-20 rounded-3xl bg-gray-100 flex items-center justify-center mb-6">
                                    <Flame className="w-10 h-10 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-black text-gray-900 mb-2">No Hot News Yet</h3>
                                <p className="text-gray-500 max-w-md">Check back soon for breaking stories from the world of physiotherapy.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* News Feed */}
                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900 dark:text-white">Latest Feed</h2>
                            <div className="flex gap-2">
                                {['All', 'Sports', 'Health', 'Tech'].map(tab => (
                                    <button key={tab} className={`px-5 py-2 rounded-xl text-xs font-black transition-all ${
                                        tab === 'All' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-white dark:bg-gray-800 text-gray-500 hover:bg-emerald-50'
                                    }`}>
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-8">
                            {news.data.map((item) => (
                                <article key={item.id} className="group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-2xl hover:shadow-emerald-100/50 transition-all duration-500 transform hover:-translate-y-1">
                                    {/* Image Container */}
                                    <div className="relative aspect-[16/10] overflow-hidden">
                                        <img 
                                            src={item.image} 
                                            alt={item.title} 
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out" 
                                            loading="lazy"
                                        />
                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        
                                        {/* Category Badge */}
                                        <div className="absolute top-5 left-5 flex gap-2">
                                            <span className="bg-emerald-600 text-white text-[10px] font-black uppercase px-4 py-2 rounded-full shadow-lg">
                                                {item.category}
                                            </span>
                                        </div>
                                        
                                        {/* View Count on Hover */}
                                        <div className="absolute bottom-5 left-5 flex items-center gap-2 text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0">
                                            <Eye className="w-4 h-4" />
                                            <span>1.2k views</span>
                                        </div>
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="p-7">
                                        {/* Meta */}
                                        <div className="flex items-center gap-4 text-gray-400 text-xs font-bold mb-3 uppercase tracking-wider">
                                            <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-full">
                                                <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                                                {new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                            </div>
                                            <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-full">
                                                <Clock className="w-3.5 h-3.5 text-emerald-500" />
                                                {Math.ceil(item.summary?.length / 200) || 3} min read
                                            </div>
                                        </div>
                                        
                                        {/* Title */}
                                        <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-emerald-600 transition-colors leading-tight line-clamp-2">
                                            {item.title}
                                        </h3>
                                        
                                        {/* Summary */}
                                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-5 line-clamp-2">
                                            {item.summary}
                                        </p>
                                        
                                        {/* CTA */}
                                        <Link 
                                            href={route('hot-news.show', item.slug)}
                                            className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 font-bold text-sm px-4 py-2.5 rounded-xl hover:bg-emerald-600 hover:text-white transition-all duration-300 group/btn"
                                        >
                                            Read Article
                                            <ChevronRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Pagination */}
                        {news.links && news.links.length > 3 && (
                            <div className="mt-16 flex justify-center gap-2">
                                {news.links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className={`px-6 py-3 rounded-2xl text-sm font-black transition-all ${
                                            link.active 
                                                ? 'bg-emerald-600 text-white shadow-lg' 
                                                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-emerald-50'
                                        } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sidebar / Trending */}
                    <div className="space-y-10">
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-xl">
                            <div className="flex items-center gap-3 mb-8">
                                <TrendingUp className="w-5 h-5 text-emerald-600" />
                                <h3 className="text-lg font-black uppercase tracking-tight text-gray-900 dark:text-white">Trending</h3>
                            </div>
                            <div className="space-y-8">
                                {news.data.slice(0, 4).map((item, i) => (
                                    <Link key={item.id} href={route('hot-news.show', item.slug)} className="flex gap-5 group">
                                        <span className="text-3xl font-black text-gray-100 dark:text-gray-700 group-hover:text-emerald-500 transition-colors">0{i+1}</span>
                                        <div className="min-w-0">
                                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1 block">{item.category}</span>
                                            <h4 className="text-sm font-black text-gray-900 dark:text-white leading-tight line-clamp-2 group-hover:text-emerald-600 transition-colors">
                                                {item.title}
                                            </h4>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="bg-emerald-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
                            <h3 className="text-2xl font-black mb-4 relative z-10 leading-tight italic">PhysioPlanet Weekly</h3>
                            <p className="text-emerald-100/70 text-sm mb-8 relative z-10 font-medium leading-relaxed">Get the best physiotherapy news and research delivered straight to your inbox.</p>
                            
                            {wasSuccessful ? (
                                <div className="relative z-10 bg-emerald-800/50 border border-emerald-500/30 rounded-2xl p-6 text-center animate-in fade-in zoom-in duration-300">
                                    <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                                    <h4 className="text-lg font-black mb-2">You're Subscribed!</h4>
                                    <p className="text-emerald-100/70 text-xs">Check your email for the latest updates.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubscribe} className="relative z-10 space-y-4">
                                    <div>
                                        <input 
                                            type="email" 
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                            placeholder="Email address" 
                                            className={`w-full bg-white/10 border-white/20 rounded-2xl py-4 px-6 text-sm placeholder:text-white/40 focus:ring-2 focus:ring-amber-400 transition-all outline-none ${errors.email ? 'border-red-400 focus:ring-red-400' : ''}`} 
                                            required
                                        />
                                        {errors.email && <p className="mt-2 text-red-400 text-[10px] font-black uppercase tracking-widest">{errors.email}</p>}
                                    </div>
                                    <button 
                                        type="submit"
                                        disabled={processing}
                                        className="w-full py-4 bg-amber-400 text-amber-950 font-black rounded-2xl hover:bg-amber-300 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {processing ? 'Processing...' : 'Subscribe Now'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
