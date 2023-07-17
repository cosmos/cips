// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Cosmos Improvement Proposals",
  tagline: "Cosmos Improvement Proposals",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://your-docusaurus-test-site.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "Cosmos", // Usually your GitHub org/user name.
  projectName: "CIPs", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/cosmos/CIPs/edit/master/website",
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          path: "../cips",
          routeBasePath: "/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // image: "img/banner.jpg",
      docs: {
        sidebar: {
          autoCollapseCategories: true,
        },
      },
      navbar: {
        title: "Cosmos CIPs",
        hideOnScroll: false,
        logo: {
          alt: "Cosmos CIPs Logo",
          src: "img/logo-sdk.svg",
          href: "/",
          target: "_self",
        },
        items: [],
      },
      footer: {
        links: [
          {
            items: [
              {
                html: `<a href="https://cosmos.network"><img src="/img/logo-bw.svg" alt="Cosmos Logo"></a>`,
              },
            ],
          },
          {
            title: "Documentation",
            items: [
              {
                label: "Cosmos Hub",
                href: "https://hub.cosmos.network",
              },
              {
                label: "CometBFT",
                href: "https://docs.cometbft.com",
              },
              {
                label: "IBC Go",
                href: "https://ibc.cosmos.network",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Blog",
                href: "https://blog.cosmos.network",
              },
              {
                label: "Forum",
                href: "https://forum.cosmos.network",
              },
              {
                label: "Discord",
                href: "https://discord.gg/cosmosnetwork",
              },
              {
                label: "Reddit",
                href: "https://reddit.com/r/cosmosnetwork",
              },
            ],
          },
          {
            title: "Social",
            items: [
              {
                label: "Discord",
                href: "https://discord.gg/cosmosnetwork",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/cosmos",
              },
              {
                label: "Youtube",
                href: "https://www.youtube.com/c/CosmosProject",
              },
              {
                label: "Telegram",
                href: "https://t.me/cosmosproject",
              },
            ],
          },
        ],
        // copyright: `<p>The development of the Cosmos SDK is led primarily by <a href="https://interchain.io/ecosystem">Interchain Core Teams</a>. Funding for this development comes primarily from the Interchain Foundation, a Swiss non-profit.</p>`,
      },
      // prism: {
      //   theme: lightCodeTheme,
      //   darkTheme: darkCodeTheme,
      //   additionalLanguages: ["protobuf", "go-module"], // https://prismjs.com/#supported-languages
      // },
      // algolia: {
      //   appId: "QLS2QSP47E",
      //   apiKey: "4d9feeb481e3cfef8f91bbc63e090042",
      //   indexName: "cosmos_network",
      //   contextualSearch: false,
      // },
    }),
  plugins: [
    // async function myPlugin(context, options) {
    //   return {
    //     name: "docusaurus-tailwindcss",
    //     configurePostCss(postcssOptions) {
    //       postcssOptions.plugins.push(require("postcss-import"));
    //       postcssOptions.plugins.push(require("tailwindcss/nesting"));
    //       postcssOptions.plugins.push(require("tailwindcss"));
    //       postcssOptions.plugins.push(require("autoprefixer"));
    //       return postcssOptions;
    //     },
    //   };
    // },
    [
      "@docusaurus/plugin-google-analytics",
      {
        trackingID: "UA-51029217-2",
        anonymizeIP: true,
      },
    ],
  ],
};

module.exports = config;
