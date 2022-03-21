import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import Seo from "../components/Seo"
import LpRichTextElement from "../components/LpRichTextElement"
import PostSidebar from "../components/postSidebar"
import Breadcrumbs from "../components/Breadbrumbs"
import PagePagination from "../components/PagePagination"
import Footer from "../components/Footer"
import { customBodyContent } from "../utils"

const InnerSiteLayoutStyles = styled.main`
  width: 100%;
  display: -ms-grid;
  display: grid;
  grid-template-areas: "sidebar content";
  grid-template-columns: repeat(auto-fit, minmax(70%, 30%));
  @media (max-width: 1023px) {
    flex-direction: column;
    display: flex;
    gap: 1rem;
  }
`

const ReleaseNotesPostTemplate = ({ data, pageContext }) => {
  // whatsNew template
  const whatsNew = data?.whatsNew
  // Prev and Next Slug ReleaseNotes
  const { prev, next } = pageContext

  const pageTitle = whatsNew?.elements?.pagename?.value
  const pageBody = whatsNew?.elements?.body?.value
  // const pageCategory = whatsNew?.elements?.categoryname?.value
  const pageSubTitle = whatsNew?.elements?.subtitle?.value
  // Tags
  // const pageTags = whatsNew?.elements?.channels_supported.value

  return (
    <>
      <Seo title={pageTitle} description={pageSubTitle} />
      {/* <div ref={contentRef}> */}
      <div>
        <div
          className="documenttitlecontainer"
          style={{
            marginBottom: "var(--space8)",
          }}
        >
          <Breadcrumbs
            secondCrumbLink="whats-new"
            secondCrumbTitle="What's New"
            thirdCrumb={pageTitle}
          />
          <h1 className="h1">{pageTitle}</h1>
        </div>
        <InnerSiteLayoutStyles>
          <div className="maincontent mb-8">
            <LpRichTextElement
              body_content={pageSubTitle}
              bodyfield={whatsNew?.elements?.subtitle}
            />

            <LpRichTextElement
              body_content={customBodyContent(pageBody)}
              bodyfield={whatsNew?.elements?.body}
            />

            {/* <AlertComponent /> */}
            {/* {products_mentioned */}
            <PagePagination prev={prev} next={next} pagetype="whats-new" />
          </div>
          <PostSidebar />
        </InnerSiteLayoutStyles>
      </div>
      <Footer />
    </>
  )
}

export default ReleaseNotesPostTemplate

export const query = graphql`
  query ($systemId: String) {
    whatsNew: kontentItemPostWhatsnew(system: { id: { eq: $systemId } }) {
      elements {
        pagename {
          value
        }
        permalink {
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
                  links {
                    url_slug
                    type
                    link_id
                    codename
                  }
                  modular_content {
                    id
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
                  links {
                    codename
                    type
                    link_id
                    url_slug
                  }
                  modular_content {
                    id
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
      }
    }
  }
`
