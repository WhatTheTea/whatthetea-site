// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import UnoCSS from 'unocss/astro'
import { defineConfig } from 'astro/config';
import mermaid from 'astro-mermaid';
import alpinejs from '@astrojs/alpinejs';

// https://astro.build/config
export default defineConfig({
	site: 'https://whatthetea.neocities.org/',
	integrations: [mdx(), sitemap(), UnoCSS(), mermaid(), alpinejs()],
});
