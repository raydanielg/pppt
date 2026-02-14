import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Camera, Image as ImageIcon, LayoutGrid, Maximize2, X, ChevronRight, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Index({ categories, all_images }) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedImage, setSelectedImage] = useState(null);

    const filteredImages = selectedCategory === 'all' 
        ? all_images 
        : all_images.filter(img => img.category.slug === selectedCategory);

    return (
        <AuthenticatedLayout>
            <Head title="Photo Gallery" />
            
            <div className="py-8 px-4 sm:px-6 lg:px-10 max-w-[1600px] mx-auto">
                {/* Hero Section */}
                <div className="bg-emerald-900 rounded-[2.5rem] p-8 md:p-12 mb-16 text-white overflow-hidden relative shadow-2xl">
                    <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-emerald-500/20 rounded-full blur-[100px]"></div>
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300 text-xs font-black tracking-widest uppercase mb-6">
                            Visual Showcase
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                            PhysioPlanet <span className="text-amber-400">Gallery</span>
                        </h1>
                        <p className="text-emerald-50/70 text-lg md:text-xl max-w-2xl font-medium">
                            Capturing moments of recovery, innovation, and community excellence.
                        </p>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="mb-12">
                    <div className="flex flex-wrap items-center gap-4 bg-white dark:bg-gray-800 p-3 rounded-[2rem] border border-gray-100 dark:border-gray-700 shadow-xl inline-flex">
                        <button 
                            onClick={() => setSelectedCategory('all')}
                            className={`px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                                selectedCategory === 'all' 
                                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30' 
                                : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-900'
                            }`}
                        >
                            All Photos
                        </button>
                        {categories.map((cat) => (
                            <button 
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.slug)}
                                className={`px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                                    selectedCategory === cat.slug 
                                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30' 
                                    : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-900'
                                }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Image Grid */}
                <motion.div 
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredImages.map((image) => (
                            <motion.div
                                key={image.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                onClick={() => setSelectedImage(image)}
                                className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-gray-100 dark:bg-gray-900 cursor-pointer shadow-lg hover:shadow-2xl transition-all"
                            >
                                <img 
                                    src={image.image_url} 
                                    alt={image.title} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                
                                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                    <span className="inline-block px-3 py-1 bg-amber-400 text-amber-950 text-[9px] font-black uppercase rounded-full mb-3">
                                        {image.category.name}
                                    </span>
                                    <h3 className="text-white font-black text-lg leading-tight mb-2">
                                        {image.title}
                                    </h3>
                                    <p className="text-white/60 text-xs line-clamp-2">
                                        {image.description}
                                    </p>
                                </div>

                                <div className="absolute top-6 right-6 w-10 h-10 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Maximize2 className="w-5 h-5" />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Lightbox */}
                <AnimatePresence>
                    {selectedImage && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
                            onClick={() => setSelectedImage(null)}
                        >
                            <button 
                                className="absolute top-10 right-10 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center justify-center text-white transition-all z-[110]"
                                onClick={() => setSelectedImage(null)}
                            >
                                <X className="w-8 h-8" />
                            </button>

                            <motion.div 
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 20 }}
                                className="relative max-w-6xl w-full aspect-video md:aspect-square lg:aspect-video rounded-[3rem] overflow-hidden shadow-2xl"
                                onClick={e => e.stopPropagation()}
                            >
                                <img 
                                    src={selectedImage.image_url} 
                                    alt={selectedImage.title} 
                                    className="w-full h-full object-contain md:object-cover bg-black" 
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-10 md:p-16 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                                    <span className="inline-block px-4 py-1.5 bg-amber-400 text-amber-950 text-xs font-black uppercase rounded-full mb-4">
                                        {selectedImage.category.name}
                                    </span>
                                    <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                                        {selectedImage.title}
                                    </h2>
                                    <p className="text-white/70 text-lg max-w-3xl leading-relaxed">
                                        {selectedImage.description}
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </AuthenticatedLayout>
    );
}
