import { Link } from "gatsby"
import React from "react"

const RelatedArticles = ({ related }) => {
  return (
    <>
      <h4 className="h2" style={{ marginBottom: 0 }}>
        See also
      </h4>
      {related.map(node => (
        <Link
          style={{ textDecoration: "none" }}
          to={`/${node?.elements?.permalink?.value}`}
          key={node?.elements?.permalink?.value}
        >
          <div
            className="related-article-item flex items-center gap-3"
            style={{ margin: "1rem 0 0 0" }}
          >
            {/* Icon and related note link  */}
            <svg
              width="24"
              height="24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                stroke="var(--body-text)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                clipPath="url(#clip0_12627_26643)"
              >
                <path d="M12 22.799V5.386S9.545 2.659 1.268 2.549a.514.514 0 00-.368.15.526.526 0 00-.152.37v16.374a.516.516 0 00.5.52C9.543 20.07 12 22.799 12 22.799z"></path>
                <path d="M9 11.854a21.26 21.26 0 00-5.26-1.055M9 16.05A21.314 21.314 0 003.74 15M15 11.854a21.26 21.26 0 015.26-1.055M15 16.05c1.702-.57 3.47-.923 5.26-1.05"></path>
                <path d="M20.26 2.669c.76-.066 1.582-.108 2.472-.12a.514.514 0 01.198.038.514.514 0 01.168.112.526.526 0 01.152.37v16.374a.516.516 0 01-.144.362.516.516 0 01-.356.158C14.457 20.07 12 22.799 12 22.799"></path>
                <path d="M12 22.8V5.385s1.143-1.27 4.5-2.11m3.75 4.523V1.2a24.03 24.03 0 00-3.75.6v6l1.875-1.5 1.875 1.5z"></path>
              </g>
              <defs>
                <clipPath id="clip0_12627_26643">
                  <path fill="currentColor" d="M0 0h24v24H0z"></path>
                </clipPath>
              </defs>
            </svg>
            <h4
              className="h4 text-primary hover:text-primary-hover"
              style={{ margin: 0, color: "var(--primary)" }}
            >
              {node?.elements?.pagename?.value}
            </h4>
          </div>
        </Link>
      ))}
    </>
  )
}
export default RelatedArticles
