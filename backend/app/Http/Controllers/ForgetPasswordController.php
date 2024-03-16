<?php

namespace App\Http\Controllers;

use App\Http\Requests\forgetPasswordRequest;
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
        $user->notify(new resetPassword($user->createToken("api_token")->plainTextToken));
        return response()->json([
            "message"=>"reset password has been sent"
        ]);
    }
    public function reset(forgetPasswordRequest $request){
        $validated=$request->validated();
        $user=User::where("email",$validated['email'])->first();
        $user->update($validated);
        return response()->json([
            "data" => $user,
            "access_token" => $user->createToken("api_token")->plainTextToken,
            "token_type" => "bearer"
        ]);
    }
}