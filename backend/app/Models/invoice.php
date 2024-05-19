<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class invoice extends Model
{
    use HasFactory;
    protected $fillable=[
        'client_id','release_date','billing_status','total_amount','user_id'
    ];
    public function invoice_items() :HasMany
    {
        return $this->hasMany(invoice_item::class);
    }
    public function client(){
        return $this->belongsTo(client::class);
    }
    public function created_by(){
        return $this->belongsTo(user::class);
    }
}
