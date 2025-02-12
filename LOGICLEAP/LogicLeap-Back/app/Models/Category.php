<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['name'];

    
    public function programs()
    {
        return $this->hasMany(Program::class);
    }

    public function forms()
    {
        return $this->hasMany(Form::class);
    }

    public function siteServices()
    {
        return $this->hasMany(SiteService::class);
    }
}