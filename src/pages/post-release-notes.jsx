import React, { useRef, useEffect, useState } from "react"
import styled from "styled-components"
import { graphql, Link } from "gatsby"

import Layout from "../components/Layout"
import Seo from "../components/Seo"
import AlertComponent from "../components/AlertComponent"
import Jumpto from "../components/Jumpto"
import LpRichTextElemenet from "../components/LpRichTextElemenet"

const InnerSiteLayoutStyles = styled.main`
  width: 100%;
  display: grid;
  grid-template-areas: "sidebar content";
  grid-template-columns: repeat(auto-fit, minmax(75%, 1fr));
  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`

const ReleaseNotesPostTemplate = ({ data, pageContext }) => {
  console.log("itay")
  console.log(data)
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
  console.log(releaseNotesPage)

  const pageTitle = releaseNotesPage?.elements?.pagename?.value
  // const pageCategory = releaseNotesPage?.elements?.categoryname?.value
  const pageSubTitle = releaseNotesPage?.elements?.subtitle?.value

  // Tags
  // const pageTags = releaseNotesPage?.elements?.channels_supported.value

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
          <div className="text-sm breadcrumbs">
            <ul>
              <li className="breadcrumb-item">
                <Link to="/">Knowledge Center</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/news-releases">News & Releases</Link>
              </li>
              <li className="breadcrumb-item no-after">{pageTitle}</li>
            </ul>
          </div>
          {/* <Breadcrumbs
            breadCrumbs={pageContext.breadCrumbs}
            breadLink={navPageLink}
          /> */}
          <h1 className="h1">{pageTitle}</h1>

          {/* <div id="indicators">
            <Tags tags={(pageTags || []).map(({ name }) => name)} />
          </div> */}
        </div>
        <InnerSiteLayoutStyles>
          <div className="maincontent">
            <LpRichTextElemenet
              body_content={pageSubTitle}
              bodyfield={releaseNotesPage?.elements?.subtitle}
            />

            <AlertComponent />
          </div>
          <Jumpto title={pageTitle} jumpToItems={jumpToItems} />
        </InnerSiteLayoutStyles>
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
      }
    }
  }
`
