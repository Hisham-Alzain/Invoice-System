<?php

namespace App\Http\Resources;

use App\Models\item;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InvoiceItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $item=item::find($this->item_id);
        return [
            "id"=>$this->id,
            "item"=>new itemResource($item),
            "qtn"=>$this->qtn,
        ];
    }
}
