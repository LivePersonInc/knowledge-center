import React from "react"
import styled from "styled-components"
import { graphql, Link, useStaticQuery, navigate } from "gatsby"
import { Disclosure, Transition } from "@headlessui/react"

import { ArrowRight, LinkIcon } from "./icons/"

const SidebarStyles = styled.div`
  @media (min-width: 1024px) {
    min-height: 100vh;
    position: sticky;
    top: 6rem;
    padding-bottom: 6.875rem;
  }
  a {
    &:focus {
      color: var(--link-color-hover);
      border-radius: 4px !important;
      .sidebar-arrow svg:first-child {
        path {
          fill: var(--link-color-hover);
        }
      }
    }
  }
  li {
    &:focus {
      color: var(--primary-focus);
    }
  }
  .sidebar-menu ul {
    padding-left: 0;
    list-style: none !important;
  }
  .sidebar-menu :where(li) {
    align-items: stretch;
    display: flex;
    flex-direction: column;
  }
  .inner-nav {
    margin-left: 1.5rem;
    padding-right: 4px;
  }
  .sidebar_item {
    color: var(--link-color);
    margin-bottom: 1rem;
    cursor: pointer;
    &:hover {
      color: var(--link-color-hover);
      .sidebar-arrow svg:first-child {
        path {
          fill: var(--link-color-hover);
        }
      }
    }
    .nav-title {
      font-style: normal;
      font-size: 1.125rem;
      line-height: 1.75rem;
      padding-bottom: 0;
      padding-top: 0;
    }
    .svg-icon-active svg path {
      fill: var(--sidebar-color-active);
    }
  }

  .subcategoryfolder {
    &:not(:last-child) {
      margin-bottom: 0.75rem;
    }
  }
  .subcategories {
    padding-left: 1.5rem;
  }
  li.page,
  li.pagesfolder {
    padding-left: 1.5rem;
  }
  li.sidebar_item:nth-last-child(7) {
    padding-top: 1.5rem;
  }
  li.sidebar_item:nth-last-child(5) {
    padding-top: 1.5rem;
    .sidebar-arrow,
    .inner-nav {
      display: none;
    }
  }
  li.sidebar_item:nth-last-child(4) {
    padding-bottom: 1.5rem;
    .sidebar-arrow,
    .inner-nav {
      display: none;
    }
  }
`

