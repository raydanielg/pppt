import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Camera, Mail, User, Globe2, Shield } from 'lucide-react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            country: user.country || '',
            avatar: null,
            _method: 'PATCH',
        });

    const submit = (e) => {
        e.preventDefault();
        post(route('profile.update'), {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <section className={className}>
            <form onSubmit={submit} className="space-y-6">
                {/* Avatar Upload Section */}
                <div className="flex flex-col items-center gap-4 sm:flex-row">
                    <div className="relative group">
                        <div className="h-24 w-24 overflow-hidden rounded-full ring-4 ring-emerald-500/20 bg-emerald-50 dark:bg-gray-700 flex items-center justify-center">
                            {data.avatar ? (
                                <img
                                    src={URL.createObjectURL(data.avatar)}
                                    alt="Preview"
                                    className="h-full w-full object-cover"
                                />
                            ) : user.avatar_url ? (
                                <img
                                    src={user.avatar_url}
                                    alt={user.name}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <User className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
                            )}
                        </div>
                        <label
                            htmlFor="avatar"
                            className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg ring-2 ring-white hover:bg-emerald-700 transition-colors"
                        >
                            <Camera className="h-4 w-4" />
                            <input
                                id="avatar"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => setData('avatar', e.target.files[0])}
                            />
                        </label>
                    </div>
                    <div className="text-center sm:text-left">
                        <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">Profile Photo</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Update your photo to personalize your membership card</p>
                        <InputError className="mt-2" message={errors.avatar} />
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-1">
                        <InputLabel htmlFor="name" value="Full Name" />
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <TextInput
                                id="name"
                                className="block w-full pl-10"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                autoComplete="name"
                            />
                        </div>
                        <InputError className="mt-2" message={errors.name} />
                    </div>

                    <div className="space-y-1">
                        <InputLabel htmlFor="email" value="Email Address" />
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <TextInput
                                id="email"
                                type="email"
                                className="block w-full pl-10"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoComplete="username"
                            />
                        </div>
                        <InputError className="mt-2" message={errors.email} />
                    </div>

                    <div className="space-y-1">
                        <InputLabel htmlFor="country" value="Country" />
                        <div className="relative">
                            <Globe2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <TextInput
                                id="country"
                                className="block w-full pl-10"
                                value={data.country}
                                onChange={(e) => setData('country', e.target.value)}
                                required
                            />
                        </div>
                        <InputError className="mt-2" message={errors.country} />
                    </div>
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="rounded-xl bg-yellow-50 p-4 border border-yellow-100 dark:bg-yellow-900/10 dark:border-yellow-900/30">
                        <p className="text-sm text-yellow-800 dark:text-yellow-200">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="ml-2 font-bold underline hover:text-yellow-900 focus:outline-none"
                            >
                                Re-send verification email
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4 border-t border-gray-100 pt-6 dark:border-gray-700">
                    <PrimaryButton disabled={processing} className="px-8 shadow-md">
                        Update Profile
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-300"
                        enterFrom="opacity-0 translate-x-2"
                        enterTo="opacity-100 translate-x-0"
                        leave="transition ease-in-out duration-300"
                        leaveTo="opacity-0 -translate-x-2"
                    >
                        <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            Changes saved successfully
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
