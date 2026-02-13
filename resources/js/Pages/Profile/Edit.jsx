import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { User, Shield, AlertTriangle } from 'lucide-react';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout>
            <Head title="My Profile" />

            <div className="space-y-8 pb-12">
                {/* Header Section */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-600 p-8 text-white shadow-lg">
                    <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-300/20 blur-3xl" />
                    <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-yellow-300/10 blur-2xl" />
                    
                    <div className="relative flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm ring-1 ring-white/20">
                            <User className="h-6 w-6 text-yellow-300" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Account Settings</h1>
                            <p className="text-sm text-emerald-100/80">Manage your profile information and security</p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Left Column: Profile Info */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="rounded-2xl border border-gray-200 bg-white/35 p-6 shadow-sm backdrop-blur dark:border-gray-700 dark:bg-gray-900/30">
                            <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-4 dark:border-gray-700">
                                <User className="h-5 w-5 text-emerald-600" />
                                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Personal Information</h2>
                            </div>
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                            />
                        </div>
                    </div>

                    {/* Right Column: Security & Danger Zone */}
                    <div className="space-y-8">
                        <div className="rounded-2xl border border-gray-200 bg-white/35 p-6 shadow-sm backdrop-blur dark:border-gray-700 dark:bg-gray-900/30">
                            <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-4 dark:border-gray-700">
                                <Shield className="h-5 w-5 text-emerald-600" />
                                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Security</h2>
                            </div>
                            <UpdatePasswordForm />
                        </div>

                        <div className="rounded-2xl border border-red-100 bg-red-50/30 p-6 shadow-sm backdrop-blur dark:border-red-900/20 dark:bg-red-900/10">
                            <div className="mb-6 flex items-center gap-3 border-b border-red-100 pb-4 dark:border-red-900/30">
                                <AlertTriangle className="h-5 w-5 text-red-600" />
                                <h2 className="text-lg font-bold text-red-900 dark:text-red-100">Danger Zone</h2>
                            </div>
                            <DeleteUserForm />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
