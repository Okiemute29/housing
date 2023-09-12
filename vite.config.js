import { defineConfig } from 'vite';
import react from 'vite-preset-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  define: {
    // Define your environment variables here
    'process.env.VITE_GEOCODING_API_KEY': JSON.stringify(process.env.VITE_GEOCODING_API_KEY)
  }
});
