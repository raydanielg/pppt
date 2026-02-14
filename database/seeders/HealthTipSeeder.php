<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\HealthTip;
use App\Models\HealthTipCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class HealthTipSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::first() ?? User::factory()->create([
            'name' => 'Dr. Sarah Chen',
            'email' => 'sarah.chen@physioplanet.com',
        ]);

        $categories = [
            ['name' => 'Exercises', 'icon' => 'Activity'],
            ['name' => 'Ergonomics', 'icon' => 'BookOpen'],
            ['name' => 'Rehabilitation', 'icon' => 'HeartPulse'],
            ['name' => 'Videos', 'icon' => 'Video'],
        ];

        foreach ($categories as $cat) {
            $category = HealthTipCategory::create([
                'name' => $cat['name'],
                'slug' => Str::slug($cat['name']),
                'icon' => $cat['icon'],
            ]);

            if ($cat['name'] === 'Ergonomics') {
                HealthTip::create([
                    'user_id' => $admin->id,
                    'health_tip_category_id' => $category->id,
                    'title' => 'Proper Posture at the Desk',
                    'slug' => Str::slug('Proper Posture at the Desk'),
                    'description' => 'Learn the correct way to sit at your desk to avoid back and neck pain.',
                    'content' => '<div class="space-y-6"><p class="text-lg leading-relaxed">Sitting at a desk for long periods can lead to various musculoskeletal issues, particularly in the neck, back, and shoulders. Maintaining proper posture is crucial for preventing chronic pain and improving long-term health.</p><h3 class="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight mt-8">1. Adjust Your Chair Height</h3><p class="text-lg leading-relaxed">Your chair should be at a height where your feet are flat on the floor and your knees are at a 90-degree angle. If your feet don\'t reach the floor, use a footrest.</p><h3 class="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight mt-8">2. Position Your Monitor</h3><p class="text-lg leading-relaxed">The top of your monitor screen should be at or slightly below eye level. This prevents you from tilting your head up or down, which can strain your neck muscles.</p><h3 class="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight mt-8">3. Keep Your Back Supported</h3><p class="text-lg leading-relaxed">Use a chair that provides good lumbar support. If your chair doesn\'t have it, a small pillow or rolled-up towel behind your lower back can help maintain the natural curve of your spine.</p><div class="bg-emerald-50 dark:bg-emerald-900/20 p-8 rounded-[2rem] border border-emerald-100 dark:border-emerald-800/50 my-10 shadow-inner"><h4 class="font-black text-emerald-800 dark:text-emerald-200 mb-3 italic uppercase tracking-widest text-sm">Pro Tip:</h4><p class="text-emerald-700 dark:text-emerald-300 font-medium">Follow the 20-20-20 rule: Every 20 minutes, look at something 20 feet away for 20 seconds to reduce eye strain and remind yourself to check your posture.</p></div></div>',
                    'image' => 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200',
                    'duration' => '5 min read',
                    'tag' => 'New',
                ]);
            }

            if ($cat['name'] === 'Exercises') {
                HealthTip::create([
                    'user_id' => $admin->id,
                    'health_tip_category_id' => $category->id,
                    'title' => 'Essential Stretches for Runners',
                    'slug' => Str::slug('Essential Stretches for Runners'),
                    'description' => 'Dynamic and static stretches that every runner should perform to prevent common injuries.',
                    'content' => '<div class="space-y-6"><p class="text-lg leading-relaxed">Running is a high-impact activity that puts significant stress on your muscles and joints. A proper stretching routine is essential for maintaining flexibility and preventing common injuries like shin splints and IT band syndrome.</p><h3 class="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight mt-8">1. Dynamic Warm-up</h3><p class="text-lg leading-relaxed">Before you start running, perform dynamic stretches like leg swings and high knees to increase blood flow and prepare your muscles for action.</p><h3 class="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight mt-8">2. Post-Run Static Stretches</h3><p class="text-lg leading-relaxed">After your run, focus on static stretches for your hamstrings, quadriceps, and calves. Hold each stretch for at least 30 seconds to improve long-term flexibility.</p></div>',
                    'image' => 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=1200',
                    'duration' => '8 min read',
                    'tag' => 'Popular',
                ]);
            }
        }
    }
}
