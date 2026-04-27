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
            $table->string('membership_payment_status')->nullable()->after('onboarding_completed');
            $table->string('membership_payment_reference')->nullable()->after('membership_payment_status');
            $table->string('membership_payment_type')->nullable()->after('membership_payment_reference');
            $table->timestamp('membership_paid_at')->nullable()->after('membership_payment_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'membership_payment_status',
                'membership_payment_reference',
                'membership_payment_type',
                'membership_paid_at',
            ]);
        });
    }
};
