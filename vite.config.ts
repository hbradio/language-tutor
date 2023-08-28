import { sveltekit } from '@sveltejs/kit/vite';
import { nodeLoaderPlugin } from '@vavite/node-loader/plugin';
import { defineConfig } from 'vitest/config';

/** @type {import('vite').UserConfig} */
export default defineConfig(({ mode }) => {
    let plugins = [sveltekit()];
    if (mode === 'development') {
        plugins = [nodeLoaderPlugin(), ...plugins];
    }

    return {
        plugins,
        test: {
            include: ['src/**/*.{test,spec}.{js,ts}']
		}
    };
});