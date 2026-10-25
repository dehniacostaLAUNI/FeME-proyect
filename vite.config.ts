import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
 plugins:[react()],
 base:process.env.SITE_BASE||'/FeME-proyect/',
 build:{outDir:'dist',sourcemap:false},
 server:{host:'127.0.0.1'}
});
