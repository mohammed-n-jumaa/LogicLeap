<?php

namespace App\Http\Controllers;

use App\Models\Form;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FormController extends Controller 
{
    public function index()
    {
        $forms = Form::with('program')->get();
        return response()->json($forms);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'program_id' => 'required|exists:programs,id',
            'fields' => 'required|array',
            'fields.*.name' => 'required|string',
            'fields.*.label' => 'required|string',
            'fields.*.type' => 'required|string|in:text,number,email,textarea,select,checkbox',
            'fields.*.required' => 'required|boolean',
            'status' => 'required|in:active,inactive'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $form = Form::create($request->all());
        // Load the program relationship before returning
        return response()->json($form->load('program'), 201);
    }

    public function show($id)
    {
        $form = Form::with('program')->findOrFail($id);
        return response()->json($form);
    }

    public function update(Request $request, $id)
    {
        $form = Form::findOrFail($id);
        
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'program_id' => 'required|exists:programs,id',
            'fields' => 'required|array',
            'fields.*.name' => 'required|string',
            'fields.*.label' => 'required|string',
            'fields.*.type' => 'required|string|in:text,number,email,textarea,select,checkbox',
            'fields.*.required' => 'required|boolean',
            'status' => 'required|in:active,inactive'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $form->update($request->all());
        // Load the program relationship before returning
        return response()->json($form->load('program'));
    }

    public function softDelete($id)
    {
        $form = Form::findOrFail($id);
        $form->delete();
        return response()->json(null, 204);
    }

    public function restore($id)
    {
        $form = Form::withTrashed()->findOrFail($id);
        $form->restore();
        return response()->json($form->load('program'));
    }

    public function forceDelete($id)
    {
        $form = Form::withTrashed()->findOrFail($id);
        $form->forceDelete();
        return response()->json(null, 204);
    }

    public function getTrashed()
    {
        $forms = Form::onlyTrashed()->with('program')->get();
        return response()->json($forms);
    }
}