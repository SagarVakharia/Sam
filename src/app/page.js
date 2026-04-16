import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import Message from "@/components/Message";
import Music from "@/components/Music";
import Game from "@/components/Game";
import Countdown from "@/components/Countdown";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative bg-black min-h-screen">
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
