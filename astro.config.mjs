// @ts-check
import { defineConfig, envField } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import icon from "astro-icon";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://www.edwarmv.com",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [icon(), react()],
  env: {
    schema: {
      SMTP_USER: envField.string({ context: "server", access: "secret" }),
      SMTP_PASS: envField.string({ context: "server", access: "secret" }),
    },
  },
});
