import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mode, setMode] = useState('signup'); // 'signin' or 'signup'
  const navigate = useNavigate();

  const handleAuth = (e) => {
    e.preventDefault();

    // Validation for signup
    if (mode === 'signup' && password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (email && password) {
      alert(`${mode === 'signin' ? 'Signed in' : 'Signed up'} successfully!`);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">
        <div className="flex justify-center items-center mb-6">
          <img
            src="https://img.icons8.com/ios-filled/50/0000FF/documents.png"
            alt="Campus Care Icon"
            className="h-6 w-6 mr-2"
          />
          <h1 className="text-2xl font-bold text-gray-800">Campus Care</h1>
        </div>

        <h2 className="text-xl font-semibold mb-1">Welcome</h2>
        <p className="text-sm text-gray-500 mb-6">
          Sign in to your account or create a new one to get started
        </p>

        {/* Tabs */}
        <div className="flex justify-center mb-6 border border-gray-300 rounded overflow-hidden">
          <button
            onClick={() => {
              setMode('signin');
              setConfirmPassword('');
            }}
            className={`px-4 py-2 w-1/2 ${mode === 'signin' ? 'bg-gray-200' : 'bg-white'}`}
          >
            Login
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`px-4 py-2 w-1/2 ${mode === 'signup' ? 'bg-gray-200' : 'bg-white'}`}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleAuth} className="text-left">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            placeholder="Create a password"
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {mode === 'signup' && (
            <>
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full p-2 border border-gray-300 rounded-md mb-6"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            {mode === 'signup' ? 'Create Account' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
