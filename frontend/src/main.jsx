import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { dark } from '@clerk/themes'; // Optional: if you want a dark mode base

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
          layout: {
            socialButtonsVariant: 'iconButton',
            logoPlacement: 'inside',
          },
          variables: {
            colorPrimary: '#3b82f6', // Professional Blue
            colorText: '#1e293b',    // Slate 800
            borderRadius: '12px',
            fontFamily: 'Inter, sans-serif'
          },
          elements: {
            // Customizing the buttons to match your "NexusAI" gradient theme
            formButtonPrimary: 
              'bg-gradient-to-r from-red-500 via-pink-500 to-blue-500 border-none hover:opacity-90 transition-all text-sm font-bold',
            card: 'shadow-2xl border border-slate-100 rounded-3xl',
            headerTitle: 'text-slate-900 font-extrabold',
            headerSubtitle: 'text-slate-500',
            footerActionLink: 'text-blue-600 hover:text-blue-700 font-semibold'
          }
        }}
      >
        <App />
      </ClerkProvider>
    </BrowserRouter>
  </StrictMode>
)