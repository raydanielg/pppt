<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('country')->nullable()->after('password');
            $table->string('avatar_path')->nullable()->after('country');
            $table->string('membership_number')->nullable()->unique()->after('avatar_path');
            $table->boolean('onboarding_completed')->default(false)->after('membership_number');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropUnique(['membership_number']);
            $table->dropColumn(['country', 'avatar_path', 'membership_number', 'onboarding_completed']);
        });
    }
};
