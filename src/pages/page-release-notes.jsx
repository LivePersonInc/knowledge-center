import React from "react"
import styled from "styled-components"
import { graphql, Link } from "gatsby"

import Layout from "../components/Layout"
import Seo from "../components/Seo"
import Article from "../components/Article"
import PostSidebar from "../components/postSidebar"

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

const BlogReleaseNotesTemplate = ({ data }) => {
  // general template
  const allReleaseNotesPage = data?.allReleaseNotesPage
  const kontentItemBlogReleaseNotes = data?.kontentItemBlogReleaseNotes

  const pageTitle = kontentItemBlogReleaseNotes?.elements?.pagename?.value

  const items = []
  const articles = allReleaseNotesPage.nodes
  articles.forEach(article => {
    items.push(
      <Article data={article} key={article.elements.permalink.value} />
    )
  })

  return (
    <Layout title={pageTitle}>
      <Seo title={pageTitle} description={pageTitle} />
      <div>
        <div
          className="documenttitlecontainer"
          style={{
            marginBottom: "1.5rem",
          }}
        >
          <div className="text-sm breadcrumbs pb-4">
            <ul>
              <li className="breadcrumb-item">
                <Link to="/">Knowledge Center</Link>
              </li>

              <li className="breadcrumb-item no-after">News & Releases</li>
            </ul>
          </div>

          <h1 className="h1">{pageTitle}</h1>
        </div>
        <InnerSiteLayoutStyles>
          <div className="maincontent">{items}</div>
          <PostSidebar />
        </InnerSiteLayoutStyles>
      </div>
    </Layout>
  )
}

export default BlogReleaseNotesTemplate

export const query = graphql`
  query ($systemId: String) {
    releaseNotes: kontentItemReleaseNotesPage(
      system: { id: { eq: $systemId } }
    ) {
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
    allReleaseNotesPage: allKontentItemReleaseNotesPage(
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
    kontentItemBlogReleaseNotes {
      elements {
        pagename {
          value
        }
      }
    }
  }
`
