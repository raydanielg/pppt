import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { Check, ChevronDown, Globe2, Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

function normalizeCountryName(item) {
    if (!item) return null;
    if (typeof item === 'string') return item;

    return (
        item.name ||
        item.country ||
        item.country_name ||
        item.commonName ||
        item.common_name ||
        item.officialName ||
        item.official_name ||
        null
    );
}

export default function Country({ country }) {
    const { data, setData, post, processing, errors } = useForm({
        country: country || '',
    });

    const [allCountries, setAllCountries] = useState([]);
    const [query, setQuery] = useState(country || '');
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            setLoading(true);
            try {
                const res = await fetch(route('onboarding.countries'));
                const json = await res.json();

                if (cancelled) return;

                const list = Array.isArray(json) ? json : json?.data;

                if (Array.isArray(list)) {
                    setAllCountries(list);
                } else {
                    setAllCountries([]);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();

        return () => {
            cancelled = true;
        };
    }, []);

    const filtered = useMemo(() => {
        const q = (query || '').trim().toLowerCase();
        const names = allCountries
            .map((c) => normalizeCountryName(c))
            .filter(Boolean);

        const unique = Array.from(new Set(names));

        if (!q) return unique.slice(0, 12);

        return unique
            .filter((name) => name.toLowerCase().includes(q))
            .slice(0, 12);
    }, [allCountries, query]);

    const submit = (e) => {
        e.preventDefault();
        post(route('onboarding.country.store'));
    };

    const select = (name) => {
        setQuery(name);
        setData('country', name);
        setOpen(false);
    };

    return (
        <GuestLayout>
            <Head title="Choose Country" />

            <div className="mb-6">
                <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                    Choose your country
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                    This helps us personalize your membership details.
                </p>
            </div>

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="country" value="Country" />

                    <div className="relative mt-1">
                        <Globe2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                        <TextInput
                            id="country"
                            name="country"
                            value={query}
                            placeholder={
                                loading
                                    ? 'Loading countries...'
                                    : 'Start typing to search'
                            }
                            className="block w-full pl-10 pr-10"
                            onChange={(e) => {
                                setQuery(e.target.value);
                                setData('country', e.target.value);
                                setOpen(true);
                            }}
                            onFocus={() => setOpen(true)}
                            autoComplete="off"
                            required
                        />

                        <button
                            type="button"
                            onClick={() => setOpen((v) => !v)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
                            aria-label="Toggle country list"
                        >
                            <ChevronDown className="h-4 w-4" />
                        </button>

                        {open && filtered.length > 0 && (
                            <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                                <div className="flex items-center gap-2 border-b border-gray-100 px-3 py-2 text-xs text-gray-500">
                                    <Search className="h-3.5 w-3.5" />
                                    Type to filter
                                </div>

                                <div className="max-h-64 overflow-auto p-1">
                                    {filtered.map((name) => (
                                        <button
                                            key={name}
                                            type="button"
                                            onClick={() => select(name)}
                                            className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-gray-700 hover:bg-green-50 focus:outline-none focus:bg-green-50"
                                        >
                                            <span className="truncate">
                                                {name}
                                            </span>
                                            {data.country === name && (
                                                <Check className="h-4 w-4 text-green-700" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <InputError message={errors.country} className="mt-2" />
                </div>

                <div className="mt-6">
                    <PrimaryButton
                        className="w-full justify-center"
                        disabled={processing}
                    >
                        Continue
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
