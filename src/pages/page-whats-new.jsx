import React from "react"
import styled from "styled-components"
import { graphql, Link } from "gatsby"

import Seo from "../components/Seo"
import Article from "../components/Article"
import PostSidebar from "../components/postSidebar"
import Footer from "../components/Footer"
import Slash from "../components/widgets/Slash"

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

const BlogWhatsNewTemplate = ({ data }) => {
  // Blog - What's new template
  const allWhatsnewPage = data?.allWhatsnewPage
  const kontentItemBlogWhatsNew = data?.kontentItemBlogWhatsNew

  const pageTitle = kontentItemBlogWhatsNew?.elements?.pagename?.value

  const items = []
  const articles = allWhatsnewPage.nodes
  articles.forEach(article => {
    items.push(
      <Article data={article} key={article.elements.permalink.value} />
    )
  })

  return (
    <>
      <Seo title={pageTitle} description={pageTitle} />
      <div>
        <div
          className="documenttitlecontainer"
          style={{
            marginBottom: "var(--space8)",
          }}
        >
          <nav className="breadcrumbs text-sm">
            <ul className="flex-wrap text-primary">
              <li className="breadcrumbs-item m-0">
                <Link to="/">Knowledge Center</Link>
              </li>
              <li className="m-0">
                <Slash />
              </li>
              <li className="breadcrumbs-item text-body-text m-0">
                {pageTitle}
              </li>
            </ul>
          </nav>

          <h1 className="h1">{pageTitle}</h1>
        </div>
        <InnerSiteLayoutStyles>
          <div className="maincontent">{items}</div>
          <PostSidebar />
        </InnerSiteLayoutStyles>
      </div>
      <Footer />
    </>
  )
}

export default BlogWhatsNewTemplate

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
        subtitle {
          value
        }
      }
    }
    allWhatsnewPage: allKontentItemPostWhatsnew(
      sort: { order: DESC, fields: elements___date___value }
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
    kontentItemBlogWhatsNew {
      elements {
        pagename {
          value
        }
      }
    }
  }
`
