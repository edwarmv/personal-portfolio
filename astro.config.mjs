// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import react from "@astrojs/react";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  adapter: node({
    mode: "standalone",
  }),
  env: {
    schema: {
      SMTP_USER: envField.string({ context: "server", access: "secret" }),
      SMTP_PASS: envField.string({ context: "server", access: "secret" }),
    },
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  integrations: [icon(), react()],
  security: {
    allowedDomains: [
      { hostname: "edwarmv.com" },
      { hostname: "www.edwarmv.com" },
    ],
  },
  site: "https://www.edwarmv.com",
  vite: {
    plugins: [tailwindcss()],
  },
});
