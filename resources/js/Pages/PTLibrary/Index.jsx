import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Book as BookIcon, Download, Search, FileText, User, Tag, ExternalLink } from 'lucide-react';

export default function Index({ books }) {
    return (
        <AuthenticatedLayout>
            <Head title="PT Library" />
            
            <div className="py-8 px-4 sm:px-6 lg:px-10 max-w-[1600px] mx-auto">
                {/* Hero Section */}
                <div className="bg-emerald-900 rounded-[2.5rem] p-8 md:p-12 mb-16 text-white overflow-hidden relative shadow-2xl">
                    <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-emerald-500/20 rounded-full blur-[100px]"></div>
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300 text-xs font-black tracking-widest uppercase mb-6">
                            Academic Resources
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                            Physiotherapy <span className="text-amber-400">Library</span>
                        </h1>
                        <p className="text-emerald-50/70 text-lg md:text-xl max-w-2xl font-medium">
                            Access a vast collection of physiotherapy textbooks, journals, and clinical guides.
                        </p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-4 gap-12">
                    {/* Sidebar: Search and Categories */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-700 shadow-xl">
                            <h3 className="text-lg font-black mb-6 uppercase tracking-tight">Find Books</h3>
                            <div className="relative group mb-8">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                                <input 
                                    type="text" 
                                    placeholder="Title or author..." 
                                    className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-emerald-500 transition-all outline-none text-sm"
                                />
                            </div>

                            <h3 className="text-sm font-black mb-4 uppercase tracking-widest text-gray-400">Popular Categories</h3>
                            <div className="flex flex-col gap-2">
                                {['Rehabilitation', 'Orthopedics', 'Neurology', 'Pediatrics', 'Sports Medicine'].map((cat) => (
                                    <button key={cat} className="text-left px-4 py-3 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-900/30 text-gray-600 dark:text-gray-400 font-bold text-sm transition-all flex items-center justify-between group">
                                        {cat}
                                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Contribution Card */}
                        <div className="bg-emerald-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
                            <h3 className="text-2xl font-black mb-4 relative z-10 leading-tight">Share Your Knowledge</h3>
                            <p className="text-emerald-100/70 text-sm mb-8 relative z-10 font-medium">Have a PDF book or resource to share with the community?</p>
                            <button className="w-full py-4 bg-amber-400 text-amber-950 font-black rounded-2xl hover:bg-amber-300 transition-all shadow-lg flex items-center justify-center gap-2">
                                <FileText className="w-5 h-5" />
                                Upload Resource
                            </button>
                        </div>
                    </div>

                    {/* Books Grid */}
                    <div className="lg:col-span-3">
                        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {books.map((book) => (
                                <div key={book.id} className="group bg-white dark:bg-gray-800 rounded-[2rem] overflow-hidden border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col">
                                    {/* Book Cover */}
                                    <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-900">
                                        <img src={book.cover_image} alt={book.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <a 
                                                href={book.pdf_url} 
                                                download 
                                                className="p-4 bg-white text-emerald-600 rounded-2xl shadow-xl hover:scale-110 transition-transform"
                                            >
                                                <Download className="w-6 h-6" />
                                            </a>
                                        </div>
                                        <div className="absolute top-4 left-4 bg-amber-400 text-amber-950 text-[10px] font-black uppercase px-3 py-1 rounded-full">
                                            {book.category}
                                        </div>
                                        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-black px-3 py-1 rounded-full">
                                            {book.file_size}
                                        </div>
                                    </div>

                                    {/* Book Info */}
                                    <div className="p-8 flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-lg font-black text-gray-900 dark:text-white mb-2 leading-tight group-hover:text-emerald-600 transition-colors">
                                                {book.title}
                                            </h3>
                                            <div className="flex items-center gap-2 text-gray-400 text-xs font-bold mb-4">
                                                <User className="w-3 h-3 text-emerald-500" />
                                                {book.author}
                                            </div>
                                            <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed line-clamp-2 mb-6">
                                                {book.description}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between pt-6 border-t border-gray-50 dark:border-gray-700">
                                            <a 
                                                href={book.pdf_url} 
                                                download 
                                                className="flex items-center gap-2 text-emerald-600 font-black text-sm hover:translate-x-1 transition-transform"
                                            >
                                                Download PDF
                                                <Download className="w-4 h-4" />
                                            </a>
                                            <button className="text-gray-300 hover:text-amber-400 transition-colors">
                                                <ExternalLink className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// Helper component for arrows
function ChevronRight({ className }) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={className}
        >
            <path d="m9 18 6-6-6-6"/>
        </svg>
    );
}
