import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
    assetsInclude: ['**/*.glb'],
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
        wayfinder({
            formVariants: true,
        }),
    ],
    esbuild: {
        jsx: 'automatic',
    },
    build: {
        rollupOptions: {
            output: {
                // Ensure proper chunk loading order
                chunkFileNames: (chunkInfo) => {
                    const facadeModuleId = chunkInfo.facadeModuleId
                        ? chunkInfo.facadeModuleId.split('/').pop()
                        : 'chunk';

                    // Prioritize React chunks to load first
                    if (chunkInfo.name === 'vendor-react-ui') {
                        return `assets/react-[hash].js`;
                    }
                    if (chunkInfo.name === 'vendor-gsap') {
                        return `assets/gsap-[hash].js`;
                    }

                    return `assets/${facadeModuleId}-[hash].js`;
                },
                // Disable manualChunks completely to avoid React undefined issues
                // manualChunks(id) {
                //     // Only separate vendor dependencies, keep React ecosystem together
                //     if (id.includes('node_modules')) {
                //         // Keep React and React-DOM together to avoid useLayoutEffect errors
                //         if (id.includes('react') || id.includes('react-dom')) {
                //             return 'react-vendor';
                //         }
                //         // Separate GSAP as it's large and independent
                //         if (id.includes('gsap')) {
                //             return 'gsap';
                //         }
                //         // Keep other dependencies together
                //         return 'vendor';
                //     }
                // },
            },
        },
        chunkSizeWarningLimit: 1000, // Increase warning limit to 1MB
        // Ensure proper module resolution
        commonjsOptions: {
            include: [/node_modules/],
        },
        // Optimize chunk loading
        target: 'esnext',
        // Ensure React is available globally
        // define: {
        //     'process.env.NODE_ENV': JSON.stringify(
        //         process.env.NODE_ENV || 'production',
        //     ),
        // },
    },
});
