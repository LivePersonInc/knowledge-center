const _ = require("lodash")
const Promise = require("bluebird")
const path = require("path")
const slash = require("slash")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // let redirects = knowledgeCenterMarkdown?.elements?.redirects?.value

  // let arr = redirects.split(",").map(function (item) {
  //   return item.trim()
  // })

  const getPrevAndNextNodes = (nodes, slug) => {
    const currentIndex = nodes.findIndex(
      item => item?.elements.permalink.value === slug
    )
    let prev
    let next

    if (currentIndex < nodes.length - 1) {
      prev = nodes[currentIndex + 1]
    }
    if (currentIndex > 0) {
      next = nodes[currentIndex - 1]
    }
    return [prev, next]
  }
  const listingPages = await graphql(`
    query {
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
          }
        }
      }
    }

    fragment folder on kontent_item_navigation_item {
      system {
        id
        type
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
      ...FQ
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

    fragment FQ on kontent_item_kc_faqs {
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
        id
        type
      }
      elements {
        subitems {
          value {
            ...page
            ...folder
            ... on kontent_item_navigation_item {
              system {
                id
                type
              }
              elements {
                subitems {
                  value {
                    ...page
                    ...folder
                    ... on kontent_item_navigation_item {
                      system {
                        id
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
  `)

  const runList = (node, level, parent) => {
    let { elements, system } = node

    if (system?.type === "navigation_item") {
      if (parent) {
        createPage({
          path: `${elements.url.value}/`,
          component: require.resolve("./src/template/ItemsListing.js"),
          context: {
            ...node,
            level: level,
            parent: parent,
          },
        })
      } else {
        createPage({
          path: `${elements.url.value}/`,
          component: require.resolve("./src/template/ItemsListing.js"),
          context: {
            ...node,
            level: level,
          },
        })
      }
      if (elements?.subitems?.value && elements.subitems.value.length) {
        elements.subitems.value.forEach(node => {
          // excludeStaticProduct.push(`/product/${node.nid}/`)
          let p = { url: elements.url.value, title: elements.title.value }
          if (parent) p = { ...p, parent: parent }
          runList(node, level + 1, p)
        })
      }
    }
  }

  listingPages.data.allKontentItemNavigationItem.nodes[0].elements.subitems.value.forEach(
    node => {
      // excludeStaticProduct.push(`/product/${node.nid}/`)
      runList(node, 0)
    }
  )

  return new Promise((resolve, reject) => {
    const PostReleaseNotesPath = path.resolve(
      "./src/pages/post-release-notes.jsx"
    )
    const BlogReleaseNotesPath = path.resolve(
      "./src/pages/page-release-notes.jsx"
    )
    const BlogWhatsNewPath = path.resolve("./src/pages/page-whats-new.jsx")
    const PostWhatsNewPath = path.resolve("./src/pages/post-whats-new.jsx")
    const PageGeneralPath = path.resolve("./src/pages/page-jekyll-markdown.jsx")
    const PageFaqPath = path.resolve("./src/pages/page-faq.jsx")

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
          edges {
            node {
              id
              elements {
                redirects {
                  value
                }
                permalink {
                  value
                }
              }
            }
          }
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
              redirects {
                value
              }
            }
          }
        }
        allKontentItemReleaseNotesPage(
          sort: { order: DESC, fields: elements___date___value }
        ) {
          nodes {
            elements {
              permalink {
                value
                name
              }
              pagename {
                value
              }
              date {
                value
              }
              subtitle {
                value
                modular_content {
                  id
                  system {
                    type
                    codename
                    id
                  }
                  ... on kontent_item_video___widget {
                    id
                    elements {
                      video_id {
                        value
                      }
                      video_type {
                        value {
                          codename
                        }
                      }
                    }
                    system {
                      codename
                      type
                    }
                  }
                  ... on kontent_item_image__widget {
                    id
                    system {
                      type
                    }
                    elements {
                      description {
                        value
                      }
                      image {
                        value {
                          url
                          name
                          description
                          height
                          width
                        }
                        name
                      }
                      orientation {
                        value {
                          codename
                        }
                      }
                      product {
                        value {
                          id
                          system {
                            id
                          }
                        }
                      }
                    }
                  }
                  ... on kontent_item_code_sample {
                    id
                    system {
                      type
                      codename
                    }
                    elements {
                      code {
                        value
                      }
                      language {
                        value {
                          codename
                        }
                      }
                    }
                  }
                  ... on kontent_item_contentbox {
                    id
                    system {
                      codename
                      type
                    }
                    elements {
                      notice_text {
                        value
                      }
                      type {
                        value {
                          codename
                        }
                      }
                    }
                  }
                }
                images {
                  url
                  image_id
                }
                links {
                  url_slug
                  type
                  codename
                  link_id
                }
              }
            }
            system {
              codename
              id
            }
          }
        }
        allKontentItemPostWhatsnew(
          sort: { order: DESC, fields: elements___date___value }
        ) {
          nodes {
            elements {
              permalink {
                value
                name
              }
              pagename {
                value
              }
              subtitle {
                value
                modular_content {
                  id
                  system {
                    type
                    codename
                    id
                  }
                  ... on kontent_item_video___widget {
                    id
                    elements {
                      video_id {
                        value
                      }
                      video_type {
                        value {
                          codename
                        }
                      }
                    }
                    system {
                      codename
                      type
                    }
                  }
                  ... on kontent_item_image__widget {
                    id
                    system {
                      type
                    }
                    elements {
                      description {
                        value
                      }
                      image {
                        value {
                          url
                          name
                          description
                          height
                          width
                        }
                        name
                      }
                      orientation {
                        value {
                          codename
                        }
                      }
                      product {
                        value {
                          id
                          system {
                            id
                          }
                        }
                      }
                    }
                  }
                  ... on kontent_item_code_sample {
                    id
                    system {
                      type
                      codename
                    }
                    elements {
                      code {
                        value
                      }
                      language {
                        value {
                          codename
                        }
                      }
                    }
                  }
                  ... on kontent_item_contentbox {
                    id
                    system {
                      codename
                      type
                    }
                    elements {
                      notice_text {
                        value
                      }
                      type {
                        value {
                          codename
                        }
                      }
                    }
                  }
                }
                images {
                  url
                  image_id
                }
                links {
                  url_slug
                  type
                  codename
                  link_id
                }
              }
              date {
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
        allKontentItemKcFaqs {
          edges {
            node {
              elements {
                redirects {
                  value
                }
                permalink {
                  value
                }
              }
              id
            }
          }
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
              redirects {
                value
              }
              pagename {
                value
              }
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
          redirects {
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
        // console.error(result.errors)
        reject(result.errors)
      }

      const releaseNotesPages = result.data.allKontentItemReleaseNotesPage.nodes
      const whatsNewPages = result.data.allKontentItemPostWhatsnew.nodes

      // _.each(result.data.allKontentItemNavigationItem.nodes, node => {
      //   const contentPage = node.elements.subitems.value[0]
      //   contentPage &&
      //     createPage({
      //       path: `/${node.elements.url.value}/`,
      //       component: slash(navPagePath),
      //       context: {
      //         slug: `${node.elements.url.value}`,
      //         codename: `${contentPage.system.codename}`,
      //       },
      //     })
      // })

      _.each(result.data.allKontentItemBlogReleaseNotes.nodes, node => {
        createPage({
          path: `/${node.elements.permalink.value}/`,
          component: slash(BlogReleaseNotesPath),
          context: { slug: `${node.elements.permalink.value}` },
        })
      })

      _.each(releaseNotesPages, node => {
        const [prev, next] = getPrevAndNextNodes(
          releaseNotesPages,
          node.elements.permalink.value
        )

        createPage({
          path: `/release-notes/${node.elements.permalink.value}/`,
          component: slash(PostReleaseNotesPath),
          context: {
            systemId: node.system.id,
            slug: `${node.elements.permalink.value}`,
            prev: prev ? prev.elements : null,
            next: next ? next.elements : null,
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

      _.each(whatsNewPages, node => {
        const [prev, next] = getPrevAndNextNodes(
          whatsNewPages,
          node.elements.permalink.value
        )

        createPage({
          path: `/whats-new/${node.elements.permalink.value}/`,
          component: slash(PostWhatsNewPath),
          context: {
            systemId: node.system.id,
            slug: `${node.elements.permalink.value}`,
            prev: prev ? prev.elements : null,
            next: next ? next.elements : null,
          },
        })
      })

      _.each(result.data.allKontentItemKcFaqs.nodes, node => {
        createPage({
          path: `/${node.elements.permalink.value}/`,
          component: slash(PageFaqPath),
          context: {
            systemId: node.system.id,
            slug: `${node.elements.permalink.value}`,
          },
        })

        let redirectPagePaths = node.elements.redirects.value
        let newRedirectPagePaths = redirectPagePaths.split(",")

        _.each(newRedirectPagePaths, pagePath => {
          let newPagePath = pagePath.replace(/ /g, "")
          if (newPagePath.length === 0) return
          actions.createRedirect({
            fromPath: `/${newPagePath}`,
            isPermanent: true,
            redirectInBrowser: true,
            toPath: `/${node.elements.permalink.value}/`,
          })
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

          let redirectPagePaths = node.elements.redirects.value
          let newRedirectPagePaths = redirectPagePaths.split(",")

          _.each(newRedirectPagePaths, pagePath => {
            let newPagePath = pagePath.replace(/ /g, "")
            if (newPagePath.length === 0) return
            actions.createRedirect({
              fromPath: `/${newPagePath}`,
              isPermanent: true,
              redirectInBrowser: true,
              toPath: `/${node.elements.permalink.value}/`,
            })
          })
        }
      )

      resolve()
    })
  })
}
