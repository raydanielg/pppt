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
    const [showAddModal, setShowAddModal] = useState(false);
    const [activeTab, setActiveTab] = useState('individual'); // 'individual' or 'group'
    const scrollRef = useRef(null);

    const selectedId = selectedConversation?.id || null;

    const filteredPeople = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return people;
        return people.filter((p) => (p.name || '').toLowerCase().includes(q));
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

            <div className="-mx-4 -my-6 flex h-[calc(100vh-72px)] bg-[#111b21] text-[#e9edef] sm:-mx-6 lg:-mx-8 overflow-hidden relative">
                {/* Sidebar */}
                <div className={`${selectedId ? 'hidden sm:flex' : 'flex'} w-full flex-col border-r border-[#222d34] sm:w-[350px] lg:w-[400px]`}>
                    {/* Sidebar Header */}
                    <div className="flex items-center justify-between bg-[#202c33] px-4 py-3 h-[60px] flex-shrink-0">
                        <Avatar src={authUser?.avatar_url} alt={authUser?.name} size="h-10 w-10" />
                        <div className="flex items-center gap-5 text-[#aebac1]">
                            <Plus className="h-6 w-6 cursor-pointer hover:text-white transition-colors" onClick={() => setShowAddModal(true)} />
                            <MoreVertical className="h-6 w-6 cursor-pointer hover:text-white transition-colors" />
                        </div>
                    </div>

                    {/* Search */}
                    <div className="bg-[#111b21] p-2 flex-shrink-0">
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <Search className="h-4 w-4 text-[#8696a0]" />
                            </div>
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search or start a new chat"
                                className="w-full rounded-lg border-none bg-[#202c33] py-1.5 pl-12 pr-3 text-sm text-[#d1d7db] placeholder-[#8696a0] focus:ring-0"
                            />
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex gap-2 bg-[#111b21] px-3 py-2 flex-shrink-0">
                        {['All', 'Unread', 'Favorites', 'Groups'].map((tab) => (
                            <button key={tab} className="rounded-full bg-[#202c33] px-3 py-1 text-xs font-medium text-[#8696a0] hover:bg-[#2a3942]">
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Chat List */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        {conversations.length > 0 ? (
                            conversations.map((c) => (
                                <button
                                    key={c.id}
                                    type="button"
                                    onClick={() => openConversation(c.id)}
                                    className={
                                        'flex w-full items-center gap-3 px-3 py-3 border-b border-[#222d34] transition ' +
                                        (c.id === selectedId ? 'bg-[#2a3942]' : 'hover:bg-[#202c33]')
                                    }
                                >
                                    <Avatar src={c.other_user?.avatar_url} alt={c.other_user?.name} />
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center justify-between">
                                            <div className="truncate text-[17px] text-[#e9edef] font-medium">
                                                {c.other_user?.name}
                                            </div>
                                            <div className="text-xs text-[#8696a0]">
                                                {c.last_message?.created_at ? new Date(c.last_message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                            </div>
                                        </div>
                                        <div className="truncate text-sm text-[#8696a0] mt-0.5">
                                            {c.last_message?.body || 'Start chatting...'}
                                        </div>
                                    </div>
                                </button>
                            ))
                        ) : (
                            <div className="p-10 text-center text-sm text-[#8696a0]">
                                No conversations yet. Click + to start one.
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Chat Area */}
                <div className={`${selectedId ? 'flex' : 'hidden sm:flex'} flex-1 flex-col h-full overflow-hidden`}>
                    {selectedId ? (
                        <>
                            {/* Chat Header */}
                            <div className="flex items-center justify-between bg-[#202c33] px-4 py-3 shadow-sm h-[60px] flex-shrink-0">
                                <div className="flex items-center gap-3 min-w-0">
                                    <button onClick={backToSidebar} className="sm:hidden p-1 -ml-1 text-[#aebac1]">
                                        <ArrowLeft className="h-6 w-6" />
                                    </button>
                                    <Avatar
                                        src={selectedChat?.other_user?.avatar_url}
                                        alt="User"
                                        size="h-10 w-10"
                                    />
                                    <div className="min-w-0">
                                        <div className="text-sm font-medium text-[#e9edef] truncate">
                                            {selectedChat?.other_user?.name}
                                        </div>
                                        <div className="text-xs text-[#8696a0]">online</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 sm:gap-6 text-[#aebac1]">
                                    <div className="hidden lg:flex items-center gap-1 rounded-full border border-[#3b4a54] px-3 py-1 text-xs">
                                        <Video className="h-4 w-4" />
                                        <Phone className="h-4 w-4" />
                                        <span className="ml-1 border-l border-[#3b4a54] pl-2">Call</span>
                                    </div>
                                    <Search className="h-5 w-5 cursor-pointer hover:text-white" />
                                    <MoreVertical className="h-5 w-5 cursor-pointer hover:text-white" />
                                </div>
                            </div>

                            {/* Messages Area */}
                            <div
                                ref={scrollRef}
                                className="relative flex-1 overflow-y-auto px-4 sm:px-10 py-4 custom-scrollbar"
                                style={{
                                    backgroundColor: '#0b141a',
                                    backgroundImage: `url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')`,
                                    backgroundBlendMode: 'overlay',
                                    backgroundSize: '400px',
                                }}
                            >
                                <div className="space-y-2">
                                    {localMessages.map((m) => {
                                        const mine = m.sender?.id === authUser?.id;
                                        return (
                                            <div key={m.id} className={mine ? 'flex justify-end' : 'flex justify-start'}>
                                                <div
                                                    className={
                                                        'relative max-w-[85%] sm:max-w-[65%] rounded-lg px-2 py-1.5 shadow-sm ' +
                                                        (mine ? 'bg-[#005c4b] text-[#e9edef]' : 'bg-[#202c33] text-[#e9edef]')
                                                    }
                                                >
                                                    <div className="pr-12 text-[14.2px] leading-relaxed break-words">{m.body}</div>
                                                    <div className="absolute bottom-1 right-1.5 flex items-center gap-1">
                                                        <span className="text-[11px] text-[#ffffff99]">
                                                            {m.created_at
                                                                ? new Date(m.created_at).toLocaleTimeString([], {
                                                                      hour: '2-digit',
                                                                      minute: '2-digit',
                                                                  })
                                                                : ''}
                                                        </span>
                                                        {mine && <CheckCheck className="h-3 w-3 text-[#53bdeb]" />}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Chat Input */}
                            <div className="flex items-center gap-2 sm:gap-4 bg-[#202c33] px-2 sm:px-4 py-2 flex-shrink-0 min-h-[62px]">
                                <Smile className="h-6 w-6 cursor-pointer text-[#8696a0] hover:text-white hidden sm:block" />
                                <Plus className="h-6 w-6 cursor-pointer text-[#8696a0] hover:text-white" />
                                <form onSubmit={sendMessage} className="flex flex-1 items-center gap-2 sm:gap-4">
                                    <input
                                        value={messageForm.data.body}
                                        onChange={(e) => messageForm.setData('body', e.target.value)}
                                        placeholder="Type a message"
                                        className="w-full rounded-lg border-none bg-[#2a3942] py-2 px-4 text-sm text-[#d1d7db] placeholder-[#8696a0] focus:ring-0"
                                    />
                                    {messageForm.data.body.trim() ? (
                                        <button type="submit" disabled={messageForm.processing} className="p-2 bg-[#00a884] rounded-full text-white hover:bg-[#008f6a] transition-colors">
                                            <Send className="h-5 w-5" />
                                        </button>
                                    ) : (
                                        <Mic className="h-6 w-6 text-[#8696a0] hover:text-white cursor-pointer" />
                                    )}
                                </form>
                            </div>
                        </>
                    ) : (
                        <div className="flex h-full flex-col items-center justify-center bg-[#222e35] text-center px-6">
                            <div className="max-w-md space-y-4">
                                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#202c33]">
                                    <MessageSquare className="h-12 w-12 text-[#8696a0]" />
                                </div>
                                <h1 className="text-3xl font-light text-[#e9edef]">WhatsApp Web</h1>
                                <p className="text-sm text-[#8696a0] leading-relaxed">
                                    Send and receive messages without keeping your phone online.<br />
                                    Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
                                </p>
                                <div className="pt-10 text-xs text-[#667781] flex items-center justify-center gap-1">
                                    <Lock className="h-3 w-3" /> End-to-end encrypted
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Conversation/Group Modal */}
            <Modal show={showAddModal} onClose={() => setShowAddModal(false)} maxWidth="md">
                <div className="bg-[#202c33] text-[#e9edef] overflow-hidden">
                    {/* Modal Header */}
                    <div className="flex items-center justify-between border-b border-[#222d34] px-6 py-4">
                        <h3 className="text-lg font-bold">New Chat</h3>
                        <X className="h-6 w-6 cursor-pointer text-[#8696a0] hover:text-white" onClick={() => setShowAddModal(false)} />
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b border-[#222d34]">
                        <button
                            onClick={() => setActiveTab('individual')}
                            className={`flex flex-1 items-center justify-center gap-2 py-4 text-sm font-bold transition-colors ${
                                activeTab === 'individual' ? 'border-b-4 border-[#00a884] text-[#00a884]' : 'text-[#8696a0] hover:bg-[#2a3942]'
                            }`}
                        >
                            <User className="h-4 w-4" />
                            Individual
                        </button>
                        <button
                            onClick={() => setActiveTab('group')}
                            className={`flex flex-1 items-center justify-center gap-2 py-4 text-sm font-bold transition-colors ${
                                activeTab === 'group' ? 'border-b-4 border-[#00a884] text-[#00a884]' : 'text-[#8696a0] hover:bg-[#2a3942]'
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
                                    <InputLabel htmlFor="membership_number" value="Enter Member Number" className="text-[#8696a0] mb-2" />
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8696a0]" />
                                        <TextInput
                                            id="membership_number"
                                            className="block w-full pl-10 bg-[#2a3942] border-none text-white focus:ring-1 focus:ring-[#00a884]"
                                            value={startForm.data.membership_number}
                                            onChange={(e) => startForm.setData('membership_number', e.target.value)}
                                            placeholder="e.g. PP-12345"
                                            required
                                        />
                                    </div>
                                    <InputError message={startForm.errors.membership_number} className="mt-2" />
                                </div>

                                <div className="flex justify-end">
                                    <PrimaryButton className="bg-[#00a884] hover:bg-[#008f6a]" disabled={startForm.processing}>
                                        Start Chat
                                    </PrimaryButton>
                                </div>
                            </form>
                        ) : (
                            <form onSubmit={createGroup} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="group_name" value="Group Name" className="text-[#8696a0] mb-2" />
                                    <TextInput
                                        id="group_name"
                                        className="block w-full bg-[#2a3942] border-none text-white focus:ring-1 focus:ring-[#00a884]"
                                        value={groupForm.data.name}
                                        onChange={(e) => groupForm.setData('name', e.target.value)}
                                        placeholder="Enter group name"
                                        required
                                    />
                                </div>
                                <div>
                                    <InputLabel htmlFor="group_desc" value="Description (Optional)" className="text-[#8696a0] mb-2" />
                                    <textarea
                                        id="group_desc"
                                        className="block w-full rounded-md border-none bg-[#2a3942] text-white focus:ring-1 focus:ring-[#00a884] resize-none h-24 text-sm"
                                        value={groupForm.data.description}
                                        onChange={(e) => groupForm.setData('description', e.target.value)}
                                        placeholder="What's this group about?"
                                    />
                                </div>

                                <div className="flex justify-end">
                                    <PrimaryButton className="bg-[#00a884] hover:bg-[#008f6a]" disabled={groupForm.processing}>
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
                    background: #374045;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #4a5559;
                }
            `}</style>
        </AuthenticatedLayout>
    );
}


