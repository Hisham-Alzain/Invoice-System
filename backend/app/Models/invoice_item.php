<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class invoice_item extends Model
{
    use HasFactory;
    protected $fillable=[
        "invoice_id","qtn","item_id"
    ];
    public function invoice(){
        return $this->belongsTo(invoice::class);
    }
    public function item(){
        return $this->hasOne(item::class);
    }
}
