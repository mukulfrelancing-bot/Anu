
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Heart, Stars, Send, Sparkles, MessageCircle, Music, 
  MapPin, Calendar, Camera, Quote, Volume2, Pause, 
  Play, Book, CalendarDays, Cat, PenTool, Image as ImageIcon,
  ArrowRight, ArrowLeft, X, Clock, VolumeX, ShieldAlert,
  Loader2, Gift, MousePointer2, Fingerprint, Share2, Crown, Lock,
  Brain, Zap, HeartHandshake, Sparkle
} from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";

// --- Constants & Data ---

const KITTENS = [
  { 
    url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=400&auto=format&fit=crop", 
    name: "Snowball", 
    message: "Meow! Anu is the smartest!",
    clickMsg: "I caught this heart for you, Anu!",
    action: "bat"
  },
  { 
    url: "https://images.unsplash.com/photo-1573865662567-57ef5b67bd00?q=80&w=400&auto=format&fit=crop", 
    name: "Cotton", 
    message: "Anu = Happiness!",
    clickMsg: "Anu is the Queen of our hearts!",
    action: "crown"
  },
  { 
    url: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?q=80&w=400&auto=format&fit=crop", 
    name: "Marshmallow", 
    message: "Thinking of you...",
    clickMsg: "Dreaming of your gentle touch...",
    action: "sleep"
  }
];

const VALENTINE_WEEK = [
  { day: "Feb 7", name: "Rose Day", color: "bg-rose-500", mood: "rose", shayari: "Anu, aap hamari zindagi ka sabse khoobsurat gulab ho.", song: "Gulabi Aankhen" },
  { day: "Feb 8", name: "Propose Day", color: "bg-pink-500", mood: "passion", shayari: "Will you be my Valentine forever, Anu?", song: "Raabta" },
  { day: "Feb 9", name: "Chocolate Day", color: "bg-orange-900", mood: "sweet", shayari: "Mithaas dosti ki chocolate se zyada hoti hai.", song: "Tum Hi Ho" },
  { day: "Feb 10", name: "Teddy Day", color: "bg-amber-700", mood: "cozy", shayari: "Teddy bear ki tarah pyari ho tum.", song: "Iktara" },
  { day: "Feb 11", name: "Promise Day", color: "bg-indigo-500", mood: "loyal", shayari: "Vaada raha ki hamesha saath nibhayenge.", song: "Jeene Laga Hoon" },
  { day: "Feb 12", name: "Hug Day", color: "bg-sky-500", mood: "serene", shayari: "Ek bar to mujhe seene se laga lo.", song: "Humsafar" },
  { day: "Feb 13", name: "Kiss Day", color: "bg-red-500", mood: "romantic", shayari: "Labon pe sirf tumhara hi naam ho.", song: "Pee Loon" },
  { day: "Feb 14", name: "Valentine's Day", color: "bg-rose-600", mood: "eternal", shayari: "Anu, meri har khushi ki wajah ho tum.", song: "Kesariya" }
];

const WHISPERS = {
  welcome: ["I've been waiting for you, Anu.", "Welcome home, my Queen.", "The world is brighter now you're here."],
  general: ["Your smile is my favorite logic.", "Anu, you're my favorite thought.", "I can feel your heartbeat through the screen."],
  kitten: ["You're cuter than any kitten!", "My Persian kitten is the best.", "Purrr... I love you!"],
  psych: ["Psychologically speaking, you are perfect.", "Your mind is a masterpiece.", "Analyzing... Conclusion: I love you."],
  poetry: ["Written with only you in mind.", "You're the poem I never finish."],
  ritual: ["Traditions are better with you.", "My forever promise starts here."]
};

const MEMORIES = [
  "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516589174184-c68d8e5fccf4?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522673607200-1648832cee98?q=80&w=800&auto=format&fit=crop"
];

// --- Utilities ---

