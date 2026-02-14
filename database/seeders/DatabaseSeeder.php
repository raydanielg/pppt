<?php

namespace Database\Seeders;

use App\Models\ForumTopic;
use App\Models\ForumPost;
use App\Models\Review;
use App\Models\User;
use Database\Seeders\OpportunitySeeder;
use Database\Seeders\AdminRoleSeeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $user = User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => \Hash::make('password'),
            ]
        );

        // Clear existing forum data to avoid confusion with mock data
        \DB::table('forum_posts')->delete();
        \DB::table('forum_topics')->delete();

        $topics = ForumTopic::factory(10)->create();
        foreach($topics as $topic) {
            ForumPost::factory(rand(2, 5))->create([
                'forum_topic_id' => $topic->id
            ]);
        }

        $this->call(OpportunitySeeder::class);
        $this->call(AdminRoleSeeder::class);
    }
}
