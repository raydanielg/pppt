<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use Spatie\Permission\Models\Role;

class AdminRoleSeeder extends Seeder
{
    public function run(): void
    {
        if (! Schema::hasTable('roles') || ! Schema::hasTable('model_has_roles')) {
            return;
        }

        $role = Role::findOrCreate('admin', 'web');

        $user = User::query()->firstOrCreate(
            ['email' => 'info@physioplanet.co.tz'],
            [
                'name' => 'Physioplanet Admin',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        if (! $user->hasRole($role)) {
            $user->assignRole($role);
        }
    }
}
