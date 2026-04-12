import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

// Toast Notification Component
const Toast = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const icons = {
        success: <CheckCircle className="h-5 w-5 text-green-500" />,
        error: <AlertCircle className="h-5 w-5 text-red-500" />,
        warning: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
        info: <Info className="h-5 w-5 text-blue-500" />,
    };

    const styles = {
        success: 'bg-green-50 border-green-200 text-green-800',
        error: 'bg-red-50 border-red-200 text-red-800',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
        info: 'bg-blue-50 border-blue-200 text-blue-800',
    };

    return (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg backdrop-blur-sm animate-in slide-in-from-right-full duration-300 ${styles[type]}`}>
            {icons[type]}
            <span className="font-medium text-sm">{message}</span>
            <button onClick={onClose} className="p-1 hover:bg-black/5 rounded-lg transition-colors">
                <X className="h-4 w-4" />
            </button>
        </div>
    );
};

// Animated Dotted Background
const AnimatedBackground = () => {
    return (
        <div className="fixed inset-0 overflow-hidden -z-10">
            {/* Base Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-green-50"></div>
            
            {/* Animated Dotted Pattern */}
            <div className="absolute inset-0 opacity-[0.4]">
                <div 
                    className="absolute inset-0 animate-pulse"
                    style={{
                        backgroundImage: `radial-gradient(circle at center, #10b981 1px, transparent 1px)`,
                        backgroundSize: '40px 40px',
                        animation: 'moveDots 20s linear infinite'
                    }}
                ></div>
            </div>
            
            {/* Secondary Dotted Pattern (offset) */}
            <div className="absolute inset-0 opacity-[0.3]">
                <div 
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at center, #059669 1.5px, transparent 1.5px)`,
                        backgroundSize: '60px 60px',
                        animation: 'moveDotsReverse 25s linear infinite'
                    }}
                ></div>
            </div>

            {/* Floating Particles */}
            {[...Array(15)].map((_, i) => (
                <div
                    key={i}
                    className="absolute w-2 h-2 bg-emerald-400/30 rounded-full animate-float"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${i * 0.5}s`,
                        animationDuration: `${8 + Math.random() * 4}s`,
                    }}
                />
            ))}

            {/* Large Gradient Orbs */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-emerald-200/40 to-transparent rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-green-200/30 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-emerald-100/20 via-green-100/20 to-emerald-100/20 rounded-full blur-3xl animate-spin" style={{ animationDuration: '60s' }}></div>

            {/* Grid Pattern Overlay */}
            <div 
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                    backgroundSize: '100px 100px'
                }}
            ></div>

            {/* CSS Animations */}
            <style>{`
                @keyframes moveDots {
                    0% { transform: translate(0, 0); }
                    100% { transform: translate(40px, 40px); }
                }
                @keyframes moveDotsReverse {
                    0% { transform: translate(0, 0); }
                    100% { transform: translate(-60px, -60px); }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
                    25% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
                    50% { transform: translateY(-10px) translateX(-10px); opacity: 0.4; }
                    75% { transform: translateY(-30px) translateX(5px); opacity: 0.5; }
                }
                .animate-float {
                    animation: float 8s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default function GuestLayout({ children }) {
    const [toasts, setToasts] = useState([]);
    const { flash, errors } = usePage().props;

    useEffect(() => {
        const newToasts = [];
        
        // Handle flash messages
        if (flash?.success) {
            newToasts.push({ id: Date.now(), message: flash.success, type: 'success' });
        }
        if (flash?.error) {
            newToasts.push({ id: Date.now() + 1, message: flash.error, type: 'error' });
        }
        if (flash?.warning) {
            newToasts.push({ id: Date.now() + 2, message: flash.warning, type: 'warning' });
        }
        if (flash?.info) {
            newToasts.push({ id: Date.now() + 3, message: flash.info, type: 'info' });
        }

        // Handle validation errors
        const errorMessages = Object.values(errors || {});
        if (errorMessages.length > 0) {
            errorMessages.forEach((error, index) => {
                newToasts.push({ 
                    id: Date.now() + 4 + index, 
                    message: Array.isArray(error) ? error[0] : error, 
                    type: 'error' 
                });
            });
        }

        if (newToasts.length > 0) {
            setToasts(prev => [...prev, ...newToasts]);
        }
    }, [flash, errors]);

    const removeToast = (id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-10 sm:px-6 sm:py-0">
            {/* Animated Background */}
            <AnimatedBackground />

            {/* Toast Notifications */}
            {toasts.map((toast, index) => (
                <div key={toast.id} style={{ top: `${16 + index * 70}px` }} className="fixed right-4 z-50">
                    <Toast 
                        message={toast.message} 
                        type={toast.type} 
                        onClose={() => removeToast(toast.id)} 
                    />
                </div>
            ))}

            {/* Logo */}
            <div className="relative z-10 mb-8">
                <Link href="/" className="group">
                    <div className="relative w-24 h-24 bg-white rounded-3xl p-3 shadow-xl shadow-emerald-200/50 ring-1 ring-black/5 group-hover:shadow-2xl group-hover:shadow-emerald-200/50 transition-all duration-500 group-hover:scale-105">
                        <img
                            src="/logo.png"
                            alt="Physioplanet"
                            className="w-full h-full object-contain"
                        />
                    </div>
                </Link>
            </div>

            {/* Main Card */}
            <div className="relative z-10 w-full max-w-md overflow-hidden bg-white/95 px-6 py-8 shadow-2xl shadow-emerald-100/50 ring-1 ring-black/5 backdrop-blur-xl sm:max-w-lg sm:rounded-3xl sm:px-10 sm:py-10">
                {children}
            </div>

            {/* Footer Text */}
            <p className="relative z-10 mt-8 text-sm text-gray-500 font-medium">
                © {new Date().getFullYear()} PHYSIOPLANET. All rights reserved.
            </p>
        </div>
    );
}
