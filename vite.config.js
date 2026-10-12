import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base nur für den Build auf GitHub Pages: Dort liegt die Seite unter /<repo>/.
// Lokal und auf Vercel (setzt VERCEL=1 beim Build) liegt sie direkt unter / —
// lokal, damit sich die Adresse fürs Handy im WLAN nicht ändert.
export default defineConfig(({ command }) => ({
  base: command === 'build' && !process.env.VERCEL ? '/weihnachtsmarkt-paderborn/' : '/',
  plugins: [react(), tailwindcss()],
}))
