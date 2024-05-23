<?php

namespace App\Http\Controllers;

use App\Http\Resources\InvoiceResource;
use App\Models\invoice;
use App\Http\Resources\InvoiceCollection;
use App\Http\Requests\StoreinvoiceRequest;
use App\Http\Requests\UpdateinvoiceRequest;
use App\Models\invoice_item;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new InvoiceCollection(Invoice::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreinvoiceRequest $request)
    {
        $validated = $request->validated();
        $validated['user_id'] = auth()->user()->id;
        $invoice = invoice::create($validated);
        foreach ($validated['invoice_items'] as $invoice_item) {
            $invoice_item['invoice_id'] = $invoice['id'];
            invoice_item::create($invoice_item);
        }
        return response()->json([
            "message" => "invoice created successfully",
            "data" => new InvoiceResource($invoice)
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(invoice $invoice)
    {
        return new InvoiceResource($invoice);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateinvoiceRequest $request, Invoice $invoice)
    {
        $validated = $request->validated();
        $invoice_items = $invoice->invoice_items;
    
        if (isset($validated['invoice_items'])) {
            foreach ($validated['invoice_items'] as $vali) {
                $items = [];
            
                foreach ($invoice_items as $inItem) {
                    $items[] = $inItem['item_id'];
                }
            
                if (isset($vali['item_id']) && in_array($vali['item_id'], $items)) {
                    foreach ($invoice_items as &$inItem) {
                        if ($inItem['item_id'] == $vali['item_id']) {
                            $inItem['qtn'] += $vali['qtn'];
                        }
                    }
                } else {
                    if (isset($vali['item_id'])) {
                        $vali['invoice_id'] = $invoice->id;
                        Invoice_item::create($vali);
                    }
                }
            }
        }
    
        $invoice->update($validated);
        $invoice->invoice_items()->saveMany($invoice_items);
        return new InvoiceResource($invoice);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(invoice $invoice)
    {
        $invoice->delete();
        return response()->json([
            "message" => "the invoice has been deleted successfully",
        ]);
    }
}
