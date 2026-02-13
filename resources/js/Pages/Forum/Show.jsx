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

            <div className="flex flex-col lg:flex-row gap-4 min-h-screen bg-gray-50 text-gray-900 -mx-4 -my-6 sm:-mx-6 lg:-mx-8 dark:bg-gray-950 dark:text-gray-100">
                {/* Left Sidebar - Compact */}
                <aside className="w-full lg:w-56 flex-shrink-0 bg-white p-5 border-r border-gray-200 hidden lg:block dark:bg-gray-900 dark:border-gray-800">
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 dark:text-gray-500">Our Community</h3>
                            <ul className="space-y-2">
                                {categoriesList.map((cat) => (
                                    <li key={cat.name}>
                                        <button className="flex items-center gap-2.5 text-xs font-bold text-gray-600 hover:text-emerald-600 transition-colors dark:text-gray-300 dark:hover:text-emerald-400">
                                            {cat.icon && <cat.icon className="h-3.5 w-3.5" />}
                                            {cat.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 dark:text-gray-500">Regions</h3>
                            <ul className="space-y-2">
                                {regions.map((region) => (
                                    <li key={region.name}>
                                        <button className="flex items-center gap-2.5 text-xs font-bold text-gray-600 hover:text-emerald-600 transition-colors w-full dark:text-gray-300 dark:hover:text-emerald-400">
                                            <span className="text-base">{region.flag}</span>
                                            {region.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </aside>

                {/* Main Thread Area - Compact */}
                <main className="flex-1 p-4 lg:p-6 space-y-4 overflow-y-auto max-w-4xl">
                    {/* Breadcrumbs - Smaller */}
                    <nav className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2 dark:text-gray-500">
                        <Link href={route('forum')} className="hover:text-emerald-600 flex items-center gap-1">
                            <Home className="h-2.5 w-2.5" /> Forums
                        </Link>
                        <ChevronRight className="h-2.5 w-2.5" />
                        <span className="hover:text-emerald-600 cursor-pointer">{topic.category || 'General'}</span>
                        <ChevronRight className="h-2.5 w-2.5" />
                        <span className="text-gray-300 truncate max-w-[200px]">{topic.title}</span>
                    </nav>

                    {/* Topic Header Card - More Compact */}
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm dark:bg-gray-900 dark:border-gray-800">
                        <div className="bg-gradient-to-r from-emerald-50 via-transparent to-transparent p-5 dark:from-emerald-950/10">
                            <h1 className="text-lg lg:text-xl font-black text-gray-900 leading-snug mb-2 dark:text-white">
                                {topic.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold text-gray-500">
                                <span className="flex items-center gap-1 hover:text-emerald-600 transition-colors cursor-pointer">
                                    <User className="h-3 w-3" /> {topic.user?.name || 'Anonymous'}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" /> {topic.created_at}
                                </span>
                                <div className="flex gap-1.5">
                                    {['health', 'community'].map(tag => (
                                        <span key={tag} className="bg-gray-100 px-1.5 py-0.5 rounded text-[9px] uppercase font-black tracking-tight text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Posts List - Tighter spacing */}
                    <div className="space-y-3">
                        {/* OP Post */}
                        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm dark:bg-gray-900 dark:border-gray-800">
                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-40 bg-gray-50/50 p-4 border-b md:border-b-0 md:border-r border-gray-100 text-center dark:bg-gray-800/20 dark:border-gray-800">
                                    <div className="h-14 w-14 mx-auto overflow-hidden rounded-xl ring-2 ring-emerald-500/10 shadow-sm mb-2">
                                        <img src={userAvatar(topic.user)} alt={topic.user?.name || 'User'} className="h-full w-full object-cover" />
                                    </div>
                                    <h4 className="font-black text-gray-900 text-xs truncate dark:text-white">{topic.user?.name || 'Anonymous'}</h4>
                                    <p className="text-[9px] font-black text-emerald-600 uppercase tracking-tighter mt-0.5">Expert Member</p>
                                    <div className="mt-3 space-y-0.5 text-[9px] font-bold text-gray-400 uppercase">
                                        <div className="flex items-center justify-between">joined 2024</div>
                                        <div className="flex items-center justify-between">1.2k posts</div>
                                    </div>
                                </div>
                                <div className="flex-1 flex flex-col">
                                    <div className="px-4 py-2 bg-gray-50/30 border-b border-gray-100 flex justify-between items-center text-[9px] font-black text-gray-400 uppercase dark:bg-gray-800/10 dark:border-gray-800">
                                        <span>{topic.created_at}</span>
                                        <span className="flex items-center gap-2">
                                            <Share2 className="h-2.5 w-2.5 hover:text-emerald-600 cursor-pointer transition-colors" />
                                            #1
                                        </span>
                                    </div>
                                    <div className="p-4 text-gray-700 leading-relaxed whitespace-pre-wrap flex-1 text-sm dark:text-gray-200">
                                        {topic.content}
                                    </div>
                                    <div className="px-4 py-2.5 bg-gray-50/50 border-t border-gray-100 flex items-center gap-3 dark:bg-gray-800/20 dark:border-gray-800">
                                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-black dark:bg-emerald-900/10 dark:border-emerald-500/20 dark:text-emerald-400">
                                            <ThumbsUp className={`h-3 w-3 ${topic.user_reaction === 'like' ? 'fill-emerald-600' : ''}`} />
                                            <span>{formatReactionText(topic.likes_count, topic.recent_likes, topic.user_reaction)}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 ml-auto">
                                            <button 
                                                onClick={() => handleReaction('topic', topic.id, 'like')} 
                                                className={`p-1.5 rounded-lg hover:bg-emerald-50 transition-colors ${topic.user_reaction === 'like' ? 'text-emerald-600' : 'text-gray-400'}`}
                                            >
                                                <ThumbsUp className="h-4 w-4" />
                                            </button>
                                            <button 
                                                onClick={() => handleReaction('topic', topic.id, 'dislike')} 
                                                className={`p-1.5 rounded-lg hover:bg-red-50 transition-colors ${topic.user_reaction === 'dislike' ? 'text-red-600' : 'text-gray-400'}`}
                                            >
                                                <ThumbsDown className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Replies - More compact */}
                        {(posts || []).map((p, idx) => (
                            <div key={p.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm dark:bg-gray-900 dark:border-gray-800">
                                <div className="flex flex-col md:flex-row">
                                    <div className="md:w-40 bg-gray-50/50 p-4 border-b md:border-b-0 md:border-r border-gray-100 text-center dark:bg-gray-800/20 dark:border-gray-800">
                                        <div className="h-12 w-12 mx-auto overflow-hidden rounded-lg ring-2 ring-gray-100 shadow-sm mb-2 dark:ring-gray-800">
                                            <img src={userAvatar(p.user)} alt={p.user?.name || 'User'} className="h-full w-full object-cover" />
                                        </div>
                                        <h4 className="font-bold text-gray-900 text-[11px] truncate dark:text-white">{p.user?.name || 'Anonymous'}</h4>
                                        <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mt-0.5">Expert Member</p>
                                    </div>
                                    <div className="flex-1 flex flex-col">
                                        <div className="px-4 py-2 bg-gray-50/30 border-b border-gray-100 flex justify-between items-center text-[9px] font-black text-gray-400 uppercase dark:bg-gray-800/10 dark:border-gray-800">
                                            <span>{p.created_at}</span>
                                            <span className="flex items-center gap-2">
                                                <Share2 className="h-2.5 w-2.5 hover:text-emerald-600 cursor-pointer transition-colors" />
                                                #{idx + 2}
                                            </span>
                                        </div>
                                        <div className="p-4 text-gray-600 text-sm leading-relaxed dark:text-gray-300">
                                            {p.content}
                                        </div>
                                        <div className="px-4 py-2 bg-gray-50/50 border-t border-gray-100 flex items-center gap-3 justify-end dark:bg-gray-800/20 dark:border-gray-800">
                                            <button 
                                                onClick={() => handleReaction('post', p.id, 'like')} 
                                                className={`flex items-center gap-1 text-[9px] font-black transition-colors uppercase py-1 px-2 rounded-lg hover:bg-emerald-50 ${p.user_reaction === 'like' ? 'text-emerald-600' : 'text-gray-400'}`}
                                            >
                                                <ThumbsUp className={`h-3.5 w-3.5 ${p.user_reaction === 'like' ? 'fill-emerald-600' : ''}`} />
                                                <span>{p.likes_count || 0}</span>
                                            </button>
                                            <button 
                                                onClick={() => handleReaction('post', p.id, 'dislike')} 
                                                className={`flex items-center gap-1 text-[9px] font-black transition-colors uppercase py-1 px-2 rounded-lg hover:bg-red-50 ${p.user_reaction === 'dislike' ? 'text-red-600' : 'text-gray-400'}`}
                                            >
                                                <ThumbsDown className={`h-3.5 w-3.5 ${p.user_reaction === 'dislike' ? 'fill-red-600' : ''}`} />
                                                <span>{p.dislikes_count || 0}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Reply Form - Tighter */}
                    <div className="sticky bottom-4 mt-6">
                        <form onSubmit={submitReply} className="bg-white rounded-xl border-2 border-emerald-500/10 shadow-lg p-3 backdrop-blur-xl dark:bg-gray-900/90 dark:border-emerald-500/20">
                            <textarea
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                placeholder="Write your response..."
                                className="block w-full rounded-lg border-none bg-gray-50 text-gray-900 py-3 px-4 text-sm font-medium shadow-inner focus:ring-1 focus:ring-emerald-500 resize-none h-20 dark:bg-gray-950/50 dark:text-gray-100"
                                required
                            />
                            <div className="mt-3 flex justify-between items-center">
                                <div className="flex gap-3 text-gray-400">
                                    <Plus className="h-4 w-4 cursor-pointer hover:text-emerald-600" />
                                    <MoreHorizontal className="h-4 w-4 cursor-pointer hover:text-emerald-600" />
                                </div>
                                <button
                                    disabled={processing || !data.content || !data.content.trim()}
                                    className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-5 py-2 text-xs font-black text-white shadow-md hover:bg-emerald-500 transition-all active:scale-95 disabled:opacity-50"
                                >
                                    <Send className="h-3.5 w-3.5" />
                                    Reply
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}


