import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Seo from "./Seo"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    {
      sitePlugin(name: { eq: "@kentico/gatsby-source-kontent" }) {
        pluginOptions {
          projectId
          languageCodenames
        }
      }
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Seo title={data.site.siteMetadata.title} />

      {children}
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
