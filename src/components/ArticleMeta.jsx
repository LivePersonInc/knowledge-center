import React from "react"
import moment from "moment"

const ArticleMeta = ({ date }) => {
  return (
    <div className="ArticleMeta flex justify-start gap-4 text-xs text-footer-text font-semibold">
      {/* <div>
        <div className="flex items-center">Suggest changes</div>
      </div> */}
      <div>
        <div className="flex items-center gap-1">
          Last updated {"  "}
          {"  "}
          <time
            className="article__meta-time flex"
            dateTime={moment(date).format("MMMM D, YYYY")}
            data-kontent-element-codename="date"
          >
            {moment(date).format("YYYY") == new Date().getFullYear()
              ? moment(date).format("MMMM D")
              : moment(date).format("MMMM D, YYYY")}
          </time>
        </div>
      </div>
      {/* <div>
        <div className="flex items-center">3 min read</div>
      </div> */}
    </div>
  )
}
export default ArticleMeta
