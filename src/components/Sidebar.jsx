import React from "react"
import styled from "styled-components"
import { graphql, Link, useStaticQuery } from "gatsby"
import { Disclosure, Transition } from "@headlessui/react"

import {
  AdminIcon,
  AgentIcon,
  ArrowRight,
  ContactIcon,
  DeveloperIcon,
  FaqsIcon,
  HouseIcon,
  MarketplaceIcon,
  MessageIcon,
  NewIcon,
  ReleaseIcon,
  ReportingIcon,
  RobotIcon,
  SecurityIcon,
  StatusIcon,
  TroubleshootingIcon,
} from "./icons/"

const SidebarStyles = styled.div`
  .menu ul {
    padding-left: 0;
  }
  .nav_item {
    color: var(--sidebar-text);
    margin-bottom: 1.5rem;
    .nav-title {
      font-size: 1rem;
      line-height: 1.5rem;
      text-transform: capitalize;
      padding-bottom: 0;
      padding-top: 0;
    }
  }
  .subcategoryfolder {
    padding-left: 1.5625rem;
  }
  li.page,
  li.pagesfolder {
    padding-left: 1.5625rem;
  }
  li.nav_item:nth-last-child(5) {
    padding-top: 1.5rem;
    border-top: 1px solid var(--card-border);
    dd#headlessui-disclosure-panel-23 {
      display: none;
    }
  }
  li.nav_item:nth-last-child(4) {
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--card-border);
    dd#headlessui-disclosure-panel-25 {
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

  return (
    <SidebarStyles
      className="drawer-side"
      style={{
        maxHeight: "100%",
      }}
    >
      <label htmlFor="my-drawer-2" className="drawer-overlay" />
      <ul
        id="mysidebar"
        className="menu pt-8 overflow-y-auto w-80 ld:bg-body-background h-full"
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

const InContextActiveComponent = ({ open, close, isOpen }) => {
  React.useEffect(() => {
    if (close && !isOpen && open) {
      close()
    }
  }, [isOpen])

  return null
}

const SidebarItem = ({ item, level, location }) => {
  // const ToggleVisible = () => setIsOpen(!isOpen)
  if (item.system.type === "navigation_item") {
    const folder = level === 0 ? "nav_item" : FOLDER_NAME[level]
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
                <Disclosure.Button>
                  <div className="flex itemdetails canOpen relative">
                    {level === 0 ? (
                      <div className="w-6 h-6 flex flex-col justify-center mr-2 pr-0.5">
                        {/* view sidebar items */}
                        {(() => {
                          switch (item.elements.url.value) {
                            case "getting-started":
                              return <HouseIcon />
                            case "messaging-channels":
                              return <MessageIcon />
                            case "ai-bots-automation":
                              return <RobotIcon />
                            case "contact-center-management":
                              return <ContactIcon />
                            case "agent-manager-workspace":
                              return <AgentIcon />
                            case "data-reporting":
                              return <ReportingIcon />
                            case "marketplace-solutions":
                              return <MarketplaceIcon />
                            case "admin-settings":
                              return <AdminIcon />
                            case "security-regulations":
                              return <SecurityIcon />
                            case "developer-tools":
                              return <DeveloperIcon />
                            case "what-s-new":
                              return <NewIcon />
                            case "release-notes":
                              return <ReleaseIcon />
                            case "troubleshooting":
                              return <TroubleshootingIcon />
                            case "faqs":
                              return <FaqsIcon />
                            case "service-status-dashboard":
                              return <StatusIcon />

                            default:
                              return "-"
                          }
                        })()}
                      </div>
                    ) : level === 1 ? (
                      <div
                        className={
                          "w-5 h-5 flex flex-col justify-center mr-2 pr-2 transform transition " +
                          `${open ? "rotate-90" : ""}`
                        }
                      >
                        <ArrowRight />
                      </div>
                    ) : null}

                    {item.elements.url.value === "what-s-new" ||
                    item.elements.url.value === "release-notes" ? (
                      <Link
                        to={`/${item.elements.subitems.value[0].elements.permalink.value}`}
                        className={`nav-title  ${open ? "font-bold" : " "}
                        `}
                      >
                        {item.elements.title?.value}
                      </Link>
                    ) : (
                      <span
                        className={`nav-title  ${open ? "font-bold" : " "}
                        `}
                      >
                        {item.elements.title?.value}
                      </span>
                    )}
                  </div>
                </Disclosure.Button>
              </dt>
              <Transition
                show={open}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel as="dd">
                  <ul className="mt-3">
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
      <li className={LEAF_NAME[level]}>
        <span className="nav-title">
          <Link to={`/${newUrl}`}>{item.elements.pagename?.value}</Link>
        </span>
      </li>
    )
  } else if (item?.system?.type === "knowledge_center_markdown_page") {
    const newUrl = item.elements.permalink.value
    return (
      <li className={LEAF_NAME[level]}>
        <span className="nav-title">
          <Link
            activeClassName="font-bold text-sidebar-color"
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
