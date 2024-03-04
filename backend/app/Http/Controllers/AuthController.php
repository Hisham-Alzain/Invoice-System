<?php

namespace App\Http\Controllers;

use Psy\Util\Str;
use App\Models\User;
use Illuminate\Http\Request;
use App\Mail\ResetPasswordMail;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\loginRequest;
use Illuminate\Support\Facades\Mail;
use App\Http\Requests\registerRequest;
use App\Http\Requests\forgetPasswordRequest;

class AuthController extends Controller
{
    public function register(registerRequest $request){
        if($request->confirm_password!=$request->password){
            return response()->json([
                "message"=>"password does not match"
            ],401);            
        }
        $validated = $request->validated();
        if ($validated) {
            $user = User::create($validated);
        }
        return response()->json([
            "data" => $user,
            "access_token" => $user->createToken("api_token")->plainTextToken,
            "token_type" => "bearer"
        ]);
    }
    public function login(loginRequest $request){
        $validated = $request->validated();
        if($validated){
            $user = User::where('email', $validated->email)->first();
            if($user->password==$validated->password){
                return response()->json([
                    "data"=>$user,
                    "access_token" => $user->createToken("api_token")->plainTextToken,
                    "token_type" => "bearer"
                ]);
            }
        }
        return response()->json([
            "message"=>"invalid email or password"
        ]);

    }
    public function forget_password(forgetPasswordRequest $request)
{
    $validated = $request->validated();

    if ($validated) {
        $user = User::where('email', $validated['email'])->first();

        if ($user) {
            // Generate a password reset token
            $token = $user->createToken("api_token")->plainTextToken;

            // Store the token in the password_resets table
            DB::table('password_resets')->insert([
                'email' => $user->email,
                'token' => $token,
                'created_at' => now()
            ]);

            // Send a password reset email to the user
            // Implement your email sending logic here, for example:
            Mail::to($user->email)->send(new ResetPasswordMail($user, $token));

            return response()->json([
                "message" => "Password reset email sent"
            ]);
        }
    }

    return response()->json([
        "message" => "Invalid email"
    ]);
}
}
