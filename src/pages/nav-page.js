import React from "react"

import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"

const NavPage = ({ data }) => {
  //console.log(data)

  const allKontentItemNavigationItem = data?.allKontentItemNavigationItem
  const navPageData =
    data?.allKontentItemNavigationItem?.nodes[0]?.elements?.subitems.value[0]
      .elements

  console.log(navPageData)
  // console.log(navPageDataSubitems)
  return (
    <Layout>
      <div>
        <h2>
          {navPageData?.title.value}
          {allKontentItemNavigationItem?.nodes[0]?.elements?.url?.value}
        </h2>
        <ul>
          {navPageData?.elements?.subitems?.value.map(node => (
            <li key={node?.elements?.url?.value}>
              <Link to={`/${node?.elements?.url?.value}`}>
                {node?.elements?.title?.value}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export default NavPage

export const query = graphql`
  {
    allKontentItemNavigationItem(
      filter: { system: { codename: { eq: "root" } } }
    ) {
      nodes {
        elements {
          subitems {
            value {
              ... on kontent_item_kc_product_overview {
                id
                elements {
                  title {
                    value
                  }
                  url_slug {
                    value
                  }
                }
              }
              ... on kontent_item_knowledge_center_markdown_page {
                id
                elements {
                  pagename {
                    value
                  }
                  permalink {
                    value
                  }
                }
                system {
                  type
                }
              }
              ... on kontent_item_navigation_item {
                id
                elements {
                  title {
                    value
                  }
                  url {
                    value
                  }
                  subitems {
                    value {
                      ... on kontent_item_kc_product_overview {
                        id
                        elements {
                          title {
                            value
                          }
                          url_slug {
                            value
                          }
                        }
                      }
                      ... on kontent_item_knowledge_center_markdown_page {
                        id
                        elements {
                          pagename {
                            value
                          }
                          permalink {
                            value
                          }
                        }
                        system {
                          type
                        }
                      }
                      ... on kontent_item_navigation_item {
                        id
                        elements {
                          subitems {
                            value {
                              ... on kontent_item_kc_product_overview {
                                id
                                elements {
                                  title {
                                    value
                                  }
                                  url_slug {
                                    value
                                  }
                                }
                              }
                              ... on kontent_item_knowledge_center_markdown_page {
                                id
                                elements {
                                  pagename {
                                    value
                                  }
                                  permalink {
                                    value
                                  }
                                }
                                system {
                                  type
                                }
                              }
                              ... on kontent_item_navigation_item {
                                id
                                elements {
                                  title {
                                    value
                                  }
                                  url {
                                    value
                                  }
                                  subitems {
                                    value {
                                      ... on kontent_item_kc_product_overview {
                                        id
                                        elements {
                                          title {
                                            value
                                          }
                                          url_slug {
                                            value
                                          }
                                        }
                                        system {
                                          type
                                        }
                                      }
                                      ... on kontent_item_knowledge_center_markdown_page {
                                        id
                                        elements {
                                          pagename {
                                            value
                                          }
                                          permalink {
                                            value
                                          }
                                        }
                                        system {
                                          type
                                        }
                                      }
                                    }
                                  }
                                }
                                system {
                                  type
                                }
                              }
                            }
                          }
                          title {
                            value
                          }
                          url {
                            value
                          }
                        }
                        system {
                          type
                        }
                      }
                      system {
                        type
                      }
                    }
                  }
                }
                system {
                  type
                }
              }
            }
          }
        }
      }
    }
  }
`
