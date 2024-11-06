import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
//js;
// vite.config.js
export default {
  server: {
    proxy: {
      "/api": "http://localhost:5600",
    },
  },
};

