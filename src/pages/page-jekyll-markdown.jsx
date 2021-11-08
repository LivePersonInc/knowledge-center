import React, { useRef, useEffect, useState } from "react"
import styled from "styled-components"
import { graphql, Link } from "gatsby"
import {
  RichTextElement,
  ImageElement,
} from "@kentico/gatsby-kontent-components"
import get from "lodash/get"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import Tags from "../components/Tags"
import Breadcrumbs from "../components/Breadbrumbs"
import AlertComponent from "../components/AlertComponent"
import Jumpto from "../components/Jumpto"

const InnerSiteLayoutStyles = styled.main`
  width: 100%;
  display: grid;
  grid-template-areas: "sidebar content";
  grid-template-columns: repeat(auto-fit, minmax(75%, 1fr));
  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`

const KnowledgeCenterMarkdownPageTemplate = ({ data, pageContext }) => {
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
  const knowledgeCenterMarkdown = data?.knowledgeCenterMarkdown
  const pageTitle = knowledgeCenterMarkdown?.elements?.pagename?.value
  const pageCategory = knowledgeCenterMarkdown?.elements?.categoryname?.value
  const pageSubTitle = knowledgeCenterMarkdown?.elements?.subtitle?.value
  const body_content = knowledgeCenterMarkdown?.elements?.body?.value

  // Nav page

  const navPageLink = data?.allKontentItemNavigationItem

  // Tags
  const pageTags = knowledgeCenterMarkdown?.elements?.channels_supported.value

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
                <Link to="/">{pageCategory}</Link>
              </li>
              <li className="breadcrumb-item no-after">{pageTitle}</li>
            </ul>
          </div>
          <Breadcrumbs
            breadCrumbs={pageContext.breadCrumbs}
            breadLink={navPageLink}
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
          <div className="maincontent">
            <RichTextElement
              value={body_content}
              images={knowledgeCenterMarkdown?.elements?.body.images}
              links={knowledgeCenterMarkdown?.elements?.body.links}
              linkedItems={
                knowledgeCenterMarkdown?.elements?.body.modular_content
              }
              resolveImage={image => {
                return (
                  <ImageElement
                    image={image}
                    alt="{image.description ? image.description : image.name}"
                    width={200}
                  />
                )
              }}
              resolveLink={(link, domNode) => {
                // const parentItemType =
                //   knowledgeCenterMarkdown?.elements?.body.type

                // It is possible to use external data for resolution
                return (
                  <Link to={`/${link?.url_slug || "#"}`}>
                    {domNode.children[0].data}
                  </Link>
                )
              }}
              resolveLinkedItem={linkedItem => {
                switch (get(linkedItem, "system.type")) {
                  case "video___widget": {
                    return (
                      <div className="my-6 aspect-w-16 aspect-h-9">
                        <iframe
                          title={linkedItem.elements.video_id.value}
                          className="mx-auto w-full"
                          src={
                            `https://player.vimeo.com/video/` +
                            linkedItem.elements.video_id.value +
                            `?h=038e0fbc6f`
                          }
                          width={640}
                          height={360}
                          frameBorder={0}
                          allow="autoplay; fullscreen; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    )
                  }
                  case "image__widget": {
                    return (
                      <div
                        className={
                          "my-6 " +
                          linkedItem.elements.orientation.value[0].codename +
                          " flex p-4"
                        }
                        className="my-6 text-center"
                        key={linkedItem.system.id}
                      >
                        {linkedItem.elements.orientation.value[0].codename ===
                          "horizontal" && (
                          <ImageElement
                            imgStyle={{ objectFit: `contain` }}
                            options={{
                              fit: "clip",
                            }}
                            image={linkedItem.elements.image.value[0]}
                            alt={
                              linkedItem.elements.image.description
                                ? linkedItem.elements.image.description
                                : linkedItem.elements.image.name
                            }
                            width={1000}
                            height={500}
                            backgroundColor="#bbbbbb"
                          />
                        )}

                        {linkedItem.elements.orientation.value[0].codename ===
                          "vertical" && (
                          <div>
                            <ImageElement
                              imgStyle={{ objectFit: `contain` }}
                              options={{
                                fit: "clip",
                              }}
                              className="mx-auto"
                              image={linkedItem.elements.image.value[0]}
                              width={320}
                              height={569}
                              backgroundColor="#bbbbbb"
                              alt={
                                linkedItem.elements.image.description
                                  ? linkedItem.elements.image.description
                                  : linkedItem.elements.image.name
                              }
                            />
                          </div>
                        )}
                        <p className="text-center my-2">
                          {linkedItem.elements.description.value}
                        </p>
                      </div>
                    )
                  }

                  case "code_sample": {
                    return (
                      <div
                        data-sal="fade"
                        data-sal-duration="2000"
                        data-sal-easing="ease"
                        className="my-6"
                        style={{
                          background: "var(--card-background)",
                          whiteSpace: "break-spaces",
                        }}
                      >
                        <h5 className="text-card-text text-sm mb-1 uppercase">
                          {linkedItem.elements.language.value[0].codename}:
                        </h5>
                        <div className="code_sample border p-4">
                          <code>{linkedItem.elements.code.value}</code>
                        </div>
                      </div>
                    )
                  }
                  case "contentbox": {
                    return (
                      <div
                        data-sal="fade"
                        data-sal-duration="2000"
                        data-sal-easing="ease"
                        className="my-6"
                        key={linkedItem.elements.id}
                      >
                        <div
                          className={
                            "content-widget " +
                            linkedItem.elements.type.value[0].codename +
                            " flex p-4"
                          }
                        >
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill={
                                  "var(--" +
                                  linkedItem.elements.type.value[0].codename +
                                  "-color)"
                                }
                                fillRule="evenodd"
                                d={
                                  (linkedItem.elements.type.value[0]
                                    .codename === "notice" &&
                                    "M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm10.838 1.184a.842.842 0 01-1.683 0l-.125-4.185A.97.97 0 1112.969 9l-.131 4.184zM13 16a1 1 0 11-2 0 1 1 0 012 0z") ||
                                  (linkedItem.elements.type.value[0]
                                    .codename === "warning" &&
                                    "M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm6.136-5.12a.9.9 0 00-1.272 1.272l3.863 3.864-3.863 3.863a.9.9 0 001.272 1.273L12 13.288l3.864 3.864a.9.9 0 001.273-1.273l-3.864-3.864 3.864-3.863a.9.9 0 10-1.273-1.273L12 10.743 8.136 6.879z") ||
                                  (linkedItem.elements.type.value[0]
                                    .codename === "success" &&
                                    "M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm5.601 7.176a.9.9 0 10-1.273-1.273l-6.341 6.341-2.39-2.39a.9.9 0 00-1.273 1.273l3.663 3.663L17.6 9.176z")
                                }
                                clipRule="evenodd"
                                opacity="0.9"
                              ></path>
                            </svg>
                          </div>
                          <div
                            className="px-3"
                            dangerouslySetInnerHTML={{
                              __html: linkedItem.elements.notice_text.value,
                            }}
                          />
                        </div>
                      </div>
                    )
                  }

                  default: {
                    return null
                  }
                }
              }}
              resolveDomNode={(domNode, domToReact) => {
                if (domNode.name === "table") {
                  // For options - check https://www.npmjs.com/package/html-react-parser#options
                  return (
                    <div className="overflow-x-auto">
                      <div className="tablelp w-full table-compact">
                        {domToReact([domNode])}
                      </div>
                    </div>
                  )
                }
              }}
            />
            <AlertComponent />
          </div>
          <Jumpto title={pageTitle} jumpToItems={jumpToItems} />
        </InnerSiteLayoutStyles>
      </div>
    </Layout>
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
