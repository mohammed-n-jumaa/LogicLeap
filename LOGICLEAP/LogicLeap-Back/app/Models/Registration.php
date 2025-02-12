<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes; 

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

  // في نموذج Registration.php
public function program()
{
    return $this->belongsTo(Program::class, 'program_id'); 
}

    public function form()
    {
        return $this->belongsTo(Form::class);
    }
}