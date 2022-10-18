import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import CookieConsent from "react-cookie-consent"
import styled from "styled-components"
import Header from "../components/Header"
import GlobalStyles from "../styles/GlobalStyles"
import Sidebar from "../components/Sidebar"
import Seo from "../components/Seo"
import "../assets/scss/index.scss"
import { useState } from "react"

const BodyStyles = styled.div`
  min-height: 100vh;
  display: grid;
  align-content: space-between;
  grid-template-rows: auto 1fr auto;
  .anchorlist {
    height: 100%;
    justify-content: flex-start;
  }
  .breadcrumbs > ul > li + :before {
    display: none;
  }
  *:not(.search-tags, button:not(.btn), input):focus {
    outline: 2px dashed var(--link-color-hover);
    text-decoration: none;
  }
`

const SiteLayoutStyles = styled.main`
  width: 100%;
  display: grid;
  grid-template-areas: "content";
  grid-template-columns: 1fr;
  @media (max-width: 1023px) {
    grid-template-columns: 1fr;
  }
`

const HomeContentStyles = styled.div`
  p {
    margin-bottom: 0;
  }
  .home-subtitle {
    p {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .border:not(.card-bg) {
    border: 2px solid var(--card-border);
    &:hover {
      border-width: 4px;
      margin: -2px;
    }
  }
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
`

const ContentStyles = styled.div`
  @media (min-width: 1024px) {
    padding-right: 0;
  }
  .breadcrumbs {
    padding-top: 0;
    padding-bottom: 0;
    margin-bottom: 1rem;
    overflow: visible;
    .bread-crumbs {
      .breadcrumbs-item {
        font-size: 0.875rem;
        line-height: 1.25rem;
      }
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
  // useEffect(() => {
  //   const plugin = KontentSmartLink.initialize({
  //     queryParam: "preview-mode",
  //   })
  //   return () => {
  //     plugin.destroy()
  //   }
  // }, [])

  // useEffect(() => {
  //   console.log("render layout")
  // }, [])

  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <BodyStyles className="layout">
      <Seo title={data.site.siteMetadata.title} />
      <GlobalStyles />
      <Header />
      <div className="max-width w-full min-h-screen drawer ipad:drawer-end drawer-mobile overflow-y-visible gap-8">
        <input
          id="my-drawer-2"
          type="checkbox"
          onChange={e => setSidebarOpen(e.target.checked)}
          className="drawer-toggle"
          checked={sidebarOpen}
        />
        <div className="flex flex-col items-center justify-start drawer-content smobile:px-5 px-8 md:px-0">
          {location.pathname === "/" ? (
            <HomeStyles>
              <HomeContentStyles className="smobile:py-4 py-8">
                {children}
              </HomeContentStyles>
            </HomeStyles>
          ) : (
            <SiteLayoutStyles>
              <ContentStyles className="smobile:py-4 py-8">
                {children}
              </ContentStyles>
            </SiteLayoutStyles>
          )}
        </div>
        <Sidebar
          location={location}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      </div>
      <CookieConsent
        disableStyles="true"
        location="bottom"
        buttonText="I agree"
        declineButtonText="Decline"
        cookieName="gatsby-gdpr-google-analytics"
      >
        <p>
          This website uses cookies to ensure you get the best browsing
          experience. By continuing to use this website, you consent to our use
          of these cookies.{" "}
          <span>
            This website contains proprietary content that belongs to LivePerson
            and that is intended for educational use by our customers and
            prospects. Your use of this site is subject to our{" "}
            <a
              href="https://www.liveperson.com/policies/apitou/"
              target="_blank"
              rel="noreferrer"
            >
              Terms of Use
            </a>
            , which include restrictions on any use of our information for
            unauthorized purposes.
          </span>
        </p>
      </CookieConsent>
    </BodyStyles>
  )
}

export default Layout
