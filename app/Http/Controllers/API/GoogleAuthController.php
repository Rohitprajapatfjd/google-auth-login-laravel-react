<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Auth;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use Str;

class GoogleAuthController extends Controller
{
   public function redirect(){
    return Socialite::driver('google')->redirect();
   }

   public function callback(Request $request){
    $user = Socialite::driver('google')->user();
   
    $data = User::updateOrCreate(
        ['google_id'=> $user->id],
        [
            'name'=> $user->name,
            'email'=> $user->email,
            'password'=> Str::password(12)
        ]
        );
        Auth::login($data);
        $token = Auth::user()->createToken('main')->plainTextToken;

        return redirect(env('FRONTEND_URL') . '/auth?token='. urlencode($token));

   }
}
