import React, { useRef, useEffect, useState } from "react"
import styled from "styled-components"
import { graphql } from "gatsby"

import Seo from "../components/Seo"
import Tags from "../components/Tags"

import AlertComponent from "../components/AlertComponent"
import Jumpto from "../components/Jumpto"
import LpRichTextElement from "../components/LpRichTextElement"
import Breadcrumbs from "../components/Breadbrumbs"
import { customBodyContent } from "../utils"
import Footer from "../components/Footer"
import RelatedArticles from "../components/widgets/RelatedArticles"
const InnerSiteLayoutStyles = styled.main`
  width: 100%;
  display: grid;
  grid-template-areas: "sidebar content";
  grid-template-columns: repeat(auto-fit, minmax(75%, 1fr));
  @media (max-width: 1023px) {
    grid-template-columns: 1fr;
  }
  .breadcrumbs li.breadcrumb-item:nth-child(2) {
    pointer-events: none;
  }
  h2 {
    &:nth-of-type(1) {
      margin-top: 0;
      padding-top: 0;
    }
  }
  h3:not(.metrics-title, .anchor-address) {
    margin: 1.5rem 0 1rem 0;
  }
`

const KnowledgeCenterMarkdownPageTemplate = ({
  data,
  pageContext,
  location,
}) => {
  const contentRef = useRef()
  const [jumpToItems, setJumpToItems] = useState([])
  // console.log(data)
  useEffect(() => {
    if (contentRef.current && data) {
      const headerQuery = contentRef.current.querySelectorAll("h2")
      setJumpToItems([...headerQuery])
    }
  }, [data])

  // general template
  useEffect(() => {
    // console.log("page", pageNumber)
    // itemsRef.current.scrollIntoView()
    // console.log(itemsRef.current)

    if (location.hash) {
      let id = location.hash.substring(1)
      console.log(id)
      const element = document.getElementById(id)
      element.scrollIntoView({
        behavior: "auto",
        block: "center",
        inline: "center",
      })
      // element.scrollTop = 0
      window.onload = e => {
        const element = document.getElementById(id)
        console.log(element.offsetTop)
        const offset = 45
        const bodyRect = document.body.getBoundingClientRect().top
        const elementRect = element.getBoundingClientRect().top
        const elementPosition = elementRect - bodyRect
        const offsetPosition = elementPosition
        element.scrollIntoView({
          behavior: "auto",
          block: "center",
          inline: "center",
        })
        // window.scrollTo({
        //   top: elementRect, //element.offsetTop,
        //   behavior: "smooth",
        // })
      }

      // element.scrollIntoView(true)
    }
  }, [])
  const knowledgeCenterMarkdown = data?.knowledgeCenterMarkdown
  const pageTitle = knowledgeCenterMarkdown?.elements?.pagename?.value
  const pageCategory = knowledgeCenterMarkdown?.elements?.categoryname?.value
  let pageSubCategory =
    knowledgeCenterMarkdown?.elements?.subcategoryname?.value
  const pageSubTitle = knowledgeCenterMarkdown?.elements?.subtitle?.value
  const introduction = knowledgeCenterMarkdown?.elements?.introduction?.value
  const body_content = knowledgeCenterMarkdown?.elements?.body?.value
  if (pageCategory === "Troubleshooting" && pageSubCategory === "Web Messaging")
    pageSubCategory = "Messaging"
  // Tags
  const pageTags = knowledgeCenterMarkdown?.elements?.channels_supported.value

  // Related Articles
  const relatedArticlesList =
    knowledgeCenterMarkdown?.elements?.related_articles.value
  const allKontentItemNavigationItem =
    data.allKontentItemNavigationItem.nodes[0].elements.subitems.value
  let mainCatLink = allKontentItemNavigationItem.filter(
    v => v.elements.title.value.toLowerCase() === pageCategory.toLowerCase()
  )[0]
  let subCatLink = {}
  let fourthCrumbLink = ""
  let fourthCrumbTitle = ""
  console.log(
    mainCatLink,
    mainCatLink.elements?.subitems.value,
    pageSubCategory,
    knowledgeCenterMarkdown
  )
  if (mainCatLink) {
    // subCatLink
    mainCatLink.elements?.subitems.value.map(v => {
      let val = v.elements?.title?.value.replaceAll(`\n`, "")
      console.log(val)
      if (val && val.toLowerCase() === pageSubCategory.toLowerCase()) {
        subCatLink = v
        if (v?.elements?.hasOwnProperty("subitems")) {
          let getFourthCat = v.elements.subitems?.value.filter(
            v => v.system.id.toLowerCase() === pageContext.systemId
          )[0]
          if (!getFourthCat) {
            let getFourthCatSubs = v.elements.subitems.value.filter(v =>
              v?.elements.hasOwnProperty("subitems")
            )
            if (getFourthCatSubs.length) {
              getFourthCatSubs.map(fc => {
                let getFourthCat = fc?.elements?.subitems?.value.filter(
                  v => v.system.id.toLowerCase() === pageContext.systemId
                )[0]
                console.log(getFourthCat, fc)
                if (getFourthCat) {
                  fourthCrumbLink = fc?.elements?.url?.value
                  fourthCrumbTitle = fc?.elements?.title?.value
                }
                return null
              })
            }
          }
        }
      }
    })
  }

  return (
    <>
      <Seo title={pageTitle} description={pageSubTitle} />
      <div ref={contentRef}>
        <div
          className="documenttitlecontainer"
          style={{
            marginBottom: "var(--space8)",
          }}
        >
          <Breadcrumbs
            secondCrumbLink={mainCatLink?.elements?.url?.value}
            secondCrumbTitle={pageCategory}
            thirdCrumbLink={subCatLink?.elements?.url?.value}
            thirdCrumbTitle={pageSubCategory}
            fourthCrumbLink={fourthCrumbLink}
            fourthCrumbTitle={fourthCrumbTitle}
            lastCrumb={pageTitle}
          />

          <h1 className="h1">{pageTitle}</h1>

          <div className="text-body-text" id="subtitle">
            {pageSubTitle}
          </div>
          <div id="indicators">
            <Tags tags={(pageTags || []).map(({ name }) => name)} />
          </div>
        </div>
        <InnerSiteLayoutStyles>
          <div className="maincontent" id="scroll-smooth">
            {introduction !== "<p><br></p>" && (
              <div className="pb-8">
                <LpRichTextElement
                  body_content={introduction}
                  bodyfield={knowledgeCenterMarkdown?.elements?.introduction}
                />
              </div>
            )}
            {body_content.length > 0 && (
              <LpRichTextElement
                body_content={customBodyContent(body_content)}
                bodyfield={knowledgeCenterMarkdown?.elements?.body}
              />
            )}
            {relatedArticlesList.length > 0 && (
              <div id="relatedArticles">
                <RelatedArticles related={relatedArticlesList} />
              </div>
            )}
            <AlertComponent />
          </div>
          <Jumpto title={pageTitle} jumpToItems={jumpToItems} />
        </InnerSiteLayoutStyles>
      </div>
      <Footer />
    </>
  )
}

