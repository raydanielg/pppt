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
        Schema::create('opportunities', function (Blueprint $table) {
            $table->id();
            $table->string('advert_name');
            $table->unsignedInteger('posts')->default(1);
            $table->string('employer_name');
            $table->date('open_date');
            $table->date('close_date');
            $table->json('duties')->nullable();
            $table->json('qualifications')->nullable();
            $table->string('remuneration')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['is_active', 'close_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('opportunities');
    }
};
