import { defineConfig } from 'astro/config';
import vercel from "@astrojs/vercel/serverless";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), icon({
    include: {
      mdi: ["*"]
    }
  }), svelte()],
  output: "server",
  adapter: vercel({
    imageService: true
  })
});