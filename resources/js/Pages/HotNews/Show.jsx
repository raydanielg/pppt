import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
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
                    {comment.user.name.charAt(0)}
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="font-black text-gray-900 dark:text-white text-sm">{comment.user.name}</h4>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{new Date(comment.created_at).toLocaleDateString()}</span>
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
        <AuthenticatedLayout>
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
                            {/* Article Header / Hero Image */}
                            <div className="relative h-[500px]">
                                <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                <div className="absolute bottom-12 left-12 right-12 text-white">
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="px-4 py-1.5 bg-amber-400 text-amber-950 text-xs font-black uppercase tracking-[0.2em] rounded-full">
                                            {news.category}
                                        </span>
                                        {news.is_hot && (
                                            <span className="px-4 py-1.5 bg-orange-600 text-white text-xs font-black uppercase tracking-[0.2em] rounded-full animate-pulse">
                                                Hot News
                                            </span>
                                        )}
                                    </div>
                                    <h1 className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tight">
                                        {news.title}
                                    </h1>
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
                            
                            <div className="flex flex-col gap-10">
                                {related_news.map((item) => (
                                    <Link 
                                        key={item.id}
                                        href={route('hot-news.show', item.slug)}
                                        className="group flex gap-6"
                                    >
                                        <div className="w-24 h-24 rounded-[1.5rem] overflow-hidden flex-shrink-0 shadow-lg ring-1 ring-black/5">
                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <div className="flex flex-col justify-center min-w-0">
                                            <span className="text-[9px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-2">
                                                {item.category}
                                            </span>
                                            <h3 className="text-[15px] font-black text-gray-900 dark:text-white group-hover:text-emerald-600 transition-colors leading-tight line-clamp-3">
                                                {item.title}
                                            </h3>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

