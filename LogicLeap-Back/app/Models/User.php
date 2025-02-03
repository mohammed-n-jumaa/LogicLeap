<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Model
{
    use HasFactory, SoftDeletes;
    
    protected $fillable = [
        'name',
        'email',
        'phone',
        'password',
        'role',
    ];

    protected $hidden = [
        'password',
    ];

    // إضافة تواريخ الإنشاء والتحديث
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';

    // إضافة الحقول التي سيتم حذفها برفق
    protected $dates = ['deleted_at'];

    // علاقات
    public function registrations()
    {
        return $this->hasMany(Registration::class);
    }

    public function serviceRequests()
    {
        return $this->hasMany(ServiceRequest::class);
    }
}
