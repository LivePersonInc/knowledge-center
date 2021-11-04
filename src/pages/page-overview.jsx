import React, { useRef, useState, useEffect } from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import { postMarkup } from "../utils"
import Breadcrumbs from "../components/Breadbrumbs"
import Tags from "../components/Tags"
import AlertComponent from "../components/AlertComponent"

const PageOverviewTemplate = ({ data, pageContext }) => {
  const contentRef = useRef()
  const [jumpToItems, setJumpToItems] = useState([])
  useEffect(() => {
    // NOTE: If the ref is ready, and we have data, then we know that we can access the HTML
    if (contentRef.current && data) {
      const headerQuery = contentRef.current.querySelectorAll("h2,h3")
      // console.log("getting h tags")
      // console.log(headerQuery)
      // console.log(data)
      setJumpToItems([...headerQuery])
    }
  }, [data])
  const productOverview = data?.productOverview
  return (
    <Layout
      title={productOverview?.elements?.title?.value}
      jumpToItems={jumpToItems}
    >
      <div ref={contentRef}>
        <div className="flex column">
          <div className="content-header">
            <Breadcrumbs breadCrumbs={pageContext.breadCrumbs} />
            <h1
              className="h1 text-title-text"
              data-testid="title"
              id="maintitle"
            >
              {productOverview?.elements?.title?.value}
            </h1>
            <Tags
              tags={(
                productOverview?.elements?.chat_messaging__chat_vs_messaging
                  ?.value || []
              ).map(({ name }) => name)}
            />
          </div>
        </div>
        {postMarkup(
          productOverview?.elements?.introduction?.value,
          "introduction"
        )}
        {postMarkup(productOverview?.elements?.use_cases?.value, "use_cases")}
        {postMarkup(productOverview?.elements?.benefits?.value, "benefits")}
        {postMarkup(
          productOverview?.elements?.key_components?.value,
          "key_components"
        )}
        <AlertComponent />
      </div>
    </Layout>
  )
}

export default PageOverviewTemplate

export const query = graphql`
  query ($systemId: String) {
    productOverview: kontentItemKcProductOverview(
      system: { id: { eq: $systemId } }
    ) {
      elements {
        title {
          name
          value
        }
        benefits {
          value
        }
        chat_messaging__chat_vs_messaging {
          value {
            name
          }
        }
        how_it_works {
          value
        }
        introduction {
          value
        }
        key_components {
          value
        }
        use_cases {
          value
        }
      }
      id
    }
  }
`
