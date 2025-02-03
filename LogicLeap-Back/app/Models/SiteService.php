<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiteService extends Model
{
    use HasFactory, SoftDeletes;


    protected $fillable = [
        'title',
        'description',
        'category_id',
        'price',
        'status',
    ];

    
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function serviceRequests()
    {
        return $this->hasMany(ServiceRequest::class, 'service_id');
    }
}