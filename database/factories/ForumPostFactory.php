<?php

namespace Database\Factories;

use App\Models\ForumPost;
use App\Models\ForumTopic;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ForumPostFactory extends Factory
{
    protected $model = ForumPost::class;

    public function definition(): array
    {
        return [
            'forum_topic_id' => ForumTopic::factory(),
            'user_id' => User::factory(),
            'content' => $this->faker->paragraph(),
        ];
    }
}
