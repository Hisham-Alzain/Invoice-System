<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class invoice extends Model
{
    use HasFactory;
    protected $fillable=[
        'client_id','release_date','billing_status','total_amount','user_id'
    ];
    protected function invoice_items(){
        return $this->hasMany(invoice_item::class);
    }
    protected function client(){
        return $this->belongsTo(client::class);
    }
    protected function created_by(){
        return $this->belongsTo(user::class);
    }
}
