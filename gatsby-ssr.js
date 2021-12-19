import "./src/assets/scss/index.scss"

import React from "react"
import styled from "styled-components"
import Sidebar from "./src/components/Sidebar"
import Footer from "./src/components/Footer"
import Header from "./src/components/Header"
import GlobalStyles from "./src/styles/GlobalStyles"


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

export function wrapPageElement({ element, props }) {
  const Layout = element.type.Layout ?? React.Fragment
  return (
    <Layout {...props}>
      <BodyStyles
        className="layout"
      >

        <GlobalStyles />
        <Header />
        <div className="max-width w-full min-h-screen drawer drawer-mobile overflow-y-visible">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="flex flex-col items-center justify-start drawer-content">
            <SiteLayoutStyles>
              <ContentStyles>{element}</ContentStyles>
            </SiteLayoutStyles>
          </div>
          <Sidebar />
        </div>
        <Footer />
      </BodyStyles>
    </Layout>
  )
}