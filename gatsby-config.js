/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */
require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `LivePerson Knowledge Center`,
    siteUrl: "https://helpcenterlp.gatsbyjs.io/",
    description: "Manage, measure, and scale messaging conversations",
  },
  plugins: [
    {
      resolve: "@kentico/gatsby-source-kontent",
      options: {
        projectId: process.env.KONTENT_PROJECT_ID,
        languageCodenames: process.env.KONTENT_LANGUAGE_CODENAMES.split(
          ","
        ).map(lang => lang.trim()),
        experimental: {
          managementApiTriggersUpdate: true, // opt-out by default
        },
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [
          require("tailwindcss"),
          require("./tailwind.config.js"), // Optional: Load custom Tailwind CSS configuration
        ],
      },
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        indexName: process.env.ALGOLIA_INDEX_NAME,
        queries: require("./src/utils/algolia-queries"),
      },
    },
    `gatsby-plugin-scroll-reveal`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-dark-mode`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-gatsby-cloud`,
      options: {
        mergeSecurityHeaders: false, // boolean to turn off the default security headers should be fixed
      },
    },
  ],
}
