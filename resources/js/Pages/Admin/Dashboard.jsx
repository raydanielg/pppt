import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { HeartPulse, Microscope, Newspaper, Image, Briefcase, MessageSquare } from 'lucide-react';

const Card = ({ title, description, href, icon: Icon }) => {
    return (
        <Link
            href={href}
            className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:bg-gray-50"
        >
            <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                    <Icon className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                    <div className="text-sm font-black text-gray-900">{title}</div>
                    <div className="mt-1 text-xs text-gray-500">{description}</div>
                </div>
            </div>
        </Link>
    );
};

export default function Dashboard() {
    const user = usePage().props.auth.user;

    return (
        <AdminLayout title="Dashboard">
            <Head title="Admin Dashboard" />

            <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-600 p-6 text-white shadow-lg">
                <div className="text-xs font-black uppercase tracking-widest text-emerald-100">Welcome</div>
                <div className="mt-2 text-2xl font-black">{user?.name || 'Admin'} Panel</div>
                <div className="mt-1 text-sm text-white/85">
                    Manage content, opportunities, and community.
                </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Card
                    title="Health Tips"
                    description="Create and manage tips and categories."
                    href={route('health-tips')}
                    icon={HeartPulse}
                />
                <Card
                    title="Research Tips"
                    description="Publish research guidance and resources."
                    href={route('research-tips')}
                    icon={Microscope}
                />
                <Card
                    title="Hot News"
                    description="Manage news posts and announcements."
                    href={route('hot-news')}
                    icon={Newspaper}
                />
                <Card
                    title="Gallery"
                    description="Manage categories and images."
                    href={route('gallery')}
                    icon={Image}
                />
                <Card
                    title="Opportunities"
                    description="Create and update vacancies."
                    href={route('opportunities')}
                    icon={Briefcase}
                />
                <Card
                    title="Messages"
                    description="Review conversations (admin view placeholder)."
                    href={route('messages')}
                    icon={MessageSquare}
                />
            </div>
        </AdminLayout>
    );
}
