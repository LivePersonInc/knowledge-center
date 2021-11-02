import React from "react"
import { Link } from "gatsby"
import * as _ from "lodash"

class Article extends React.Component {
  render() {
    const title = _.get(this.props, "data.elements.pagename.value", "N/A")

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
        <p
          style={{
            color: "var(--body-text)",
          }}
          data-kontent-element-codename="subitems"
        >
          {subTitle} Two or four lines of information about article 2 or 4
        </p>
        <Link className="article__readmore" to={slug}>
          Read
        </Link>
      </div>
    )
  }
}

export default Article
