<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('books', function (Blueprint $table) {
            $table->foreignId('library_category_id')->nullable()->after('pdf_url')->constrained('library_categories')->nullOnDelete();
        });

        Schema::table('notes', function (Blueprint $table) {
            $table->foreignId('library_category_id')->nullable()->after('file_url')->constrained('library_categories')->nullOnDelete();
        });

        $defaultCategories = [
            'Physiotherapy',
            'General',
        ];

        foreach ($defaultCategories as $name) {
            DB::table('library_categories')->updateOrInsert(
                ['name' => $name],
                ['slug' => Str::slug($name), 'description' => null, 'created_at' => now(), 'updated_at' => now()]
            );
        }

        $physioId = DB::table('library_categories')->where('name', 'Physiotherapy')->value('id');
        $generalId = DB::table('library_categories')->where('name', 'General')->value('id');

        if ($physioId) {
            DB::table('books')->whereNull('library_category_id')->update(['library_category_id' => $physioId]);
        }

        if ($generalId) {
            DB::table('notes')->whereNull('library_category_id')->update(['library_category_id' => $generalId]);
        }
    }

    public function down(): void
    {
        Schema::table('notes', function (Blueprint $table) {
            $table->dropConstrainedForeignId('library_category_id');
        });

        Schema::table('books', function (Blueprint $table) {
            $table->dropConstrainedForeignId('library_category_id');
        });
    }
};
