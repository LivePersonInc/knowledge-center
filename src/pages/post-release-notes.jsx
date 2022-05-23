import React, { useRef, useEffect, useState } from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
// import moment from "moment"

import Seo from "../components/Seo"
import Jumpto from "../components/Jumpto"
import LpRichTextElement from "../components/LpRichTextElement"
import Breadcrumbs from "../components/Breadbrumbs"
import PagePagination from "../components/PagePagination"
import { customBodyContent } from "../utils"
import Footer from "../components/Footer"

const InnerSiteLayoutStyles = styled.main`
  width: 100%;
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
  const contentRef = useRef()
  const [jumpToItems, setJumpToItems] = useState([])
  useEffect(() => {
    if (contentRef.current && data) {
      const headerQuery = contentRef.current.querySelectorAll("h2")
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
            secondCrumbLink="release-notes"
            secondCrumbTitle="Release notes"
            lastCrumb={pageTitle}
          />
          <h1 className="h1">{pageTitle}</h1>
        </div>
        <InnerSiteLayoutStyles>
          <div className="maincontent mb-8">
            <LpRichTextElement
              body_content={pageSubTitle}
              bodyfield={releaseNotesPage?.elements?.subtitle}
            />
            {product_release_notes.map(node => (
              <div
                className="mt-10"
                key={node?.elements?.version_number?.value}
              >
                <div className="release-notes-item flex items-center gap-3">
                  {/* Title  */}

                  {node?.elements?.product_name?.value.map((node, k) => {
                    return (
                      <>
                        <h2
                          className="anchor-address  h2"
                          id={`${encodeURI(node?.system?.name)}`}
                          style={{ margin: 0 }}
                          key={k}
                        >
                          {node?.system?.name}
                          <a
                            data-tip="Click to copy direct link to this section"
                            className="anchor-link tooltip tooltip-bottom tooltip-primary"
                            href={`#${encodeURI(node?.system?.name)}`}
                            onClick={() => {
                              navigator.clipboard.writeText(
                                window.location.origin +
                                  window.location.pathname +
                                  `#${encodeURI(node?.system?.name)}`
                              )
                            }}
                          >
                            {/* anchor icon */}
                            <svg
                              width="21"
                              height="22"
                              viewBox="0 0 21 22"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g opacity="0.9">
                                <path
                                  d="M19.7979 2.16181C21.36 3.7239 21.36 6.25656 19.7979 7.81866L16.9694 10.6471C16.1312 11.4853 15.0127 11.8737 13.9166 11.8124C13.6408 11.797 13.4298 11.561 13.4452 11.2853C13.4607 11.0096 13.6967 10.7985 13.9724 10.814C14.7963 10.86 15.6337 10.5686 16.2623 9.93998L19.0908 7.11155C20.2623 5.93998 20.2623 4.04049 19.0908 2.86891C17.9192 1.69734 16.0197 1.69734 14.8481 2.86891L12.0197 5.69734C11.3911 6.32596 11.0997 7.16333 11.1457 7.9873C11.1611 8.26301 10.9501 8.49901 10.6744 8.51443C10.3987 8.52984 10.1627 8.31882 10.1473 8.04311C10.086 6.94698 10.4743 5.82847 11.3126 4.99023L14.141 2.16181C15.7031 0.59971 18.2358 0.59971 19.7979 2.16181Z"
                                  fill="var(--link-color)"
                                />
                                <path
                                  d="M2.12128 19.8382C0.559183 18.2761 0.559183 15.7434 2.12128 14.1813L4.94971 11.3529C5.78794 10.5147 6.90646 10.1263 8.00258 10.1876C8.2783 10.203 8.48931 10.439 8.4739 10.7147C8.45849 10.9904 8.22248 11.2015 7.94677 11.186C7.1228 11.14 6.28543 11.4314 5.65681 12.06L2.82839 14.8884C1.65681 16.06 1.65681 17.9595 2.82839 19.1311C3.99996 20.3027 5.89945 20.3027 7.07103 19.1311L9.89945 16.3027C10.5281 15.674 10.8195 14.8367 10.7734 14.0127C10.758 13.737 10.969 13.501 11.2447 13.4856C11.5205 13.4702 11.7565 13.6812 11.7719 13.9569C11.8331 15.053 11.4448 16.1715 10.6066 17.0098L7.77813 19.8382C6.21604 21.4003 3.68338 21.4003 2.12128 19.8382Z"
                                  fill="var(--link-color)"
                                />
                                <path
                                  d="M6.71745 14.5351C6.52219 14.7304 6.52219 15.047 6.71745 15.2422C6.91271 15.4375 7.2293 15.4375 7.42456 15.2422L15.2027 7.46405C15.398 7.26879 15.398 6.95221 15.2027 6.75694C15.0075 6.56168 14.6909 6.56168 14.4956 6.75694L6.71745 14.5351Z"
                                  fill="var(--link-color)"
                                />
                              </g>
                            </svg>
                          </a>
                        </h2>
                      </>
                    )
                  })}
                </div>
                {/* Features */}
                {node.elements.features.value !== "<p><br></p>" && (
                  <div>
                    <h3 className="h3 mt-4 mb-2">Features</h3>
                    <LpRichTextElement
                      body_content={node?.elements?.features?.value}
                      bodyfield={node?.elements?.features}
                    />
                  </div>
                )}
                {/* enhancements */}
                {node.elements.enhancements.value !== "<p><br></p>" && (
                  <div>
                    <h3 className="h3 mt-4 mb-2">Enhancements</h3>
                    <LpRichTextElement
                      body_content={customBodyContent(
                        node?.elements?.enhancements?.value
                      )}
                      bodyfield={node?.elements?.enhancements}
                    />
                  </div>
                )}
                {/* Fixes */}
                {node.elements.fixes.value !== "<p><br></p>" && (
                  <div>
                    <h3 className="h3 mt-4 mb-2">Fixes</h3>
                    <LpRichTextElement
                      body_content={node?.elements?.fixes?.value}
                      bodyfield={node?.elements?.fixes}
                    />
                  </div>
                )}
              </div>
            ))}
            <PagePagination prev={prev} next={next} pagetype="release-notes" />
          </div>
          <Jumpto title={pageTitle} jumpToItems={jumpToItems} />
        </InnerSiteLayoutStyles>
      </div>
      <Footer />
    </>
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
                  links {
                    codename
                    link_id
                    type
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
        product_release_notes {
          value {
            id
            ... on kontent_item_product_release_notes {
              id
              elements {
                version_number {
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
                    id
                  }
                }
                fixes {
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
                          links {
                            codename
                            link_id
                            type
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
                }
                features {
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
                          links {
                            codename
                            link_id
                            type
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
                }
                enhancements {
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
