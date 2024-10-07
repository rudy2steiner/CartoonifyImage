import { defineConfig } from 'vite';
import ogPlugin from 'vite-plugin-open-graph'
import tailwindcss from 'tailwindcss' 
import autoprefixer from 'autoprefixer'
import wasm from "vite-plugin-wasm";

const wasmContentTypePlugin = {
  name: "wasm-content-type-plugin",
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url.endsWith(".wasm")) {
        res.setHeader("Content-Type", "application/wasm");
      }
      next();
    });
  },
};

const ogOptions = {
  basic: {
    url: 'https://www.cartoonifyimage.com/',
    title: 'Cartoonify Image',
    type: 'image.png',
    image: 'https://www.cartoonifyimage.com/openog.png',
    determiner: 'auto',
    description: 'Remove background in seconds',
    locale: 'en_us',
    localeAlternate: ['en_us'],
    siteName: 'Cartoonify Image',
  },
  twitter: {
    image: 'https://www.cartoonifyimage.com/openog.png',
    imageAlt: 'twitter image alt',
  },
};

export default defineConfig({
  plugins: [ogPlugin(ogOptions), wasmContentTypePlugin, wasm()],
  worker: {
    // Not needed with vite-plugin-top-level-await >= 1.3.0
    // format: "es",
    plugins: [
      wasm()
    ]
  },
  css: {
    postcss:{
      plugins: [
        tailwindcss,
        autoprefixer
      ]
    }
  },
  build: {
    target: 'esnext'
  }
});
