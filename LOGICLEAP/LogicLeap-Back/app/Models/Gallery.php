<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Gallery extends Model
{
    use SoftDeletes,HasFactory ;
    protected $table = 'gallery';
    protected $fillable = [
        'program_id',
        'image_path',
        'status'
    ];

    protected $dates = ['deleted_at'];

    public function program()
    {
        return $this->belongsTo(Program::class);
    }
}