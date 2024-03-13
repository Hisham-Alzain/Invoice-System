<?php

namespace App\Http\Controllers;

use App\Models\item;
use Illuminate\Http\Request;
use App\Http\Resources\ItemResource;
use App\Http\Resources\ItemCollection;
use App\Http\Requests\storeItemRequest;
use App\Http\Requests\updateItemRequest;

class ItemController extends Controller
{
    public function index(){
        return new ItemCollection(item::all());
    }
    public function show(item $item){
        return new ItemResource($item);
    }
    public function store(storeItemRequest $request){
        $validated=$request->validated();
        $item=item::create($validated);
        return response()->json([
            "message"=>"invoice created successfully",
            "data"=>new ItemResource($item)
        ],201);
    }
    public function update(updateItemRequest $request,Item $item){
        $validated= $request->validated(); 
        $item->update($validated);
        return new ItemResource($item);
    }
    public function destroy(item $item)
    {
        $item->delete();
        return response()->json([
            "message"=> "the item has been deleted successfully",
        ]);
    }
}
