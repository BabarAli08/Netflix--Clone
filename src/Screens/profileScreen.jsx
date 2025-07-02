import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logIn, logOut, selectUser } from '../app/features/counter/UserSlice';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase';
export default function NetflixProfilePage() {
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const [email, setEmail] = useState(user.email);
  const dispatch = useDispatch()


  const handleUpdate=async(e)=>{
      e.preventDefault();
  try {
    const user = auth.currentUser;

    // Ask for the old password again (for reauthentication)
    const password = prompt("Please confirm your password to update email");

    const credential = window.firebase.auth.EmailAuthProvider.credential(
      user.email,
      password
    );

    // Reauthenticate the user
    await user.reauthenticateWithCredential(credential);

    // Now update the email
    await user.updateEmail(email);

    alert("Email updated successfully!");

    // Optional: update redux state
    dispatch(logIn({
      uid: user.uid,
      email: user.email
    }));
  } catch (error) {
    alert("Failed to update email: " + error.message);
  }
  }
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <img
          onClick={() => navigate('/')}
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          className="h-6"
          alt="Netflix Logo"
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          className="w-8 h-8 rounded cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          alt="Profile"
        />
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-light mb-12 text-center">Edit Profile</h1>

        <div className="flex items-start gap-6 mb-8">
          {/* Profile Avatar */}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            className="w-8 h-8 rounded cursor-pointer"

            alt="Profile"
          />

          {/* Profile Details */}
          <div className="flex-1">
            {/* Email Input */}
            <div className="mb-6">
              <div className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-gray-700 text-white px-4 py-3 rounded border-none outline-none focus:bg-gray-600"
                />
                
               
              </div>
            </div>

            {/* Plans Section */}
            <div className="mb-6">
              <div className="text-sm text-gray-400 mb-1">Plans (Current Plan: premium)</div>
              <div className="text-xs text-gray-500 mb-4">Renewal date: 04/03/2021</div>

              {/* Plan Options */}
              <div className="space-y-3">
                {/* Netflix Standard */}
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium">Netflix Standard</div>
                    <div className="text-xs text-gray-400">1080p</div>
                  </div>
                  <button className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded text-sm font-medium transition-colors">
                    Subscribe
                  </button>
                </div>

                {/* Netflix Basic */}
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium">Netflix Basic</div>
                    <div className="text-xs text-gray-400">480p</div>
                  </div>
                  <button className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded text-sm font-medium transition-colors">
                    Subscribe
                  </button>
                </div>

                {/* Netflix Premium */}
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium">Netflix Premium</div>
                    <div className="text-xs text-gray-400">4K+HDR</div>
                  </div>
                  <button className="bg-gray-600 px-6 py-2 rounded text-sm font-medium cursor-not-allowed">
                    Current Package
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sign Out Button */}
        <div className="mt-12">
          <button
           onClick={() => {
                             auth.signOut()
                               .then(() => {
                                 dispatch(logOut());
                                 navigate("/"); // Optional: redirect to home or login page
                               });
                           }}
            className="w-full bg-red-600 hover:bg-red-700 py-3 rounded text-center font-medium transition-colors"
          >
            Sign out
          </button>

        </div>
      </div>
    </div>
  );
}