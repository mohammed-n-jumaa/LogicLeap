<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('registrations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('program_id')->constrained('programs')->cascadeOnDelete();
            $table->foreignId('form_id')->constrained('forms')->cascadeOnDelete();
            $table->timestamp('registration_date');
            $table->enum('status', ['pending', 'confirmed', 'cancelled']);
            $table->timestamps();
            $table->softDeletes(); // Adds deleted_at column
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('registrations');
    }
};