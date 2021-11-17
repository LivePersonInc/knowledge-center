import React from "react"
import { Link } from "gatsby"
import { postMarkup } from "../utils"
import moment from "moment"
import * as _ from "lodash"

class Article extends React.Component {
  render() {
    const title = _.get(this.props, "data.elements.pagename.value", "N/A")
    const date = _.get(this.props, "data.elements.date.value", "N/A")
    const subTitle = _.get(this.props, "data.elements.subtitle.value", "N/A")
    const slug = `${_.get(this.props, "data.elements.permalink.value", "N/A")}`
    const itemId = _.get(this.props, "data.system.id")

    return (
      <div className="NavLinks border-b py-6" data-kontent-item-id={itemId}>
        <h6 className="mb-0 font-bold" data-kontent-element-codename="title">
          <Link
            style={{ textDecoration: "none" }}
            to={`/${slug || "#"}`}
            className="article__title-link"
          >
            {title}
          </Link>
        </h6>
        <time
          className="article__meta-time flex"
          dateTime={moment(date).format("MMMM D, YYYY HH:mm")}
          data-kontent-element-codename="date"
        >
          {moment(date).format("MMMM YY, HH:mmA")}
        </time>

        <div
          style={{
            color: "var(--body-text)",
            marginTop: "5px",
          }}
          className="text-body-text"
          id="subtitle"
        >
          {postMarkup(subTitle, "post-content")}
        </div>
      </div>
    )
  }
}

export default Article
