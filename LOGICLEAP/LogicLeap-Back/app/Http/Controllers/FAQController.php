<?php
namespace App\Http\Controllers;

use App\Models\FAQ;
use Illuminate\Http\Request;

class FAQController extends Controller
{
    public function index()
    {
        return FAQ::all();
    }

    public function store(Request $request)
    {
        $faq = FAQ::create($request->all());
        return response()->json($faq, 201);
    }

    public function update(Request $request, $id)
    {
        $faq = FAQ::findOrFail($id);
        $faq->update($request->all());
        return response()->json($faq);
    }

    public function softDelete($id)
    {
        $faq = FAQ::findOrFail($id);
        $faq->delete();
        return response()->json(null, 204);
    }
}