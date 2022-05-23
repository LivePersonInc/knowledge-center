import React, { useState } from "react"
import { Link } from "gatsby"

const JumpTo = ({ title, jumpToItems }) => {
  const [isClicked, setIsClicked] = useState(false)
  // console.log(jumpToItems)
  if (!jumpToItems?.length) {
    return null
  }

  const scrollTo = el => {
    setIsClicked(true)
    if (el?.offsetTop)
      window.scrollTo({
        top: el.offsetTop,
        behavior: "smooth",
      })
  }

  const jumptoList = {
    position: "sticky",
    top: "120px",
    listStyleType: "none",
    maxWidth: "100%",
    overflow: "visible",
  }

  return (
    <div className="menu full-width ipad:hidden">
      <div className="anchorlist shadow-none">
        <ul className="sidebar-menu ml-8 text-link-color" style={jumptoList}>
          <li
            className="anchoritem hover-bordered mb-0 focus:text-body-text"
            id="jumptotop"
            tabIndex="-1"
            onClick={() => window[`scrollTo`]({ top: 0, behavior: `smooth` })}
            role="presentation"
          >
            <Link
              style={{
                borderLeft:
                  isClicked === false
                    ? "2px solid var(--jumpto-border-color)"
                    : null,
                color: isClicked === false ? "var(--body-text)" : null,
              }}
              className="hover:text-link-color-hover"
            >
              {title}
            </Link>
          </li>
          {jumpToItems.map((anchor, index) => {
            return (
              <li
                key={anchor.textContent}
                className="anchoritem hover-bordered mb-0 focus:text-body-text"
                tabIndex="-1"
                onClick={() => scrollTo(anchor)}
                role="presentation"
              >
                <a
                  className="hover:text-link-color-hover"
                  href={`#${anchor.id}`}
                >
                  {anchor.textContent}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default JumpTo
