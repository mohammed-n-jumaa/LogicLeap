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
    Schema::table('site_services', function (Blueprint $table) {
        // Drop the foreign key first
        $table->dropForeign(['category_id']);
        // Then drop the column
        $table->dropColumn('category_id');
    });
}

public function down()
{
    Schema::table('site_services', function (Blueprint $table) {
        $table->bigInteger('category_id')->unsigned()->nullable();
        $table->foreign('category_id')->references('id')->on('categories');
    });
}
};
