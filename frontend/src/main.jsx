import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { dark } from '@clerk/themes'; 
import AppContextProvider from './context/AppContext.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key. Check your .env file!")
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkProvider 
        publishableKey={PUBLISHABLE_KEY} 
        afterSignOutUrl="/"
        appearance={{
          // Base theme set to dark to match your obsidian background
          baseTheme: dark,
          layout: {
            socialButtonsVariant: 'iconButton',
            logoPlacement: 'inside',
          },
          variables: {
            colorPrimary: '#22d3ee',    // Cyan 400
            colorBackground: '#0a0a0a', // Deep Obsidian
            colorText: '#ffffff',       // Pure White
            colorTextSecondary: '#71717a', // Zinc 400
            borderRadius: '1rem',
            fontFamily: 'Inter, sans-serif'
          },
          elements: {
            // Matching the "Try Now" and "Purchase" buttons
            formButtonPrimary: 
              'bg-gradient-to-r from-cyan-400 to-blue-600 border-none hover:opacity-90 transition-all text-xs font-black uppercase italic tracking-widest py-3',
            card: 'bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/5 rounded-[2rem] shadow-[0_0_50px_rgba(34,211,238,0.05)]',
            headerTitle: 'text-white font-black uppercase italic tracking-tighter text-2xl',
            headerSubtitle: 'text-zinc-500 font-bold uppercase tracking-widest text-[10px]',
            footerActionLink: 'text-cyan-400 hover:text-cyan-300 font-black italic uppercase tracking-tighter',
            socialButtonsIconButton: 'bg-zinc-900 border border-white/5 hover:bg-zinc-800 transition-all',
            formFieldInput: 'bg-black border-white/5 focus:border-cyan-500/50 transition-all rounded-xl text-white',
            formFieldLabel: 'text-zinc-400 font-black uppercase tracking-widest text-[9px] mb-2'
          }
        }}
      >
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </ClerkProvider>
    </BrowserRouter>
  </StrictMode>
)