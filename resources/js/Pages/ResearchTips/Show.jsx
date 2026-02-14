import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Microscope, ArrowLeft, Calendar, Clock, Share2, Bookmark, BookOpen, ChevronRight, FileText, Check, Copy } from 'lucide-react';
import { useState } from 'react';

export default function Show({ research, relatedResearch }) {
    const [copied, setCopied] = useState(false);

    const handleCopyCitation = () => {
        const citation = `${research.author_name} (${new Date(research.published_date).getFullYear()}). ${research.title}. PhysioPlanet Research. Retrieved from ${window.location.href}`;
        navigator.clipboard.writeText(citation);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

    return (
        <AuthenticatedLayout>
            <Head title={`${research.title} - Research`} />
            
            <div className="py-8 px-4 sm:px-6 lg:px-10 max-w-[1600px] mx-auto">
                <Link 
                    href={route('research-tips')} 
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-emerald-600 font-black text-sm mb-8 transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Research List
                </Link>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Main Content Area */}
                    <div className="flex-1 max-w-4xl">
                        <article className="bg-white dark:bg-gray-800 rounded-[3rem] overflow-hidden border border-gray-100 dark:border-gray-700 shadow-2xl shadow-gray-200/50 dark:shadow-none">
                            {/* Hero Image Section */}
                            <div className="relative h-[500px]">
                                <img src={research.image} alt={research.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                <div className="absolute bottom-12 left-12 right-12 text-white">
                                    <span className="inline-block px-4 py-1.5 rounded-full bg-amber-400 text-amber-950 text-xs font-black uppercase tracking-[0.2em] mb-6">
                                        {research.category}
                                    </span>
                                    <h1 className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tight">
                                        {research.title}
                                    </h1>
                                </div>
                            </div>

                            <div className="p-8 md:p-16">
                                {/* Article Metadata */}
                                <div className="flex flex-wrap items-center gap-10 mb-16 py-8 border-b border-gray-100 dark:border-gray-700/50">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center font-black text-emerald-700 text-2xl shadow-inner">
                                            {research.author_name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Lead Researcher</p>
                                            <p className="text-gray-900 dark:text-white font-black text-xl leading-none">{research.author_name}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Published</p>
                                        <div className="flex items-center gap-2 text-gray-900 dark:text-white font-bold">
                                            <Calendar className="w-4 h-4 text-emerald-500" />
                                            {new Date(research.published_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </div>
                                    </div>

                                    <div className="flex flex-col">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Reading Time</p>
                                        <div className="flex items-center gap-2 text-gray-900 dark:text-white font-bold">
                                            <Clock className="w-4 h-4 text-emerald-500" />
                                            {research.read_time}
                                        </div>
                                    </div>

                                    <div className="ml-auto flex gap-3">
                                        <button className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl hover:bg-emerald-50 dark:hover:bg-emerald-900/30 text-gray-400 hover:text-emerald-600 transition-all border border-transparent hover:border-emerald-100">
                                            <Share2 className="w-5 h-5" />
                                        </button>
                                        <button className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl hover:bg-emerald-50 dark:hover:bg-emerald-900/30 text-gray-400 hover:text-emerald-600 transition-all border border-transparent hover:border-emerald-100">
                                            <Bookmark className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Abstract Section */}
                                <div className="mb-16 relative">
                                    <div className="absolute -left-12 top-0 bottom-0 w-1.5 bg-amber-400 rounded-full hidden md:block"></div>
                                    <h3 className="text-2xl font-black mb-6 uppercase tracking-tighter text-gray-900 dark:text-white">Abstract</h3>
                                    <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium italic">
                                        "{research.abstract}"
                                    </p>
                                </div>

                                {/* Full Article Content */}
                                <div 
                                    className="prose prose-xl prose-emerald dark:prose-invert max-w-none 
                                    prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight
                                    prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:leading-[1.8]
                                    prose-strong:text-gray-900 dark:prose-strong:text-white"
                                    dangerouslySetInnerHTML={{ __html: research.content }}
                                />

                                {/* Bottom Tags/Meta */}
                                <div className="mt-20 pt-12 border-t border-gray-100 dark:border-gray-700/50 flex flex-wrap items-center justify-between gap-8">
                                    <div className="flex items-center gap-4">
                                        <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Keywords:</span>
                                        <div className="flex flex-wrap gap-2">
                                            {['Physiotherapy', 'Clinical Trial', 'Evidence-Based'].map(tag => (
                                                <span key={tag} className="px-4 py-1.5 bg-gray-100 dark:bg-gray-900 rounded-full text-[10px] font-black text-gray-600 dark:text-gray-400 uppercase">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>

                    {/* Sidebar Section */}
                    <aside className="w-full lg:w-[400px] flex flex-col gap-10">
                        {/* Citation Card */}
                        <div className="bg-emerald-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl border border-emerald-800">
                            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md border border-white/10">
                                    <FileText className="w-7 h-7 text-amber-400" />
                                </div>
                                <h3 className="text-2xl font-black mb-4 leading-tight uppercase tracking-tight">Cite this <br/>Research</h3>
                                <p className="text-emerald-100/60 text-sm mb-8 font-medium leading-relaxed">
                                    Use the button below to copy the professional APA citation for your academic work.
                                </p>
                                
                                <div className="bg-black/20 rounded-2xl p-5 mb-8 border border-white/5">
                                    <p className="text-[11px] font-medium text-emerald-100/80 leading-relaxed italic">
                                        {research.author_name} ({new Date(research.published_date).getFullYear()}). {research.title}...
                                    </p>
                                </div>

                                <button 
                                    onClick={handleCopyCitation}
                                    className={`w-full py-5 rounded-2xl font-black transition-all flex items-center justify-center gap-3 shadow-xl ${
                                        copied 
                                        ? 'bg-emerald-500 text-white' 
                                        : 'bg-amber-400 text-amber-950 hover:bg-amber-300 active:scale-[0.98]'
                                    }`}
                                >
                                    {copied ? (
                                        <>
                                            <Check className="w-5 h-5" />
                                            Citation Copied!
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-5 h-5" />
                                            Copy APA Citation
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Related Research */}
                        <div className="bg-white dark:bg-gray-800 rounded-[3rem] p-10 border border-gray-100 dark:border-gray-700 shadow-xl shadow-gray-200/50 dark:shadow-none">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="h-8 w-1.5 bg-amber-400 rounded-full"></div>
                                <h2 className="text-xl font-black uppercase tracking-tighter text-gray-900 dark:text-white">
                                    Related <span className="text-emerald-600">Studies</span>
                                </h2>
                            </div>
                            
                            <div className="flex flex-col gap-10">
                                {relatedResearch.length > 0 ? relatedResearch.map((item) => (
                                    <Link 
                                        key={item.id}
                                        href={route('research-tips.show', item.slug)}
                                        className="group flex gap-6"
                                    >
                                        <div className="w-24 h-24 rounded-[1.5rem] overflow-hidden flex-shrink-0 shadow-lg ring-1 ring-black/5">
                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <div className="flex flex-col justify-center min-w-0">
                                            <span className="text-[9px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-2">
                                                {item.category}
                                            </span>
                                            <h3 className="text-[15px] font-black text-gray-900 dark:text-white group-hover:text-emerald-600 transition-colors leading-tight line-clamp-3">
                                                {item.title}
                                            </h3>
                                        </div>
                                    </Link>
                                )) : (
                                    <p className="text-sm text-gray-400 italic font-medium">No related studies found in this category.</p>
                                )}
                            </div>

                            <Link 
                                href={route('research-tips')}
                                className="w-full mt-12 py-4 border-2 border-dashed border-gray-100 dark:border-gray-700 rounded-2xl text-gray-400 hover:text-emerald-600 hover:border-emerald-600 dark:hover:text-emerald-400 dark:hover:border-emerald-400 font-black text-sm transition-all flex items-center justify-center gap-2"
                            >
                                <BookOpen className="w-4 h-4" />
                                View All Research
                            </Link>
                        </div>
                    </aside>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

