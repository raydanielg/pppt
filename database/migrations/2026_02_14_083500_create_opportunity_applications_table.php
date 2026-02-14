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
        Schema::create('opportunity_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->unsignedBigInteger('opportunity_id');
            $table->string('advert_name');
            $table->string('cover_letter_path');
            $table->string('cover_letter_original_name');
            $table->string('cover_letter_mime', 191);
            $table->unsignedBigInteger('cover_letter_size');
            $table->timestamps();

            $table->index(['user_id', 'opportunity_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('opportunity_applications');
    }
};
