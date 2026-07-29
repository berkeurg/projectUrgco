import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as Sentry from "@sentry/react"
import './index.css'
import App from './App.jsx'
import './i18n';

// --- SENTRY RADAR İNİTİALİZATİON ---
Sentry.init({
  dsn: "https://1b4ed21433ada55d0fe4afed831d0df5@o4511821106249728.ingest.de.sentry.io/4511821110378576",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration()
  ],
  // Tracing (İstek ve Performans Takibi)
  tracesSampleRate: 1.0,
  tracePropagationTargets: ["localhost", /^https:\/\/urgco\.tr\/api/],
  
  // Session Replay (Kullanıcı Ekran Kaydı)
  replaysSessionSampleRate: 0.1, 
  replaysOnErrorSampleRate: 1.0,
  
  // Log Desteği
  enableLogs: true
});

// --- REACT ROOT RENDER ---
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)