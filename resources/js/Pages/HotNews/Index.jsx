import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Flame, Calendar, Clock, ChevronRight, Share2, Eye, TrendingUp, CheckCircle2 } from 'lucide-react';

export default function Index({ news, hot_news }) {
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
        <AuthenticatedLayout>
            <Head title="Hot News" />
            
            <div className="py-8 px-4 sm:px-6 lg:px-10 max-w-[1600px] mx-auto">
                {/* Hero / Hot News Section */}
                <div className="mb-16">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-2xl">
                            <Flame className="w-6 h-6 text-orange-600 animate-pulse" />
                        </div>
                        <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900 dark:text-white">Hot News</h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {hot_news.map((item, index) => (
                            <Link 
                                key={item.id} 
                                href={route('hot-news.show', item.slug)}
                                className={`group relative rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 hover:scale-[1.01] ${
                                    index === 0 ? 'lg:row-span-2 h-full' : 'h-[300px]'
                                }`}
                            >
                                <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="px-4 py-1.5 bg-amber-400 text-amber-950 text-[10px] font-black uppercase rounded-full">
                                            {item.category}
                                        </span>
                                        <div className="flex items-center gap-1.5 text-white/70 text-[10px] font-bold uppercase tracking-widest">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(item.created_at).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <h3 className={`font-black text-white leading-tight group-hover:text-amber-400 transition-colors ${
                                        index === 0 ? 'text-2xl md:text-3xl lg:text-4xl' : 'text-xl md:text-2xl'
                                    }`}>
                                        {item.title}
                                    </h3>
                                    {index === 0 && (
                                        <p className="mt-6 text-white/70 text-sm md:text-base line-clamp-2 max-w-2xl font-medium">
                                            {item.summary}
                                        </p>
                                    )}
                                </div>
                            </Link>
                        ))}
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
                                <div key={item.id} className="group bg-white dark:bg-gray-800 rounded-[2rem] overflow-hidden border border-gray-100 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-500">
                                    <div className="relative h-56 overflow-hidden">
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute top-4 left-4 bg-emerald-600 text-white text-[10px] font-black uppercase px-4 py-1.5 rounded-full shadow-lg">
                                            {item.category}
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <div className="flex items-center gap-4 text-gray-400 text-[10px] font-bold mb-4 uppercase tracking-widest">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-3 h-3 text-emerald-500" />
                                                {new Date(item.created_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-black text-gray-900 dark:text-white mb-4 group-hover:text-emerald-600 transition-colors leading-tight line-clamp-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8 line-clamp-2">
                                            {item.summary}
                                        </p>
                                        <Link 
                                            href={route('hot-news.show', item.slug)}
                                            className="inline-flex items-center gap-2 text-emerald-600 font-black text-sm hover:translate-x-1 transition-transform"
                                        >
                                            Full Story
                                            <ChevronRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
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
        </AuthenticatedLayout>
    );
}
