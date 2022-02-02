import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { RichTextElement } from "@kentico/gatsby-kontent-components"

import { QuestionMarkIcon } from "./icons/"

const AlertComponent = () => {
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
      data-sal="fade"
      data-sal-duration="2000"
      data-sal-easing="ease"
      className="mt-6 mb-8 pt-6"
    >
      <h4 className="h4" style={{ marginTop: 0 }}>
        {AlertComponentData.kontentItemPageFooter.elements.title.value}
      </h4>
      <div className="p-4">
        <div>
          <QuestionMarkIcon />
          <RichTextElement
            value={AlertComponentData.kontentItemPageFooter.elements.body.value}
          />
        </div>
      </div>
    </div>
  )
}
export default AlertComponent
