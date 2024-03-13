<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateinvoiceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'client_id' => 'sometimes|required|exists:clients,id',
            'release_date' => 'sometimes|required|date',
            'billing_status' => 'sometimes|required|in:paid,unpaid',
            'total_amount' => 'sometimes|required|numeric',
            'invoice_items' => 'sometimes|required|array|min:1',
            'invoice_items.*.item_id' => 'sometimes|required|exists:items,id',
            'invoice_items.*.qtn' => 'sometimes|required|integer',
        ];
    }
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'errors' => $validator->errors()
        ], 422));
    }
}
