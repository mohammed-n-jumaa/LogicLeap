<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SiteService extends Model
{
    use HasFactory, SoftDeletes; 
    protected $fillable = ['title', 'description', 'category_id', 'price', 'status']; 

  
    protected $dates = ['deleted_at'];

 
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id'); 
    }

    
    public function serviceRequests()
{
    return $this->hasMany(ServiceRequest::class, 'service_id');
}

}
