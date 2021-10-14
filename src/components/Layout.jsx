import React, { useEffect } from "react"
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import Helmet from "react-helmet"
import KontentSmartLink from "@kentico/kontent-smart-link"
import Header from "./Header"
import Footer from "./Footer"
import GlobalStyles from "../styles/GlobalStyles"
import Sidebar from "./Sidebar"

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

const ContentStyles = styled.div`
  padding: 1.75rem;
  @media (max-width: 767px) {
    padding: 0;
    & > div {
      padding: 0 25px;
    }
  }
`

const Layout = ({ children }) => {
  useEffect(() => {
    const plugin = KontentSmartLink.initialize({
      queryParam: "preview-mode",
    })
    return () => {
      plugin.destroy()
    }
  })

  return (
    <StaticQuery
      query={graphql`
        {
          sitePlugin(name: { eq: "@kentico/gatsby-source-kontent" }) {
            pluginOptions {
              projectId
              languageCodenames
            }
          }
        }
      `}
      render={data => (
        <BodyStyles
          className="layout"
          data-kontent-project-id={data.sitePlugin.pluginOptions.projectId}
          data-kontent-language-codename={
            data.sitePlugin.pluginOptions.languageCodenames[0]
          }
        >
          <Helmet defaultTitle="Liveperson Knowledge center">
            <link href="/favicon.ico" rel="shortcut icon" type="image/x-icon" />
          </Helmet>
          <GlobalStyles />
          <Header />
          <div className="min-h-screen shadow drawer drawer-mobile overflow-y-visible">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="flex flex-col items-center justify-start drawer-content">
              <label
                htmlFor="my-drawer-2"
                className="my-4 btn btn-primary drawer-button rounded-full lg:hidden"
              >
                {/* hamburger for sidebar */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>{" "}
                </svg>
              </label>

              <SiteLayoutStyles>
                <ContentStyles>{children}</ContentStyles>
              </SiteLayoutStyles>
            </div>
            <Sidebar />
          </div>
          <Footer />
        </BodyStyles>
      )}
    ></StaticQuery>
  )
}

export default Layout
