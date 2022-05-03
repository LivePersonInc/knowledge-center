import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql, withPrefix } from "gatsby"

export default function Seo({ children, location, description, title, image }) {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)
  return (
    <Helmet titleTemplate={`%s - ${site.siteMetadata.title}`}>
      <html lang="en" />
      <title>{title}</title>
      {/* Fav Icons */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="alternate icon" href="/favicon.ico" />
      {/* Meta Tags */}
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={site.siteMetadata.description} />
      {/* Open Graph */}
      {location && <meta property="og:url" content={location.href} />}
      <meta property="og:image" content={image || "/images/logo.svg"} />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta
        propery="og:site_name"
        content={site.siteMetadata.title}
        key="ogsitename"
      />
      <meta property="og:description" content={description} key="ogdesc" />
      {/* BEGIN LivePerson Monitor. */}
      <script src={withPrefix("lpchat.js")} type="text/javascript" />
      {/* End LivePerson Monitor. */}
      {children}
    </Helmet>
  )
}
