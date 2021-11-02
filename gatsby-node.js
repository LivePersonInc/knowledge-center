const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
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
      allKontentItemKcProductOverview {
        nodes {
          system {
            codename
            id
          }
          elements {
            url_slug {
              name
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
      allKontentItemReleaseNotes {
        nodes {
          system {
            codename
            id
          }
          elements {
            url_slug {
              value
              name
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
      ...PO
      ...RN
      ...KCMD
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

    fragment RN on kontent_item_release_notes {
      elements {
        title {
          value
        }
        url_slug {
          value
        }
      }
      system {
        id
        type
      }
    }

    fragment PO on kontent_item_kc_product_overview {
      elements {
        title {
          value
        }
        url_slug {
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
  `)

  const pages =
    result.data.allKontentItemNavigationItem.nodes[0].elements.subitems.value

  const walkTree = (item, url, crumbs) => {
    if (item.system.type === "navigation_item") {
      const newUrl =
        url !== "" ? `${item.elements.url.value}` : item.elements.url.value
      const folderCrumbs = crumbs
      folderCrumbs.push(item.elements.title.value)
      item.elements.subitems.value.forEach(item =>
        walkTree(item, newUrl, folderCrumbs)
      )
      createPage({
        // path: `/${url}-${item.elements.url_slug.value}`,
        path: `/${item.elements.url.value}`,
        component: path.resolve(`./src/pages/nav-page.js`),
        context: {
          systemId: item.system.id,
        },
      })
    } else if (item.system.type === "kc_product_overview") {
      const pageCrumbs = [...crumbs]
      pageCrumbs.push(item.elements.title.value)
      createPage({
        path: `/${item.elements.url_slug.value}`,
        component: path.resolve(`./src/pages/page-overview.js`),
        context: {
          breadCrumbs: pageCrumbs,
          systemId: item.system.id,
        },
      })
    } else if (item.system.type === "release_notes") {
      createPage({
        path: `/${item.elements.url_slug.value}`,
        component: path.resolve(`./src/pages/page-release-notes.js`),
        context: {
          systemId: item.system.id,
        },
      })
    } else if (item.system.type === "knowledge_center_markdown_page") {
      const pageCrumbs = [...crumbs]
      pageCrumbs.push(item.elements.pagename.value)
      createPage({
        path: `/${item.elements.permalink.value}`,
        component: path.resolve(`./src/pages/page-jekyll-markdown.js`),
        context: {
          breadCrumbs: pageCrumbs,
          systemId: item.system.id,
        },
      })
    }
  }

  // Create pages
  pages.forEach(node => {
    walkTree(node, "", [])
  })
}
