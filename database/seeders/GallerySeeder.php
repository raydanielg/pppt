<?php

namespace Database\Seeders;

use App\Models\GalleryCategory;
use App\Models\GalleryImage;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class GallerySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Modern Clinics',
                'description' => 'A look inside our state-of-the-art physiotherapy facilities.',
                'images' => [
                    [
                        'title' => 'Main Rehab Center',
                        'url' => 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200',
                        'desc' => 'Our primary rehabilitation hall with modern equipment.'
                    ],
                    [
                        'title' => 'Private Consultation Room',
                        'url' => 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200',
                        'desc' => 'Spacious and private rooms for individual assessments.'
                    ]
                ]
            ],
            [
                'name' => 'Advanced Equipment',
                'description' => 'Innovative tools we use for precise diagnosis and treatment.',
                'images' => [
                    [
                        'title' => 'Hydrotherapy Pool',
                        'url' => 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200',
                        'desc' => 'Temperature-controlled pool for aquatic rehabilitation.'
                    ],
                    [
                        'title' => 'Laser Therapy Unit',
                        'url' => 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200',
                        'desc' => 'Cold laser therapy for accelerated tissue healing.'
                    ]
                ]
            ],
            [
                'name' => 'Community Events',
                'description' => 'Memorable moments from our workshops and outreach programs.',
                'images' => [
                    [
                        'title' => 'Yoga Workshop 2025',
                        'url' => 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200',
                        'desc' => 'Community yoga session for mental and physical wellness.'
                    ],
                    [
                        'title' => 'Sports Injury Seminar',
                        'url' => 'https://images.unsplash.com/photo-1576091160550-2173dad99901?auto=format&fit=crop&q=80&w=1200',
                        'desc' => 'Educating young athletes on injury prevention.'
                    ]
                ]
            ]
        ];

        foreach ($categories as $catData) {
            $category = GalleryCategory::create([
                'name' => $catData['name'],
                'slug' => Str::slug($catData['name']),
                'description' => $catData['description'],
            ]);

            foreach ($catData['images'] as $imgData) {
                GalleryImage::create([
                    'gallery_category_id' => $category->id,
                    'title' => $imgData['title'],
                    'image_url' => $imgData['url'],
                    'description' => $imgData['desc'],
                ]);
            }
        }
    }
}
