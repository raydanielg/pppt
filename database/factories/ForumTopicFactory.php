<?php

namespace Database\Factories;

use App\Models\ForumTopic;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ForumTopicFactory extends Factory
{
    protected $model = ForumTopic::class;

    public function definition(): array
    {
        $title = $this->faker->sentence();
        return [
            'user_id' => User::factory(),
            'title' => $title,
            'slug' => \Illuminate\Support\Str::slug($title) . '-' . rand(1000, 9999),
            'content' => $this->faker->paragraphs(3, true),
            'category' => $this->faker->randomElement(['General', 'Health', 'Sports', 'Techniques', 'Equipment']),
        ];
    }
}
