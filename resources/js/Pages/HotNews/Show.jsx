import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Calendar, Clock, Share2, Bookmark, ArrowLeft, User, MessageCircle, ChevronRight, TrendingUp, Reply, Send, CornerDownRight } from 'lucide-react';
import { useState } from 'react';

const Comment = ({ comment, newsId, onReply }) => {
    const [isReplying, setIsReplying] = useState(false);
    const { data, setData, post, processing, reset } = useForm({
        content: '',
        parent_id: comment.id
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('news.comments.store', newsId), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setIsReplying(false);
            }
        });
    };

    return (
        <div className="group">
            <div className="flex gap-4 p-6 bg-white dark:bg-gray-800/50 rounded-[2rem] border border-gray-100 dark:border-gray-700/50 shadow-sm transition-all hover:shadow-md">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center font-black text-emerald-700 text-lg shadow-inner flex-shrink-0">
                    {comment?.user?.name?.charAt(0) || '?'}
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="font-black text-gray-900 dark:text-white text-sm">{comment?.user?.name || 'Anonymous'}</h4>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{comment?.created_at ? new Date(comment.created_at).toLocaleDateString() : 'No date'}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">{comment.content}</p>
                    <button 
                        onClick={() => setIsReplying(!isReplying)}
                        className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:text-emerald-700 transition-colors"
                    >
                        <Reply className="w-3 h-3" />
                        Reply
                    </button>

                    {isReplying && (
                        <form onSubmit={handleSubmit} className="mt-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                            <textarea 
                                value={data.content}
                                onChange={e => setData('content', e.target.value)}
                                className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-2xl py-4 px-6 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500 transition-all outline-none min-h-[100px]"
                                placeholder="Write your reply..."
                                required
                            />
                            <div className="flex justify-end gap-3">
                                <button 
                                    type="button"
                                    onClick={() => setIsReplying(false)}
                                    className="px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:bg-gray-100 transition-all"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    disabled={processing}
                                    className="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/30 hover:shadow-xl transition-all disabled:opacity-50"
                                >
                                    <Send className="w-3 h-3" />
                                    Post Reply
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>

            {comment.replies && comment.replies.length > 0 && (
                <div className="ml-12 mt-4 space-y-4">
                    {comment.replies.map(reply => (
                        <div key={reply.id} className="flex gap-4">
                            <div className="mt-4">
                                <CornerDownRight className="w-4 h-4 text-gray-300" />
                            </div>
                            <div className="flex-1">
                                <Comment comment={reply} newsId={newsId} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default function Show({ news, related_news, trending_news }) {
    const { data, setData, post, processing, reset } = useForm({
        content: '',
        parent_id: null
    });

    const handlePostComment = (e) => {
        e.preventDefault();
        post(route('news.comments.store', news.id), {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };

    return (
        <PublicLayout>
            <Head title={`${news.title} - Hot News`} />
            
            <div className="py-8 px-4 sm:px-6 lg:px-10 max-w-[1600px] mx-auto">
                <Link 
                    href={route('hot-news')} 
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-emerald-600 font-black text-sm mb-8 transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to News Feed
                </Link>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Main Content Area */}
                    <div className="flex-1 max-w-4xl">
                        <article className="bg-white dark:bg-gray-800 rounded-[3rem] overflow-hidden border border-gray-100 dark:border-gray-700 shadow-2xl shadow-gray-200/50 dark:shadow-none mb-12">
                            {/* Article Header / Hero Image - POWER DESIGN */}
                            <div className="relative h-[450px] md:h-[550px] lg:h-[600px] overflow-hidden group">
                                {/* Main Image */}
                                <img 
                                    src={news.image} 
                                    alt={news.title} 
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[2000ms] ease-out" 
                                />
                                
                                {/* Multi-layer Gradient Overlays */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent"></div>
                                
                                {/* Animated Corner Accent */}
                                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-emerald-500/30 to-transparent"></div>
                                
                                {/* Content Overlay */}
                                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 lg:p-16">
                                    {/* Breadcrumbs */}
                                    <div className="flex items-center gap-2 text-white/60 text-sm font-medium mb-6">
                                        <Link href={route('hot-news')} className="hover:text-white transition-colors">Hot News</Link>
                                        <ChevronRight className="w-4 h-4" />
                                        <span className="text-white/40">Article</span>
                                    </div>
                                    
                                    {/* Badges */}
                                    <div className="flex items-center gap-3 mb-5 flex-wrap">
                                        <span className="px-5 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-black uppercase tracking-wider rounded-full shadow-lg">
                                            {news.category}
                                        </span>
                                        {news.is_hot && (
                                            <span className="px-5 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white text-xs font-black uppercase tracking-wider rounded-full shadow-lg animate-pulse flex items-center gap-1.5">
                                                <TrendingUp className="w-3.5 h-3.5" />
                                                Trending
                                            </span>
                                        )}
                                        <div className="flex items-center gap-2 text-white/80 text-xs font-bold uppercase tracking-wider bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
                                            <Clock className="w-3.5 h-3.5" />
                                            {Math.ceil(news.content?.length / 1000) || 5} min read
                                        </div>
                                    </div>
                                    
                                    {/* Title */}
                                    <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-[1.1] tracking-tight text-white drop-shadow-2xl max-w-4xl">
                                        {news.title}
                                    </h1>
                                    
                                    {/* Author Preview */}
                                    <div className="flex items-center gap-4 mt-8">
                                        <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center font-black text-white text-lg shadow-lg border-2 border-white/20">
                                            {news.author_name.charAt(0)}
                                        </div>
                                        <div className="text-white">
                                            <p className="font-bold text-sm">{news.author_name}</p>
                                            <p className="text-xs text-white/60 flex items-center gap-1.5">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(news.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Share Button Floating */}
                                <div className="absolute top-8 right-8 flex gap-3">
                                    <button className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/20">
                                        <Share2 className="w-5 h-5" />
                                    </button>
                                    <button className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/20">
                                        <Bookmark className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="p-8 md:p-16">
                                {/* Article Metadata */}
                                <div className="flex flex-wrap items-center gap-10 mb-16 py-8 border-b border-gray-100 dark:border-gray-700/50">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center font-black text-emerald-700 text-2xl shadow-inner">
                                            {news.author_name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Editor</p>
                                            <p className="text-gray-900 dark:text-white font-black text-xl leading-none">{news.author_name}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Published</p>
                                        <div className="flex items-center gap-2 text-gray-900 dark:text-white font-bold">
                                            <Calendar className="w-4 h-4 text-emerald-500" />
                                            {new Date(news.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </div>
                                    </div>

                                    <div className="ml-auto flex gap-3">
                                        <button className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl hover:bg-emerald-50 dark:hover:bg-emerald-900/30 text-gray-400 hover:text-emerald-600 transition-all border border-transparent hover:border-emerald-100">
                                            <Share2 className="w-5 h-5" />
                                        </button>
                                        <button className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl hover:bg-emerald-50 dark:hover:bg-emerald-900/30 text-gray-400 hover:text-emerald-600 transition-all border border-transparent hover:border-emerald-100">
                                            <Bookmark className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Summary */}
                                <div className="mb-12 bg-gray-50 dark:bg-gray-900/50 p-10 rounded-[2.5rem] border border-gray-100 dark:border-gray-800">
                                    <p className="text-xl text-gray-700 dark:text-gray-200 leading-relaxed font-bold italic">
                                        "{news.summary}"
                                    </p>
                                </div>

                                {/* Article Body */}
                                <div 
                                    className="prose prose-xl prose-emerald dark:prose-invert max-w-none 
                                    prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:leading-[1.8]
                                    prose-strong:text-gray-900 dark:prose-strong:text-white"
                                    dangerouslySetInnerHTML={{ __html: news.content }}
                                />
                            </div>
                        </article>

                        {/* Comments Section */}
                        <div className="bg-white dark:bg-gray-800 rounded-[3rem] p-8 md:p-16 border border-gray-100 dark:border-gray-700 shadow-2xl shadow-gray-200/50 dark:shadow-none">
                            <div className="flex items-center gap-4 mb-12">
                                <div className="h-10 w-1.5 bg-emerald-500 rounded-full"></div>
                                <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900 dark:text-white">Discussion</h2>
                                <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-black rounded-lg">
                                    {news.comments.length} Comments
                                </span>
                            </div>

                            {/* Post a Comment */}
                            <form onSubmit={handlePostComment} className="mb-16">
                                <div className="relative group">
                                    <textarea 
                                        value={data.content}
                                        onChange={e => setData('content', e.target.value)}
                                        className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-[2rem] py-6 px-8 text-base placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500 transition-all outline-none min-h-[150px] shadow-inner"
                                        placeholder="Share your thoughts on this story..."
                                        required
                                    />
                                    <button 
                                        type="submit"
                                        disabled={processing}
                                        className="absolute bottom-4 right-4 flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-emerald-500/30 hover:shadow-xl transition-all disabled:opacity-50"
                                    >
                                        <Send className="w-4 h-4" />
                                        {processing ? 'Posting...' : 'Post Comment'}
                                    </button>
                                </div>
                            </form>

                            {/* Comments List */}
                            <div className="space-y-8">
                                {news.comments.length > 0 ? (
                                    news.comments.map(comment => (
                                        <Comment key={comment.id} comment={comment} newsId={news.id} />
                                    ))
                                ) : (
                                    <div className="text-center py-12 bg-gray-50 dark:bg-gray-900/30 rounded-[2.5rem] border-2 border-dashed border-gray-100 dark:border-gray-800">
                                        <MessageCircle className="w-12 h-12 text-gray-200 dark:text-gray-700 mx-auto mb-4" />
                                        <p className="text-gray-400 font-bold">No comments yet. Be the first to start the discussion!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Area */}
                    <aside className="w-full lg:w-[400px] space-y-10">
                        {/* Trending News */}
                        <div className="bg-white dark:bg-gray-800 rounded-[3rem] p-10 border border-gray-100 dark:border-gray-700 shadow-xl shadow-gray-200/50 dark:shadow-none">
                            <div className="flex items-center gap-3 mb-10">
                                <TrendingUp className="w-6 h-6 text-emerald-600" />
                                <h3 className="text-xl font-black uppercase tracking-tight text-gray-900 dark:text-white">Trending News</h3>
                            </div>
                            <div className="space-y-10">
                                {trending_news.map((item, i) => (
                                    <Link key={item.id} href={route('hot-news.show', item.slug)} className="flex gap-6 group">
                                        <span className="text-4xl font-black text-gray-100 dark:text-gray-700 group-hover:text-emerald-500 transition-colors">0{i+1}</span>
                                        <div className="min-w-0">
                                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2 block">{item.category}</span>
                                            <h4 className="text-[15px] font-black text-gray-900 dark:text-white leading-tight line-clamp-2 group-hover:text-emerald-600 transition-colors">
                                                {item.title}
                                            </h4>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Newsletter Sidebar Component */}
                        <div className="bg-emerald-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl border border-emerald-800">
                            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
                            <h3 className="text-2xl font-black mb-4 relative z-10 leading-tight italic">PhysioPlanet Weekly</h3>
                            <p className="text-emerald-100/60 text-sm mb-10 relative z-10 font-medium leading-relaxed">Join 5,000+ professionals getting weekly insights delivered to their inbox.</p>
                            <Link 
                                href={route('hot-news')}
                                className="relative z-10 w-full py-5 bg-amber-400 text-amber-950 font-black rounded-2xl hover:bg-amber-300 transition-all shadow-xl flex items-center justify-center gap-2"
                            >
                                Subscribe Now
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>

                        {/* More Related in Category */}
                        <div className="bg-white dark:bg-gray-800 rounded-[3rem] p-10 border border-gray-100 dark:border-gray-700 shadow-xl shadow-gray-200/50 dark:shadow-none">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="h-8 w-1.5 bg-amber-400 rounded-full"></div>
                                <h2 className="text-xl font-black uppercase tracking-tighter text-gray-900 dark:text-white">
                                    More in <span className="text-emerald-600">{news.category}</span>
                                </h2>
                            </div>
                            
                            <div className="flex flex-col gap-8">
                                {related_news.map((item, index) => (
                                    <Link 
                                        key={item.id}
                                        href={route('hot-news.show', item.slug)}
                                        className="group flex gap-5"
                                    >
                                        {/* Image with aspect ratio and hover effects */}
                                        <div className="relative w-28 h-20 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg ring-1 ring-black/5 group-hover:shadow-xl transition-shadow duration-500">
                                            <img 
                                                src={item.image} 
                                                alt={item.title} 
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out" 
                                                loading="lazy"
                                            />
                                            {/* Gradient overlay on hover */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                            {/* Index number badge */}
                                            <div className="absolute bottom-2 left-2 w-6 h-6 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-xs font-black text-gray-700 shadow-sm">
                                                {index + 1}
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-center min-w-0">
                                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider mb-1.5">
                                                {item.category}
                                            </span>
                                            <h3 className="text-sm font-black text-gray-900 dark:text-white group-hover:text-emerald-600 transition-colors leading-snug line-clamp-2">
                                                {item.title}
                                            </h3>
                                            <div className="flex items-center gap-2 mt-2 text-gray-400 text-[10px]">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </PublicLayout>
    );
}

