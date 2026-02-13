import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import { ThumbsUp, ThumbsDown, MessageCircle, Clock, ArrowLeft, Send, Share2, MoreHorizontal, Home, ChevronRight, Hash, Calendar, MessageSquare, Award, User, CheckCircle2, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Show({ topic = null, posts = [] }) {
    // Add logging to debug data flow
    useEffect(() => {
        console.log('Forum Show Rendered. Topic:', topic);
        console.log('Posts:', posts);
    }, [topic, posts]);

    if (!topic || typeof topic !== 'object') {
        return (
            <AuthenticatedLayout header={<div className="hidden">Forum Thread</div>}>
                <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
                    <div className="text-center">
                        <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 font-bold">Topic not found or loading...</p>
                        <Link href={route('forum')} className="mt-4 inline-block text-emerald-600 font-bold hover:underline">
                            Return to Forum
                        </Link>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    const { auth } = usePage().props;
    const { data, setData, post, processing, reset, errors } = useForm({
        content: '',
    });

    const [replyingTo, setReplyingTo] = useState(null);

    const submitReply = (e) => {
        e.preventDefault();
        if (!data.content || !data.content.trim()) return;
        
        post(route('forum.post.store', topic.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset('content');
                setReplyingTo(null);
            },
        });
    };

    const handleReaction = (type, id, reactionType) => {
        if (!id) return;
        router.post(route('forum.react', { type, id, reactionType }), {}, {
            preserveScroll: true,
        });
    };

    const categoriesList = [
        { name: 'JamiiCheck', icon: CheckCircle2 },
        { name: 'FichuaUovu', icon: Hash },
        { name: 'Stories of Change', icon: Award },
    ];

    const regions = [
        { name: 'Tanzania', flag: '🇹🇿' },
        { name: 'Uganda', flag: '🇺🇬' },
        { name: 'Kenya', flag: '🇰🇪' },
        { name: 'Rwanda', flag: '🇷🇼' },
        { name: 'DRC', flag: '🇨🇩' },
        { name: 'Zambia', flag: '🇿🇲' },
    ];

    const formatReactionText = (count, recentLikes, userReaction) => {
        const totalCount = Number(count) || 0;
        if (totalCount === 0) return 'Be the first to react';
        
        let names = Array.isArray(recentLikes) ? [...recentLikes] : [];
        if (userReaction === 'like' && !names.includes('You')) {
            names = ['You', ...names.slice(0, 2)];
        }

        if (names.length === 0) return `${totalCount} reactions`;

        const displayedCount = totalCount > names.length ? totalCount - names.length : 0;
        const namesText = names.join(', ');

        if (displayedCount > 0) {
            return `${namesText} and ${displayedCount} others`;
        }
        return namesText;
    };

    const urlencode = (str) => encodeURIComponent(str || '').replace(/[!'()*]/g, (c) => '%' + c.charCodeAt(0).toString(16));

    const userAvatar = (u) => {
        if (u?.avatar_url) return u.avatar_url;
        const name = u?.name || 'User';
        return `https://ui-avatars.com/api/?name=${urlencode(name)}&background=065f46&color=ffffff`;
    };

    return (
        <AuthenticatedLayout header={<div className="hidden">Forum Thread</div>}>
            <Head title={topic.title || 'Forum'} />

            <div className="flex flex-col lg:flex-row gap-6 min-h-screen bg-gray-50 text-gray-900 -mx-4 -my-6 sm:-mx-6 lg:-mx-8 dark:bg-gray-950 dark:text-gray-100">
                {/* Left Sidebar */}
                <aside className="w-full lg:w-64 flex-shrink-0 bg-white p-6 border-r border-gray-200 hidden lg:block dark:bg-gray-900 dark:border-gray-800">
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-sm font-black uppercase tracking-wider text-gray-500 mb-4 dark:text-gray-400">Our Community</h3>
                            <ul className="space-y-3">
                                {categoriesList.map((cat) => (
                                    <li key={cat.name}>
                                        <button className="flex items-center gap-3 text-sm font-bold text-gray-600 hover:text-emerald-600 transition-colors dark:text-gray-300 dark:hover:text-emerald-400">
                                            {cat.icon && <cat.icon className="h-4 w-4" />}
                                            {cat.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-sm font-black uppercase tracking-wider text-gray-500 mb-4 dark:text-gray-400">Regional Communities</h3>
                            <ul className="space-y-3">
                                {regions.map((region) => (
                                    <li key={region.name}>
                                        <button className="flex items-center gap-3 text-sm font-bold text-gray-600 hover:text-emerald-600 transition-colors w-full dark:text-gray-300 dark:hover:text-emerald-400">
                                            <span className="text-lg">{region.flag}</span>
                                            {region.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </aside>

                {/* Main Thread Area */}
                <main className="flex-1 p-4 lg:p-8 space-y-6 overflow-y-auto max-w-5xl mx-auto lg:mx-0">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-500 mb-4 dark:text-gray-400">
                        <Link href={route('forum')} className="hover:text-emerald-600 flex items-center gap-1">
                            <Home className="h-3 w-3" /> Forums
                        </Link>
                        <ChevronRight className="h-3 w-3" />
                        <span className="hover:text-emerald-600 cursor-pointer">{topic.category || 'General'} Forums</span>
                        <ChevronRight className="h-3 w-3" />
                        <span className="text-gray-400 truncate">{topic.title}</span>
                    </nav>

                    {/* Topic Header Card */}
                    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm dark:bg-gray-900 dark:border-gray-800">
                        <div className="bg-gradient-to-r from-emerald-50 via-transparent to-transparent p-8 dark:from-emerald-950/20">
                            <h1 className="text-2xl lg:text-3xl font-black text-gray-900 leading-tight mb-4 dark:text-white">
                                {topic.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-gray-500">
                                <span className="flex items-center gap-1.5 hover:text-emerald-600 transition-colors cursor-pointer">
                                    <User className="h-4 w-4" /> {topic.user?.name || 'Anonymous'}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Clock className="h-4 w-4" /> {topic.created_at}
                                </span>
                                <div className="flex gap-2">
                                    {['health', 'community', 'feedback'].map(tag => (
                                        <span key={tag} className="bg-gray-100 px-2 py-0.5 rounded text-[10px] uppercase font-black tracking-tighter hover:text-emerald-600 cursor-pointer transition-colors dark:bg-gray-800 dark:text-gray-400 dark:hover:text-emerald-400">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Posts List */}
                    <div className="space-y-4">
                        {/* OP Post */}
                        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm dark:bg-gray-900 dark:border-gray-800">
                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-48 bg-gray-50/50 p-6 border-b md:border-b-0 md:border-r border-gray-100 text-center dark:bg-gray-800/30 dark:border-gray-800">
                                    <div className="h-20 w-20 mx-auto overflow-hidden rounded-2xl ring-4 ring-emerald-500/10 shadow-md mb-4">
                                        <img src={userAvatar(topic.user)} alt={topic.user?.name || 'User'} className="h-full w-full object-cover" />
                                    </div>
                                    <h4 className="font-black text-gray-900 text-sm truncate dark:text-white">{topic.user?.name || 'Anonymous'}</h4>
                                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mt-1 text-center">Expert Member</p>
                                    <div className="mt-4 space-y-1 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                                        <div className="flex items-center justify-between">joined 2024</div>
                                        <div className="flex items-center justify-between">1.2k posts</div>
                                        <div className="flex items-center justify-between">5.4k likes</div>
                                    </div>
                                </div>
                                <div className="flex-1 flex flex-col">
                                    <div className="p-4 bg-gray-50/30 border-b border-gray-100 flex justify-between items-center text-[10px] font-black text-gray-400 uppercase dark:bg-gray-800/10 dark:border-gray-800">
                                        <span>{topic.created_at}</span>
                                        <span className="flex items-center gap-2">
                                            <Share2 className="h-3 w-3 hover:text-emerald-600 cursor-pointer transition-colors" />
                                            #1
                                        </span>
                                    </div>
                                    <div className="p-6 text-gray-700 leading-relaxed whitespace-pre-wrap flex-1 text-base dark:text-gray-200">
                                        {topic.content}
                                    </div>
                                    <div className="p-4 bg-gray-50/50 border-t border-gray-100 flex items-center gap-4 dark:bg-gray-800/20 dark:border-gray-800">
                                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-[11px] font-black dark:bg-emerald-900/10 dark:border-emerald-500/20 dark:text-emerald-400">
                                            <ThumbsUp className={`h-3.5 w-3.5 ${topic.user_reaction === 'like' ? 'fill-emerald-600' : ''}`} />
                                            <span>{formatReactionText(topic.likes_count, topic.recent_likes, topic.user_reaction)}</span>
                                        </div>
                                        <div className="flex items-center gap-2 ml-auto">
                                            <button 
                                                onClick={() => handleReaction('topic', topic.id, 'like')} 
                                                className={`transition-colors p-1.5 rounded-lg hover:bg-emerald-50 ${topic.user_reaction === 'like' ? 'text-emerald-600' : 'text-gray-400'}`}
                                            >
                                                <ThumbsUp className="h-5 w-5" />
                                            </button>
                                            <button 
                                                onClick={() => handleReaction('topic', topic.id, 'dislike')} 
                                                className={`transition-colors p-1.5 rounded-lg hover:bg-red-50 ${topic.user_reaction === 'dislike' ? 'text-red-600' : 'text-gray-400'}`}
                                            >
                                                <ThumbsDown className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Replies */}
                        {Array.isArray(posts) && posts.map((p, idx) => (
                            <div key={p.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm dark:bg-gray-900 dark:border-gray-800">
                                <div className="flex flex-col md:flex-row">
                                    <div className="md:w-48 bg-gray-50/50 p-6 border-b md:border-b-0 md:border-r border-gray-100 text-center dark:bg-gray-800/30 dark:border-gray-800">
                                        <div className="h-16 w-16 mx-auto overflow-hidden rounded-xl ring-2 ring-gray-100 shadow-md mb-3 dark:ring-gray-800">
                                            <img src={userAvatar(p.user)} alt={p.user?.name || 'User'} className="h-full w-full object-cover" />
                                        </div>
                                        <h4 className="font-bold text-gray-900 text-xs truncate dark:text-white">{p.user?.name || 'Anonymous'}</h4>
                                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">Expert Member</p>
                                    </div>
                                    <div className="flex-1 flex flex-col">
                                        <div className="p-3 bg-gray-50/30 border-b border-gray-100 flex justify-between items-center text-[10px] font-black text-gray-400 uppercase dark:bg-gray-800/10 dark:border-gray-800">
                                            <span>{p.created_at}</span>
                                            <span className="flex items-center gap-2">
                                                <Share2 className="h-3 w-3 hover:text-emerald-600 cursor-pointer transition-colors" />
                                                #{idx + 2}
                                            </span>
                                        </div>
                                        <div className="p-6 text-gray-600 text-sm leading-relaxed dark:text-gray-300">
                                            {p.content}
                                        </div>
                                        <div className="p-3 bg-gray-50/50 border-t border-gray-100 flex items-center gap-4 justify-end dark:bg-gray-800/20 dark:border-gray-800">
                                            <button 
                                                onClick={() => handleReaction('post', p.id, 'like')} 
                                                className={`flex items-center gap-1.5 text-[10px] font-black transition-colors uppercase py-1 px-3 rounded-lg hover:bg-emerald-50 ${p.user_reaction === 'like' ? 'text-emerald-600' : 'text-gray-400'}`}
                                            >
                                                <ThumbsUp className={`h-4 w-4 ${p.user_reaction === 'like' ? 'fill-emerald-600' : ''}`} />
                                                <span>{p.likes_count || 0} Likes</span>
                                            </button>
                                            <button 
                                                onClick={() => handleReaction('post', p.id, 'dislike')} 
                                                className={`flex items-center gap-1.5 text-[10px] font-black transition-colors uppercase py-1 px-3 rounded-lg hover:bg-red-50 ${p.user_reaction === 'dislike' ? 'text-red-600' : 'text-gray-400'}`}
                                            >
                                                <ThumbsDown className={`h-4 w-4 ${p.user_reaction === 'dislike' ? 'fill-red-600' : ''}`} />
                                                <span>{p.dislikes_count || 0} Dislikes</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Reply Form */}
                    <div className="sticky bottom-6 mt-8">
                        <form onSubmit={submitReply} className="bg-white rounded-2xl border-2 border-emerald-500/10 shadow-xl p-4 backdrop-blur-xl dark:bg-gray-900/90 dark:border-emerald-500/20">
                            <textarea
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                placeholder="Write your response here..."
                                className="block w-full rounded-xl border-none bg-gray-50 text-gray-900 py-4 px-5 text-sm font-medium shadow-inner focus:ring-2 focus:ring-emerald-500 resize-none h-24 dark:bg-gray-950/50 dark:text-gray-100"
                                required
                            />
                            <div className="mt-4 flex justify-between items-center">
                                <div className="flex gap-4 text-gray-400">
                                    <Plus className="h-5 w-5 cursor-pointer hover:text-emerald-600" />
                                    <MoreHorizontal className="h-5 w-5 cursor-pointer hover:text-emerald-600" />
                                </div>
                                <button
                                    disabled={processing || !data.content || !data.content.trim()}
                                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-8 py-3 text-sm font-black text-white shadow-lg hover:bg-emerald-500 transition-all active:scale-95 disabled:opacity-50"
                                >
                                    <Send className="h-4 w-4" />
                                    Post Reply
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}


