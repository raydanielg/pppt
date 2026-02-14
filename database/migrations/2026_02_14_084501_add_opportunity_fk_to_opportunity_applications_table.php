<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('opportunity_applications', function (Blueprint $table) {
            $table->foreign('opportunity_id')
                ->references('id')
                ->on('opportunities')
                ->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('opportunity_applications', function (Blueprint $table) {
            $table->dropForeign(['opportunity_id']);
        });
    }
};