const Typewriter = ({ text, delay = 30 }: { text: string, delay?: number }) => {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(timer);
    }, delay);
    return () => clearInterval(timer);
  }, [text, delay]);
  return <span style={{ whiteSpace: 'pre-line' }}>{displayedText}</span>;
};

// --- Components ---

const FloatingHearts = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
    {[...Array(15)].map((_, i) => (
      <div key={i} className="absolute animate-float" style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${10 + Math.random() * 10}s`
      }}>
        <Heart size={15 + Math.random() * 20} className="text-rose-300/30 fill-current" />
      </div>
    ))}
  </div>
);

const BiometricEntry = ({ onUnlock }: { onUnlock: () => void }) => {
  const [scanning, setScanning] = useState(false);
  const [complete, setComplete] = useState(false);

  const startScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setComplete(true);
      setTimeout(onUnlock, 1000);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[600] bg-[#0a0a0a] flex flex-col items-center justify-center p-6 transition-all duration-1000">
      <div className="relative group cursor-pointer" onClick={!scanning && !complete ? startScan : undefined}>
        <div className={`absolute inset-0 bg-rose-500/20 rounded-full blur-3xl transition-opacity duration-1000 ${scanning ? 'opacity-100 scale-150' : 'opacity-0'}`} />
        <div className={`relative w-32 h-32 rounded-full border-2 flex items-center justify-center transition-all duration-700 ${scanning ? 'border-rose-500 shadow-[0_0_50px_rgba(244,63,94,0.4)]' : 'border-white/10'}`}>
          <Fingerprint size={64} className={`transition-all duration-700 ${scanning ? 'text-rose-500 scale-110' : 'text-white/20'}`} />
          {scanning && <div className="absolute inset-0 bg-rose-500/30 animate-scan-line rounded-full" />}
        </div>
      </div>
      <h2 className="mt-12 font-serif text-2xl text-white/50 tracking-[0.2em] uppercase">
        {scanning ? 'Analyzing Signature...' : complete ? 'Identity Confirmed' : 'Anu\'s Identity Required'}
      </h2>
      <p className="mt-4 text-white/20 font-light italic">Place thumb to enter the sanctuary</p>
    </div>
  );
};

const PsychologicalAffirmation = () => {
  const [loading, setLoading] = useState(false);
  const [insight, setInsight] = useState<string | null>(null);

  const getInsight = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Analyze the personality of 'Anu' (a brilliant psychology expert) from the perspective of her devoted 'Buddhu'. Explain why her emotional intelligence makes her the most special person in the world. Keep it deeply poetic, brief (70 words), and soulful in Hinglish.",
      });
      setInsight(response.text || "Anu, your mind is the most beautiful landscape I've ever seen.");
    } catch (e) {
      setInsight("Anu, psychological patterns fail to explain why my heart skips a beat for you. You are the exception to every rule.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass p-10 rounded-[50px] border border-white/20 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent opacity-50" />
      <div className="flex items-center gap-6 mb-8">
        <div className="w-16 h-16 rounded-3xl bg-rose-500/10 flex items-center justify-center text-rose-500">
          <Brain size={32} />
        </div>
        <div>
          <h3 className="font-serif text-2xl text-gray-800">The Psychology Corner</h3>
          <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">Scientific Proof of My Love</p>
        </div>
      </div>
      
      {insight ? (
        <div className="animate-unfurl">
          <Quote className="text-rose-100 mb-4" size={40} />
          <p className="font-serif text-xl italic text-gray-700 leading-relaxed">
            <Typewriter text={insight} />
          </p>
          <button onClick={() => setInsight(null)} className="mt-8 text-xs font-bold text-rose-500 uppercase tracking-widest hover:underline">Clear Records</button>
        </div>
      ) : (
        <div className="text-center py-10">
          <button 
            onClick={getInsight}
            disabled={loading}
            className="px-10 py-4 rounded-full bg-gray-900 text-white font-bold hover:bg-rose-600 transition-all flex items-center gap-3 mx-auto shadow-xl group"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Zap size={20} className="group-hover:animate-pulse" />}
            Generate Soul Analysis
          </button>
        </div>
      )}
    </div>
  );
};

const LoveManifesto = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const visualizeLove = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: [{ text: "A dreamy, ethereal, cinematic 3D digital art of two glowing souls dancing in a galaxy of rose petals and psychology symbols, soft pastel lighting, high quality." }],
      });
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          setImage(`data:image/png;base64,${part.inlineData.data}`);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-12">
      <div className="relative w-full max-w-lg aspect-square glass rounded-[60px] border-4 border-white shadow-2xl flex flex-col items-center justify-center overflow-hidden p-8 group">
        {image ? (
          <img src={image} className="absolute inset-0 w-full h-full object-cover animate-fade-in" alt="AI Love Visualization" />
        ) : (
          <>
            <ImageIcon size={64} className="text-gray-200 mb-6 group-hover:scale-110 transition-transform" />
            <p className="text-gray-400 font-serif text-lg text-center">Visualize the frequency of our bond</p>
            <button 
              onClick={visualizeLove}
              disabled={loading}
              className="mt-8 px-8 py-3 rounded-full border border-rose-200 text-rose-500 hover:bg-rose-500 hover:text-white transition-all font-bold uppercase tracking-widest text-xs"
            >
              {loading ? 'Consulting the Cosmos...' : 'Generate Vision'}
            </button>
          </>
        )}
      </div>
      <div className="max-w-xl text-center">
         <h3 className="font-elegant text-6xl text-gray-800 mb-4">Our Logical Heart</h3>
         <p className="text-gray-500 font-light leading-relaxed">
           In a world of billions of neurons and complex behaviors, you are the only stimulus that matters. 
           Buddhu's heart operates on a simple algorithm: <span className="text-rose-500 font-bold">If Anu exists, then Happiness = Infinite.</span>
         </p>
      </div>
    </div>
  );
};

const DayRitual = ({ dayData, onClose }: { dayData: typeof VALENTINE_WEEK[0], onClose: () => void }) => {
  const [step, setStep] = useState<'intro' | 'active'>('intro');
  return (
    <div className="fixed inset-0 z-[550] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-fade-in">
      <button onClick={onClose} className="absolute top-8 right-8 text-white/50 hover:text-white"><X size={32} /></button>
      <div className="max-w-4xl w-full text-center space-y-12">
        {step === 'intro' ? (
          <div className="animate-unfurl space-y-8">
            <h1 className="font-elegant text-9xl text-white">{dayData.name}</h1>
            <p className="text-white/40 uppercase tracking-[0.5em] text-sm">For the eyes of Anu only</p>
            <button onClick={() => setStep('active')} className="w-24 h-24 bg-rose-500 rounded-full flex items-center justify-center text-white mx-auto hover:scale-110 transition-all">
              <Play size={40} fill="white" />
            </button>
          </div>
        ) : (
          <div className="glass p-12 rounded-[50px] border border-white/10 animate-scale-up space-y-8 max-w-2xl mx-auto">
            <div className={`w-20 h-20 ${dayData.color} rounded-3xl mx-auto flex items-center justify-center text-white animate-bounce`}>
              <HeartHandshake size={40} />
            </div>
            <h2 className="font-serif text-4xl text-white italic">{dayData.name} Ritual</h2>
            <p className="font-serif text-2xl text-white/80 leading-relaxed whitespace-pre-line italic">
              <Typewriter text={dayData.shayari} delay={50} />
            </p>
            <div className="pt-8 border-t border-white/10">
              <p className="text-rose-400 font-bold uppercase tracking-widest text-xs mb-4">Listening to</p>
              <div className="bg-white/5 px-6 py-3 rounded-full inline-flex items-center gap-3">
                <Music size={16} className="text-white animate-spin-slow" />
                <span className="text-white/60 font-medium">{dayData.song}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main App ---

const App = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activeRitual, setActiveRitual] = useState<typeof VALENTINE_WEEK[0] | null>(null);
  const [whisper, setWhisper] = useState<string | null>(null);

  const triggerWhisper = (cat: keyof typeof WHISPERS) => {
    const msgs = WHISPERS[cat];
    setWhisper(msgs[Math.floor(Math.random() * msgs.length)]);
    setTimeout(() => setWhisper(null), 3500);
  };

  if (!isUnlocked) return <BiometricEntry onUnlock={() => setIsUnlocked(true)} />;

  return (
    <div className="relative min-h-screen bg-[#fffafa] selection:bg-rose-200 selection:text-rose-900 overflow-x-hidden">
      <FloatingHearts />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 p-8 flex justify-between items-center backdrop-blur-md border-b border-rose-100/50">
        <div className="font-cursive text-3xl text-rose-500 font-bold flex items-center gap-3 cursor-pointer group" onClick={() => triggerWhisper('welcome')}>
          <Cat className="group-hover:rotate-12 transition-transform" /> Anu & Buddhu
        </div>
        <div className="flex gap-8 items-center">
           <a href="#rituals" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-rose-500 transition-colors">Rituals</a>
           <a href="#lab" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-rose-500 transition-colors">Psychology</a>
           <button onClick={() => triggerWhisper('general')} className="w-10 h-10 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 hover:scale-110 transition-all"><MessageCircle size={20} /></button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-48 pb-32 px-6 flex flex-col items-center text-center relative">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-rose-100/30 rounded-full blur-[120px] -z-10" />
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-rose-500/20 rounded-full blur-2xl animate-pulse" />
          <Heart size={140} className="text-rose-500 fill-rose-500 relative animate-heartbeat cursor-pointer" onClick={() => triggerWhisper('general')} />
        </div>
        <h1 className="font-serif text-8xl md:text-9xl text-gray-900 mb-8 tracking-tighter">
          The <span className="text-rose-500 font-elegant italic normal-case">Anu</span> Effect
        </h1>
        <p className="max-w-2xl text-xl text-gray-500 font-light leading-relaxed italic">
          "Where psychology meets deep emotion. This isn't just a website; it's a digital neural pathway dedicated solely to you."
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 space-y-40 pb-40">
        
        {/* Psychological Lab */}
        <section id="lab" className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <PsychologicalAffirmation />
          <LoveManifesto />
        </section>

        {/* Gallery */}
        <section className="space-y-12">
          <div className="flex flex-col items-center text-center">
            <h2 className="font-serif text-5xl text-gray-900 mb-4">Neural Snapshots</h2>
            <div className="h-1 w-24 bg-rose-500/20" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MEMORIES.map((m, i) => (
              <div key={i} className="group relative h-[500px] rounded-[50px] overflow-hidden shadow-2xl transition-all duration-700 hover:-translate-y-4">
                <img src={m} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                   <p className="text-white font-cursive text-3xl">Memory 0{i+1}</p>
                   <p className="text-white/60 text-sm mt-2">Locked in my heart forever.</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Valentine Rituals */}
        <section id="rituals" className="space-y-16">
          <div className="text-center">
             <span className="px-6 py-2 bg-rose-50 rounded-full text-rose-500 font-bold text-xs uppercase tracking-widest">The 8th Wonder</span>
             <h2 className="font-serif text-5xl mt-6">8 Days of Synthesis</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALENTINE_WEEK.map((day, i) => (
              <div 
                key={i} 
                onClick={() => { setActiveRitual(day); triggerWhisper('ritual'); }}
                className="glass p-8 rounded-[40px] group hover:shadow-[0_40px_80px_rgba(244,63,94,0.15)] transition-all cursor-pointer border-b-4 border-transparent hover:border-rose-500 relative overflow-hidden"
              >
                <div className={`w-12 h-12 ${day.color} text-white rounded-2xl flex items-center justify-center mb-6 font-bold text-xs transform group-hover:rotate-12 transition-transform shadow-lg`}>{day.day}</div>
                <h3 className="font-serif text-2xl text-gray-800 mb-2">{day.name}</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Unlock Data</p>
              </div>
            ))}
          </div>
        </section>

        {/* Kitten Corner */}
        <section className="bg-[#121212] rounded-[80px] p-20 text-center space-y-16 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-20 opacity-10">
            <Cat size={300} className="text-white" />
          </div>
          <div className="relative z-10">
            <h2 className="font-serif text-5xl text-white mb-4">Anu's Feline Friends</h2>
            <p className="text-white/30 italic">High-frequency purring enabled</p>
          </div>
          <div className="flex flex-wrap justify-center gap-12 relative z-10">
             {KITTENS.map((k, i) => (
               <div key={i} className="group cursor-pointer" onClick={() => triggerWhisper('kitten')}>
                 <div className="w-56 h-56 rounded-[40px] overflow-hidden shadow-2xl border-4 border-white/5 group-hover:border-rose-500 transition-all duration-500 group-hover:-translate-y-4">
                   <img src={k.url} className="w-full h-full object-cover" />
                 </div>
                 <h4 className="mt-6 font-serif text-xl text-white group-hover:text-rose-500 transition-colors">{k.name}</h4>
               </div>
             ))}
          </div>
        </section>

      </main>

      {/* Overlay Components */}
      {activeRitual && <DayRitual dayData={activeRitual} onClose={() => setActiveRitual(null)} />}
      
      {whisper && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[500] animate-whisper-float">
          <div className="glass px-10 py-4 rounded-full border border-rose-200 shadow-[0_20px_60px_rgba(244,63,94,0.2)] flex items-center gap-4">
            <Sparkle size={20} className="text-rose-500 animate-spin-slow" />
            <span className="font-serif italic text-2xl text-gray-800">{whisper}</span>
          </div>
        </div>
      )}

      {/* Footer Player */}
      <footer className="fixed bottom-8 w-full px-6 z-50 pointer-events-none">
        <div className="max-w-xl mx-auto glass rounded-full p-2 border border-white/40 shadow-2xl flex items-center justify-between px-8 h-20 pointer-events-auto">
          <button className="text-gray-400 hover:text-rose-500 transition-colors"><ImageIcon size={24} /></button>
          <button className="text-gray-400 hover:text-rose-500 transition-colors"><Book size={24} /></button>
          <div className="relative -mt-16 bg-rose-500 p-5 rounded-full border-8 border-white shadow-2xl hover:scale-110 transition-all cursor-pointer group" onClick={() => triggerWhisper('general')}>
             <Heart className="text-white fill-white group-hover:animate-ping" size={32} />
          </div>
          <button className="text-gray-400 hover:text-rose-500 transition-colors"><Calendar size={24} /></button>
          <button className="text-gray-400 hover:text-rose-500 transition-colors"><Cat size={24} /></button>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          20% { opacity: 0.5; }
          80% { opacity: 0.5; }
          100% { transform: translateY(-20vh) rotate(360deg); opacity: 0; }
        }
        .animate-float { animation-name: float; animation-timing-function: linear; animation-iteration-count: infinite; }
        @keyframes scan-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scan-line { animation: scan-line 2s linear infinite; }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
        .animate-heartbeat { animation: heartbeat 1.5s ease-in-out infinite; }
        @keyframes whisper-float {
          0% { transform: translate(-50%, 20px); opacity: 0; }
          10% { transform: translate(-50%, 0); opacity: 1; }
          90% { transform: translate(-50%, 0); opacity: 1; }
          100% { transform: translate(-50%, -20px); opacity: 0; }
        }
        .animate-whisper-float { animation: whisper-float 3.5s forwards; }
        .glass { background: rgba(255, 255, 255, 0.6); backdrop-filter: blur(20px); }
        .font-elegant { font-family: 'Great Vibes', cursive; }
        .font-cursive { font-family: 'Dancing Script', cursive; }
        @keyframes scale-up { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-scale-up { animation: scale-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
      `}</style>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
