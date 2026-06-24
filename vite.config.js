import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import { bunny } from 'laravel-vite-plugin/fonts';
import tailwindcss from '@tailwindcss/vite';

// When served behind a reverse proxy (e.g. Ona's forwarded ports), the dev
// server is reached via an external HTTPS host rather than localhost. Set
// ONA_VITE_HOST to that bare host to allow it, emit correct HMR/asset URLs,
// and serve assets from the public origin. Unset locally, this has no effect.
const proxyHost = process.env.ONA_VITE_HOST;

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
            fonts: [
                bunny('Instrument Sans', {
                    weights: [400, 500, 600],
                }),
            ],
        }),
        tailwindcss(),
    ],
    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
        ...(proxyHost
            ? {
                  allowedHosts: [proxyHost],
                  origin: `https://${proxyHost}`,
                  hmr: {
                      host: proxyHost,
                      protocol: 'wss',
                      clientPort: 443,
                  },
              }
            : {}),
    },
});
