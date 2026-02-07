[file name]: index.tsx
[file content begin]
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Heart, Stars, Send, Sparkles, MessageCircle, Music, 
  MapPin, Calendar, Camera, Quote, Volume2, Pause, 
  Play, Book, CalendarDays, Cat, PenTool, Image as ImageIcon,
  ArrowRight, ArrowLeft, X, Clock, VolumeX, ShieldAlert,
  Loader2, Gift, MousePointer2, Fingerprint, Share2, Crown, Lock,
  Brain, Zap, HeartHandshake, Sparkle
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// API Key from environment
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyCAqkxJDbT-r4G7PVgjjH-xCl-S5VGPV1M";

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

// --- Components ---
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

const FloatingHearts = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
    {[...Array(12)].map((_, i) => (
      <div key={i} className="absolute animate-float" style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${15 + Math.random() * 15}s`
      }}>
        <Heart size={10 + Math.random() * 25} className="text-rose-300/30 fill-current" />
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
      const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: "Analyze the personality of 'Anu' (a brilliant psychology expert) from the perspective of her devoted 'Buddhu'. Explain why her emotional intelligence makes her the most special person in the world. Keep it deeply poetic, brief (70 words), and soulful in Hinglish.",
      });
      setInsight(response.text || "Anu, your mind is the most beautiful landscape I've ever seen.");
    } catch (e) {
      console.log("Using fallback insight");
      const fallbackInsights = [
        "Anu, your psychology expertise makes you see patterns others miss, but the pattern my heart follows is simple: it always beats for you. Your emotional intelligence isn't just knowledge—it's your soul's language.",
        "When you analyze human behavior, you uncover truths. But the truth I've uncovered is this: your mind is where logic dances with empathy, creating the most beautiful symphony of understanding.",
        "Psychologically speaking, you're the perfect stimulus-response loop for my heart. Every thought of you triggers joy, every memory releases serotonin. You're my brain's favorite chemical reaction."
      ];
      setInsight(fallbackInsights[Math.floor(Math.random() * fallbackInsights.length)]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass p-8 md:p-10 rounded-[40px] md:rounded-[50px] border border-white/20 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent opacity-50" />
      <div className="flex items-center gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-3xl bg-rose-500/10 flex items-center justify-center text-rose-500">
          <Brain size={24} className="md:w-8 md:h-8" />
        </div>
        <div>
          <h3 className="font-serif text-xl md:text-2xl text-gray-800">The Psychology Corner</h3>
          <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">Scientific Proof of My Love</p>
        </div>
      </div>
      
      {insight ? (
        <div className="animate-unfurl">
          <Quote className="text-rose-100 mb-4 hidden md:block" size={40} />
          <Quote className="text-rose-100 mb-3 md:hidden" size={24} />
          <p className="font-serif text-lg md:text-xl italic text-gray-700 leading-relaxed">
            <Typewriter text={insight} delay={20} />
          </p>
          <button 
            onClick={() => setInsight(null)} 
            className="mt-6 md:mt-8 text-xs font-bold text-rose-500 uppercase tracking-widest hover:underline transition-colors"
          >
            Clear Records
          </button>
        </div>
      ) : (
        <div className="text-center py-6 md:py-10">
          <button 
            onClick={getInsight}
            disabled={loading}
            className="px-6 py-3 md:px-10 md:py-4 rounded-full bg-gray-900 text-white font-bold hover:bg-rose-600 transition-all flex items-center gap-3 mx-auto shadow-xl group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Zap size={20} className="group-hover:animate-pulse" />}
            {loading ? 'Analyzing...' : 'Generate Soul Analysis'}
          </button>
          <p className="text-xs text-gray-400 mt-3 md:mt-4">Powered by Gemini AI</p>
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
      const fallbackImages = [
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1465101162946-4377e57745c3?q=80&w=800&auto=format&fit=crop"
      ];
      
      const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
      await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: "Describe a dreamy, ethereal, cinematic 3D digital art of two glowing souls dancing in a galaxy of rose petals and psychology symbols.",
      });
      
      setImage(fallbackImages[Math.floor(Math.random() * fallbackImages.length)]);
    } catch (e) {
      const fallback = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop";
      setImage(fallback);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 md:gap-12">
      <div className="relative w-full max-w-lg aspect-square glass rounded-[40px] md:rounded-[60px] border-2 md:border-4 border-white shadow-2xl flex flex-col items-center justify-center overflow-hidden p-6 md:p-8 group">
        {image ? (
          <>
            <img src={image} className="absolute inset-0 w-full h-full object-cover animate-fade-in img-fade-in" alt="AI Love Visualization" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="relative z-10 text-center p-4 md:p-6">
              <p className="text-white font-serif text-base md:text-lg mb-3 md:mb-4">Our Bond Visualized</p>
              <button 
                onClick={() => setImage(null)}
                className="px-4 py-2 md:px-6 md:py-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all text-sm"
              >
                Generate New
              </button>
            </div>
          </>
        ) : (
          <>
            <ImageIcon size={48} className="text-gray-200 mb-4 md:mb-6 group-hover:scale-110 transition-transform md:w-16 md:h-16" />
            <p className="text-gray-400 font-serif text-base md:text-lg text-center px-4">Visualize the frequency of our bond</p>
            <button 
              onClick={visualizeLove}
              disabled={loading}
              className="mt-6 md:mt-8 px-6 py-2 md:px-8 md:py-3 rounded-full border border-rose-200 text-rose-500 hover:bg-rose-500 hover:text-white transition-all font-bold uppercase tracking-widest text-xs disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Consulting...' : 'Generate Vision'}
            </button>
          </>
        )}
      </div>
      <div className="max-w-xl text-center px-4">
         <h3 className="font-elegant text-4xl md:text-6xl text-gray-800 mb-3 md:mb-4">Our Logical Heart</h3>
         <p className="text-gray-500 font-light leading-relaxed text-sm md:text-base">
           In a world of billions of neurons and complex behaviors, you are the only stimulus that matters. 
           Buddhu's heart operates on a simple algorithm: <span className="text-rose-500 font-bold">If Anu exists, then Happiness = Infinite.</span>
         </p>
      </div>
    </div>
  );
};

const DayRitual = ({ dayData, onClose }: { dayData: typeof VALENTINE_WEEK[0], onClose: () => void }) => {
  const [step, setStep] = useState<'intro' | 'active'>('intro');
  const [musicPlaying, setMusicPlaying] = useState(true);

  return (
    <div className="fixed inset-0 z-[550] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-fade-in">
      <button onClick={onClose} className="absolute top-6 right-6 md:top-8 md:right-8 text-white/50 hover:text-white transition-colors">
        <X size={24} className="md:w-8 md:h-8" />
      </button>
      <div className="max-w-4xl w-full text-center space-y-8 md:space-y-12">
        {step === 'intro' ? (
          <div className="animate-unfurl space-y-6 md:space-y-8">
            <h1 className="font-elegant text-6xl md:text-8xl lg:text-9xl text-white">{dayData.name}</h1>
            <p className="text-white/40 uppercase tracking-[0.3em] md:tracking-[0.5em] text-xs md:text-sm">For the eyes of Anu only</p>
            <button 
              onClick={() => setStep('active')} 
              className="w-20 h-20 md:w-24 md:h-24 bg-rose-500 rounded-full flex items-center justify-center text-white mx-auto hover:scale-110 transition-all hover:shadow-[0_0_40px_rgba(244,63,94,0.6)]"
            >
              <Play size={32} className="md:w-10 md:h-10" fill="white" />
            </button>
          </div>
        ) : (
          <div className="glass p-6 md:p-12 rounded-[30px] md:rounded-[50px] border border-white/10 animate-scale-up space-y-6 md:space-y-8 max-w-2xl mx-auto">
            <div className={`w-14 h-14 md:w-20 md:h-20 ${dayData.color} rounded-2xl md:rounded-3xl mx-auto flex items-center justify-center text-white animate-bounce shadow-lg`}>
              <HeartHandshake size={24} className="md:w-10 md:h-10" />
            </div>
            <h2 className="font-serif text-2xl md:text-4xl text-white italic">{dayData.name} Ritual</h2>
            <p className="font-serif text-lg md:text-2xl text-white/80 leading-relaxed whitespace-pre-line italic min-h-[80px] md:min-h-[120px]">
              <Typewriter text={dayData.shayari} delay={50} />
            </p>
            <div className="pt-4 md:pt-8 border-t border-white/10">
              <p className="text-rose-400 font-bold uppercase tracking-widest text-xs mb-3 md:mb-4">Listening to</p>
              <div className="bg-white/5 px-4 py-2 md:px-6 md:py-3 rounded-full inline-flex items-center gap-2 md:gap-3">
                <Music size={14} className="text-white animate-spin-slow md:w-4 md:h-4" />
                <span className="text-white/60 font-medium text-sm md:text-base">{dayData.song}</span>
                <button 
                  onClick={() => setMusicPlaying(!musicPlaying)} 
                  className="text-white/40 hover:text-white transition-colors"
                >
                  {musicPlaying ? <Volume2 size={14} className="md:w-4 md:h-4" /> : <VolumeX size={14} className="md:w-4 md:h-4" />}
                </button>
              </div>
            </div>
            <button 
              onClick={() => setStep('intro')}
              className="text-white/40 text-xs md:text-sm hover:text-white transition-colors"
            >
              Back to Overview
            </button>
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

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeRitual) {
        setActiveRitual(null);
      }
      if (e.key === ' ') {
        triggerWhisper('general');
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [activeRitual]);

  if (!isUnlocked) return <BiometricEntry onUnlock={() => setIsUnlocked(true)} />;

  return (
    <div className="relative min-h-screen bg-[#fffafa] selection:bg-rose-200 selection:text-rose-900 overflow-x-hidden">
      <FloatingHearts />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 p-4 md:p-6 lg:p-8 flex justify-between items-center backdrop-blur-md border-b border-rose-100/50 bg-white/80">
        <div className="font-cursive text-xl md:text-2xl lg:text-3xl text-rose-500 font-bold flex items-center gap-2 md:gap-3 cursor-pointer group" onClick={() => triggerWhisper('welcome')}>
          <Cat className="group-hover:rotate-12 transition-transform w-6 h-6 md:w-8 md:h-8" /> 
          <span>Anu & Buddhu</span>
        </div>
        <div className="flex gap-3 md:gap-6 lg:gap-8 items-center">
           <a href="#rituals" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-rose-500 transition-colors hidden md:inline">Rituals</a>
           <a href="#lab" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-rose-500 transition-colors hidden md:inline">Psychology</a>
           <button onClick={() => triggerWhisper('general')} className="w-8 h-8 md:w-10 md:h-10 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 hover:scale-110 transition-all shadow-sm">
             <MessageCircle size={16} className="md:w-5 md:h-5" />
           </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-24 md:pt-32 lg:pt-48 pb-16 md:pb-24 lg:pb-32 px-4 md:px-6 flex flex-col items-center text-center relative">
        <div className="absolute top-12 md:top-20 left-1/2 -translate-x-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] lg:w-[800px] lg:h-[800px] bg-rose-100/30 rounded-full blur-[60px] md:blur-[80px] lg:blur-[120px] -z-10" />
        <div className="relative mb-6 md:mb-8 lg:mb-12">
          <div className="absolute inset-0 bg-rose-500/20 rounded-full blur-lg md:blur-xl lg:blur-2xl animate-pulse" />
          <Heart className="text-rose-500 fill-rose-500 relat
          </div>
        <h1 className="font-serif text-4xl md:text-6xl lg:text-8xl xl:text-9xl text-gray-900 mb-4 md:mb-6 lg:mb-8 tracking-tighter px-2">
          The <span className="text-rose-500 font-elegant italic normal-case">Anu</span> Effect
        </h1>
        <p className="max-w-2xl text-base md:text-lg lg:text-xl text-gray-500 font-light leading-relaxed italic px-4">
          "Where psychology meets deep emotion. This isn't just a website; it's a digital neural pathway dedicated solely to you."
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 space-y-16 md:space-y-24 lg:space-y-40 pb-24 md:pb-32 lg:pb-40">
        
        {/* Psychological Lab */}
        <section id="lab" className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
          <PsychologicalAffirmation />
          <LoveManifesto />
        </section>

        {/* Gallery */}
        <section className="space-y-6 md:space-y-8 lg:space-y-12">
          <div className="flex flex-col items-center text-center">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-3 md:mb-4">Neural Snapshots</h2>
            <div className="h-1 w-12 md:w-16 lg:w-24 bg-rose-500/20" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {MEMORIES.map((m, i) => (
              <div key={i} className="group relative h-[250px] md:h-[350px] lg:h-[450px] xl:h-[500px] rounded-[20px] md:rounded-[30px] lg:rounded-[50px] overflow-hidden shadow-lg md:shadow-xl lg:shadow-2xl transition-all duration-700 hover:-translate-y-1 md:hover:-translate-y-2 lg:hover:-translate-y-4">
                <img 
                  src={m} 
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105 md:group-hover:scale-110" 
                  alt={`Memory ${i+1}`}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4 md:p-6 lg:p-10">
                   <p className="text-white font-cursive text-xl md:text-2xl lg:text-3xl">Memory 0{i+1}</p>
                   <p className="text-white/60 text-xs md:text-sm mt-1 lg:mt-2">Locked in my heart forever.</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Valentine Rituals */}
        <section id="rituals" className="space-y-8 md:space-y-12 lg:space-y-16">
          <div className="text-center">
             <span className="px-3 py-1 md:px-4 md:py-1 lg:px-6 lg:py-2 bg-rose-50 rounded-full text-rose-500 font-bold text-xs uppercase tracking-widest">
               The 8th Wonder
             </span>
             <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mt-3 md:mt-4 lg:mt-6">8 Days of Synthesis</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
            {VALENTINE_WEEK.map((day, i) => (
              <div 
                key={i} 
                onClick={() => { setActiveRitual(day); triggerWhisper('ritual'); }}
                className="glass p-4 md:p-6 lg:p-8 rounded-[20px] md:rounded-[30px] lg:rounded-[40px] group hover:shadow-[0_10px_20px_rgba(244,63,94,0.15)] md:hover:shadow-[0_20px_40px_rgba(244,63,94,0.15)] lg:hover:shadow-[0_40px_80px_rgba(244,63,94,0.15)] transition-all cursor-pointer border-b-2 md:border-b-4 border-transparent hover:border-rose-500 relative overflow-hidden"
              >
                <div className={`w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 ${day.color} text-white rounded-lg md:rounded-xl lg:rounded-2xl flex items-center justify-center mb-3 md:mb-4 lg:mb-6 font-bold text-xs transform group-hover:rotate-12 transition-transform shadow-sm md:shadow-md lg:shadow-lg`}>
                  {day.day}
                </div>
                <h3 className="font-serif text-lg md:text-xl lg:text-2xl text-gray-800 mb-1 lg:mb-2">{day.name}</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to Unlock
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Kitten Corner */}
        <section className="bg-[#121212] rounded-[30px] md:rounded-[50px] lg:rounded-[80px] p-6 md:p-12 lg:p-20 text-center space-y-8 md:space-y-12 lg:space-y-16 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 md:p-8 lg:p-20 opacity-10">
            <Cat size={120} className="text-white hidden md:block lg:w-[200px] lg:h-[200px]" />
            <Cat size={80} className="text-white md:hidden" />
          </div>
          <div className="relative z-10">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-2 md:mb-3 lg:mb-4">Anu's Feline Friends</h2>
            <p className="text-white/30 italic text-sm md:text-base">High-frequency purring enabled</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 lg:gap-12 relative z-10">
             {KITTENS.map((k, i) => (
               <div key={i} className="group cursor-pointer" onClick={() => triggerWhisper('kitten')}>
                 <div className="w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-[20px] md:rounded-[30px] lg:rounded-[40px] overflow-hidden shadow-lg md:shadow-xl lg:shadow-2xl border-2 md:border-4 border-white/5 group-hover:border-rose-500 transition-all duration-500 group-hover:-translate-y-1 md:group-hover:-translate-y-2 lg:group-hover:-translate-y-4">
                   <img src={k.url} className="w-full h-full object-cover" alt={k.name} loading="lazy" />
                 </div>
                 <h4 className="mt-3 md:mt-4 lg:mt-6 font-serif text-base md:text-lg lg:text-xl text-white group-hover:text-rose-500 transition-colors">{k.name}</h4>
               </div>
             ))}
          </div>
        </section>

      </main>

      {/* Overlay Components */}
      {activeRitual && <DayRitual dayData={activeRitual} onClose={() => setActiveRitual(null)} />}
      
      {whisper && (
        <div className="fixed bottom-16 md:bottom-20 lg:bottom-24 left-1/2 -translate-x-1/2 z-[500] animate-whisper-float">
          <div className="glass px-4 py-2 md:px-6 md:py-3 lg:px-10 lg:py-4 rounded-full border border-rose-200 shadow-[0_5px_15px_rgba(244,63,94,0.2)] md:shadow-[0_10px_30px_rgba(244,63,94,0.2)] lg:shadow-[0_20px_60px_rgba(244,63,94,0.2)] flex items-center gap-2 md:gap-3 lg:gap-4">
            <Sparkle size={14} className="text-rose-500 animate-spin-slow md:w-4 md:h-4 lg:w-5 lg:h-5" />
            <span className="font-serif italic text-base md:text-lg lg:text-2xl text-gray-800">{whisper}</span>
          </div>
        </div>
      )}

      {/* Footer Player */}
      <footer className="fixed bottom-2 md:bottom-4 lg:bottom-8 w-full px-3 md:px-4 lg:px-6 z-50 pointer-events-none">
        <div className="max-w-sm md:max-w-lg lg:max-w-xl mx-auto glass rounded-full p-1 md:p-2 border border-white/40 shadow-lg md:shadow-xl lg:shadow-2xl flex items-center justify-between px-4 md:px-6 lg:px-8 h-12 md:h-16 lg:h-20 pointer-events-auto">
          <button className="text-gray-400 hover:text-rose-500 transition-colors p-1 md:p-2">
            <ImageIcon size={16} className="md:w-5 md:h-5 lg:w-6 lg:h-6" />
          </button>
          <button className="text-gray-400 hover:text-rose-500 transition-colors p-1 md:p-2">
            <Book size={16} className="md:w-5 md:h-5 lg:w-6 lg:h-6" />
          </button>
          <div className="relative -mt-8 md:-mt-12 lg:-mt-16 bg-rose-500 p-2 md:p-3 lg:p-5 rounded-full border-2 md:border-4 lg:border-8 border-white shadow-lg md:shadow-xl lg:shadow-2xl hover:scale-110 transition-all cursor-pointer group" onClick={() => triggerWhisper('general')}>
             <Heart className="text-white fill-white group-hover:animate-ping w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
          </div>
          <button className="text-gray-400 hover:text-rose-500 transition-colors p-1 md:p-2">
            <Calendar size={16} className="md:w-5 md:h-5 lg:w-6 lg:h-6" />
          </button>
          <button className="text-gray-400 hover:text-rose-500 transition-colors p-1 md:p-2">
            <Cat size={16} className="md:w-5 md:h-5 lg:w-6 lg:h-6" />
          </button>
        </div>
      </footer>

      <style>{`
        .glass { 
          background: rgba(255, 255, 255, 0.6); 
          backdrop-filter: blur(20px); 
          -webkit-backdrop-filter: blur(20px);
        }
        
        .font-elegant { 
          font-family: 'Great Vibes', cursive; 
        }
        
        .font-cursive { 
          font-family: 'Dancing Script', cursive; 
        }
        
        @media (max-width: 768px) {
          .glass {
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
          }
        }
      `}</style>
    </div>
  );
};

// Render the app
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
[file content end]
