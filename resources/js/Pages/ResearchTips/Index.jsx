import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Microscope, Calendar, Clock, ChevronRight, Search, FileText } from 'lucide-react';

export default function Index({ research }) {
    return (
        <AuthenticatedLayout>
            <Head title="Research Tips" />
            
            <div className="py-8 px-4 sm:px-6 lg:px-10 max-w-[1600px] mx-auto">
                {/* Hero */}
                <div className="bg-emerald-900 rounded-[2.5rem] p-8 md:p-12 mb-16 text-white overflow-hidden relative shadow-2xl">
                    <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-emerald-500/20 rounded-full blur-[100px]"></div>
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300 text-xs font-black tracking-widest uppercase mb-6">
                            Evidence Based Practice
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                            Physiotherapy <span className="text-amber-400">Research</span>
                        </h1>
                        <p className="text-emerald-50/70 text-lg md:text-xl max-w-2xl font-medium">
                            Explore the latest findings in clinical research.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Research List - Main Content Area */}
                    <div className="flex-1 space-y-6">
                        <div className="flex flex-col gap-6">
                            {research.data.map((item) => (
                                <div key={item.id} className="group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-500">
                                    <div className="flex flex-col md:flex-row">
                                        <div className="md:w-48 relative h-48 md:h-auto overflow-hidden flex-shrink-0">
                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                            <div className="absolute top-3 left-3 bg-amber-400 text-amber-950 text-[9px] font-black uppercase px-3 py-1 rounded-full shadow-md">
                                                {item.category}
                                            </div>
                                        </div>
                                        <div className="flex-1 p-6 flex flex-col justify-between min-w-0">
                                            <div>
                                                <div className="flex items-center gap-4 text-gray-400 text-[10px] font-bold mb-3 uppercase tracking-widest">
                                                    <div className="flex items-center gap-1.5">
                                                        <Calendar className="w-3 h-3 text-emerald-500" />
                                                        {new Date(item.published_date).toLocaleDateString()}
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <Clock className="w-3 h-3 text-emerald-500" />
                                                        {item.read_time}
                                                    </div>
                                                </div>
                                                <h2 className="text-lg font-black text-gray-900 dark:text-white mb-2 group-hover:text-emerald-600 transition-colors leading-tight truncate">
                                                    {item.title}
                                                </h2>
                                                <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed line-clamp-2 mb-4">
                                                    {item.abstract}
                                                </p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center font-black text-emerald-700 text-[10px]">
                                                        {item.author_name.charAt(0)}
                                                    </div>
                                                    <span className="text-[11px] font-black text-gray-700 dark:text-gray-300">{item.author_name}</span>
                                                </div>
                                                <Link 
                                                    href={route('research-tips.show', item.slug)}
                                                    className="inline-flex items-center gap-1.5 text-emerald-600 font-black text-[11px] hover:translate-x-1 transition-transform"
                                                >
                                                    Read More
                                                    <ChevronRight className="w-3 h-3" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Consultation Card below the list */}
                        <div className="mt-12 bg-gradient-to-r from-emerald-900 to-emerald-800 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="max-w-xl text-center md:text-left">
                                    <h3 className="text-2xl font-black mb-2 leading-tight">Professional Research Consultation</h3>
                                    <p className="text-emerald-100/70 text-sm font-medium">Connect with our experts for guidance on your clinical studies and physiotherapy research.</p>
                                </div>
                                <button className="whitespace-nowrap px-8 py-4 bg-amber-400 text-amber-950 font-black rounded-2xl hover:bg-amber-300 transition-all shadow-lg flex items-center justify-center gap-2">
                                    <FileText className="w-5 h-5" />
                                    Book Now
                                </button>
                            </div>
                        </div>

                        {/* Pagination */}
                        {research.links && research.links.length > 3 && (
                            <div className="mt-12 flex justify-center gap-2">
                                {research.links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                                            link.active 
                                                ? 'bg-emerald-600 text-white shadow-lg' 
                                                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-emerald-50'
                                        } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <aside className="w-full lg:w-80 flex flex-col gap-8">
                        {/* Search Sidebar */}
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-700 shadow-xl">
                            <h3 className="text-lg font-black mb-6 uppercase tracking-tight">Search</h3>
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                                <input 
                                    type="text" 
                                    placeholder="Research..." 
                                    className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-emerald-500 transition-all outline-none text-sm"
                                />
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
