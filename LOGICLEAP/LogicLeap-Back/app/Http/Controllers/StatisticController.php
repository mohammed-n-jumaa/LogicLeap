<?php

namespace App\Http\Controllers;

use App\Models\Statistic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StatisticController extends Controller
{
   
    public function index()
    {
        try {
            $statistics = Statistic::orderBy('created_at', 'desc')->get();
            return response()->json($statistics);
        } catch (\Exception $e) {
            \Log::error('Error fetching statistics: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch statistics'], 500);
        }
    }

   
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'value' => 'required|string|max:255',
            'icon' => 'nullable|string|max:255',
            'color' => 'nullable|string|max:255',
            'status' => 'required|in:active,inactive',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $statistic = Statistic::create($request->all());
        return response()->json($statistic, 201);
    }

   
    public function show($id)
    {
        $statistic = Statistic::findOrFail($id);
        return response()->json($statistic);
    }

    
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'value' => 'required|string|max:255',
            'icon' => 'nullable|string|max:255',
            'color' => 'nullable|string|max:255',
            'status' => 'required|in:active,inactive',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $statistic = Statistic::findOrFail($id);
        $statistic->update($request->all());
        return response()->json($statistic);
    }

   
    public function destroy($id)
    {
        $statistic = Statistic::findOrFail($id);
        $statistic->delete();
        return response()->json(null, 204);
    }
}