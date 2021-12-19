import React from "react"
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import Header from "./Header"
import Footer from "./Footer"
import GlobalStyles from "../styles/GlobalStyles"
import Sidebar from "./Sidebar"
import Seo from "./Seo"

const BodyStyles = styled.div`
  min-height: 100vh;
  display: grid;
  align-content: space-between;
  grid-template-rows: auto 1fr auto;
  .anchorlist {
    height: 100%;
    justify-content: flex-start;
  }
  .drawer-toggle ~ .drawer-content {
    overflow-y: visible;
  }
`

const HomeStyles = styled.div`
  width: 100%;
  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
  }
`
const ContentStyles = styled.div`
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
const MainContent = styled.div``

const HomeLayout = ({ children }) => (
  <StaticQuery
    query={graphql`
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
    `}
    render={data => (
      <BodyStyles
        className="homelayout"
        data-kontent-project-id={data.sitePlugin.pluginOptions.projectId}
        data-kontent-language-codename={
          data.sitePlugin.pluginOptions.languageCodenames[0]
        }
      >
        <MainContent className="flex flex-col items-center justify-start drawer-content">
          <HomeStyles>
            <ContentStyles>{children}</ContentStyles>
          </HomeStyles>
        </MainContent>
      </BodyStyles>
    )}
  ></StaticQuery>
)

export default HomeLayout
