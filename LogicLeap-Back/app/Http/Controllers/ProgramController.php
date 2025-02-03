<?php

namespace App\Http\Controllers;

use App\Models\Program;
use Illuminate\Http\Request;

class ProgramController extends Controller
{
    // جلب جميع البرامج
    public function index()
    {
        return response()->json(Program::all());
    }

    // إضافة برنامج جديد
    public function store(Request $request)
    {
        $program = Program::create($request->all());
        return response()->json($program, 201);
    }

    // تعديل برنامج
    public function update(Request $request, $id)
    {
        $program = Program::findOrFail($id);
        $program->update($request->all());
        return response()->json($program, 200);
    }

    // حذف برنامج بشكل ناعم
    public function softDelete($id)
    {
        $program = Program::findOrFail($id);
        $program->delete(); // هذا سيؤدي إلى الحذف الناعم باستخدام `softDeletes`
        return response()->json(null, 204);
    }
}
