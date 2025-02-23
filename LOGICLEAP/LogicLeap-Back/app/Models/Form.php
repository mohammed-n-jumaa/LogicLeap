<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Form extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'program_id',
        'fields',
        'status'
    ];

    protected $casts = [
        'fields' => 'array'
    ];

    public function program()
    {
        return $this->belongsTo(Program::class);
    }
}