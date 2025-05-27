import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
    preprocess: [vitePreprocess(), mdsvex()],
    kit: {
        adapter: adapter(),
        alias: {
            '@/*': './path/to/lib/*',
        },
    },
    extensions: ['.svelte', '.svx'],
};

export default config;
