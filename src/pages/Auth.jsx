import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import {
    createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mode, setMode] = useState('signup'); // 'signin' or 'signup'
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();

    if (mode === 'signup' && password !== confirmPassword) {
      alert('❌ Passwords do not match!');
      return;
    }

    try {
      if (mode === 'signup') {
        // Sign up user
        await createUserWithEmailAndPassword(auth, email, password);
        alert('✅ Account created successfully!');
      } else {
        // Sign in user
        await signInWithEmailAndPassword(auth, email, password);
        
      }
      navigate('/'); // redirect after success
    } catch (error) {
      console.error(error);
      alert(`❌ ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md text-center border border-blue-200">
        <div className="flex justify-center items-center mb-6">
          <img
            src="/icons8-university-50-2.png"
            alt="Campus Care Icon"
            className="h-8 w-8 mr-3"
          />
          <h1 className="text-3xl font-bold text-blue-800">Campus Care</h1>
        </div>

        <h2 className="text-2xl font-semibold text-purple-700 mb-2">Welcome</h2>
        <p className="text-sm text-gray-500 mb-6">
          Sign in to your account or create a new one to get started
        </p>

        <div className="flex justify-center mb-6 border border-purple-300 rounded-lg overflow-hidden">
          <button
            onClick={() => {
              setMode('signin');
              setConfirmPassword('');
            }}
            className={`px-4 py-2 w-1/2 text-sm font-medium transition-all ${mode === 'signin' ? 'bg-purple-200 text-purple-900' : 'bg-white text-gray-600'}`}
          >
            Login
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`px-4 py-2 w-1/2 text-sm font-medium transition-all ${mode === 'signup' ? 'bg-purple-200 text-purple-900' : 'bg-white text-gray-600'}`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleAuth} className="text-left">
          <label className="block text-sm font-medium text-blue-800 mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 border border-purple-300 rounded-xl mb-4 focus:ring-2 focus:ring-purple-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="block text-sm font-medium text-blue-800 mb-1">Password</label>
          <input
            type="password"
            placeholder="Create a password"
            className="w-full p-3 border border-purple-300 rounded-xl mb-4 focus:ring-2 focus:ring-purple-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {mode === 'signup' && (
            <>
              <label className="block text-sm font-medium text-blue-800 mb-1">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full p-3 border border-purple-300 rounded-xl mb-6 focus:ring-2 focus:ring-purple-400"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-md"
          >
            {mode === 'signup' ? 'Create Account' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
