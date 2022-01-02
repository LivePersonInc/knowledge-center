import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import { RichTextElement } from "@kentico/gatsby-kontent-components"

import { QuestionMarkIcon } from "./icons/"

const AlertComponent = () => {
  console.log("itay")

  const AlertComponentData = useStaticQuery(graphql`
    {
      kontentItemPageFooter {
        elements {
          title {
            value
          }
          body {
            value
          }
        }
      }
    }
  `)

  return (
    <div
      style={{
        borderBottom: "1px solid var(--card-border)",
        marginTop: "2rem",
        paddingTop: "2rem",
        paddingBottom: "2rem",
      }}
      data-sal="fade"
      data-sal-duration="2000"
      data-sal-easing="ease"
      className="mt-6 pt-6 border-t border-card-border"
    >
      <h4 className="h2" style={{ marginTop: 0 }}>
        {AlertComponentData.kontentItemPageFooter.elements.title.value}
      </h4>
      <div className="content-widget missing-something p-4">
        <p>
          <QuestionMarkIcon />
          <RichTextElement
            value={AlertComponentData.kontentItemPageFooter.elements.body.value}
          />
        </p>
      </div>
    </div>
  )
}
export default AlertComponent
