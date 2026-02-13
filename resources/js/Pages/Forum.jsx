import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { MessageSquare, ThumbsUp, ThumbsDown, Plus, MessageCircle, Clock, User, ChevronRight, X, LayoutGrid, Award, BookOpen, ShoppingBag, Globe, Share2, Eye, Pin, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';

export default function Forum({ topics = [] }) {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        content: '',
        category: 'General',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('forum.topic.store'), {
            onSuccess: () => {
                setShowCreateModal(false);
                reset();
            },
        });
    };

    const categoriesList = [
        { name: 'JamiiCheck', icon: CheckCircle2 },
        { name: 'FichuaUovu', icon: Eye },
        { name: 'Stories of Change', icon: Award },
    ];

    const comingSoon = [
        { name: 'JamiiCourses', icon: BookOpen },
        { name: 'JamiiData', icon: LayoutGrid },
        { name: 'JamiiShop', icon: ShoppingBag },
        { name: 'Premium Content', icon: Award },
    ];

    const regions = [
        { name: 'Tanzania', flag: '🇹🇿' },
        { name: 'Uganda', flag: '🇺🇬' },
        { name: 'Kenya', flag: '🇰🇪' },
        { name: 'Rwanda', flag: '🇷🇼' },
        { name: 'DRC', flag: '🇨🇩' },
        { name: 'Zambia', flag: '🇿🇲' },
    ];

    return (
        <AuthenticatedLayout header={<div className="hidden">Forum</div>}>
            <Head title="Community Forum" />

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
                            <button
                                onClick={() => setShowCreateModal(true)}
                                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-50 py-2.5 text-sm font-bold text-emerald-600 border border-emerald-200 hover:bg-emerald-100 transition-all dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-500/20 dark:hover:bg-emerald-900/30"
                            >
                                <Plus className="h-4 w-4" />
                                Start Discussion
                            </button>
                        </div>

                        <div>
                            <h3 className="text-sm font-black uppercase tracking-wider text-gray-500 mb-4 dark:text-gray-400">Regional Communities</h3>
                            <ul className="space-y-3">
                                {regions.map((region) => (
                                    <li key={region.name} className="relative group">
                                        <button className="flex items-center gap-3 text-sm font-bold text-gray-600 hover:text-emerald-600 transition-colors w-full dark:text-gray-300 dark:hover:text-emerald-400">
                                            <span className="text-lg">{region.flag}</span>
                                            {region.name}
                                        </button>
                                        <div className="absolute left-full ml-2 top-0 hidden group-hover:block whitespace-nowrap bg-emerald-600 text-[10px] font-black text-white px-2 py-1 rounded shadow-lg z-50">
                                            Coming Soon
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 p-4 lg:p-8 space-y-8 overflow-y-auto">
                    {/* Featured Slider */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { title: 'AFCON 2027: CAF huenda ikaahirisha mashindano ya Kombe la Mataifa ya Afrika', img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=500&auto=format&fit=crop' },
                            { title: 'Zambia: Mahakama yataifisha Magari 79, mali 23 za Mtoto wa Rais wa zamani, Edgar Lungu', img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=500&auto=format&fit=crop' },
                            { title: 'Gerson Msigwa: Maridhiano ni jambo la hiari sio kulazimishwa', img: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=500&auto=format&fit=crop' },
                        ].map((item, idx) => (
                            <div key={idx} className="relative aspect-video rounded-2xl overflow-hidden group cursor-pointer shadow-sm">
                                <img src={item.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                <div className="absolute bottom-0 p-4">
                                    <h4 className="text-sm font-black text-white leading-snug line-clamp-2">
                                        {item.title}
                                    </h4>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex gap-4">
                            {['All', 'Trending', 'Newest', 'Top'].map((filter) => (
                                <button key={filter} className={`text-sm font-black uppercase tracking-widest ${filter === 'All' ? 'text-emerald-600 border-b-2 border-emerald-600 pb-1' : 'text-gray-400 hover:text-gray-600'}`}>
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Topic List */}
                    <div className="space-y-4">
                        {topics.map((topic) => (
                            <Link
                                key={topic.id}
                                href={route('forum.show', topic.slug)}
                                className="block group relative bg-white border border-gray-200 rounded-2xl p-6 transition-all hover:border-emerald-500/30 hover:shadow-md dark:bg-gray-900 dark:border-gray-800 dark:hover:border-emerald-500/20"
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-xs font-bold text-gray-500">
                                        <span className="flex items-center gap-1 hover:text-emerald-600 transition-colors">
                                            <User className="h-3 w-3" />
                                            {topic.user.name}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            {topic.created_at}
                                        </span>
                                    </div>

                                    <h2 className="text-xl font-black text-gray-900 group-hover:text-emerald-600 transition-colors leading-tight dark:text-white">
                                        {topic.title}
                                    </h2>

                                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 dark:text-gray-400">
                                        {topic.content}
                                    </p>

                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                                        <div className="flex items-center gap-6 text-[11px] font-black text-gray-500 uppercase tracking-wider">
                                            <span className="flex items-center gap-1.5 hover:text-emerald-600 transition-colors">
                                                <ThumbsUp className="h-4 w-4" />
                                                {topic.likes_count} Reactions
                                            </span>
                                            <span className="flex items-center gap-1.5 hover:text-emerald-600 transition-colors">
                                                <MessageCircle className="h-4 w-4" />
                                                {topic.replies_count} Replies
                                            </span>
                                        </div>
                                        <button className="text-xs font-black text-gray-400 hover:text-emerald-600 transition-colors flex items-center gap-1 uppercase">
                                            <Share2 className="h-4 w-4" />
                                            Share
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </main>
            </div>

            {/* Modal */}
            <Modal show={showCreateModal} onClose={() => setShowCreateModal(false)} maxWidth="2xl">
                <div className="bg-white text-gray-900 overflow-hidden rounded-2xl dark:bg-gray-900 dark:text-gray-100">
                    <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 bg-gray-50/50 dark:border-gray-800 dark:bg-gray-800/50">
                        <h3 className="text-lg font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Create New Topic</h3>
                        <button onClick={() => setShowCreateModal(false)} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <form onSubmit={submit} className="p-6 space-y-6">
                        <div>
                            <InputLabel htmlFor="title" value="Topic Title" className="text-gray-500 font-bold mb-2 uppercase text-xs tracking-widest" />
                            <TextInput
                                id="title"
                                className="block w-full border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 dark:bg-gray-950 dark:border-gray-800"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="What's on your mind?"
                                required
                            />
                            <InputError message={errors.title} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="category" value="Category" className="text-gray-500 font-bold mb-2 uppercase text-xs tracking-widest" />
                            <select
                                id="category"
                                value={data.category}
                                onChange={(e) => setData('category', e.target.value)}
                                className="block w-full rounded-xl border-gray-200 py-2.5 text-sm font-bold focus:border-emerald-500 focus:ring-emerald-500 dark:bg-gray-950 dark:border-gray-800 dark:text-white"
                            >
                                <option>General</option>
                                <option>Health</option>
                                <option>Sports</option>
                                <option>Techniques</option>
                                <option>Equipment</option>
                            </select>
                            <InputError message={errors.category} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="content" value="Description" className="text-gray-500 font-bold mb-2 uppercase text-xs tracking-widest" />
                            <textarea
                                id="content"
                                rows={6}
                                className="block w-full rounded-xl border-gray-200 py-3 text-sm font-medium focus:border-emerald-500 focus:ring-emerald-500 dark:bg-gray-950 dark:border-gray-800 dark:text-white resize-none"
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                placeholder="Write more details here..."
                                required
                            />
                            <InputError message={errors.content} className="mt-2" />
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                            <button
                                type="button"
                                onClick={() => setShowCreateModal(false)}
                                className="px-6 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                            >
                                Cancel
                            </button>
                            <PrimaryButton className="bg-emerald-600 hover:bg-emerald-500 px-8 py-2.5 shadow-lg shadow-emerald-900/20" disabled={processing}>
                                Post Topic
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { height: 4px; width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(16, 185, 129, 0.2); border-radius: 10px; }
            `}</style>
        </AuthenticatedLayout>
    );
}

