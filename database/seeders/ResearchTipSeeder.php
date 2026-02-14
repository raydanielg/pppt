<?php

namespace Database\Seeders;

use App\Models\ResearchTip;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ResearchTipSeeder extends Seeder
{
    public function run(): void
    {
        $research = [
            [
                'title' => 'Effectiveness of Manual Therapy in Chronic Low Back Pain',
                'author_name' => 'Dr. James Mwanjali',
                'category' => 'Manual Therapy',
                'abstract' => 'This study evaluates the long-term benefits of manual therapy compared to exercise alone for patients with chronic lower back pain. Chronic low back pain (CLBP) is a leading cause of disability worldwide, affecting millions of individuals and placing a significant burden on healthcare systems.',
                'content' => '<div class="space-y-8">
                    <section>
                        <h2 class="text-2xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight">Introduction</h2>
                        <p class="text-lg leading-relaxed text-gray-600 dark:text-gray-300">Manual therapy, including spinal mobilization and manipulation, has been widely used by physiotherapists to manage chronic low back pain. Despite its popularity, clinical guidelines often provide conflicting recommendations regarding its long-term efficacy compared to standard exercise protocols.</p>
                    </section>
                    
                    <section class="bg-gray-50 dark:bg-gray-900/50 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800">
                        <h2 class="text-2xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight">Methodology</h2>
                        <p class="text-lg leading-relaxed text-gray-600 dark:text-gray-300">A randomized controlled trial was conducted with 200 participants aged 30-65. Participants were divided into two groups: Group A received manual therapy plus exercise, while Group B received exercise alone. Outcomes were measured using the Oswestry Disability Index (ODI) and Visual Analog Scale (VAS) at 3, 6, and 12 months.</p>
                    </section>

                    <section>
                        <h2 class="text-2xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight">Results & Findings</h2>
                        <div class="grid md:grid-cols-2 gap-6 my-6">
                            <div class="p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-3xl border border-emerald-100 dark:border-emerald-800">
                                <span class="block text-3xl font-black text-emerald-600 mb-2">35%</span>
                                <span class="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase">Reduction in Pain (VAS)</span>
                            </div>
                            <div class="p-6 bg-amber-50 dark:bg-amber-900/20 rounded-3xl border border-amber-100 dark:border-amber-800">
                                <span class="block text-3xl font-black text-amber-600 mb-2">28%</span>
                                <span class="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase">Improvement in Mobility</span>
                            </div>
                        </div>
                        <p class="text-lg leading-relaxed text-gray-600 dark:text-gray-300">The results showed that Group A (Manual Therapy + Exercise) demonstrated a significantly higher reduction in pain levels at the 6-month mark compared to Group B. However, at 12 months, the differences between the two groups were less pronounced, although Group A still showed better functional scores.</p>
                    </section>

                    <section class="border-l-4 border-emerald-500 pl-8 my-12">
                        <h2 class="text-2xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight">Conclusion</h2>
                        <p class="text-lg leading-relaxed text-gray-600 dark:text-gray-300 italic font-medium">"Manual therapy provides a significant short-to-medium term advantage in pain reduction and functional improvement for CLBP patients. For long-term management, a combination of manual therapy and a consistent home-based exercise program is recommended."</p>
                    </section>
                </div>',
                'read_time' => '10 min read',
                'published_date' => '2025-11-15',
                'image' => 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200'
            ],
            [
                'title' => 'Advances in Neuro-Rehabilitation for Stroke Patients',
                'author_name' => 'Prof. Elena Petrova',
                'category' => 'Neurology',
                'abstract' => 'A comprehensive review of robot-assisted training and its impact on functional recovery after ischemic stroke. This research explores the integration of neuroplasticity principles with modern robotic technologies to enhance patient outcomes.',
                'content' => '<div class="space-y-8">
                    <section>
                        <h2 class="text-2xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight">Introduction</h2>
                        <p class="text-lg leading-relaxed text-gray-600 dark:text-gray-300">Stroke remains a leading cause of long-term disability. Traditional rehabilitation methods often fall short in providing the high intensity and repetition required for significant neuroplastic changes. Robotic-assisted therapy offers a solution by providing consistent, high-repetition training.</p>
                    </section>
                    
                    <section class="bg-gray-50 dark:bg-gray-900/50 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800">
                        <h2 class="text-2xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight">Technical Methodology</h2>
                        <p class="text-lg leading-relaxed text-gray-600 dark:text-gray-300">The study utilized the InMotion ARM robot for upper limb training. 150 chronic stroke patients were randomized into robotic-assisted therapy or dose-matched conventional therapy. Sessions were conducted 3 times a week for 12 weeks, focusing on reaching tasks and spatial orientation.</p>
                    </section>

                    <section>
                        <h2 class="text-2xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight">Key Findings</h2>
                        <div class="grid md:grid-cols-2 gap-6 my-6">
                            <div class="p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-3xl border border-emerald-100 dark:border-emerald-800">
                                <span class="block text-3xl font-black text-emerald-600 mb-2">42%</span>
                                <span class="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase">Fugl-Meyer Score Increase</span>
                            </div>
                            <div class="p-6 bg-amber-50 dark:bg-amber-900/20 rounded-3xl border border-amber-100 dark:border-amber-800">
                                <span class="block text-3xl font-black text-amber-600 mb-2">High</span>
                                <span class="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase">Patient Engagement Rate</span>
                            </div>
                        </div>
                        <p class="text-lg leading-relaxed text-gray-600 dark:text-gray-300">Robotic therapy led to significant improvements in motor impairment. More importantly, patients in the robotic group reported higher levels of motivation due to the interactive nature of the system, which is a critical factor in successful long-term recovery.</p>
                    </section>

                    <section class="border-l-4 border-emerald-500 pl-8 my-12">
                        <h2 class="text-2xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight">Clinical Conclusion</h2>
                        <p class="text-lg leading-relaxed text-gray-600 dark:text-gray-300 italic font-medium">"Integrating robotic assistance into neuro-rehabilitation protocols allows for the intensity levels needed to drive cortical reorganization. Future stroke recovery centers should prioritize the adoption of these technologies."</p>
                    </section>
                </div>',
                'read_time' => '15 min read',
                'published_date' => '2026-01-20',
                'image' => 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800'
            ],
            [
                'title' => 'Sports Injury Prevention in Youth Athletes',
                'author_name' => 'Dr. Robert Kavishe',
                'category' => 'Sports Medicine',
                'abstract' => 'A randomized controlled trial on the effectiveness of neuromuscular training programs in secondary schools. The study focuses on reducing the incidence of ACL and ankle injuries among young soccer and basketball players.',
                'content' => '<div class="space-y-8">
                    <section>
                        <h2 class="text-2xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight">Background</h2>
                        <p class="text-lg leading-relaxed text-gray-600 dark:text-gray-300">Adolescent athletes are at a higher risk for traumatic knee and ankle injuries. Neuromuscular training (NMT) has been proposed as a preventive measure, but its integration into school-based sports programs requires further investigation into feasibility and efficacy.</p>
                    </section>
                    
                    <section class="bg-gray-50 dark:bg-gray-900/50 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800">
                        <h2 class="text-2xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight">The Training Program</h2>
                        <p class="text-lg leading-relaxed text-gray-600 dark:text-gray-300">The intervention consisted of a 20-minute NMT warm-up program twice a week. It included balance exercises, plyometrics, and agility drills designed to improve landing mechanics and joint stability during high-impact movements.</p>
                    </section>

                    <section>
                        <h2 class="text-2xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight">Statistical Outcomes</h2>
                        <div class="grid md:grid-cols-2 gap-6 my-6">
                            <div class="p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-3xl border border-emerald-100 dark:border-emerald-800">
                                <span class="block text-3xl font-black text-emerald-600 mb-2">50%</span>
                                <span class="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase">Lower Injury Rate</span>
                            </div>
                            <div class="p-6 bg-amber-50 dark:bg-amber-900/20 rounded-3xl border border-amber-100 dark:border-amber-800">
                                <span class="block text-3xl font-black text-amber-600 mb-2">15 Min</span>
                                <span class="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase">Ease of Implementation</span>
                            </div>
                        </div>
                        <p class="text-lg leading-relaxed text-gray-600 dark:text-gray-300">The intervention group showed a 50% lower rate of non-contact ACL injuries compared to the control group. Coaches also reported that the program was easy to integrate into their regular practice sessions without requiring specialized equipment.</p>
                    </section>

                    <section class="border-l-4 border-emerald-500 pl-8 my-12">
                        <h2 class="text-2xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight">Summary</h2>
                        <p class="text-lg leading-relaxed text-gray-600 dark:text-gray-300 italic font-medium">"Simple, school-based neuromuscular training is incredibly effective at preventing career-ending injuries in youth sports. It should be a mandatory component of all school physical education and sports curricula."</p>
                    </section>
                </div>',
                'read_time' => '12 min read',
                'published_date' => '2026-02-05',
                'image' => 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800'
            ]
        ];

        foreach ($research as $item) {
            ResearchTip::create([
                'title' => $item['title'],
                'slug' => Str::slug($item['title']),
                'author_name' => $item['author_name'],
                'category' => $item['category'],
                'abstract' => $item['abstract'],
                'content' => $item['content'],
                'read_time' => $item['read_time'],
                'published_date' => $item['published_date'],
                'image' => $item['image']
            ]);
        }
    }
}
