<?php

namespace App\Http\Controllers;

use App\Http\Resources\InvoiceResource;
use App\Models\invoice;
use App\Http\Resources\InvoiceCollection;
use App\Http\Requests\StoreinvoiceRequest;
use App\Http\Requests\UpdateinvoiceRequest;

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
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreinvoiceRequest $request)
    {
        $validated=$request->validated();
        $invoice=invoice::create($validated);
        return response()->json([
            "message"=>"invoice created successfully",
            "data"=>new InvoiceResource($invoice)
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
     * Show the form for editing the specified resource.
     */
    public function edit(invoice $invoice)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateinvoiceRequest $request, invoice $invoice)
    {
        $validated= $request->validated(); 
        $invoice->update($validated);
        return new InvoiceResource($invoice);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(invoice $invoice)
    {
        $invoice->delete();
        return response()->json([
            "message"=> "the invoice has been deleted successfully",
        ]);
    }
}
