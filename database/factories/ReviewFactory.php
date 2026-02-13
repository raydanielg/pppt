<?php

namespace Database\Factories;

use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReviewFactory extends Factory
{
    protected $model = Review::class;

    public function definition(): array
    {
        $categories = [
            'Membership',
            'Dashboard',
            'Messages',
            'Forum',
            'Profile',
        ];

        return [
            'user_id' => User::factory(),
            'category' => $this->faker->randomElement($categories),
            'title' => $this->faker->optional(0.6)->sentence(4),
            'rating' => $this->faker->numberBetween(1, 5),
            'body' => $this->faker->optional(0.85)->paragraph(3),
        ];
    }
}
