// @ts-check
import { defineConfig } from 'astro/config';

// Unity WebGL builds ship Brotli-compressed files (*.br). Browsers only accept them
// if the server says "Content-Encoding: br". This adds that header to the local
// dev/preview server. vercel.json does the same thing online.
const types = { '.wasm.br': 'application/wasm', '.js.br': 'application/javascript', '.data.br': 'application/octet-stream' };
function brotliHeaders(req, res, next) {
  const url = (req.url || '').split('?')[0];
  if (url.endsWith('.br')) {
    res.setHeader('Content-Encoding', 'br');
    const ext = Object.keys(types).find((e) => url.endsWith(e));
    if (ext) {
      // sirv (the static server) would otherwise label these by the .br extension
      const setHeader = res.setHeader.bind(res);
      res.setHeader = (name, value) =>
        setHeader(name, name.toLowerCase() === 'content-type' ? types[ext] : value);
      setHeader('Content-Type', types[ext]);
    }
  }
  next();
}

export default defineConfig({
  // Set this to the real domain once deployed (used for absolute URLs).
  site: 'https://example.vercel.app',
  vite: {
    plugins: [
      {
        name: 'unity-brotli-headers',
        configureServer(server) { server.middlewares.use(brotliHeaders); },
        configurePreviewServer(server) { server.middlewares.use(brotliHeaders); },
      },
    ],
  },
});
