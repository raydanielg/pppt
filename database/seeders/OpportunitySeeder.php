<?php

namespace Database\Seeders;

use App\Models\Opportunity;
use Illuminate\Database\Seeder;

class OpportunitySeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            [
                'advert_name' => 'DAKTARI WA UPASUAJI WA KINYWA NA MENOO || (DENTAL SURGEON GRADE II)',
                'posts' => 65,
                'employer_name' => 'MDAs & LGAs',
                'open_date' => '2026-02-13',
                'close_date' => '2026-02-27',
                'duties' => [
                    'Kufanya kazi zote za matibabu hospitalini zinazohusiana na magonjwa ya kinywa na meno.',
                    'Kutoa na kusimamia elimu ya afya ya kinywa na meno.',
                    'Kusimamia wafanyakazi walio chini yake.',
                    'Kushirikiana na wadau kuboresha huduma za afya.',
                ],
                'qualifications' => [
                    'Shahada ya Udaktari wa Upasuaji wa Kinywa na Meno (DDS/DMD au sawa).',
                    'Uthibitisho wa usajili na Baraza la Madaktari husika.',
                ],
                'remuneration' => 'TGHS E',
                'is_active' => true,
            ],
            [
                'advert_name' => 'DAKTARI DARAJA LA II || (MEDICAL OFFICER GRADE I)',
                'posts' => 492,
                'employer_name' => 'MDAs & LGAs',
                'open_date' => '2026-02-13',
                'close_date' => '2026-02-27',
                'duties' => [
                    'Kutoa huduma za uchunguzi na matibabu kwa wagonjwa.',
                    'Kushiriki katika mipango ya uboreshaji wa huduma za afya.',
                ],
                'qualifications' => [
                    'Shahada ya Udaktari (MD) kutoka chuo kinachotambuliwa.',
                    'Usajili na leseni halali ya kutibu.',
                ],
                'remuneration' => 'TGHS E',
                'is_active' => true,
            ],
            [
                'advert_name' => 'MHANDISI VIFAA TIBA DARAJA LA II || (BIOMEDICAL ENGINEER II)',
                'posts' => 31,
                'employer_name' => 'MDAs & LGAs',
                'open_date' => '2026-02-13',
                'close_date' => '2026-02-27',
                'duties' => [
                    'Kusimamia matengenezo ya vifaa tiba.',
                    'Kutoa ushauri wa kiufundi kuhusu ununuzi na matumizi ya vifaa.',
                ],
                'qualifications' => [
                    'Shahada ya Uhandisi wa Biomedical au sawa.',
                ],
                'remuneration' => 'TGHS E',
                'is_active' => true,
            ],
            [
                'advert_name' => 'FIZIOTHERAPIA DARAJA LA II || (PHYSIOTHERAPIST II)',
                'posts' => 39,
                'employer_name' => 'MDAs & LGAs',
                'open_date' => '2026-02-13',
                'close_date' => '2026-02-27',
                'duties' => [
                    'Kufanya assessment na kupanga mipango ya tiba kwa wagonjwa.',
                    'Kutoa mazoezi ya tiba na ushauri wa kuzuia majeraha.',
                ],
                'qualifications' => [
                    'Shahada/Diploma ya Physiotherapy kutoka taasisi inayotambuliwa.',
                    'Usajili na Baraza husika la wataalam wa afya.',
                ],
                'remuneration' => 'TGHS E',
                'is_active' => true,
            ],
            [
                'advert_name' => 'AFISA AFYA MAZINGIRA MSADIZI DARAJA LA II || (ASSISTANT ENVIRONMENTAL HEALTH OFFICER GRADE II)',
                'posts' => 172,
                'employer_name' => 'MDAs & LGAs',
                'open_date' => '2026-02-13',
                'close_date' => '2026-02-27',
                'duties' => [
                    'Kusimamia shughuli za afya ya mazingira na usafi.',
                ],
                'qualifications' => [
                    'Cheti/Diploma ya Environmental Health au sawa.',
                ],
                'remuneration' => 'TGHS E',
                'is_active' => true,
            ],
            [
                'advert_name' => 'DAKTARI BINGWA WA MAGONJWA YA AKINA MAMA DARAJA LA II || (MEDICAL SPECIALIST - GYNAECOLOGIST II)',
                'posts' => 17,
                'employer_name' => 'MDAs & LGAs',
                'open_date' => '2026-02-13',
                'close_date' => '2026-02-27',
                'duties' => [
                    'Kutoa huduma za kibingwa kwa wagonjwa wa magonjwa ya akina mama.',
                ],
                'qualifications' => [
                    'Shahada ya Uzamili (MMed) katika Obstetrics & Gynaecology au sawa.',
                ],
                'remuneration' => 'TGHS E',
                'is_active' => true,
            ],
            [
                'advert_name' => 'AFISA MUUGUZI DARAJA LA II || (NURSING OFFICER II)',
                'posts' => 50,
                'employer_name' => 'MDAs & LGAs',
                'open_date' => '2026-02-13',
                'close_date' => '2026-02-27',
                'duties' => [
                    'Kutoa huduma za uuguzi na uangalizi kwa wagonjwa.',
                ],
                'qualifications' => [
                    'Shahada/Diploma ya Uuguzi na usajili halali.',
                ],
                'remuneration' => 'TGHS E',
                'is_active' => true,
            ],
        ];

        foreach ($items as $item) {
            Opportunity::updateOrCreate(
                ['advert_name' => $item['advert_name'], 'employer_name' => $item['employer_name']],
                $item,
            );
        }
    }
}
