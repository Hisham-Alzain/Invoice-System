<?php

namespace App\Http\Resources;

use App\Models\client;
use App\Models\User;
use Illuminate\Http\Request;
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
        return [
            "id"=>$this->id,
            "release_date"=>$this->release_date,
            "total_amount"=>$this->total_amount,
            "billing_status"=>$this->billing_status,
            "created_by"=>new UserResource($user),
            "client"=>new ClientResource($client)
        ];
    }
}
