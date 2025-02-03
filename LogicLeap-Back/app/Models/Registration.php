<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
    use HasFactory, SoftDeletes;


    protected $fillable = [
        'user_id',
        'program_id',
        'form_id',
        'registration_date',
        'status',
    ];

    // علاقات
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function program()
    {
        return $this->belongsTo(Program::class);
    }

    public function form()
    {
        return $this->belongsTo(Form::class);
    }
}