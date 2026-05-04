"use client";
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const router = useRouter();
    const supabase = createClient();

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        if (isSignUp) {
            const { error } = await supabase.auth.signUp({
                email,
                password,
            });
            if (error) {
                setMessage(error.message);
            } else {
                setMessage('Registration successful! Please wait for admin approval.');
            }
        } else {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) {
                setMessage(error.message);
            } else {
                router.push('/');
                router.refresh();
            }
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-pink-50 dark:bg-[#111] p-4 transition-colors duration-500">
            <div className="bg-white dark:bg-black/80 p-8 rounded-3xl shadow-2xl max-w-md w-full border border-rose-200 dark:border-rose-900/50">
                <h1 className="text-4xl font-dancing text-rose-500 text-center mb-8 drop-shadow-sm">
                    {isSignUp ? 'Create Account' : 'Welcome Back'}
                </h1>
                
                <form onSubmit={handleAuth} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2 font-sans font-medium">Email</label>
                        <input 
                            type="email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#222] border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-400 text-black dark:text-white transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2 font-sans font-medium">Password</label>
                        <input 
                            type="password" 
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#222] border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-400 text-black dark:text-white transition-all"
                        />
                    </div>
                    
                    {message && (
                        <p className={`text-sm mt-1 px-1 ${message.includes('successful') ? 'text-green-500' : 'text-rose-500'}`}>
                            {message}
                        </p>
                    )}

                    <button 
                        disabled={loading}
                        type="submit" 
                        className="w-full mt-4 bg-gradient-to-r from-rose-400 to-purple-500 text-white font-bold py-3 rounded-xl shadow-[0_4px_14px_0_rgba(244,63,94,0.39)] hover:shadow-[0_6px_20px_rgba(244,63,94,0.23)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0"
                    >
                        {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Unlock Birthday Surprise 🔓'}
                    </button>
                </form>

                <p className="text-center mt-6 text-gray-500 dark:text-gray-400">
                    {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                    <button 
                        onClick={() => {setIsSignUp(!isSignUp); setMessage('');}}
                        className="text-rose-500 font-bold hover:text-rose-600 transition-colors"
                    >
                        {isSignUp ? 'Log In' : 'Sign Up'}
                    </button>
                </p>
            </div>
        </div>
    );
}
