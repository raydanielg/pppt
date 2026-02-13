import { motion } from 'framer-motion';
import {
    Activity,
    AlarmClock,
    BarChart3,
    BookOpen,
    Calendar,
    CheckCircle2,
    ClipboardList,
    Cloud,
    CreditCard,
    HeartPulse,
    Home,
    Image,
    LayoutGrid,
    Mail,
    MapPin,
    MessageCircle,
    Moon,
    Phone,
    Search,
    Settings,
    ShieldCheck,
    Sparkles,
    Star,
    Sun,
    User,
    Zap,
} from 'lucide-react';

const ICONS = [
    { name: 'Activity', Icon: Activity },
    { name: 'AlarmClock', Icon: AlarmClock },
    { name: 'BarChart3', Icon: BarChart3 },
    { name: 'BookOpen', Icon: BookOpen },
    { name: 'Calendar', Icon: Calendar },
    { name: 'CheckCircle2', Icon: CheckCircle2 },
    { name: 'ClipboardList', Icon: ClipboardList },
    { name: 'Cloud', Icon: Cloud },
    { name: 'CreditCard', Icon: CreditCard },
    { name: 'HeartPulse', Icon: HeartPulse },
    { name: 'Home', Icon: Home },
    { name: 'Image', Icon: Image },
    { name: 'LayoutGrid', Icon: LayoutGrid },
    { name: 'Mail', Icon: Mail },
    { name: 'MapPin', Icon: MapPin },
    { name: 'MessageCircle', Icon: MessageCircle },
    { name: 'Moon', Icon: Moon },
    { name: 'Phone', Icon: Phone },
    { name: 'Search', Icon: Search },
    { name: 'Settings', Icon: Settings },
    { name: 'ShieldCheck', Icon: ShieldCheck },
    { name: 'Sparkles', Icon: Sparkles },
    { name: 'Star', Icon: Star },
    { name: 'Sun', Icon: Sun },
    { name: 'User', Icon: User },
    { name: 'Zap', Icon: Zap },
];

export function Icons() {
    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {ICONS.map(({ name, Icon }) => (
                <motion.div
                    key={name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    whileHover={{ y: -2 }}
                    className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm"
                >
                    <motion.div
                        whileHover={{ rotate: 6, scale: 1.05 }}
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-700 ring-1 ring-green-100"
                    >
                        <Icon className="h-5 w-5" />
                    </motion.div>

                    <div className="min-w-0">
                        <div className="truncate text-sm font-medium text-gray-900">
                            {name}
                        </div>
                        <div className="text-xs text-gray-500">lucide-react</div>
                    </div>

                    <div className="ml-auto opacity-0 transition group-hover:opacity-100">
                        <div className="rounded-md bg-yellow-50 px-2 py-1 text-[10px] font-semibold text-yellow-800 ring-1 ring-yellow-200">
                            Motion
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
