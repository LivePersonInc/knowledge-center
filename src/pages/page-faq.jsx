import React, { useEffect } from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import Seo from "../components/Seo"
import Tags from "../components/Tags"
import AlertComponent from "../components/AlertComponent"
import LpRichTextElement from "../components/LpRichTextElement"
import Breadcrumbs from "../components/Breadbrumbs"
import Footer from "../components/Footer"
import RelatedArticles from "../components/widgets/RelatedArticles"
import FaqWidget from "../components/widgets/Faq/FaqWidget"

const InnerSiteLayoutStyles = styled.main`
  width: 100%;
`

const FaqTemplate = ({ data, pageContext, location }) => {
  // faqPageQuery template
  const faqPageQuery = data?.faqPageQuery
  // console.log(location)
  // Prev and Next Slug ReleaseNotes
  // const { prev, next } = pageContext
  useEffect(() => {
    if (location.hash) {
      let id = location.hash.substring(1)
      // const objDiv = document.getElementById(id)
      // objDiv.scrollTop = 0
      window.onload = e => {
        const element = document.getElementById(id)
        console.log(element.offsetTop)
        // element.scrollTop = 0

        window.scrollTo({
          top: element.offsetTop,
          behavior: "smooth",
        })
      }
    }
  }, [location.hash])
  const pageTitle = faqPageQuery?.elements?.pagename?.value

  // const pageCategory = faqPageQuery?.elements?.categoryname?.value
  const pageSubTitle = faqPageQuery?.elements?.subtitle?.value
  const introduction = faqPageQuery?.elements?.introduction?.value
  // Tags
  const pageTags = faqPageQuery?.elements?.product_category.value

  // Related Articles
  const relatedArticlesList = faqPageQuery?.elements?.related_articles.value

  const faqList = faqPageQuery?.elements?.faq_items.value

  return (
    <>
      <Seo title={pageTitle} description={pageSubTitle} />
      <div>
        <div
          className="documenttitlecontainer"
          style={{
            marginBottom: "var(--space8)",
          }}
        >
          <Breadcrumbs
            secondCrumbLink="faqs"
            secondCrumbTitle="FAQs"
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
                  bodyfield={faqPageQuery?.elements?.introduction}
                />
              </div>
            )}
            {faqList.length > 0 && (
              <div className="FaqWidget gap-4 flex flex-col mb-8">
                <FaqWidget questions={faqList} />
              </div>
            )}
            {relatedArticlesList.length > 0 && (
              <div id="relatedArticles">
                <RelatedArticles related={relatedArticlesList} />
              </div>
            )}
            <AlertComponent />
          </div>
        </InnerSiteLayoutStyles>
      </div>
      <Footer />
    </>
  )
}

export default FaqTemplate

export const query = graphql`
  query ($systemId: String) {
    faqPageQuery: kontentItemKcFaqs(system: { id: { eq: $systemId } }) {
      elements {
        pagename {
          value
        }
        permalink {
          value
        }
        introduction {
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
        }
        faq_items {
          value {
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
        }
        subtitle {
          value
        }
        redirects {
          value
        }
        product_category {
          value {
            codename
            name
          }
        }
        related_articles {
          value {
            system {
              codename
              name
              type
            }
            ... on kontent_item_kc_faqs {
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
  }
`
