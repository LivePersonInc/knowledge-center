import React, { useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"
import KontentSmartLink from "@kentico/kontent-smart-link"
import Header from "../components/Header"
import Footer from "../components/Footer"
import GlobalStyles from "../styles/GlobalStyles"
import Sidebar from "../components/Sidebar"
import Seo from "../components/Seo"
import "../assets/scss/index.scss"

const BodyStyles = styled.div`
  min-height: 100vh;
  display: grid;
  align-content: space-between;
  grid-template-rows: auto 1fr auto;
  .anchorlist {
    height: 100%;
    justify-content: flex-start;
  }
  .drawer {
    overflow: visible;
  }
  .drawer-toggle ~ .drawer-content {
    overflow-y: visible;
  }
`

const SiteLayoutStyles = styled.main`
  width: 100%;
  display: grid;
  grid-template-areas: "content";
  grid-template-columns: 1fr;
  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`

const HomeContentStyles = styled.div`
  padding: 2rem 0 2rem 2rem;
  .first-card {
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    h2 {
      color: white;
    }
  }
  .cta p {
    margin-bottom: 0;
  }
  @media (max-width: 767px) {
    padding: 2rem;
  }
`

const ContentStyles = styled.div`
  padding: 1.75rem;
  @media (min-width: 1024px) {
    padding-right: 0;
  }
  @media (max-width: 767px) {
    padding: 1rem 0 0 0;
    & > div {
      padding: 0 25px;
    }
  }
`

const HomeStyles = styled.div`
  width: 100%;
  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
  }
`

const Layout = ({ children, location }) => {
  useEffect(() => {
    const plugin = KontentSmartLink.initialize({
      queryParam: "preview-mode",
    })
    return () => {
      plugin.destroy()
    }
  }, [])

  // useEffect(() => {
  //   console.log("render layout")
  // }, [])

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
    <BodyStyles
      className="layout"
      data-kontent-project-id={data.sitePlugin.pluginOptions.projectId}
      data-kontent-language-codename={
        data.sitePlugin.pluginOptions.languageCodenames[0]
      }
    >
      <Seo title={data.site.siteMetadata.title} />
      <GlobalStyles />
      <Header />
      <div className="max-width w-full min-h-screen drawer drawer-mobile overflow-y-visible">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="flex flex-col items-center justify-start drawer-content">
          {location.pathname === "/" ? (
            <HomeStyles>
              <HomeContentStyles>{children}</HomeContentStyles>
            </HomeStyles>
          ) : (
            <SiteLayoutStyles>
              <ContentStyles>{children}</ContentStyles>
            </SiteLayoutStyles>
          )}
        </div>
        <Sidebar location={location} />
      </div>
      <Footer />
    </BodyStyles>
  )
}

export default Layout