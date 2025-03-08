<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGalleryImagesTable extends Migration
{
    public function up()
    {
        Schema::create('gallery_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('gallery_id')->constrained()->onDelete('cascade');
            $table->string('image_path');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('gallery_images');
    }
}