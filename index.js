// index.js
import React, { useState, useEffect } from 'https://esm.sh/react@18.2.0';
import { createRoot } from 'https://esm.sh/react-dom@18.2.0/client';
import { 
  Heart, MessageCircle, Music, X, Play, Quote, 
  Zap, Loader2, ImageIcon, HeartHandshake, Fingerprint,
  Brain, Cat, Sparkle, Calendar, Book
} from 'https://esm.sh/lucide-react@0.263.1';

// --- Constants & Data ---
const KITTENS = [
  { 
    url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=400&auto=format&fit=crop", 
    name: "Snowball"
  },
  { 
    url: "https://images.unsplash.com/photo-1573865662567-57ef5b67bd00?q=80&w=400&auto=format&fit=crop", 
    name: "Cotton"
  },
  { 
    url: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?q=80&w=400&auto=format&fit=crop", 
    name: "Marshmallow"
  }
];

const VALENTINE_WEEK = [
  { day: "Feb 7", name: "Rose Day", color: "bg-rose-500", shayari: "Anu, aap hamari zindagi ka sabse khoobsurat gulab ho.", song: "Gulabi Aankhen" },
  { day: "Feb 8", name: "Propose Day", color: "bg-pink-500", shayari: "Will you be my Valentine forever, Anu?", song: "Raabta" },
  { day: "Feb 9", name: "Chocolate Day", color: "bg-orange-900", shayari: "Mithaas dosti ki chocolate se zyada hoti hai.", song: "Tum Hi Ho" },
  { day: "Feb 10", name: "Teddy Day", color: "bg-amber-700", shayari: "Teddy bear ki tarah pyari ho tum.", song: "Iktara" },
  { day: "Feb 11", name: "Promise Day", color: "bg-indigo-500", shayari: "Vaada raha ki hamesha saath nibhayenge.", song: "Jeene Laga Hoon" },
  { day: "Feb 12", name: "Hug Day", color: "bg-sky-500", shayari: "Ek bar to mujhe seene se laga lo.", song: "Humsafar" },
  { day: "Feb 13", name: "Kiss Day", color: "bg-red-500", shayari: "Labon pe sirf tumhara hi naam ho.", song: "Pee Loon" },
  { day: "Feb 14", name: "Valentine's Day", color: "bg-rose-600", shayari: "Anu, meri har khushi ki wajah ho tum.", song: "Kesariya" }
];

const WHISPERS = {
  welcome: ["I've been waiting for you, Anu.", "Welcome home, my Queen.", "The world is brighter now you're here."],
  general: ["Your smile is my favorite logic.", "Anu, you're my favorite thought.", "I can feel your heartbeat through the screen."],
  kitten: ["You're cuter than any kitten!", "My Persian kitten is the best.", "Purrr... I love you!"]
};

