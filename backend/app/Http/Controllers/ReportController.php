<?php

namespace App\Http\Controllers;

use App\Models\client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\ClientCollection;

class ReportController extends Controller
{
    public function annualMostPayingClientsData()
    {
        $clients = client::all();
        $lastYear = now()->subYear(); // Get the current date minus one year
    
        foreach ($clients as $client) {
            $invoices = $client->invoices()
                ->where('release_date', '>=', $lastYear)
                ->get();
            
            $client['total_amount'] = 0;
            foreach ($invoices as $invoice) {
                $client['total_amount'] += $invoice['total_amount'];
            }
        }
    
        return response()->json($clients);
    }
    
}

