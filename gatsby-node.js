const _ = require("lodash")
const Promise = require("bluebird")
const path = require("path")
const slash = require("slash")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const navPagePath = path.resolve("./src/pages/nav-page.jsx")
    const PostReleaseNotesPath = path.resolve(
      "./src/pages/post-release-notes.jsx"
    )
    const BlogReleaseNotesPath = path.resolve(
      "./src/pages/page-release-notes.jsx"
    )
    const BlogWhatsNewPath = path.resolve("./src/pages/page-whats-new.jsx")
    const PostWhatsNewPath = path.resolve("./src/pages/post-whats-new.jsx")
    const PageGeneralPath = path.resolve("./src/pages/page-jekyll-markdown.jsx")

    graphql(`
      {
        allKontentItemNavigationItem(
          filter: { system: { codename: { eq: "root" } } }
        ) {
          nodes {
            elements {
              subitems {
                value {
                  ...folder
                  ...recursiveFolder
                }
              }
              url {
                value
              }
            }
          }
        }
        allKontentItemKnowledgeCenterMarkdownPage {
          nodes {
            system {
              codename
              id
            }
            elements {
              permalink {
                name
                value
              }
            }
          }
        }
        allKontentItemReleaseNotesPage {
          nodes {
            elements {
              permalink {
                value
                name
              }
              pagename {
                value
              }
            }
            system {
              codename
              id
            }
          }
        }
        allKontentItemPostWhatsnew {
          nodes {
            elements {
              permalink {
                value
                name
              }
              pagename {
                value
              }
            }
            system {
              codename
              id
            }
          }
        }
        allKontentItemBlogReleaseNotes {
          nodes {
            elements {
              pagename {
                value
              }
              permalink {
                value
              }
            }
            system {
              codename
              id
            }
          }
        }
        allKontentItemBlogWhatsNew {
          nodes {
            elements {
              pagename {
                value
              }
              permalink {
                value
              }
            }
            system {
              codename
              id
            }
          }
        }
      }

      fragment folder on kontent_item_navigation_item {
        system {
          type
          id
        }
        elements {
          url {
            value
          }
          title {
            value
          }
        }
      }

      fragment page on kontent_item {
        ...KCMD
        ...BRN
        ...BWN
        ...RN
        ...WN
      }

      fragment KCMD on kontent_item_knowledge_center_markdown_page {
        elements {
          pagename {
            value
          }
          permalink {
            value
          }
        }
        system {
          id
          type
        }
      }

      fragment BRN on kontent_item_blog_release_notes {
        elements {
          pagename {
            value
          }
          permalink {
            value
          }
        }
        system {
          id
          type
        }
      }

      fragment BWN on kontent_item_blog_whats_new {
        elements {
          pagename {
            value
          }
          permalink {
            value
          }
        }
        system {
          id
          type
        }
      }

      fragment RN on kontent_item_release_notes_page {
        elements {
          pagename {
            value
          }
          permalink {
            value
          }
        }
        system {
          id
          type
        }
      }

      fragment WN on kontent_item_post___whatsnew {
        elements {
          pagename {
            value
          }
          permalink {
            value
          }
        }
        system {
          id
          type
        }
      }

      fragment recursiveFolder on kontent_item_navigation_item {
        system {
          type
          codename
        }
        elements {
          subitems {
            value {
              ...page
              ...folder
              ... on kontent_item_navigation_item {
                system {
                  type
                }
                elements {
                  subitems {
                    value {
                      ...page
                      ...folder
                      ... on kontent_item_navigation_item {
                        system {
                          type
                        }
                        elements {
                          subitems {
                            value {
                              ...page
                              ...folder
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `).then(result => {
      if (result.errors) {
        console.error(result.errors)
        reject(result.errors)
      }

      // _.each(result.data.allKontentItemNavigationItem.nodes, node => {
      //   const contentPage = node.elements.subitems.value[0]
      //   contentPage && createPage({
      //     path: `/${node.elements.url.value}/`,
      //     component: slash(navPagePath),
      //     context: {
      //       //check if the page is a nav item

      //       codename: `${contentPage.system.codename}`,
      //     },
      //   })
      // })

      _.each(result.data.allKontentItemNavigationItem.nodes, node => {
        const contentPage = node.elements.subitems.value[0]
        contentPage &&
          createPage({
            path: `/${node.elements.url.value}/`,
            component: slash(navPagePath),
            context: {
              slug: `${node.elements.url.value}`,
              codename: `${contentPage.system.codename}`,
            },
          })
      })

      _.each(result.data.allKontentItemBlogReleaseNotes.nodes, node => {
        createPage({
          path: `/${node.elements.permalink.value}/`,
          component: slash(BlogReleaseNotesPath),
          context: { slug: `${node.elements.permalink.value}` },
        })
      })

      _.each(result.data.allKontentItemReleaseNotesPage.nodes, node => {
        createPage({
          path: `/${node.elements.permalink.value}/`,
          component: slash(PostReleaseNotesPath),
          context: {
            systemId: node.system.id,
            slug: `${node.elements.permalink.value}`,
          },
        })
      })

      _.each(result.data.allKontentItemBlogWhatsNew.nodes, node => {
        createPage({
          path: `/${node.elements.permalink.value}/`,
          component: slash(BlogWhatsNewPath),
          context: { slug: `${node.elements.permalink.value}` },
        })
      })

      _.each(result.data.allKontentItemPostWhatsnew.nodes, node => {
        createPage({
          path: `/${node.elements.permalink.value}/`,
          component: slash(PostWhatsNewPath),
          context: {
            systemId: node.system.id,
            slug: `${node.elements.permalink.value}`,
          },
        })
      })

      _.each(
        result.data.allKontentItemKnowledgeCenterMarkdownPage.nodes,
        node => {
          createPage({
            path: `/${node.elements.permalink.value}/`,
            component: slash(PageGeneralPath),
            context: {
              systemId: node.system.id,
              slug: `${node.elements.permalink.value}`,
            },
          })
        }
      )

      resolve()
    })
  })
}
