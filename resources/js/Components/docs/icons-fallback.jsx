import { motion } from 'framer-motion';

export function IconsFallback() {
    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 12 }).map((_, i) => (
                <div
                    key={i}
                    className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm"
                >
                    <motion.div
                        animate={{ opacity: [0.4, 0.9, 0.4] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                        className="h-10 w-10 rounded-lg bg-gray-100"
                    />
                    <div className="flex-1 space-y-2">
                        <motion.div
                            animate={{ opacity: [0.4, 0.9, 0.4] }}
                            transition={{ duration: 1.2, repeat: Infinity, delay: 0.1 }}
                            className="h-3 w-24 rounded bg-gray-100"
                        />
                        <motion.div
                            animate={{ opacity: [0.4, 0.9, 0.4] }}
                            transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
                            className="h-2 w-16 rounded bg-gray-100"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
