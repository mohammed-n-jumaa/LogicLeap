<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ServiceRequest extends Model
{
    use HasFactory, SoftDeletes;

    protected $dates = ['deleted_at'];

    protected $fillable = [
        'user_id',
        'service_id',
        'name',
        'email',
        'phone',
        'service_type',
        'details',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

public function siteService()
{
    return $this->belongsTo(SiteService::class, 'service_id');  
}

}
