import React, { useState } from 'react';
import SignIn from './SignIn';
const LoginScreen = () => {
  const [signIn, setSignIn] = useState(false)

  return (
    <>

    {signIn?
      (<SignIn/>):(

        <>
        <div
      className="relative w-full h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage: `url('https://assets.nflxext.com/ffe/siteui/vlv3/4cb97b6b-dc69-498c-a632-7392b1acbdf2/6319b4fc-3200-4a17-9a83-d40f4b8e3ed6/PK-en-20230710-popsignuptwoweeks-perspective_alpha_website_large.jpg')`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Header */}
      <div className="absolute top-0 w-full px-8 py-4 flex justify-between items-center z-10">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
          alt="Netflix Logo"
          className="w-28 md:w-32"
        />
        <button
          onClick={() => setSignIn(true)}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-semibold">
          Sign In
        </button>
      </div>

      {/* Centered Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4">
        <h1 className="text-3xl sm:text-5xl font-bold max-w-2xl">
          Unlimited films, TV programmes and more.
        </h1>
        <p className="text-lg sm:text-2xl mt-4">
          Watch anywhere. Cancel at any time.
        </p>
        <p className="text-md sm:text-lg mt-2 max-w-lg">
          Ready to watch? Enter your email to create or restart your membership.
        </p>

        {/* Email Form */}
        <form className="mt-6 w-full max-w-xl flex flex-col sm:flex-row items-center gap-4 sm:gap-0">
          <input
            type="email"
            placeholder="Email address"
            className="w-full sm:flex-1 px-4 py-3 rounded-sm bg-white text-black outline-none"
          />
          <button
            type="submit"
            onClick={() => setSignIn(true)}
            className="w-full sm:w-auto mt-2 sm:mt-0 sm:ml-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-sm"
          >
            GET STARTED
          </button>
        </form>
      </div>
    </div>
        </>
      )
    }

    
  </>
  );
};

export default LoginScreen;
