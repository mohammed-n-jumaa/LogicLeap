<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::table('forms', function (Blueprint $table) {
            // تغيير نوع العمود fields ليكون JSON وقابلًا للتغيير
            $table->json('fields')->nullable()->change();
            
            // إضافة عمود description بعد title
            $table->text('description')->nullable()->after('title');
        });
    }

    public function down(): void {
        Schema::table('forms', function (Blueprint $table) {
            // لا يمكن التراجع عن change() بسهولة، ولكن يمكن إعادة ضبط العمود
            $table->json('fields')->nullable()->change();
            
            // حذف العمود description
            $table->dropColumn('description');
        });
    }
};
