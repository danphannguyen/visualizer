import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glslify from 'rollup-plugin-glslify'
import path from 'path'

export default defineConfig({
  plugins: [react(), glslify()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  build: {
    outDir: 'dist',  // Ou tout autre dossier où tu veux générer ton build
    sourcemap: true,  // Activer les sourcemaps pour aider au debugging
  },
})
