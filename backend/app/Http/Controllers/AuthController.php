<?php

namespace App\Http\Controllers;

use Psy\Util\Str;
use App\Models\User;
use Illuminate\Http\Request;
use App\Mail\ResetPasswordMail;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\loginRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
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
        $validated['password']=Hash::make($validated['password']);
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
        if(! Auth::attempt($validated)){
            return response()->json([
                "error"=> "invalid phone number or password"
            ],401);
        }
        $user=User::where("email",$validated['email'])->first();
        return response()->json([
            "data"=>$user,
            "access_token" => $user->createToken("api_token")->plainTextToken,
            "token_type" => "bearer"
        ]);
    }
    public function userData(){
        $user=auth()->user();
        return response()->json([
            "user"=>$user
        ]);
    }
}
