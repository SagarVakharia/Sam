"use client";
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function PendingPage() {
    const supabase = createClient();
    const router = useRouter();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 dark:bg-[#111] p-4 text-center transition-colors duration-500">
            <h1 className="text-6xl md:text-8xl font-dancing text-rose-500 mb-6 drop-shadow-md">Hold Tight! ⏳</h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-2xl mb-12 font-playfair">
                Your account has been created successfully, but you must wait for the admin to manually approve your account before you can view the birthday surprise!
            </p>
            <button 
                onClick={async () => {
                    await supabase.auth.signOut();
                    router.push('/login');
                }}
                className="bg-white dark:bg-black/50 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-black transition-all shadow-sm"
            >
                Log Out
            </button>
        </div>
    );
}
