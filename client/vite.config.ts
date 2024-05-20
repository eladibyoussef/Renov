import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
   server: {
    host: '0.0.0.0', // Allow external access
    port: 3000 // Specify the port
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  
})


 
