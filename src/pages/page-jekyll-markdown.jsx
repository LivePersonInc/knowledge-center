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

const InnerSiteLayoutStyles = styled.main`
  width: 100%;
  display: grid;
  grid-template-areas: "sidebar content";
  grid-template-columns: repeat(auto-fit, minmax(75%, 1fr));
  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
  .breadcrumbs li.breadcrumb-item:nth-child(2) {
    pointer-events: none;
  }
`

const KnowledgeCenterMarkdownPageTemplate = ({ data, pageContext }) => {
  const contentRef = useRef()
  const [jumpToItems, setJumpToItems] = useState([])
  useEffect(() => {
    if (contentRef.current && data) {
      const headerQuery = contentRef.current.querySelectorAll("h2,h3")
      setJumpToItems([...headerQuery])
    }
  }, [data])

  // general template
  const knowledgeCenterMarkdown = data?.knowledgeCenterMarkdown
  const pageTitle = knowledgeCenterMarkdown?.elements?.pagename?.value
  const pageCategory = knowledgeCenterMarkdown?.elements?.categoryname?.value
  const pageSubTitle = knowledgeCenterMarkdown?.elements?.subtitle?.value
  const introduction = knowledgeCenterMarkdown?.elements?.introduction?.value
  const body_content = knowledgeCenterMarkdown?.elements?.body?.value

  // Tags
  const pageTags = knowledgeCenterMarkdown?.elements?.channels_supported.value

  return (
    <>
      <Seo title={pageTitle} description={pageSubTitle} />
      <div ref={contentRef}>
        <div
          className="documenttitlecontainer"
          style={{
            borderBottom: "1px solid var(--card-border)",
            marginBottom: "1.5rem",
          }}
        >
          <Breadcrumbs
            secondCrumbLink=""
            secondCrumbTitle={pageCategory}
            thirdCrumb={pageTitle}
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
            {introduction.length > 0 && (
              <LpRichTextElement
                body_content={introduction}
                bodyfield={knowledgeCenterMarkdown?.elements?.introduction}
              />
            )}
            {body_content.length > 0 && (
              <LpRichTextElement
                body_content={customBodyContent(body_content)}
                bodyfield={knowledgeCenterMarkdown?.elements?.body}
              />
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
      }
    }
    allKontentItemNavigationItem {
      nodes {
        elements {
          url {
            value
          }
          title {
            value
          }
        }
      }
    }
  }
`
