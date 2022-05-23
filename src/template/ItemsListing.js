import React from "react"
import styled from "styled-components"
import { Link, navigate } from "gatsby"

import Seo from "../components/Seo"

import { Disclosure, Transition } from "@headlessui/react"

import Breadcrumbs from "../components/Breadbrumbs"

import Footer from "../components/Footer"
import {
  ArrowRight,
  LinkIcon,
  DirectoryIcon,
  ArticleIcon,
} from "../components/icons/"
const LEAF_NAME = ["categoryname", "subcategories", "page", "level3"]
const FOLDER_NAME = [
  "categoryfolder",
  "subcategoryfolder",
  "pagesfolder",
  "level3folder",
]
const InnerSiteLayoutStyles = styled.main`
  width: 100%;
  display: grid;
  grid-template-areas: "sidebar content";
  grid-template-columns: repeat(auto-fit, minmax(75%, 1fr));
  @media (max-width: 1023px) {
    grid-template-columns: 1fr;
  }
  .breadcrumbs li.breadcrumb-item:nth-child(2) {
    pointer-events: none;
  }
  h2 {
    &:nth-of-type(1) {
      margin-top: 0;
      padding-top: 0;
    }
  }
  h3:not(.metrics-title, .anchor-address) {
    margin: 1.5rem 0 1rem 0;
  }
`
const Items = ({ items, url, level, location }) => {
  return items?.map(item => (
    <Item
      key={item.system.id}
      item={item}
      url={url}
      level={level}
      location={location}
    />
  ))
}

const isActive = ({ elements, location }) => {
  if (
    location.pathname.replaceAll("/", "") ===
    elements?.url?.value.replaceAll("/", "")
  ) {
    return true
  }
  if (
    elements?.subitems?.value &&
    Array.isArray(elements?.subitems?.value) &&
    elements?.subitems?.value.length > 0
  ) {
    return elements?.subitems?.value.some((x, i) => {
      if (
        x?.elements?.permalink &&
        location.pathname.replaceAll("/", "") ===
          x.elements?.permalink?.value?.replaceAll("/", "")
      ) {
        return true
      }
      return isActive({ elements: x.elements, location: location })
    })
  }

  return false
}

const InContextActiveComponent = ({ close, isOpen }) => {
  React.useEffect(() => {
    if (!isOpen) {
      close()
    }
  }, [isOpen, close])

  return null
}

const Item = ({ item, level, location }) => {
  if (item.system.type === "navigation_item") {
    const folder = level === 0 ? "sidebar_item" : FOLDER_NAME[level]
    const newUrl =
      level > 0 ? `${item.elements.url.value}` : item.elements.url.value

    const isOpen = isActive({ elements: item.elements, location })

    return (
      <li className={folder}>
        <Disclosure as="div" defaultOpen={isOpen}>
          {({ open, close }) => (
            <>
              <InContextActiveComponent
                open={open}
                close={close}
                isOpen={isOpen}
              />
              <dt className="flex items-center">
                <Disclosure.Button
                  onDoubleClick={() => navigate(`/${item.elements.url.value}`)}
                >
                  <div className="flex itemdetails canOpen relative items-start gap-2">
                    {level === 0 ? (
                      <div
                        className={
                          "sidebar-arrow w-4 h-4 mt-1.5 flex items-center flex-col justify-center transform transition " +
                          `${open ? "rotate-90 text-sidebar-color-active" : ""}`
                        }
                      >
                        <ArrowRight />
                      </div>
                    ) : level >= 1 ? (
                      <div
                        className={
                          "sidebar-arrow w-4 h-4 mt-1.5 flex items-center flex-col justify-center transform transition " +
                          `${open ? "rotate-90 text-sidebar-color-active" : ""}`
                        }
                      >
                        <DirectoryIcon />
                      </div>
                    ) : null}

                    {item.elements.url.value === "what-s-new" ||
                    item.elements.url.value === "release-notes" ? (
                      <Link
                        to={`/${item.elements.subitems.value[0].elements.permalink.value}`}
                        className={`nav-title  ${
                          open ? "font-bold text-sidebar-color-active" : " "
                        }
                        `}
                      >
                        {item.elements.title?.value}
                      </Link>
                    ) : (
                      <span
                        className={`nav-title  ${open ? "font-bold " : " "}
                        `}
                      >
                        {item.elements.title?.value}
                      </span>
                    )}
                  </div>
                </Disclosure.Button>
              </dt>
              <Transition
                className="inner-nav"
                show={open}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel as="dd">
                  <ul className="mt-3 text-link-color  !list-none">
                    <Items
                      items={item.elements.subitems.value}
                      url={newUrl}
                      level={level + 1}
                      location={location}
                    />
                  </ul>
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </li>
    )
  } else if (item.system.type === "blog_release_notes") {
    const newUrl = item.elements.permalink.value
    return (
      <li className={"mb-3 " + LEAF_NAME[level]}>
        <span className="mr-2">
          <LinkIcon />
        </span>
        <span className="nav-title flex items-center">
          <Link to={`/${newUrl}`}>{item.elements.pagename?.value}</Link>
        </span>
      </li>
    )
  } else if (item.system.type === "kc_faqs") {
    const newUrl = item.elements.permalink.value
    return (
      <li className={"mb-3 " + LEAF_NAME[level]}>
        <span className="mr-2">
          <LinkIcon />
        </span>

        <span className="nav-title flex items-center">
          <Link to={`/${newUrl}`}>{item.elements.pagename?.value}</Link>
        </span>
      </li>
    )
  } else if (item?.system?.type === "knowledge_center_markdown_page") {
    const newUrl = item.elements.permalink.value
    return (
      <li className={"mb-3 " + LEAF_NAME[level]}>
        <span className="nav-title flex items-center">
          <span className="mr-2">
            <ArticleIcon />
          </span>

          <Link
            activeClassName="font-bold text-sidebar-color-active"
            to={`/${newUrl}`}
          >
            {item.elements.pagename.value}
          </Link>
        </span>
      </li>
    )
  }
  return null
}
function ItemsListing({ pageContext, location }) {
  console.log(pageContext)
  const { elements, parent, level } = pageContext
  let pageTitle = elements.title.value
  return (
    <>
      <Seo title={pageTitle} description={"pageSubTitle"} />

      <div
        className="documenttitlecontainer"
        style={{
          marginBottom: "var(--space8)",
        }}
      >
        <Breadcrumbs
          secondCrumbLink={level > 1 ? parent?.parent?.url : parent?.url}
          secondCrumbTitle={level > 1 ? parent.parent?.title : parent?.title}
          thirdCrumbLink={level > 1 && parent?.url}
          thirdCrumbTitle={level > 1 && parent?.title}
          lastCrumb={pageTitle}
        />

        <h1 className="h1">{pageTitle}</h1>

        {/* <div className="text-body-text" id="subtitle">
          {pageSubTitle}
        </div> */}
      </div>
      <InnerSiteLayoutStyles>
        <div className="maincontent" id="scroll-smooth">
          <ul className="mt-3 text-link-color !list-none mb-2">
            <Items
              items={elements.subitems.value}
              url=""
              level={1}
              location={location}
            />
          </ul>
        </div>
        {/* <Jumpto title={pageTitle} jumpToItems={jumpToItems} /> */}
      </InnerSiteLayoutStyles>

      <Footer />
    </>
  )
}

export default ItemsListing
