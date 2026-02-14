import { Link, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { ChevronDown, LayoutDashboard, HeartPulse, Microscope, Newspaper, Image, Briefcase, Library, FileText, Users } from 'lucide-react';

const Item = ({ href, active, icon: Icon, children }) => {
    return (
        <Link
            href={href}
            className={
                'group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-black transition ' +
                (active
                    ? 'bg-emerald-50 text-emerald-800'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900')
            }
        >
            {Icon ? (
                <Icon className={active ? 'h-4 w-4 text-emerald-700' : 'h-4 w-4 text-gray-400 group-hover:text-gray-700'} />
            ) : null}
            <span className="min-w-0 truncate">{children}</span>
        </Link>
    );
};

const Group = ({ title, icon: Icon, children, defaultOpen = false }) => {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div>
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-black text-gray-700 hover:bg-gray-50"
            >
                <span className="flex items-center gap-3">
                    {Icon ? <Icon className="h-4 w-4 text-gray-400" /> : null}
                    <span className="truncate">{title}</span>
                </span>
                <ChevronDown className={open ? 'h-4 w-4 text-gray-500 rotate-180 transition' : 'h-4 w-4 text-gray-500 transition'} />
            </button>
            {open ? <div className="mt-1 space-y-1 pl-3">{children}</div> : null}
        </div>
    );
};

export default function AdminLayout({ title, children }) {
    const user = usePage().props.auth.user;

    const nav = useMemo(
        () => [
            { type: 'item', label: 'Dashboard', href: route('admin.dashboard'), icon: LayoutDashboard, active: route().current('admin.dashboard') },
            {
                type: 'group',
                label: 'Health Tips',
                icon: HeartPulse,
                items: [
                    { label: 'All Tips', href: route('admin.health-tips.index'), active: route().current('admin.health-tips.index') },
                    { label: 'Create Tip', href: route('admin.health-tips.create'), active: route().current('admin.health-tips.create') },
                    { label: 'Categories', href: route('admin.health-tip-categories.index'), active: route().current('admin.health-tip-categories.index') },
                ],
            },
            {
                type: 'group',
                label: 'Research Tips',
                icon: Microscope,
                items: [
                    { label: 'All Tips', href: route('admin.research-tips.index'), active: route().current('admin.research-tips.index') },
                    { label: 'Create Tip', href: route('admin.research-tips.create'), active: route().current('admin.research-tips.create') },
                    { label: 'Categories', href: route('admin.research-tip-categories.index'), active: route().current('admin.research-tip-categories.index') },
                ],
            },
            {
                type: 'group',
                label: 'Hot News',
                icon: Newspaper,
                items: [
                    { label: 'All News', href: route('admin.hot-news.index'), active: route().current('admin.hot-news.index') },
                    { label: 'Create News', href: route('admin.hot-news.create'), active: route().current('admin.hot-news.create') },
                    { label: 'Categories', href: route('admin.hot-news-categories.index'), active: route().current('admin.hot-news-categories.index') },
                ],
            },
            {
                type: 'group',
                label: 'Gallery',
                icon: Image,
                items: [
                    { label: 'Images', href: route('admin.gallery-images.index'), active: route().current('admin.gallery-images.index') },
                    { label: 'Categories', href: route('admin.gallery-categories.index'), active: route().current('admin.gallery-categories.index') },
                ],
            },
            {
                type: 'group',
                label: 'Opportunities',
                icon: Briefcase,
                items: [
                    { label: 'All Opportunities', href: route('admin.opportunities.index'), active: route().current('admin.opportunities.index') },
                    { label: 'Create Opportunity', href: route('admin.opportunities.create'), active: route().current('admin.opportunities.create') },
                ],
            },
            { type: 'item', label: 'Users Management', href: route('admin.users.index'), icon: Users, active: route().current('admin.users.index') || route().current('admin.users.edit') },
            { type: 'item', label: 'PT Library', href: route('pt-library'), icon: Library, active: route().current('pt-library') },
            { type: 'item', label: 'Docs', href: route('docs.icons'), icon: FileText, active: route().current('docs.icons') },
        ],
        [],
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex min-h-screen">
                <aside className="w-72 shrink-0 border-r border-gray-200 bg-white">
                    <div className="px-5 py-5 border-b border-gray-200">
                        <div className="text-xs font-black uppercase tracking-widest text-emerald-700">Admin Panel</div>
                        <div className="mt-1 text-lg font-black text-gray-900">Physioplanet</div>
                        <div className="mt-1 text-xs text-gray-500 truncate">{user?.email}</div>
                    </div>
                    <nav className="p-4 space-y-2">
                        {nav.map((n) => {
                            if (n.type === 'item') {
                                return (
                                    <Item key={n.label} href={n.href} active={n.active} icon={n.icon}>
                                        {n.label}
                                    </Item>
                                );
                            }

                            return (
                                <Group key={n.label} title={n.label} icon={n.icon}>
                                    {n.items.map((it) => (
                                        <Item key={it.label} href={it.href} active={it.active}>
                                            {it.label}
                                        </Item>
                                    ))}
                                </Group>
                            );
                        })}
                    </nav>
                </aside>

                <main className="flex-1 min-w-0">
                    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white">
                        <div className="px-6 py-4">
                            <div className="text-xs font-black uppercase tracking-widest text-gray-500">Admin</div>
                            <div className="mt-1 text-2xl font-black text-gray-900">{title}</div>
                        </div>
                    </header>

                    <div className="p-6">{children}</div>
                </main>
            </div>
        </div>
    );
}
