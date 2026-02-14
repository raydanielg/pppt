<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Book;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::first() ?? User::factory()->create([
            'name' => 'Admin Librarian',
            'email' => 'admin@physioplanet.com',
        ]);

        $books = [
            [
                'title' => 'Clinical Rehabilitation: Principles and Practice',
                'author' => 'Dr. Michael Barnes',
                'description' => 'A comprehensive guide to clinical rehabilitation covering all aspects of recovery and patient care.',
                'cover_image' => 'https://images.unsplash.com/photo-1544640808-32ca72ac7f37?auto=format&fit=crop&q=80&w=800',
                'pdf_url' => '/storage/books/rehabilitation_principles.pdf',
                'category' => 'Rehabilitation',
                'file_size' => '12.5 MB'
            ],
            [
                'title' => 'Therapeutic Exercise: Foundations and Techniques',
                'author' => 'Carolyn Kisner',
                'description' => 'The golden standard for therapeutic exercise protocols and scientific foundations.',
                'cover_image' => 'https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?auto=format&fit=crop&q=80&w=800',
                'pdf_url' => '/storage/books/therapeutic_exercise.pdf',
                'category' => 'Exercises',
                'file_size' => '18.2 MB'
            ],
            [
                'title' => 'Orthopedic Physical Assessment',
                'author' => 'David J. Magee',
                'description' => 'Detailed systematic approach to orthopedic assessment and clinical reasoning.',
                'cover_image' => 'https://images.unsplash.com/photo-1576091160550-2173dad99901?auto=format&fit=crop&q=80&w=800',
                'pdf_url' => '/storage/books/orthopedic_assessment.pdf',
                'category' => 'Orthopedics',
                'file_size' => '24.1 MB'
            ],
            [
                'title' => 'Neurological Rehabilitation',
                'author' => 'Darcy A. Umphred',
                'description' => 'A fundamental text for neurological rehabilitation and patient management.',
                'cover_image' => 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800',
                'pdf_url' => '/storage/books/neuro_rehab.pdf',
                'category' => 'Neurology',
                'file_size' => '15.8 MB'
            ]
        ];

        foreach ($books as $book) {
            Book::create(array_merge($book, ['uploaded_by' => $admin->id]));
        }
    }
}
