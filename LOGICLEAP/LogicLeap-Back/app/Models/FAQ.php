<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class FAQ extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'faq'; 

    protected $fillable = [
        'question',
        'answer',
        'status',
    ];
    protected $dates = ['deleted_at'];

}