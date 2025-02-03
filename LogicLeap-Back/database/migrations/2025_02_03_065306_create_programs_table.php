<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('programs', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->foreignId('category_id')->constrained('categories');
            $table->date('start_date');
            $table->date('end_date');
            $table->integer('duration');
            $table->decimal('cost', 10, 2);
            $table->enum('price', ['free', 'paid']);
            $table->enum('status', ['active', 'inactive']);
            $table->enum('mode', ['online', 'onsite']);
            $table->string('zoom_link')->nullable();
            $table->string('location')->nullable();
            $table->string('image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('programs');
    }
};
