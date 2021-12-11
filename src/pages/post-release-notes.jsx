import React, { useRef, useEffect, useState } from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import moment from "moment"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import AlertComponent from "../components/AlertComponent"
import Jumpto from "../components/Jumpto"
import LpRichTextElement from "../components/LpRichTextElement"
import Breadcrumbs from "../components/Breadbrumbs"
import Pagination from "../components/Pagination"

const InnerSiteLayoutStyles = styled.main`
  width: 100%;
  display: grid;
  grid-template-areas: "sidebar content";
  grid-template-columns: repeat(auto-fit, minmax(70%, 30%));
  @media (max-width: 1100px) {
    flex-direction: column;
    display: flex;
    gap: 1rem;
  }
`

const ReleaseNotesPostTemplate = ({ data, pageContext }) => {
  const contentRef = useRef()
  const [jumpToItems, setJumpToItems] = useState([])
  useEffect(() => {
    if (contentRef.current && data) {
      const headerQuery = contentRef.current.querySelectorAll("h2,h3")
      setJumpToItems([...headerQuery])
    }
  }, [data])

  // general template
  const releaseNotesPage = data?.releaseNotesPage
  const pageTitle = releaseNotesPage?.elements?.pagename?.value
  // const pageCategory = releaseNotesPage?.elements?.categoryname?.value
  const pageSubTitle = releaseNotesPage?.elements?.subtitle?.value

  const product_release_notes =
    releaseNotesPage?.elements?.product_release_notes?.value
  // Tags
  // const pageTags = releaseNotesPage?.elements?.channels_supported.value

  // Prev and Next Slug ReleaseNotes
  const { prev, next } = pageContext

  return (
    <Layout title={pageTitle} jumpToItems={jumpToItems}>
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
            secondCrumbLink="news-releases"
            secondCrumbTitle="News & Releases"
            thirdCrumb={pageTitle}
          />
          <h1 className="h1">{pageTitle}</h1>
        </div>
        <InnerSiteLayoutStyles>
          <div className="maincontent mb-10">
            <LpRichTextElement
              body_content={pageSubTitle}
              bodyfield={releaseNotesPage?.elements?.subtitle}
            />
            {product_release_notes.map(node => (
              <div
                className="mt-10"
                key={node?.elements?.release_version_number?.value}
              >
                <div className="release-notes-item flex items-center gap-3">
                  {/* Title  */}
                  <h2 className="h4" style={{ margin: 0 }}>
                    {node?.elements?.product_name?.value.map(node => (
                      <div key={node?.system?.name}>{node?.system?.name}</div>
                    ))}
                  </h2>{" "}
                  <h4 className="h4" style={{ margin: 0 }}>
                    <time
                      className="release-notes-item-time flex items-center"
                      dateTime={moment(
                        node?.elements?.release_date?.value
                      ).format("MMMM D, YYYY HH:mm")}
                      data-kontent-element-codename="date"
                    >
                      {moment(node?.elements?.release_date?.value).format(
                        "MMMM YY"
                      )}
                    </time>
                  </h4>
                </div>

                {/* Features */}
                <h5 className="h5 mt-6 mb-2">Features</h5>
                <LpRichTextElement
                  body_content={node?.elements?.features?.value}
                  bodyfield={node?.elements?.features}
                />
                {/* {node?.elements?.release_version_number?.value} */}

                {/* Fixes */}
                <h5 className="h5 mt-6 mb-2">Fixes</h5>
                <LpRichTextElement
                  body_content={node?.elements?.fixes?.value}
                  bodyfield={node?.elements?.fixes}
                />

                {/* enhancements */}
                <h5 className="h5 mt-6 mb-2">Enhancements</h5>
                <LpRichTextElement
                  body_content={node?.elements?.enhancements?.value}
                  bodyfield={node?.elements?.enhancements}
                />
              </div>
            ))}

            <AlertComponent />
          </div>
          <Jumpto title={pageTitle} jumpToItems={jumpToItems} />
        </InnerSiteLayoutStyles>
        <Pagination prev={prev} next={next} />
      </div>
    </Layout>
  )
}

export default ReleaseNotesPostTemplate

export const query = graphql`
  query ($systemId: String) {
    releaseNotesPage: kontentItemReleaseNotesPage(
      system: { id: { eq: $systemId } }
    ) {
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
        product_release_notes {
          value {
            id
            ... on kontent_item_product_release_notes {
              id
              elements {
                release_version_number {
                  value
                }
                release_date {
                  value
                }
                product_name {
                  value {
                    system {
                      name
                    }
                    ... on kontent_item_product_release_notes {
                      id
                      system {
                        name
                      }
                    }
                  }
                }
                fixes {
                  value
                }
                features {
                  value
                }
                enhancements {
                  value
                }
                channels_supported {
                  value {
                    name
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
