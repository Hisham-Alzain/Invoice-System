<?php

namespace App\Http\Controllers;

use App\Models\client;
use Illuminate\Http\Request;
use App\Http\Resources\ClientResource;
use App\Http\Resources\ClientCollection;
use App\Http\Requests\storeClientRequest;
use App\Http\Requests\updateClientRequest;

class ClientController extends Controller
{
    public function index(){
        return new ClientCollection(client::all());
    }
    public function show(client $client){
        return new ClientResource($client);
    }
    public function store(storeClientRequest $request){
        $validated=$request->validated();
        $client=client::create($validated);
        return response()->json([
            "message"=>"invoice created successfully",
            "data"=>new clientResource($client)
        ],201);
    }
    public function update(updateClientRequest $request,client $client){
        $validated= $request->validated(); 
        $client->update($validated);
        return new clientResource($client);
    }
    public function destroy(client $client)
    {
        $client->delete();
        return response()->json([
            "message"=> "the client has been deleted successfully",
        ]);
    }
}
