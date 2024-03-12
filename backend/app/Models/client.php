<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class client extends Model
{
    use HasFactory;
    protected $fillable=[
        'name','location'
    ];
    protected function invoices(){
        return $this->hasMany(invoice::class);
    }

}
