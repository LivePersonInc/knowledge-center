import React from "react"
import styled from "styled-components"
import { graphql, Link } from "gatsby"

import Layout from "../components/Layout"
import Seo from "../components/Seo"
import Article from "../components/Article"

const InnerSiteLayoutStyles = styled.main`
  width: 100%;
  display: grid;
  grid-template-areas: "sidebar content";
  grid-template-columns: repeat(auto-fit, minmax(75%, 1fr));
  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`

const BlogWhatsNewTemplate = ({ data }) => {
  // general template
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

              <li className="breadcrumb-item no-after">What's New</li>
            </ul>
          </div>

          <h1 className="h1">{pageTitle}</h1>
        </div>
        <InnerSiteLayoutStyles>
          <div className="maincontent">{items}</div>
          <div>Subscribe for updates</div>
        </InnerSiteLayoutStyles>
      </div>
    </Layout>
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