// --- Components ---
const FloatingHearts = () => (
  React.createElement('div', { className: "fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-40" },
    [...Array(12)].map((_, i) => 
      React.createElement('div', {
        key: i,
        className: "absolute animate-float",
        style: {
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${15 + Math.random() * 15}s`
        }
      },
        React.createElement(Heart, { 
          size: 10 + Math.random() * 25, 
          className: "text-rose-300/30 fill-current" 
        })
      )
    )
  )
);

const BiometricEntry = ({ onUnlock }) => {
  const [scanning, setScanning] = useState(false);
  const startScan = () => {
    setScanning(true);
    setTimeout(() => onUnlock(), 2000);
  };

  return React.createElement('div', { 
    className: "fixed inset-0 z-50 bg-black flex flex-col items-center justify-center" 
  },
    React.createElement('div', { 
      onClick: startScan,
      className: "cursor-pointer" 
    },
      React.createElement('div', { 
        className: `w-32 h-32 rounded-full border-2 flex items-center justify-center transition-all duration-700 ${scanning ? 'border-rose-500 shadow-[0_0_50px_rgba(244,63,94,0.4)]' : 'border-white/10'}` 
      },
        React.createElement(Fingerprint, { 
          size: 64, 
          className: scanning ? "text-rose-500 scale-110 animate-pulse" : "text-white/20" 
        })
      )
    ),
    React.createElement('h2', { 
      className: "mt-8 text-white/50 uppercase text-sm" 
    }, scanning ? 'Scanning...' : 'Click to Enter Sanctuary'),
    React.createElement('p', { 
      className: "mt-2 text-white/30 text-xs" 
    }, "For Anu's eyes only")
  );
};

const App = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activeDay, setActiveDay] = useState(null);
  const [whisper, setWhisper] = useState('');

  const showWhisper = (text) => {
    setWhisper(text);
    setTimeout(() => setWhisper(''), 3000);
  };

  if (!isUnlocked) {
    return React.createElement(BiometricEntry, { onUnlock: () => setIsUnlocked(true) });
  }

  return React.createElement('div', { className: "min-h-screen bg-[#fffafa]" },
    // Floating Hearts
    React.createElement(FloatingHearts),
    
    // Navigation
    React.createElement('nav', { 
      className: "fixed top-0 w-full z-40 p-6 flex justify-between items-center glass border-b border-rose-100/50" 
    },
      React.createElement('div', { 
        className: "font-cursive text-2xl text-rose-500 font-bold flex items-center gap-3 cursor-pointer",
        onClick: () => showWhisper(WHISPERS.welcome[0])
      },
        React.createElement(Cat, { className: "hover:rotate-12 transition-transform" }),
        "Anu & Buddhu"
      ),
      React.createElement('button', { 
        onClick: () => showWhisper(WHISPERS.general[Math.floor(Math.random() * WHISPERS.general.length)]),
        className: "w-10 h-10 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 hover:scale-110 transition-all"
      },
        React.createElement(MessageCircle, { size: 20 })
      )
    ),

    // Hero Section
    React.createElement('header', { 
      className: "pt-32 pb-20 px-4 flex flex-col items-center text-center relative" 
    },
      React.createElement('div', { className: "relative mb-8" },
        React.createElement('div', { className: "absolute inset-0 bg-rose-500/20 rounded-full blur-xl animate-pulse" }),
        React.createElement(Heart, {
          size: 100,
          className: "text-rose-500 fill-rose-500 relative animate-heartbeat cursor-pointer",
          onClick: () => showWhisper("My heart beats only for you ❤️")
        })
      ),
      React.createElement('h1', { 
        className: "font-serif text-5xl md:text-7xl text-gray-900 mb-6 tracking-tighter" 
      },
        "The ",
        React.createElement('span', { className: "text-rose-500 font-elegant italic normal-case" }, "Anu"),
        " Effect"
      ),
      React.createElement('p', { 
        className: "text-lg text-gray-500 font-light leading-relaxed italic max-w-2xl" 
      },
        "\"Where psychology meets deep emotion. This isn't just a website; it's a digital neural pathway dedicated solely to you.\""
      )
    ),

    // Main Content
    React.createElement('main', { className: "max-w-6xl mx-auto px-4 pb-32 space-y-20" },
      
      // Psychology Corner
      React.createElement('section', { id: "lab", className: "glass rounded-[40px] p-8" },
        React.createElement('div', { className: "flex items-center gap-4 mb-6" },
          React.createElement('div', { className: "w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500" },
            React.createElement(Brain, { size: 24 })
          ),
          React.createElement('div', null,
            React.createElement('h3', { className: "font-serif text-2xl text-gray-800" }, "The Psychology Corner"),
            React.createElement('p', { className: "text-xs uppercase tracking-widest text-gray-400 font-bold" }, "Scientific Proof of My Love")
          )
        ),
        React.createElement('div', { className: "bg-rose-50 rounded-2xl p-6" },
          React.createElement(Quote, { className: "text-rose-300 mb-4", size: 40 }),
          React.createElement('p', { className: "font-serif text-lg italic text-gray-700 leading-relaxed" },
            "\"Anu, your emotional intelligence isn't just knowledge—it's your soul's language. Every thought of you triggers joy in my neural pathways.\""
          )
        )
      ),

      // Valentine Week
      React.createElement('section', { id: "rituals", className: "space-y-8" },
        React.createElement('div', { className: "text-center" },
          React.createElement('span', { className: "px-4 py-1 bg-rose-50 rounded-full text-rose-500 font-bold text-xs uppercase tracking-widest" },
            "The 8th Wonder"
          ),
          React.createElement('h2', { className: "font-serif text-4xl mt-4" }, "8 Days of Synthesis")
        ),
        React.createElement('div', { className: "grid grid-cols-2 md:grid-cols-4 gap-4" },
          VALENTINE_WEEK.map((day, i) =>
            React.createElement('div', {
              key: i,
              onClick: () => setActiveDay(day),
              className: "glass rounded-2xl p-4 text-center cursor-pointer hover:shadow-lg transition hover:-translate-y-1"
            },
              React.createElement('div', { 
                className: `w-10 h-10 ${day.color} rounded-xl text-white flex items-center justify-center mx-auto mb-3 font-bold text-xs` 
              }, day.day),
              React.createElement('h3', { className: "font-bold text-gray-800" }, day.name)
            )
          )
        )
      ),

      // Kittens
      React.createElement('section', { className: "bg-gray-900 rounded-[40px] p-8" },
        React.createElement('div', { className: "text-center mb-8" },
          React.createElement('h2', { className: "font-serif text-3xl text-white mb-2" }, "Anu's Feline Friends"),
          React.createElement('p', { className: "text-white/30 italic" }, "High-frequency purring enabled")
        ),
        React.createElement('div', { className: "flex flex-wrap justify-center gap-6" },
          KITTENS.map((kitten, i) =>
            React.createElement('div', {
              key: i,
              className: "group cursor-pointer",
              onClick: () => showWhisper(WHISPERS.kitten[Math.floor(Math.random() * WHISPERS.kitten.length)])
            },
              React.createElement('div', { className: "w-40 h-40 rounded-[30px] overflow-hidden border-2 border-white/5 group-hover:border-rose-500 transition-all duration-500 group-hover:-translate-y-2" },
                React.createElement('img', { 
                  src: kitten.url, 
                  alt: kitten.name,
                  className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                })
              ),
              React.createElement('h4', { className: "mt-4 font-serif text-lg text-white group-hover:text-rose-500 transition-colors" }, kitten.name)
            )
          )
        )
      )
    ),

    // Day Modal
    activeDay && React.createElement('div', { 
      className: "fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50" 
    },
      React.createElement('div', { className: "glass rounded-3xl p-8 max-w-md w-full animate-scale-up" },
        React.createElement('button', { 
          onClick: () => setActiveDay(null),
          className: "float-right text-gray-500 hover:text-gray-700"
        },
          React.createElement(X, { size: 24 })
        ),
        React.createElement('div', { 
          className: `w-16 h-16 ${activeDay.color} rounded-2xl flex items-center justify-center mx-auto mb-6` 
        },
          React.createElement(HeartHandshake, { className: "text-white", size: 32 })
        ),
        React.createElement('h3', { className: "text-2xl font-bold text-center mb-4 text-gray-800" }, activeDay.name),
        React.createElement('p', { className: "text-gray-700 italic text-center mb-6" }, activeDay.shayari),
        React.createElement('div', { className: "flex items-center justify-center gap-2 text-gray-600" },
          React.createElement(Music, { className: "w-4 h-4" }),
          React.createElement('span', null, activeDay.song)
        ),
        React.createElement('button', {
          onClick: () => setActiveDay(null),
          className: "mt-6 w-full py-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition"
        }, "Close")
      )
    ),

    // Whisper Message
    whisper && React.createElement('div', { 
      className: "fixed bottom-8 left-1/2 transform -translate-x-1/2 glass px-6 py-3 rounded-full z-50 animate-whisper-float" 
    },
      React.createElement('div', { className: "flex items-center gap-2" },
        React.createElement(Sparkle, { className: "text-rose-500 animate-spin-slow", size: 16 }),
        React.createElement('span', { className: "font-cursive text-lg text-gray-800" }, whisper)
      )
    ),

    // Footer Player
    React.createElement('footer', { className: "fixed bottom-4 w-full px-4 z-40 pointer-events-none" },
      React.createElement('div', { className: "glass rounded-full p-2 max-w-xs mx-auto flex justify-around pointer-events-auto" },
        React.createElement('button', { 
          className: "text-gray-400 hover:text-rose-500 transition-colors p-2",
          onClick: () => showWhisper("Opening memories gallery...")
        },
          React.createElement(ImageIcon, { size: 20 })
        ),
        React.createElement('button', { 
          className: "text-gray-400 hover:text-rose-500 transition-colors p-2",
          onClick: () => showWhisper("Opening psychology books...")
        },
          React.createElement(Book, { size: 20 })
        ),
        React.createElement('button', { 
          className: "bg-rose-500 p-3 rounded-full -mt-4 hover:scale-110 transition-all",
          onClick: () => showWhisper("I love you more than words can express ❤️")
        },
          React.createElement(Heart, { className: "text-white", size: 24 })
        ),
        React.createElement('button', { 
          className: "text-gray-400 hover:text-rose-500 transition-colors p-2",
          onClick: () => showWhisper("Marking special dates...")
        },
          React.createElement(Calendar, { size: 20 })
        ),
        React.createElement('button', { 
          className: "text-gray-400 hover:text-rose-500 transition-colors p-2",
          onClick: () => showWhisper("Meow! 🐱")
        },
          React.createElement(Cat, { size: 20 })
        )
      )
    )
  );
};

// Render the app
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(React.createElement(App));
                          }
