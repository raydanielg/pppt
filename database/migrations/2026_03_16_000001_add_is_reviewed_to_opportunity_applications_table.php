<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('opportunity_applications', function (Blueprint $table) {
            $table->boolean('is_reviewed')->default(false)->after('cover_letter_size');
        });
    }

    public function down(): void
    {
        Schema::table('opportunity_applications', function (Blueprint $table) {
            $table->dropColumn('is_reviewed');
        });
    }
};
