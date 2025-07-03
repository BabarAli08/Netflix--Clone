import React, { useRef } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase';

const SignIn = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

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
      alert(error.message);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      console.log("Signed in:", userCredential.user);
    } catch (error) {
      alert("Sign in error: " + error.message);
    }
  };

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center text-white flex items-center justify-center"
      style={{
        backgroundImage: `url('https://assets.nflxext.com/ffe/siteui/vlv3/4cb97b6b-dc69-498c-a632-7392b1acbdf2/6319b4fc-3200-4a17-9a83-d40f4b8e3ed6/PK-en-20230710-popsignuptwoweeks-perspective_alpha_website_large.jpg')`,
      }}
    >
      <div className="absolute inset-0 bg-black/70 z-0" />

      <div className="relative z-10 bg-black bg-opacity-80 p-8 w-[90%] sm:w-[400px] max-w-[420px] rounded shadow-lg">
        <h2 className="text-3xl font-bold mb-6">Sign In</h2>

        <input
          type="email"
          ref={emailRef}
          placeholder="Email or mobile number"
          className="w-full p-3 mb-4 rounded bg-[#333] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
        />
        <input
          type="password"
          ref={passwordRef}
          placeholder="Password"
          className="w-full p-3 mb-6 rounded bg-[#333] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
        />

        {/* Sign In Button */}
        <button
          onClick={handleSignIn}
          className="w-full bg-red-600 hover:bg-red-700 transition font-semibold py-3 rounded mb-4"
        >
          Sign In
        </button>

        {/* Sign Up Button (Prominent) */}
        <button
          onClick={register}
          className="w-full border border-red-500 hover:bg-red-600 hover:text-white text-red-500 transition font-semibold py-3 rounded"
        >
          Sign Up
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

        {/* reCAPTCHA Info */}
        <p className="text-xs text-gray-500 mt-6">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.{' '}
          <a href="#" className="text-blue-500 hover:underline">Learn more.</a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
