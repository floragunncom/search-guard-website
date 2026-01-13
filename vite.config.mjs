import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react({
      // Include all JS and JSX files
      include: '**/*.{jsx,js}',
    }),
    svgr(),
  ],

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@views': resolve(__dirname, 'src/views'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@styles': resolve(__dirname, 'src/styles'),
      '@images': resolve(__dirname, 'src/images'),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: `
          @use "@/styles/Colors.scss" as *;
          @use "@/styles/Breakpoints.scss" as *;
        `,
      },
    },
  },

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    chunkSizeWarningLimit: 1000, // Warn for chunks larger than 1MB
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split node_modules into smaller chunks
          if (id.includes('node_modules')) {
            // React ecosystem
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'vendor-react';
            }
            // Contentful
            if (id.includes('contentful') || id.includes('rich-text')) {
              return 'vendor-contentful';
            }
            // Markdown processing
            if (id.includes('markdown')) {
              return 'vendor-markdown';
            }
            // Search/Algolia
            if (id.includes('algolia') || id.includes('instantsearch') || id.includes('algoliasearch')) {
              return 'vendor-search';
            }
            // Social sharing
            if (id.includes('react-share')) {
              return 'vendor-social';
            }
            // SVG processing
            if (id.includes('react-svg') || id.includes('svgr')) {
              return 'vendor-svg';
            }
            // Other vendor code
            return 'vendor-other';
          }
        },
        // Optimize chunk naming for better caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
    // Minification settings
    minify: 'esbuild',
    target: 'es2015',
  },

  server: {
    port: 3000,
    open: true,
  },

  preview: {
    port: 5000,
  },
});