const Sidebar = ({ location }) => {
  const sidebarData = useStaticQuery(graphql`
    {
      allKontentItemNavigationItem(
        filter: { system: { codename: { eq: "root" } } }
      ) {
        nodes {
          elements {
            subitems {
              value {
                ...folder
                ...recursiveFolder
              }
            }
          }
        }
      }
    }

    fragment folder on kontent_item_navigation_item {
      system {
        id
        type
      }
      elements {
        url {
          value
        }
        title {
          value
        }
      }
    }

    fragment page on kontent_item {
      ...KCMD
      ...BRN
      ...BWN
      ...RN
      ...WN
      ...FQ
    }

    fragment KCMD on kontent_item_knowledge_center_markdown_page {
      elements {
        pagename {
          value
        }
        permalink {
          value
        }
      }
      system {
        id
        type
      }
    }

    fragment BRN on kontent_item_blog_release_notes {
      elements {
        pagename {
          value
        }
        permalink {
          value
        }
      }
      system {
        id
        type
      }
    }

    fragment BWN on kontent_item_blog_whats_new {
      elements {
        pagename {
          value
        }
        permalink {
          value
        }
      }
      system {
        id
        type
      }
    }

    fragment RN on kontent_item_release_notes_page {
      elements {
        pagename {
          value
        }
        permalink {
          value
        }
      }
      system {
        id
        type
      }
    }

    fragment WN on kontent_item_post___whatsnew {
      elements {
        pagename {
          value
        }
        permalink {
          value
        }
      }
      system {
        id
        type
      }
    }

    fragment FQ on kontent_item_kc_faqs {
      elements {
        pagename {
          value
        }
        permalink {
          value
        }
      }
      system {
        id
        type
      }
    }

    fragment recursiveFolder on kontent_item_navigation_item {
      system {
        id
        type
      }
      elements {
        subitems {
          value {
            ...page
            ...folder
            ... on kontent_item_navigation_item {
              system {
                id
                type
              }
              elements {
                subitems {
                  value {
                    ...page
                    ...folder
                    ... on kontent_item_navigation_item {
                      system {
                        id
                        type
                      }
                      elements {
                        subitems {
                          value {
                            ...page
                            ...folder
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  // console.log(
  //   sidebarData.allKontentItemNavigationItem.nodes[0].elements.subitems
  // )
  return (
    <SidebarStyles className="drawer-side">
      <div htmlFor="my-drawer-2" className="drawer-overlay" />
      <ul
        id="mysidebar"
        className="sidebar-menu scrollbar overflow-y-auto w-80 py-8 ipad:bg-body-background h-full ipad:p-[20px]"
        data-testid="sidebar"
      >
        <SidebarItems
          items={
            sidebarData.allKontentItemNavigationItem.nodes[0].elements.subitems
              .value
          }
          url=""
          level={0}
          location={location}
        />

        <li className="sidebar_item">
          <a
            href={`https://developers.liveperson.com`}
            rel="noreferrer"
            target="_blank"
            className="flex justify-between itemdetails canOpen relative"
            style={{ padding: "0", background: "transparent" }}
          >
            <span className="nav-title text-link-color  hover:text-link-color-hover">
              Developer Center
            </span>
            <div className="w-4 h-4 flex flex-col justify-center">
              <LinkIcon />
            </div>
          </a>
        </li>
        <li className="sidebar_item">
          <a
            href={`https://status.liveperson.com`}
            rel="noreferrer"
            target="_blank"
            className="flex justify-between itemdetails canOpen relative"
            style={{ padding: "0", background: "transparent" }}
          >
            <span className="nav-title text-link-color  hover:text-link-color-hover">
              Service Status Dashboard
            </span>
            <div className="w-4 h-4 flex flex-col justify-center">
              <LinkIcon />
            </div>
          </a>
        </li>

        {/* Mobile buttons */}
        <li className="lg:hidden ipad:visible text-center">
          <a
            href={`https://liveengage.liveperson.net/`}
            rel="noreferrer"
            target="_blank"
            className="justify-center"
            style={{ padding: "0" }}
          >
            <span className="nav-title text-link-color  hover:text-link-color-hover">
              Sign In
            </span>
          </a>
        </li>

        {/* <li className="lg:hidden ipad:visible justify-center text-center">
          <a
            href={`https://developers.liveperson.com/register.html`}
            rel="noreferrer"
            target="_blank"
            className="btn btn-primary hover:brn-primary-hover normal-case rounded-full px-8 "
            style={{
              padding: "0",
              color: "white",
              width: "140px",
              margin: "0 auto",
            }}
          >
            <span className="nav-title">Free trial</span>
          </a>
        </li> */}
      </ul>
    </SidebarStyles>
  )
}
const LEAF_NAME = ["categoryname", "subcategories", "page", "level3"]
const FOLDER_NAME = [
  "categoryfolder",
  "subcategoryfolder",
  "pagesfolder",
  "level3folder",
]
const SidebarItems = ({ items, url, level, location }) => {
  return items?.map(item => (
    <SidebarItem
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

const SidebarItem = ({ item, level, location }) => {
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
                        <ArrowRight />
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
                  <ul className="mt-3 text-link-color">
                    <SidebarItems
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
        <span className="nav-title">
          <Link to={`/${newUrl}`}>{item.elements.pagename?.value}</Link>
        </span>
      </li>
    )
  } else if (item.system.type === "kc_faqs") {
    const newUrl = item.elements.permalink.value
    return (
      <li className={"mb-3 " + LEAF_NAME[level]}>
        <span className="nav-title">
          <Link to={`/${newUrl}`}>{item.elements.pagename?.value}</Link>
        </span>
      </li>
    )
  } else if (item?.system?.type === "knowledge_center_markdown_page") {
    const newUrl = item.elements.permalink.value
    return (
      <li className={"mb-3 " + LEAF_NAME[level]}>
        <span className="nav-title">
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

export default React.memo(Sidebar)
