import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import axios from 'axios';
import { Send, Search, Phone, Video, MoreVertical, Plus, Smile, Mic, CheckCheck, MessageSquare, Lock, X, Users, User, ArrowLeft } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

const Avatar = ({ src, alt, size = 'h-12 w-12' }) => (
    <div className={`${size} overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0`}>
        <img src={src} alt={alt} className="h-full w-full object-cover" />
    </div>
);

export default function Messages({ conversations = [], selectedConversation = null, messages = [], people = [] }) {
    const authUser = usePage().props.auth.user;

    const [localMessages, setLocalMessages] = useState(messages);
    const [search, setSearch] = useState('');
    const [searchMode, setSearchMode] = useState('conversations'); // conversations | messages
    const [messageSearchQuery, setMessageSearchQuery] = useState('');
    const [messageSearchResults, setMessageSearchResults] = useState([]);
    const [messageSearchOpen, setMessageSearchOpen] = useState(false);
    const [chatMenuOpen, setChatMenuOpen] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [activeTab, setActiveTab] = useState('individual'); // 'individual' or 'group'
    const scrollRef = useRef(null);
    const msgSearchTimerRef = useRef(null);

    const selectedId = selectedConversation?.id || null;

    const filteredConversations = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return conversations;
        return conversations.filter((c) => (c?.other_user?.name || '').toLowerCase().includes(q));
    }, [conversations, search]);

    const formatLastSeen = (iso) => {
        if (!iso) return '';
        const d = new Date(iso);
        if (Number.isNaN(d.getTime())) return '';
        return d.toLocaleString([], { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' });
    };

    const filteredPeople = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return people;
        return people.filter((p) => {
            const name = (p.name || '').toLowerCase();
            const member = (p.membership_number || '').toLowerCase();
            return name.includes(q) || member.includes(q);
        });
    }, [people, search]);

    const startForm = useForm({
        user_id: '',
        membership_number: '',
    });

    const groupForm = useForm({
        name: '',
        description: '',
    });

    const messageForm = useForm({
        body: '',
    });

    useEffect(() => {
        setLocalMessages(messages);
    }, [messages, selectedId]);

    useEffect(() => {
        if (!selectedId) return;

        const interval = setInterval(async () => {
            try {
                const afterId = localMessages.length ? localMessages[localMessages.length - 1].id : 0;
                const res = await axios.get(route('messages.poll', selectedId), {
                    params: { after_id: afterId },
                });
                const newMessages = res?.data?.messages || [];
                if (newMessages.length) {
                    setLocalMessages((prev) => [...prev, ...newMessages]);
                }
            } catch (_) {}
        }, 3000);

        return () => clearInterval(interval);
    }, [selectedId, localMessages]);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        el.scrollTop = el.scrollHeight;
    }, [localMessages, selectedId]);

    const openConversation = (id) => {
        router.get(route('messages'), { conversation: id }, { preserveScroll: true, preserveState: true });
    };

    const runMessageSearch = async (q) => {
        const query = String(q || '').trim();
        if (!query) {
            setMessageSearchResults([]);
            setMessageSearchOpen(false);
            return;
        }

        try {
            const res = await axios.get(route('messages.search'), { params: { q: query } });
            const results = res?.data?.results || [];
            setMessageSearchResults(results);
            setMessageSearchOpen(true);
        } catch (_) {
            setMessageSearchResults([]);
            setMessageSearchOpen(true);
        }
    };

    useEffect(() => {
        if (searchMode !== 'messages') return;

        if (msgSearchTimerRef.current) {
            clearTimeout(msgSearchTimerRef.current);
        }

        msgSearchTimerRef.current = setTimeout(() => {
            runMessageSearch(messageSearchQuery);
        }, 350);

        return () => {
            if (msgSearchTimerRef.current) clearTimeout(msgSearchTimerRef.current);
        };
    }, [messageSearchQuery, searchMode]);

    const startConversationByMember = (e) => {
        e.preventDefault();
        startForm.post(route('messages.start'), {
            preserveScroll: true,
            onSuccess: () => {
                setShowAddModal(false);
                startForm.reset();
            },
        });
    };

    const createGroup = (e) => {
        e.preventDefault();
        // Placeholder for group creation
        console.log('Creating group:', groupForm.data);
        setShowAddModal(false);
        groupForm.reset();
    };

    const sendMessage = (e) => {
        e.preventDefault();
        if (!selectedId || !messageForm.data.body.trim()) return;

        const body = messageForm.data.body;
        messageForm.post(route('messages.store', selectedId), {
            preserveScroll: true,
            onSuccess: () => {
                messageForm.reset('body');
            },
        });
    };

    const backToSidebar = () => {
        router.get(route('messages'), {}, { preserveState: false });
    };

    const selectedChat = conversations.find((c) => c.id === selectedId);

    return (
        <AuthenticatedLayout header={<div className="hidden">Messages</div>}>
            <Head title="Messages" />

            <div className="-mx-4 -my-6 flex h-[calc(100vh-72px)] bg-white text-gray-900 sm:-mx-6 lg:-mx-8 overflow-hidden relative">
                {/* Sidebar */}
                <div className={`${selectedId ? 'hidden sm:flex' : 'flex'} w-full flex-col border-r border-gray-200 sm:w-[350px] lg:w-[400px] bg-white`}>
                    {/* Sidebar Header */}
                    <div className="flex items-center justify-between px-4 py-3 h-[72px] flex-shrink-0 border-b border-gray-200">
                        <div className="flex items-center gap-3 min-w-0">
                            <Avatar src={authUser?.avatar_url} alt={authUser?.name} size="h-10 w-10" />
                            <div className="min-w-0">
                                <div className="truncate text-sm font-black text-gray-900">Physioplanet Messages</div>
                                <div className="truncate text-xs text-gray-500">{authUser?.email}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                            <button
                                type="button"
                                onClick={() => setShowAddModal(true)}
                                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white hover:bg-gray-50"
                                aria-label="New chat"
                            >
                                <Plus className="h-5 w-5" />
                            </button>
                            <button
                                type="button"
                                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white hover:bg-gray-50"
                                aria-label="More"
                            >
                                <MoreVertical className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="bg-white p-3 flex-shrink-0">
                        <div className="flex items-center gap-2 mb-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setSearchMode('conversations');
                                    setMessageSearchOpen(false);
                                }}
                                className={
                                    'rounded-full px-3 py-1.5 text-[11px] font-black uppercase tracking-widest border ' +
                                    (searchMode === 'conversations'
                                        ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                                        : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50')
                                }
                            >
                                Chats
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setSearchMode('messages');
                                }}
                                className={
                                    'rounded-full px-3 py-1.5 text-[11px] font-black uppercase tracking-widest border ' +
                                    (searchMode === 'messages'
                                        ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                                        : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50')
                                }
                            >
                                Messages
                            </button>
                        </div>

                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <Search className="h-4 w-4 text-gray-400" />
                            </div>

                            {searchMode === 'conversations' ? (
                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search conversations"
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-11 pr-3 text-sm text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
                                />
                            ) : (
                                <input
                                    value={messageSearchQuery}
                                    onChange={(e) => setMessageSearchQuery(e.target.value)}
                                    onFocus={() => {
                                        if (messageSearchResults.length) setMessageSearchOpen(true);
                                    }}
                                    placeholder="Search messages"
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-11 pr-3 text-sm text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
                                />
                            )}

                            {searchMode === 'messages' && messageSearchOpen ? (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setMessageSearchOpen(false)} />
                                    <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
                                        <div className="max-h-80 overflow-y-auto custom-scrollbar">
                                            {messageSearchResults.length ? (
                                                messageSearchResults.map((r) => (
                                                    <button
                                                        key={r.message?.id}
                                                        type="button"
                                                        onClick={() => {
                                                            setMessageSearchOpen(false);
                                                            openConversation(r.conversation_id);
                                                        }}
                                                        className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <Avatar src={r.other_user?.avatar_url} alt={r.other_user?.name} size="h-10 w-10" />
                                                            <div className="min-w-0 flex-1">
                                                                <div className="flex items-center justify-between gap-3">
                                                                    <div className="truncate text-sm font-black text-gray-900">{r.other_user?.name}</div>
                                                                    <div className="text-[11px] text-gray-500 font-semibold">
                                                                        {r.message?.created_at
                                                                            ? new Date(r.message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                                                            : ''}
                                                                    </div>
                                                                </div>
                                                                <div className="truncate text-xs text-gray-500">{r.message?.body}</div>
                                                            </div>
                                                        </div>
                                                    </button>
                                                ))
                                            ) : (
                                                <div className="px-4 py-8 text-center">
                                                    <div className="text-sm font-black text-gray-900">No results</div>
                                                    <div className="mt-1 text-xs text-gray-500">Try a different keyword.</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </>
                            ) : null}
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex gap-2 bg-white px-3 pb-3 flex-shrink-0">
                        {['All', 'Unread', 'Favorites', 'Groups'].map((tab) => (
                            <button key={tab} className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-black text-gray-600 hover:bg-gray-50">
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Chat List */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        {filteredConversations.length > 0 ? (
                            filteredConversations.map((c) => (
                                <button
                                    key={c.id}
                                    type="button"
                                    onClick={() => openConversation(c.id)}
                                    className={
                                        'flex w-full items-center gap-3 px-3 py-3 border-b border-gray-100 transition ' +
                                        (c.id === selectedId ? 'bg-emerald-50' : 'hover:bg-gray-50')
                                    }
                                >
                                    <Avatar src={c.other_user?.avatar_url} alt={c.other_user?.name} />
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center justify-between">
                                            <div className="truncate text-sm text-gray-900 font-black">
                                                {c.other_user?.name}
                                            </div>
                                            <div className="text-[11px] text-gray-500 font-semibold">
                                                {c.last_message?.created_at ? new Date(c.last_message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                            </div>
                                        </div>
                                        <div className="truncate text-xs text-gray-500 mt-0.5">
                                            {c.last_message?.body || 'Start chatting...'}
                                        </div>
                                    </div>
                                </button>
                            ))
                        ) : (
                            <div className="p-10 text-center">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                                    <MessageSquare className="h-6 w-6" />
                                </div>
                                <div className="mt-4 text-sm font-black text-gray-900">No conversations yet</div>
                                <div className="mt-1 text-xs text-gray-500">Click + to start a new chat.</div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Chat Area */}
                <div className={`${selectedId ? 'flex' : 'hidden sm:flex'} flex-1 flex-col h-full overflow-hidden`}>
                    {selectedId ? (
                        <>
                            {/* Chat Header */}
                            <div className="flex items-center justify-between bg-white px-4 py-3 shadow-sm h-[72px] flex-shrink-0 border-b border-gray-200">
                                <div className="flex items-center gap-3 min-w-0">
                                    <button onClick={backToSidebar} className="sm:hidden p-1 -ml-1 text-gray-600">
                                        <ArrowLeft className="h-6 w-6" />
                                    </button>
                                    <Avatar
                                        src={selectedChat?.other_user?.avatar_url}
                                        alt="User"
                                        size="h-10 w-10"
                                    />
                                    <div className="min-w-0">
                                        <div className="text-sm font-black text-gray-900 truncate">
                                            {selectedChat?.other_user?.name}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {selectedChat?.other_user?.is_online
                                                ? 'Online'
                                                : selectedChat?.other_user?.last_seen_at
                                                    ? `Last seen ${formatLastSeen(selectedChat.other_user.last_seen_at)}`
                                                    : 'Offline'}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <div className="hidden lg:flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-black">
                                        <Video className="h-4 w-4" />
                                        <Phone className="h-4 w-4" />
                                        <span className="ml-1 border-l border-gray-200 pl-2">Call</span>
                                    </div>
                                    <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white hover:bg-gray-50" aria-label="Search">
                                        <Search className="h-5 w-5" />
                                    </button>
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() => setChatMenuOpen((v) => !v)}
                                            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white hover:bg-gray-50"
                                            aria-label="More"
                                        >
                                            <MoreVertical className="h-5 w-5" />
                                        </button>

                                        {chatMenuOpen ? (
                                            <>
                                                <div className="fixed inset-0 z-10" onClick={() => setChatMenuOpen(false)} />
                                                <div className="absolute right-0 z-20 mt-2 w-56 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setChatMenuOpen(false);
                                                            if (selectedId) {
                                                                window.location.href = route('messages.export', selectedId);
                                                            }
                                                        }}
                                                        className="w-full px-4 py-3 text-left text-sm font-black text-gray-800 hover:bg-gray-50 border-b border-gray-100"
                                                    >
                                                        Export Chat
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setChatMenuOpen(false);
                                                            if (!selectedId) return;
                                                            if (!confirm('Delete this chat? This will remove it from your inbox.')) return;
                                                            router.delete(route('messages.destroy', selectedId), { preserveScroll: true });
                                                        }}
                                                        className="w-full px-4 py-3 text-left text-sm font-black text-rose-700 hover:bg-rose-50"
                                                    >
                                                        Delete Chat
                                                    </button>
                                                </div>
                                            </>
                                        ) : null}
                                    </div>
                                </div>
                            </div>

                            {/* Messages Area */}
                            <div
                                ref={scrollRef}
                                className="relative flex-1 overflow-y-auto px-4 sm:px-10 py-6 custom-scrollbar bg-gray-50"
                            >
                                <div className="space-y-2">
                                    {localMessages.map((m) => {
                                        const mine = m.sender?.id === authUser?.id;
                                        return (
                                            <div key={m.id} className={mine ? 'flex justify-end' : 'flex justify-start'}>
                                                <div
                                                    className={
                                                        'relative max-w-[85%] sm:max-w-[65%] rounded-2xl px-4 py-2 shadow-sm border ' +
                                                        (mine
                                                            ? 'bg-emerald-600 border-emerald-600 text-white'
                                                            : 'bg-white border-gray-200 text-gray-900')
                                                    }
                                                >
                                                    <div className="pr-12 text-sm leading-relaxed break-words">{m.body}</div>
                                                    <div className="absolute bottom-1 right-1.5 flex items-center gap-1">
                                                        <span className={mine ? 'text-[11px] text-white/80' : 'text-[11px] text-gray-400'}>
                                                            {m.created_at
                                                                ? new Date(m.created_at).toLocaleTimeString([], {
                                                                      hour: '2-digit',
                                                                      minute: '2-digit',
                                                                  })
                                                                : ''}
                                                        </span>
                                                        {mine && <CheckCheck className="h-3 w-3 text-white/90" />}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Chat Input */}
                            <div className="flex items-center gap-2 sm:gap-4 bg-white px-2 sm:px-4 py-3 flex-shrink-0 min-h-[72px] border-t border-gray-200">
                                <button type="button" className="hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-600" aria-label="Emoji">
                                    <Smile className="h-5 w-5" />
                                </button>
                                <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-600" aria-label="Attach">
                                    <Plus className="h-5 w-5" />
                                </button>
                                <form onSubmit={sendMessage} className="flex flex-1 items-center gap-2 sm:gap-4">
                                    <input
                                        value={messageForm.data.body}
                                        onChange={(e) => messageForm.setData('body', e.target.value)}
                                        placeholder="Write a message..."
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 px-4 text-sm text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
                                    />
                                    {messageForm.data.body.trim() ? (
                                        <button
                                            type="submit"
                                            disabled={messageForm.processing}
                                            className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                                            aria-label="Send"
                                        >
                                            <Send className="h-5 w-5" />
                                        </button>
                                    ) : (
                                        <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500">
                                            <Mic className="h-5 w-5" />
                                        </div>
                                    )}
                                </form>
                            </div>
                        </>
                    ) : (
                        <div className="flex h-full flex-col items-center justify-center bg-white text-center px-6">
                            <div className="max-w-md space-y-4">
                                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-emerald-50 border border-emerald-100">
                                    <MessageSquare className="h-12 w-12 text-emerald-600" />
                                </div>
                                <h1 className="text-3xl font-black text-gray-900">Physioplanet Message Web</h1>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    Start a conversation with members and colleagues.
                                </p>
                                <div className="pt-10 text-xs text-gray-400 flex items-center justify-center gap-1">
                                    <Lock className="h-3 w-3" /> Private messaging
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Conversation/Group Modal */}
            <Modal show={showAddModal} onClose={() => setShowAddModal(false)} maxWidth="md">
                <div className="bg-white text-gray-900 overflow-hidden">
                    {/* Modal Header */}
                    <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                        <h3 className="text-lg font-bold">New Chat</h3>
                        <X className="h-6 w-6 cursor-pointer text-gray-500 hover:text-gray-900" onClick={() => setShowAddModal(false)} />
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b border-gray-200">
                        <button
                            onClick={() => setActiveTab('individual')}
                            className={`flex flex-1 items-center justify-center gap-2 py-4 text-sm font-bold transition-colors ${
                                activeTab === 'individual'
                                    ? 'border-b-4 border-emerald-600 text-emerald-700'
                                    : 'text-gray-500 hover:bg-gray-50'
                            }`}
                        >
                            <User className="h-4 w-4" />
                            Individual
                        </button>
                        <button
                            onClick={() => setActiveTab('group')}
                            className={`flex flex-1 items-center justify-center gap-2 py-4 text-sm font-bold transition-colors ${
                                activeTab === 'group'
                                    ? 'border-b-4 border-emerald-600 text-emerald-700'
                                    : 'text-gray-500 hover:bg-gray-50'
                            }`}
                        >
                            <Users className="h-4 w-4" />
                            Group
                        </button>
                    </div>

                    <div className="p-6">
                        {activeTab === 'individual' ? (
                            <form onSubmit={startConversationByMember} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="membership_number" value="Select a member" className="text-gray-600 mb-2" />
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <TextInput
                                            id="membership_number"
                                            className="block w-full pl-10 bg-gray-50 border-gray-200 text-gray-900 focus:ring-emerald-500 focus:border-emerald-500"
                                            value={startForm.data.membership_number}
                                            onChange={(e) => startForm.setData('membership_number', e.target.value)}
                                            placeholder="Search by name or member ID"
                                        />
                                    </div>
                                    <InputError message={startForm.errors.membership_number} className="mt-2" />
                                </div>

                                <div className="rounded-2xl border border-gray-200 overflow-hidden">
                                    <div className="max-h-72 overflow-y-auto custom-scrollbar bg-white">
                                        {filteredPeople.length ? (
                                            filteredPeople.slice(0, 10).map((p) => (
                                                <button
                                                    key={p.id}
                                                    type="button"
                                                    onClick={() => {
                                                        startForm.setData('user_id', p.id);
                                                        startForm.setData('membership_number', p.membership_number || '');
                                                    }}
                                                    className={
                                                        'flex w-full items-center gap-3 px-4 py-3 text-left transition border-b border-gray-100 last:border-b-0 ' +
                                                        (String(startForm.data.user_id) === String(p.id)
                                                            ? 'bg-emerald-50'
                                                            : 'hover:bg-gray-50')
                                                    }
                                                >
                                                    <Avatar src={p.avatar_url} alt={p.name} size="h-10 w-10" />
                                                    <div className="min-w-0 flex-1">
                                                        <div className="truncate text-sm font-black text-gray-900">{p.name}</div>
                                                        <div className="truncate text-xs text-gray-500">
                                                            {p.membership_number ? `Member ID: ${p.membership_number}` : 'Member ID: —'}
                                                        </div>
                                                    </div>
                                                    {String(startForm.data.user_id) === String(p.id) ? (
                                                        <span className="text-[11px] font-black uppercase tracking-widest text-emerald-700">Selected</span>
                                                    ) : null}
                                                </button>
                                            ))
                                        ) : (
                                            <div className="px-4 py-8 text-center">
                                                <div className="text-sm font-black text-gray-900">No suggestions</div>
                                                <div className="mt-1 text-xs text-gray-500">Try a different name or member ID.</div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <PrimaryButton
                                        className="bg-emerald-600 hover:bg-emerald-700"
                                        disabled={
                                            startForm.processing ||
                                            (!startForm.data.user_id && !String(startForm.data.membership_number || '').trim())
                                        }
                                    >
                                        Start Chat
                                    </PrimaryButton>
                                </div>
                            </form>
                        ) : (
                            <form onSubmit={createGroup} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="group_name" value="Group Name" className="text-gray-600 mb-2" />
                                    <TextInput
                                        id="group_name"
                                        className="block w-full bg-gray-50 border-gray-200 text-gray-900 focus:ring-emerald-500 focus:border-emerald-500"
                                        value={groupForm.data.name}
                                        onChange={(e) => groupForm.setData('name', e.target.value)}
                                        placeholder="Enter group name"
                                        required
                                    />
                                </div>
                                <div>
                                    <InputLabel htmlFor="group_desc" value="Description (Optional)" className="text-gray-600 mb-2" />
                                    <textarea
                                        id="group_desc"
                                        className="block w-full rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:ring-emerald-500 focus:border-emerald-500 resize-none h-24 text-sm"
                                        value={groupForm.data.description}
                                        onChange={(e) => groupForm.setData('description', e.target.value)}
                                        placeholder="What's this group about?"
                                    />
                                </div>

                                <div className="flex justify-end">
                                    <PrimaryButton className="bg-emerald-600 hover:bg-emerald-700" disabled={groupForm.processing}>
                                        Create Group
                                    </PrimaryButton>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </Modal>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #d1d5db;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #9ca3af;
                }
            `}</style>
        </AuthenticatedLayout>
    );
}


