<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\item;
use App\Models\client;
use App\Models\invoice_item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\annualRequest;
use App\Http\Resources\ClientCollection;

class ReportController extends Controller
{
    public function annualData(annualRequest $request)
    {
        $validated = $request->validated();
        $clients = client::all();
        $selectedYear = $validated['year'];
        $lastYear = Carbon::parse($selectedYear . '-01-01')->subYear();
        $annual_total_amount = 0;
        $items = item::all();
        $items = $items->filter(function ($item) use ($lastYear, $selectedYear) {
            $invoice_items = invoice_item::where('item_id', $item->id)->get();
            $item['total'] = 0;
            foreach ($invoice_items as $invoice_item) {
                $invoice = $invoice_item->invoice;
                if ($invoice && $invoice->release_date && Carbon::parse($invoice->release_date)->year == $selectedYear) {
                    $item['total'] += $invoice_item->qtn;
                }
            }
            return $item['total'] > 0; // Only include items with non-zero total
        });
    
        foreach ($clients as $client) {
            $invoices = $client->invoices()
                ->where('release_date', '>=', $lastYear)
                ->whereYear('release_date', $selectedYear)
                ->get();
            $client['total_amount'] = 0;
            foreach ($invoices as $invoice) {
                $client['total_amount'] += $invoice['total_amount'];
                $annual_total_amount += $invoice['total_amount'];
            }
        }
    
        return response()->json([
            "clients" => $clients,
            "annual_total_amount" => $annual_total_amount,
            "items" => $items
        ]);
    }
    public function monthlyData()
    {
        $clients = Client::all();
        $lastYear = now()->subYear(); // Get the current date minus one year
        $monthlyData = [];
        $monthlyTotals = []; // Variable to store the total amount for each month
        $items = item::all();
        $items = $items->filter(function ($item) use ($lastYear) {
            $invoice_items = invoice_item::where('item_id', $item->id)->get();
            $item['total'] = 0;
            foreach ($invoice_items as $invoice_item) {
                $invoice = $invoice_item->invoice;
                if ($invoice && $invoice->release_date >= $lastYear) {
                    $item['total'] += $invoice_item->qtn;
                }
            }
            return $item['total'] > 0; // Only include items with non-zero total
        });
        foreach ($clients as $client) {
            $clientData = [
                'id' => $client->id,
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

                $clientData['monthly_amounts'][$startDate->format('F Y')] = [
                    'month' => $startDate->format('F Y'),
                    'amount' => $monthlyAmount
                ];

                // Add the monthly amount to the total for the corresponding month
                $found = false;
                foreach ($monthlyTotals as &$total) {
                    if ($total['month'] === $startDate->format('F Y')) {
                        $total['amount'] += $monthlyAmount;
                        $found = true;
                        break;
                    }
                }

                if (!$found) {
                    $monthlyTotals[] = [
                        'month' => $startDate->format('F Y'),
                        'amount' => $monthlyAmount
                    ];
                }
            }

            $monthlyData[] = $clientData;
        }

        return response()->json([
            'monthly_data' => $monthlyData,
            'monthly_totals' => $monthlyTotals,
            "items" => $items
        ]);
    }
}

