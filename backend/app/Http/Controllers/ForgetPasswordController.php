<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Notifications\resetPassword;
use Illuminate\Support\Facades\Password;

class ForgetPasswordController extends Controller
{
    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);
        $user=User::where("email",$request->email)->first();
        $user->notify(new resetPassword);
        return response()->json([
            "message"=>"reset password has been sent"
        ]);
    }
}