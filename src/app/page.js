import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import Message from "@/components/Message";
import Music from "@/components/Music";
import Game from "@/components/Game";
import Countdown from "@/components/Countdown";
import Footer from "@/components/Footer";

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Check if user is approved by checking the profiles table
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_approved')
    .eq('id', user.id)
    .single();

  if (!profile?.is_approved) {
    redirect('/pending');
  }

  return (
    <main className="relative min-h-screen">
      <Navbar />
      <Hero name="Mimi" />
      <Gallery />
      <Message />
      <Music />
      <Game />
      <Countdown />
      <Footer />
    </main>
  );
}
