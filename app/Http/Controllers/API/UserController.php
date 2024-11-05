<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\ProfileRequest;
use App\Http\Requests\RegistrationRequest as Reg;
use App\Models\User;
use Auth;
use Illuminate\Http\Request;

class UserController extends Controller
{

   
    public function register(Reg $request){
         $credirential = $request->validated();
          $user = User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>$request->password
          ]);

          return response()->json([
            'user'=> $user,
            'message'=>'Registration Successfull',
            'status'=> true
          ],200);
    }

    public function login(LoginRequest $request){
        $credientail = $request->validated();
        if(Auth::attempt($credientail)){
            return response()->json([
                'token'=> Auth::user()->createToken('main')->plainTextToken,
                'user'=> Auth::user(),
                'token-type'=> 'Bearer',
                 'message'=> "Login SuccessFully"
            ]);
        }else{
            return response()->json([
              'message'=> 'Provide a Email and Password is Invalid',
            ],403);
        }
    }

    public function show(){
        $user = Auth::user();
        return response()->json([
            'user'=>$user
        ],200);
    }

    public function logout(Request $request){
        $user = $request->user();
        $user->tokens()->delete();
        return response('', 204);
    }

    public function profile(ProfileRequest $request){
        $credientail = $request->validated();
        $image = $request->file('image');
        $user = Auth::user();
        if($request->hasFile('image')){
          if(!empty($user->image_path)){
            $delete_image_name = public_path('storage/') . $user->image_path;
            if(file_exists($delete_image_name)){
                unlink($delete_image_name);
            }
          }
          $credientail['image_path'] = $image->store('images','public');
        }else{
            $credientail['image_path'] = $user->image_path;
        }

        $user->update($credientail);

        return response()->json([
            'user'=> $user,
            'message'=> 'Update successfully'
        ]);

    }


}
