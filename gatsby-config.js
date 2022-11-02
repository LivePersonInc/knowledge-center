/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */
require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `LivePerson Knowledge Center`,
    siteUrl: "https://knowledge.liveperson.com/",
    description: "Manage, measure, and scale messaging conversations",
  },
  plugins: [
    `gatsby-plugin-layout`,
    {
      resolve: "@kentico/gatsby-source-kontent",
      options: {
        projectId: process.env.KONTENT_PROJECT_ID,
        usePreviewUrl:
          process.env.KONTENT_PREVIEW_ENABLED &&
          process.env.KONTENT_PREVIEW_ENABLED.toLowerCase() === "true",
        authorizationKey:
          process.env.KONTENT_PREVIEW_ENABLED &&
          process.env.KONTENT_PREVIEW_ENABLED.toLowerCase() === "true"
            ? process.env.KONTENT_PREVIEW_KEY
            : undefined,
        languageCodenames: process.env.KONTENT_LANGUAGE_CODENAMES.split(
          ","
        ).map(lang => lang.trim()),
        includeTaxonomies: true,
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
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "UA-277946-55",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
        //change this when you want it to work
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Inter\:100,200,300,400,500,600,700,800,900`,
          `Space Grotesk\:100,200,300,400,500,600,700,800,900`,
        ],
        display: "swap",
      },
    },
    {
      resolve: `gatsby-plugin-hotjar-tracking`,
      options: {
        includeInDevelopment: false,
        id: process.env.HOTJAR_ID,
        sv: 6,
      },
    },
    {
      resolve: `gatsby-plugin-gdpr-cookies`,
      options: {
        googleAnalytics: {
          trackingId: "UA-277946-55",
          // Setting this parameter is optional
          anonymize: true,
        },
        // Defines the environments where the tracking should be available  - default is ["production"]
        environments: ["production", "development"],
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
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-dark-mode`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        feeds: [
          {
            serialize: ({
              query: {
                site,
                allKontentItemPostWhatsnew,
                allKontentItemReleaseNotesPage,
              },
            }) => {
              const stripKentico = content =>
                content.replace(/(&nbsp;|<([^>]+)>)/gi, "")

              let releaseNotes = allKontentItemReleaseNotesPage.nodes.map(
                node => ({
                  title: `${node.elements.pagename.value} - Release Notes`,
                  description: stripKentico(node.elements.subtitle.value),
                  date: node.elements.date.value,
                  url: `${site.siteMetadata.siteUrl}/release-notes/${node.elements.permalink.value}`,
                  guid: node.elements.permalink.value,
                })
              )

              let whatsNew = allKontentItemPostWhatsnew.nodes.map(node => ({
                title: `${node.elements.pagename.value} - What's New`,
                description: stripKentico(node.elements.subtitle.value),
                date: node.elements.date.value,
                url: `${site.siteMetadata.siteUrl}/whats-new/${node.elements.permalink.value}`,
                guid: node.elements.permalink.value,
              }))

              return releaseNotes
                .concat(whatsNew)
                .sort((a, b) =>
                  a.date < b.date ? -1 : a.date > b.date ? 1 : 0
                )
            },
            query: `{
                site {
                  siteMetadata {
                    siteUrl
                    description
                  }
                }
                 allKontentItemReleaseNotesPage(sort: {order: DESC, fields: elements___date___value}) {
                  nodes {
                    elements {
                        date {
                          value
                        }
                        pagename {
                          value
                        }
                        subtitle {
                          value
                        }
                        permalink {
                          value
                        }
                      }
                  }
                }
                allKontentItemPostWhatsnew(sort: {order: DESC, fields: elements___date___value}) {
                  nodes {
                    elements {
                        date {
                          value
                        }
                        pagename {
                          value
                        }
                        subtitle {
                          value
                        }
                        permalink {
                          value
                        }
                      }
                  }
                }
              }`,
            output: "/rss.xml",
            title: "LivePerson Knowledge Center - Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-gatsby-cloud`,
      options: {
        mergeSecurityHeaders: false, // boolean to turn off the default security headers should be fixed
        mergeCachingHeaders: true,
      },
    },
  ],
}
