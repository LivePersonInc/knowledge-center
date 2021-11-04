import React from "react"

import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import NavLinks from "../components/NavLinks"

const NavPage = ({ data }) => {
  //console.log(data)

  const allKontentItemNavigationItem = data?.allKontentItemNavigationItem
  const navPageDataNodes = data?.allKontentItemNavigationItem?.nodes
  // const navPageData =
  //   data?.allKontentItemNavigationItem?.nodes[0]?.elements?.subitems.value

  const items = []
  const title = allKontentItemNavigationItem?.nodes[0]?.elements?.url?.value
  const Navitems = navPageDataNodes
  Navitems.forEach(navitem => {
    items.push(<NavLinks data={navitem} key={navitem.elements.url.value} />)
  })

  return (
    <Layout>
      <div>
        <h2>{title}</h2>

        <ul>
          {items}
          {/* {navPageDataNodes.map(node => (
            <Link
              to={`/${node?.elements?.url?.value}`}
              key={node?.elements?.url?.value}
            >
              {node?.elements?.title?.value}
              {navPageData.map(node => (
                <li key={node?.elements?.url?.value}>
                  <Link to={`/${node?.elements?.url?.value}`}>
                    {node?.elements?.title?.value}
                  </Link>
                </li>
              ))}
            </Link>
          ))}
          {navPageData.map(node => (
            <li key={node?.elements?.url?.value}>
              <Link to={`/${node?.elements?.url?.value}`}>
                {node?.elements?.title?.value}
              </Link>
            </li>
          ))} */}
        </ul>
      </div>
    </Layout>
  )
}

export default NavPage

export const query = graphql`
  {
    allKontentItemNavigationItem {
      nodes {
        elements {
          url {
            value
          }
          title {
            value
          }
          subitems {
            value {
              system {
                type
              }
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
                  subtitle {
                    value
                  }
                }
              }
              ... on kontent_item_release_notes {
                id
                elements {
                  url_slug {
                    value
                  }
                  title {
                    value
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
