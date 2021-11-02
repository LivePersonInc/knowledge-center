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

const ReleaseNotesPageTemplate = ({ data, pageContext }) => {
  // general template
  const releaseNotes = data?.releaseNotes
  const pageTitle = releaseNotes?.elements?.title?.value

  const markdownPage = data?.markdownPage
  const items = []
  const articles = markdownPage.nodes
  articles.forEach(article => {
    items.push(
      <Article data={article} key={article.elements.permalink.value} />
    )
  })
  // const pageSubTitle = releaseNotes?.elements?.subtitle?.value
  // const body_content = releaseNotes?.elements?.body?.value

  // Nav page
  const navPageLink =
    data?.allKontentItemNavigationItem?.nodes[0]?.elements?.url_slug?.value

  return (
    <Layout title={pageTitle}>
      <Seo title={pageTitle} description={pageTitle} />
      <div>
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

              <li className="breadcrumb-item no-after">News & Releases</li>
            </ul>
          </div>

          <h1 className="h1">{pageTitle}</h1>
        </div>
        <InnerSiteLayoutStyles>
          <div className="maincontent">{items}</div>
        </InnerSiteLayoutStyles>
      </div>
    </Layout>
  )
}

export default ReleaseNotesPageTemplate

export const query = graphql`
  query ($systemId: String) {
    releaseNotes: kontentItemReleaseNotes(system: { id: { eq: $systemId } }) {
      elements {
        title {
          value
        }
        url_slug {
          value
        }
      }
    }
    markdownPage: allKontentItemKnowledgeCenterMarkdownPage(
      filter: { elements: { categoryname: { value: { eq: "Release notes" } } } }
    ) {
      nodes {
        elements {
          pagename {
            value
          }
          date {
            value
          }
          subtitle {
            value
          }
          permalink {
            value
          }
        }
      }
    }
  }
`