export default KnowledgeCenterMarkdownPageTemplate

export const query = graphql`
  query ($systemId: String) {
    knowledgeCenterMarkdown: kontentItemKnowledgeCenterMarkdownPage(
      system: { id: { eq: $systemId } }
    ) {
      elements {
        pagename {
          value
        }
        categoryname {
          value
        }
        subcategoryname {
          value
        }
        subtitle {
          value
        }
        body {
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
                  modular_content {
                    id
                  }
                  links {
                    url_slug
                    type
                    link_id
                    codename
                  }
                }
                type {
                  value {
                    codename
                  }
                }
              }
            }
            ... on kontent_item_faq {
              id
              elements {
                short_answer {
                  value
                }
                question {
                  value
                }
                long_answer {
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
                          modular_content {
                            id
                          }
                          links {
                            url_slug
                            type
                            link_id
                            codename
                          }
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
                faq_page {
                  value {
                    id
                  }
                }
                category {
                  type
                  value {
                    codename
                    name
                  }
                  name
                }
                related_product {
                  value {
                    id
                  }
                }
                related_article {
                  value {
                    id
                    ... on kontent_item_knowledge_center_markdown_page {
                      id
                      elements {
                        permalink {
                          value
                        }
                        pagename {
                          value
                        }
                      }
                    }
                  }
                }
              }
              system {
                codename
                name
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
        channels_supported {
          taxonomy_group
          name
          value {
            name
          }
        }
        permalink {
          value
        }
        introduction {
          value
        }
        redirects {
          value
        }
        related_articles {
          name
          value {
            system {
              codename
              name
              type
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
            }
          }
        }
      }
    }
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
`
