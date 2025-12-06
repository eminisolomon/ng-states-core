import { defineConfig } from "vitepress";

export default defineConfig({
  title: "ng-states-core",
  description: "Nigerian states, LGAs, and senatorial districts data",

  themeConfig: {
    nav: [
      { text: "Guide", link: "/guide/getting-started" },
      { text: "API", link: "/api-reference" },
      { text: "Examples", link: "/examples" },
    ],

    sidebar: [
      {
        text: "Guide",
        items: [{ text: "Getting Started", link: "/guide/getting-started" }],
      },
      {
        text: "Reference",
        items: [
          { text: "API Reference", link: "/api-reference" },
          { text: "Examples", link: "/examples" },
        ],
      },
    ],

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/eminisolomon/ng-states-core",
      },
      { icon: "npm", link: "https://www.npmjs.com/package/ng-states-core" },
    ],

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2025 Solomon Olatunji",
    },

    search: {
      provider: "local",
    },

    editLink: {
      pattern:
        "https://github.com/eminisolomon/ng-states-core/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },
  },

  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: "/logo.svg" }],
    ["meta", { name: "theme-color", content: "#008751" }],
    ["meta", { name: "og:type", content: "website" }],
    ["meta", { name: "og:locale", content: "en" }],
    ["meta", { name: "og:site_name", content: "ng-states-core" }],
  ],
});
