import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base nur für den Build: Auf GitHub Pages liegt die Seite unter /<repo>/,
// lokal soll sie weiter direkt unter / erreichbar sein (sonst ändert sich
// die Adresse fürs Handy im WLAN).
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/weihnachtsmarkt-paderborn/' : '/',
  plugins: [react(), tailwindcss()],
}))
