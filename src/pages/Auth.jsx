import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { Eye, EyeOff } from 'lucide-react';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [mode, setMode] = useState('signup');
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    if (mode === 'signup' && password !== confirmPassword) return alert('❌ Passwords do not match!');
    try {
      if (mode === 'signup') await createUserWithEmailAndPassword(auth, email, password);
      else await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      navigate('/home');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md text-center border border-blue-200">
        <div className="flex justify-center items-center mb-6">
          <img src="/icons8-university-50-2.png" alt="Campus Care Icon" className="h-8 w-8 mr-3" />
          <h1 className="text-3xl font-bold text-blue-800">Campus Care</h1>
        </div>

        <h2 className="text-2xl font-semibold text-purple-700 mb-2">Welcome</h2>
        <p className="text-sm text-gray-500 mb-6">Sign in or create an account</p>

        <div className="flex justify-center mb-6 border border-purple-300 rounded-lg overflow-hidden">
          {['signin', 'signup'].map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setConfirmPassword('');
              }}
              className={`px-4 py-2 w-1/2 text-sm font-medium transition-all ${
                mode === m ? 'bg-purple-200 text-purple-900' : 'bg-white text-gray-600'
              }`}
            >
              {m === 'signin' ? 'Login' : 'Register'}
            </button>
          ))}
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
          <div className="relative mb-4">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              className="w-full p-3 border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-400 pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {mode === 'signup' && (
            <>
              <label className="block text-sm font-medium text-blue-800 mb-1">Confirm Password</label>
              <div className="relative mb-6">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  className="w-full p-3 border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-400 pr-10"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-md"
          >
            {mode === 'signup' ? 'Create Account' : 'Login'}
          </button>
        </form>

        <div className="mt-4">
          <p className="text-gray-500 text-sm mb-2">Or</p>
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center bg-white border border-gray-300 rounded-xl py-3 shadow-md hover:bg-gray-100 transition-all"
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google Logo"
              className="h-5 w-5 mr-3"
            />
            <span className="text-gray-700 font-medium">Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}
