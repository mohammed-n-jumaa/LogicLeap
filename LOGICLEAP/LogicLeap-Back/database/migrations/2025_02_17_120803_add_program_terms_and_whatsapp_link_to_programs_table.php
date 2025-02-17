<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddProgramTermsAndWhatsappLinkToProgramsTable extends Migration
{
    public function up()
    {
        Schema::table('programs', function (Blueprint $table) {
            $table->text('program_terms')->nullable()->after('what_youll_learn');
            $table->string('whatsapp_link')->nullable()->after('program_terms');
        });
    }

    public function down()
    {
        Schema::table('programs', function (Blueprint $table) {
            $table->dropColumn('program_terms');
            $table->dropColumn('whatsapp_link');
        });
    }
}