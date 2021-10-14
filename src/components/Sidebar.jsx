import React from "react"
import styled from "styled-components"
import { Link, StaticQuery, graphql } from "gatsby"
import { Disclosure } from "@headlessui/react"
import { PlusIcon, MinusIcon } from "@heroicons/react/outline"

const SidebarStyles = styled.div`
  .nav_item {
    color: var(--sidebar-text);
    margin-bottom: 20px;
    a {
      text-decoration: underline;
    }
    .nav-title {
      font-size: 16px;
      line-height: 24px;
      padding-bottom: 0.3rem;
      padding-top: 0;
    }
  }
`

const Sidebar = () => {
  const FOLDER_NAME = [
    "categoryfolder",
    "subcategoryfolder",
    "pagesfolder",
    "level3folder",
  ]
  const LEAF_NAME = ["categoryname", "subcategories", "page", "level3"]

  const SidebarItems = ({ items, url, level }) => {
    const map = items?.map(item => (
      <SidebarItem key={item.system.id} item={item} url={url} level={level} />
    ))
    return map
  }

  // // toggle function
  // const Toggle = () => {
  //   const [show, toggleShow] = React.useState(true)

  //   return (
  //     <div>
  //       <button onClick={() => toggleShow(!show)}>
  //         toggle: {show ? "show" : "hide"}
  //       </button>
  //       {show && <div>Hi there</div>}
  //     </div>
  //   )
  // }

  // <svg className="mr-2 w-8 h-8">
  //   <use xlinkHref={`./icons.svg#icon-getting-started`} />
  // </svg>

  const SidebarItem = ({ item, url, level }) => {
    if (item.system.type === "navigation_item") {
      const folder = level === 0 ? "nav_item" : FOLDER_NAME[level]
      const newUrl =
        level > 0
          ? // ? `${url}-${item.elements.url.value}`
            `${item.elements.url.value}`
          : item.elements.url.value
      return (
        <li className={folder}>
          <Disclosure as="div">
            {({ open }) => (
              <>
                <dt className="">
                  <Disclosure.Button>
                    <div className="flex itemdetails canOpen relative">
                      {level === 0 ? (
                        <div className="w-6 h-6 flex flex-col justify-center pr-2">
                          {open ? <MinusIcon /> : <PlusIcon />}
                          {/* <svg className="mr-2 w-8 h-8">
                            <use
                              xlinkHref={`./icons.svg#icon-getting-started`}
                            />
                          </svg> */}
                        </div>
                      ) : level === 1 ? (
                        <div className="w-6 h-6 flex flex-col justify-center pr-2">
                          {open ? <MinusIcon /> : <PlusIcon />}
                        </div>
                      ) : null}
                      <span
                        className={`nav-title  ${open ? "font-bold" : " "}
                          ${level === 1 ? "text-link-color" : " "}
                        `}
                      >
                        {item.elements.title?.value}
                      </span>
                    </div>
                  </Disclosure.Button>
                </dt>
                <Disclosure.Panel as="dd">
                  {item.elements.subitems && (
                    <ul>
                      <SidebarItems
                        items={item.elements.subitems.value}
                        url={newUrl}
                        level={level + 1}
                      />
                    </ul>
                  )}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </li>
      )
    } else if (item.system.type === "kc_product_overview") {
      const newUrl = item.elements.url_slug.value
      return (
        <li className={LEAF_NAME[level]}>
          <span className="nav-title">
            <Link to={`/${newUrl}`}>{item.elements.title?.value}</Link>
          </span>
        </li>
      )
    } else if (item?.system?.type === "knowledge_center_markdown_page") {
      const newUrl = item.elements.permalink.value
      return (
        <li className={LEAF_NAME[level]}>
          <span className="nav-title">
            <Link to={`/${newUrl}`}>{item.elements.pagename.value}</Link>
          </span>
        </li>
      )
    }
    return null
  }

  return (
    <SidebarStyles
      className="drawer-side"
      style={{
        maxHeight: "100%",
      }}
    >
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

      <ul
        id="mysidebar"
        className="menu p-8 lg:pl-14 overflow-y-auto w-80 text-body-text bg-body-background h-full"
        data-testid="sidebar"
      >
        <StaticQuery
          query={graphql`
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
              ...PO
              ...KCMD
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
            fragment PO on kontent_item_kc_product_overview {
              elements {
                title {
                  value
                }
                url_slug {
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
          `}
          render={data => {
            return (
              <SidebarItems
                items={
                  data.allKontentItemNavigationItem.nodes[0].elements.subitems
                    .value
                }
                url=""
                level={0}
              />
            )
          }}
        />
      </ul>
    </SidebarStyles>
  )
}

export default Sidebar
