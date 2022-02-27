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
        >
          <div
            className="related-article-item flex items-center gap-3"
            style={{ margin: "1rem 0 0 0" }}
          >
            {/* Title  */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_12627_26643)">
                <path
                  d="M12.0001 22.7989V5.38585C12.0001 5.38585 9.54506 2.65885 1.26806 2.54885C1.19984 2.54818 1.13216 2.5611 1.06898 2.58685C1.0058 2.6126 0.948378 2.65068 0.900064 2.69885C0.802649 2.79736 0.748029 2.93032 0.748064 3.06885V19.4429C0.746955 19.5777 0.798653 19.7076 0.892097 19.8047C0.985541 19.9019 1.11331 19.9587 1.24806 19.9629C9.54306 20.0699 12.0001 22.7989 12.0001 22.7989Z"
                  stroke="var(--body-text)"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9.00023 11.8538C7.29849 11.2814 5.53108 10.927 3.74023 10.7988"
                  stroke="var(--body-text)"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9.00023 16.05C7.29812 15.4799 5.53079 15.1271 3.74023 15"
                  stroke="var(--body-text)"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15 11.8538C16.7017 11.2814 18.4692 10.927 20.26 10.7988"
                  stroke="var(--body-text)"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15 16.05C16.7021 15.4799 18.4694 15.1271 20.26 15"
                  stroke="var(--body-text)"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M20.26 2.66884C21.02 2.60284 21.842 2.56084 22.732 2.54884C22.7999 2.54843 22.8672 2.56148 22.93 2.58722C22.9928 2.61297 23.0499 2.6509 23.098 2.69884C23.1954 2.79734 23.25 2.9303 23.25 3.06884V19.4428C23.2511 19.5777 23.1994 19.7075 23.106 19.8047C23.0125 19.9019 22.8848 19.9587 22.75 19.9628C14.457 20.0698 12 22.7988 12 22.7988"
                  stroke="var(--body-text)"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 22.7994V5.38639C12 5.38639 13.143 4.11639 16.5 3.27539"
                  stroke="var(--body-text)"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M20.25 7.79922V1.19922C18.9861 1.29998 17.7322 1.50061 16.5 1.79922V7.79922L18.375 6.29922L20.25 7.79922Z"
                  stroke="var(--body-text)"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_12627_26643">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <h4
              className="h4 text-primary"
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
