import React from "react"
import { graphql } from "gatsby"

import Card from "../components/widgets/Card"
import CardIcon from "../components/widgets/CardIcon"
import { RichTextElement } from "@kentico/gatsby-kontent-components"
// Icons
import learnMoreIcon from "../assets/images/home/ic_learn_more.svg"
import messagingIcon from "../assets/images/home/ic_get_started.svg"
import exploreIcon from "../assets/images/home/ic_API_SDK.svg"
import whatsnewIcon from "../assets/images/home/ic_Whats_new.svg"
import supportIcon from "../assets/images/home/ic_support.svg"
import releasenotesIcon from "../assets/images/home/ic_release_notes.svg"
import Footer from "../components/Footer"
import CardLatestPosts from "../components/widgets/CardLatestPosts"

const HomePage = ({ data }) => {
  //console.log(data)
  const kontentItemHomepage = data?.kontentItemHomepage
  const titleHomepage = kontentItemHomepage?.elements?.title?.value
  const bodyTextHomepage = kontentItemHomepage?.elements?.body?.value
  const allWhatsnewPage = data?.allWhatsnewPage
  const allReleaseNotesPage = data?.allReleaseNotesPage

  return (
    <>
      <div className="flex flex-col">
        <h1 data-kontent-element-codename="title" className="text-title-text">
          {titleHomepage}
        </h1>
        <p className="text-body-text pr-40 sm:pr-8">
          <RichTextElement value={bodyTextHomepage} />
        </p>
      </div>
      <div className="flex sm:flex-col sm:justify-between sm:items-center mt-8 gap-4">
        <div className="flex flex-col justify-between gap-4">
          <Card
            // Getting Started
            title={kontentItemHomepage?.elements?.box_title_1?.value}
            link={kontentItemHomepage?.elements?.link_1?.value}
            icon={learnMoreIcon}
            desc={kontentItemHomepage?.elements?.box_description_1?.value}
            homeimg={kontentItemHomepage?.elements?.image?.value[0]?.url}
          />
          <CardIcon
            // Messaging
            link={kontentItemHomepage?.elements?.link_2?.value}
            icon={messagingIcon}
            title={kontentItemHomepage?.elements?.box_title_2?.value}
            desc={kontentItemHomepage?.elements?.box_description_2?.value}
          />
          <CardIcon
            // Developer Center
            link={kontentItemHomepage?.elements?.link_5?.value}
            icon={exploreIcon}
            title={kontentItemHomepage?.elements?.box_title_5?.value}
            desc={kontentItemHomepage?.elements?.box_description_5?.value}
          />
          <CardIcon
            // Release notes
            link={kontentItemHomepage?.elements?.link_4?.value}
            icon={releasenotesIcon}
            title={kontentItemHomepage?.elements?.box_title_4?.value}
            desc={kontentItemHomepage?.elements?.box_description_4?.value}
          />
          <CardIcon
            // customer support
            link={kontentItemHomepage?.elements?.link_6?.value}
            icon={supportIcon}
            title={kontentItemHomepage?.elements?.box_title_6?.value}
            desc={kontentItemHomepage?.elements?.box_description_6?.value}
          />
        </div>
        <div className="flex flex-col justify-between gap-4">
          <CardLatestPosts
            // What's new
            icon={whatsnewIcon}
            title={kontentItemHomepage?.elements?.box_title_3?.value}
            alltype={allWhatsnewPage}
            link="/whats-new"
            // link={kontentItemHomepage?.elements?.link_3?.value}
            // desc={kontentItemHomepage?.elements?.box_description_3?.value}
          />
          <CardLatestPosts
            // Release notes
            icon={releasenotesIcon}
            title={kontentItemHomepage?.elements?.box_title_4?.value}
            alltype={allReleaseNotesPage}
            link="/news-releases"
            // link={kontentItemHomepage?.elements?.link_4?.value}
            // desc={kontentItemHomepage?.elements?.box_description_4?.value}
          />
        </div>
      </div>

      <div
        data-sal="slide-up"
        data-sal-duration="2000"
        data-sal-delay="300"
        data-sal-easing="ease"
        className="my-8 lg:card-side hover:shadow-xl transition-shadow"
        style={{
          background: "var(--gradient)",
        }}
      >
        <div className="card-body flex-row justify-between sm:flex-col sm:items-center">
          <div className="flex flex-col">
            <h3 className="card-title">
              {kontentItemHomepage?.elements?.cta_title?.value}
            </h3>
            <p>{kontentItemHomepage?.elements?.cta_perk_1?.value}</p>
          </div>
          <div className="flex items-center sm:mt-4">
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://developers.liveperson.com/register.html"
            >
              <button className="btn btn-primary rounded-full">
                Start Free Trial
              </button>
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default HomePage

export const query = graphql`
  {
    allKontentItemNavigationItem(
      filter: { system: { codename: { eq: "root" } } }
    ) {
      nodes {
        elements {
          subitems {
            value {
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
              ... on kontent_item_release_notes_page {
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
              ... on kontent_item_post___whatsnew {
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
                      ... on kontent_item_release_notes_page {
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
                      ... on kontent_item_post___whatsnew {
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
    kontentItemHomepage {
      elements {
        title {
          value
        }
        body {
          value
        }
        box_description_1 {
          value
        }
        box_description_2 {
          value
        }
        box_description_3 {
          value
        }
        box_description_4 {
          value
        }
        box_description_5 {
          value
        }
        box_description_6 {
          value
        }
        box_title_1 {
          value
        }
        box_title_2 {
          value
        }
        box_title_3 {
          value
        }
        box_title_4 {
          value
        }
        box_title_5 {
          value
        }
        box_title_6 {
          value
        }
        cta_perk_1 {
          value
        }
        cta_perk_2 {
          value
        }
        cta_title {
          value
        }
        image {
          value {
            url
          }
        }
        link_1 {
          value
        }
        link_2 {
          value
        }
        link_3 {
          value
        }
        link_4 {
          value
        }
        link_5 {
          value
        }
        link_6 {
          value
        }
      }
    }
    allWhatsnewPage: allKontentItemPostWhatsnew(
      sort: { order: DESC, fields: elements___date___value }
      limit: 2
    ) {
      nodes {
        elements {
          date {
            value
          }
          pagename {
            value
          }
          permalink {
            value
          }
          subtitle {
            value
          }
        }
      }
    }
    allReleaseNotesPage: allKontentItemReleaseNotesPage(
      sort: { order: DESC, fields: elements___date___value }
      limit: 2
    ) {
      nodes {
        elements {
          date {
            value
          }
          pagename {
            value
          }
          permalink {
            value
          }
          subtitle {
            value
          }
        }
      }
    }
  }
`
