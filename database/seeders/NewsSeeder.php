<?php

namespace Database\Seeders;

use App\Models\News;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class NewsSeeder extends Seeder
{
    public function run(): void
    {
        $news = [
            [
                'title' => 'New Breakthrough in ACL Recovery Techniques',
                'summary' => 'Scientists and top physiotherapists announce a new recovery protocol that could reduce ACL rehab time by 20%.',
                'content' => '<p>Recent studies have shown that a combination of early-stage neuromuscular training and specific manual therapy techniques can significantly accelerate ACL graft maturation. This breakthrough is expected to change the way sports injuries are managed globally...</p><p>Dr. Sarah Johnson, lead researcher, states that the focus should be on bio-mechanical alignment from day one of the injury.</p>',
                'image' => 'https://images.unsplash.com/photo-1576091160550-2173dad99901?auto=format&fit=crop&q=80&w=1200',
                'category' => 'Sports Medicine',
                'is_hot' => true,
            ],
            [
                'title' => 'PhysioPlanet Expands Services to Rural Areas',
                'summary' => 'Our mission to bring quality physiotherapy to every corner of the country takes a major leap with 10 new clinics.',
                'content' => '<p>We are thrilled to announce that PhysioPlanet is opening 10 new satellite clinics in rural regions. This initiative aims to provide essential physical therapy services to underserved communities where access to specialist care is limited.</p><p>Each clinic will be equipped with modern diagnostic tools and staffed by experienced therapists committed to community health.</p>',
                'image' => 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200',
                'category' => 'Community',
                'is_hot' => false,
            ],
            [
                'title' => 'The Role of AI in Modern Physiotherapy Assessment',
                'summary' => 'Artificial Intelligence is revolutionizing how therapists analyze patient movement and posture.',
                'content' => '<p>AI-powered motion capture systems are now capable of identifying subtle dysfunctions in human movement that were previously invisible to the naked eye. This technology allows for highly personalized treatment plans and precise progress tracking.</p>',
                'image' => 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=1200',
                'category' => 'Technology',
                'is_hot' => true,
            ],
            [
                'title' => 'Upcoming Annual Physiotherapy Conference 2026',
                'summary' => 'Join thousands of professionals in Nairobi for the biggest gathering of physiotherapists in East Africa.',
                'content' => '<p>The 2026 Annual Physiotherapy Conference will focus on "Sustainable Health and Innovations in Rehabilitation". Registration is now open for early-bird participants.</p>',
                'image' => 'https://images.unsplash.com/photo-1544640808-32ca72ac7f37?auto=format&fit=crop&q=80&w=1200',
                'category' => 'Events',
                'is_hot' => false,
            ]
        ];

        foreach ($news as $item) {
            News::create([
                'title' => $item['title'],
                'slug' => Str::slug($item['title']),
                'summary' => $item['summary'],
                'content' => $item['content'],
                'image' => $item['image'],
                'category' => $item['category'],
                'is_hot' => $item['is_hot'],
            ]);
        }
    }
}
