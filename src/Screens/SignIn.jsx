import React, { useRef, useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase'
const SignIn = () => {
    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const register = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                emailRef.current.value,
                passwordRef.current.value
            );
            console.log("User registered:", userCredential.user);
        } catch (error) {
            alert( error.message);
        }
    };

    const HandleSignIn = async (e) => {
        e.preventDefault();
        try {
            const userCredentail = await signInWithEmailAndPassword(
                auth,
                emailRef.current.value,
                passwordRef.current.value
            ).then((userDetails)=>{
                console.log(userDetails)
            })
        }
         catch (error) {
            alert("Registration error:", error.message);
        }


    }
    return (
        <div
            className="relative w-full h-screen bg-cover bg-center text-white flex items-center justify-center"
            style={{
                backgroundImage: `url('https://assets.nflxext.com/ffe/siteui/vlv3/4cb97b6b-dc69-498c-a632-7392b1acbdf2/6319b4fc-3200-4a17-9a83-d40f4b8e3ed6/PK-en-20230710-popsignuptwoweeks-perspective_alpha_website_large.jpg')`,
            }}
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/70 z-0" />

            {/* Sign In Form */}
            <div className="relative z-10 bg-black bg-opacity-80 p-8 w-[90%] sm:w-[400px] max-w-[420px] rounded shadow-lg">
                <h2 className="text-3xl font-bold mb-6">Sign In</h2>

                {/* Email Input */}
                <input
                    type="email"
                    ref={emailRef}
                    placeholder="Email or mobile number"
                    className="w-full p-3 mb-4 rounded bg-[#333] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
                />

                {/* Password Input */}
                <input
                    type="password"
                    ref={passwordRef}
                    placeholder="Password"
                    className="w-full p-3 mb-6 rounded bg-[#333] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
                />

                {/* Sign In Button */}
                <button
                    onClick={HandleSignIn}
                    className="w-full bg-red-600 hover:bg-red-700 transition font-semibold py-3 rounded">
                    Sign In
                </button>

                {/* Help Options */}
                <div className="flex justify-between items-center text-sm text-gray-400 mt-4">
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" className="accent-red-600" />
                        <span>Remember me</span>
                    </label>
                    <a href="#" className="hover:underline">
                        Need help?
                    </a>
                </div>

                {/* New User Prompt */}
                <div className="mt-6 text-sm text-gray-400">
                    New to Netflix?{' '}
                    <a href="#"
                        onClick={register}
                        className="text-white hover:underline">
                        SignUp
                    </a>
                </div>

                {/* reCAPTCHA Info */}
                <p className="text-xs text-gray-500 mt-4">
                    This page is protected by Google reCAPTCHA to ensure you're not a bot.{' '}
                    <a href="#" className="text-blue-500 hover:underline">Learn more.</a>
                </p>
            </div>
        </div>
    )
}

export default SignIn