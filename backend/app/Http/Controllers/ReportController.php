<?php

namespace App\Http\Controllers;

use App\Models\invoice_item;
use App\Models\item;
use App\Models\client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\ClientCollection;

class ReportController extends Controller
{
    public function annualData()
    {
        $clients = client::all();
        $lastYear = now()->subYear(); // Get the current date minus one year
        $anual_total_amount = 0;
        $items = item::all();
        foreach ($items as $item) {
            $invoice_items = invoice_item::where('item_id', $item->id)->get();
            $item['total'] = 0;
            foreach ($invoice_items as $invoice_item) {
                $item['total'] += $invoice_item->qtn;
            }
        }

        foreach ($clients as $client) {
            $invoices = $client->invoices()
                ->where('release_date', '>=', $lastYear)
                ->get();
            $client['total_amount'] = 0;
            foreach ($invoices as $invoice) {
                $client['total_amount'] += $invoice['total_amount'];
                $anual_total_amount += $invoice['total_amount'];
            }
        }

        return response()->json([
            "clients" => $clients,
            "anual total amount" => $anual_total_amount,
            "items" => $items
        ]);
    }
    public function monthlyData()
    {
        $clients = Client::all();
        $lastYear = now()->subYear(); // Get the current date minus one year
        $monthlyData = [];
        $monthlyTotals = []; // Variable to store the total amount for each month

        foreach ($clients as $client) {
            $clientData = [
                'client' => $client,
                'monthly_amounts' => []
            ];

            for ($i = 0; $i < 12; $i++) {
                $startDate = $lastYear->copy()->addMonths($i)->startOfMonth();
                $endDate = $lastYear->copy()->addMonths($i)->endOfMonth();

                $invoices = $client->invoices()
                    ->whereBetween('release_date', [$startDate, $endDate])
                    ->get();

                $monthlyAmount = 0;
                foreach ($invoices as $invoice) {
                    $monthlyAmount += $invoice->total_amount;
                }

                $clientData['monthly_amounts'][] = [
                    'month' => $startDate->format('F Y'),
                    'amount' => $monthlyAmount
                ];

                // Add the monthly amount to the total for the corresponding month
                if (!isset($monthlyTotals[$startDate->format('F Y')])) {
                    $monthlyTotals[$startDate->format('F Y')] = 0;
                }
                $monthlyTotals[$startDate->format('F Y')] += $monthlyAmount;
            }

            $monthlyData[] = $clientData;
        }

        // Add the monthly totals to the response
        $monthlyData[] = [
            'monthly_amounts' => $monthlyTotals
        ];

        return response()->json([
            'monthly_data' => $monthlyData
        ]);
    }
}

