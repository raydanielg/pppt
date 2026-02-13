import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { Camera, Globe2, Mail, User } from 'lucide-react';

export default function Confirm({ user }) {
    const { data, setData, post, processing, errors } = useForm({
        name: user?.name || '',
        country: user?.country || '',
        avatar: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('onboarding.confirm.store'), {
            forceFormData: true,
        });
    };

    return (
        <GuestLayout>
            <Head title="Confirm Details" />

            <div className="mb-6">
                <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                    Confirm your details
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                    Upload a profile photo and verify your information.
                </p>
            </div>

            <form onSubmit={submit}>
                <div className="space-y-4">
                    <div>
                        <InputLabel htmlFor="name" value="Full name" />
                        <div className="relative mt-1">
                            <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                placeholder="Your full name"
                                className="block w-full pl-10"
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                required
                            />
                        </div>
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="email" value="Email" />
                        <div className="relative mt-1">
                            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <TextInput
                                id="email"
                                name="email"
                                value={user?.email || ''}
                                className="block w-full cursor-not-allowed bg-gray-50 pl-10 text-gray-500"
                                disabled
                                readOnly
                            />
                        </div>
                    </div>

                    <div>
                        <InputLabel htmlFor="country" value="Country" />
                        <div className="relative mt-1">
                            <Globe2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <TextInput
                                id="country"
                                name="country"
                                value={data.country}
                                placeholder="Country"
                                className="block w-full pl-10"
                                onChange={(e) =>
                                    setData('country', e.target.value)
                                }
                                required
                            />
                        </div>
                        <InputError message={errors.country} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="avatar" value="Avatar" />

                        <div className="mt-1 flex items-center gap-4">
                            <div className="h-14 w-14 overflow-hidden rounded-full bg-green-50 ring-1 ring-green-100">
                                {data.avatar ? (
                                    <img
                                        src={URL.createObjectURL(data.avatar)}
                                        alt="Preview"
                                        className="h-full w-full object-cover"
                                    />
                                ) : user?.avatar_url ? (
                                    <img
                                        src={user.avatar_url}
                                        alt="Avatar"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-green-700">
                                        <Camera className="h-5 w-5" />
                                    </div>
                                )}
                            </div>

                            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                                <Camera className="h-4 w-4 text-gray-500" />
                                <span>Upload photo</span>
                                <input
                                    id="avatar"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) =>
                                        setData(
                                            'avatar',
                                            e.target.files?.[0] || null,
                                        )
                                    }
                                />
                            </label>
                        </div>

                        <InputError message={errors.avatar} className="mt-2" />
                        <p className="mt-2 text-xs text-gray-500">
                            JPG/PNG, up to 2MB.
                        </p>
                    </div>
                </div>

                <div className="mt-6">
                    <PrimaryButton
                        className="w-full justify-center"
                        disabled={processing}
                    >
                        Verify
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
