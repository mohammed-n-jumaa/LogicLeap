<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDeletedAtToGalleryTable extends Migration
{
    public function up()
    {
        Schema::table('gallery', function (Blueprint $table) {
            $table->softDeletes(); // إضافة عمود deleted_at
        });
    }

    public function down()
    {
        Schema::table('gallery', function (Blueprint $table) {
            $table->dropSoftDeletes(); // حذف عمود deleted_at إذا تم التراجع
        });
    }
}
