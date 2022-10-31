// require('./script/get_code_version');

import {resolve} from 'path';
import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
    base: '/',
    server: {
        port: 3000,
    },
    build: {
        minify:'terser',
        sourcemap: process.env.NODE_ENV !== 'production',
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        },
    },
    plugins: [
        vue({}),
        legacy({
            targets: ['> 0.2%', 'last 2 versions', 'not dead'],
            additionalLegacyPolyfills: ['regenerator-runtime/runtime']
        }),
        createHtmlPlugin({
            entry: 'src/main.js',
            inject: {
                data: {
                    TITLE: '关注嘉然，顿顿解馋！',
                },
                tags: [
                    {
                        tag: 'meta',
                        attrs: {
                            name: 'keywords',
                            content: '嘉然,嘉然今天吃什么,虚拟偶像,虚拟主播,管人,VTB,VUP,V',
                        },
                    },
                    {
                        tag: 'meta',
                        attrs: {
                            name: 'description',
                            content: '嘉然的非官方主页。关注嘉然，顿顿解馋！',
                        },
                    },
                ],
            },
            minify: true,
        }),
    ],
});
