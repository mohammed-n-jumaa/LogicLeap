<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGalleriesTable extends Migration
{
    public function up()
    {
        Schema::create('galleries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('program_id')->constrained()->onDelete('cascade');
            $table->string('image_path');
            $table->enum('status', ['active', 'inactive'])->default('active'); // إضافة حقل الحالة
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('galleries');
    }
}