<?php

namespace App\Http\Resources;

use App\Models\User;
use App\Models\client;
use App\Models\invoice_item;
use Illuminate\Http\Request;
use App\Http\Resources\InvoiceItemCollection;
use Illuminate\Http\Resources\Json\JsonResource;

class InvoiceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $user=User::find($this->user_id);
        $client=client::find($this->client_id);
        $invoiceItems = Invoice_Item::where('invoice_id', $this->id)->get();
        return [
            "id"=>$this->id,
            "release_date"=>$this->release_date,
            "total_amount"=>$this->total_amount,
            "billing_status"=>$this->billing_status,
            "created_by"=>new UserResource($user),
            "client"=>new ClientResource($client),
            "Invoice_items"=>new InvoiceItemCollection($invoiceItems)
        ];
    }
}
