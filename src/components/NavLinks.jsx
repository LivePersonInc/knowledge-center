import React from "react"
import { Link } from "gatsby"
import * as _ from "lodash"

class NavLinks extends React.Component {
  render() {
    const title = _.get(this.props, "data.elements.title.value", "N/A")

    const subitems = _.get(this.props, "data.elements.subitems", "N/A")
    const slug = `${_.get(this.props, "data.elements.url.value", "N/A")}`
    const itemId = _.get(this.props, "data.system.id")
    console.log(subitems)
    return (
      <div className="NavLinks" data-kontent-item-id={itemId}>
        <div className="article__meta">
          <span className="article__meta-divider" />
        </div>
        <h2 className="article__title" data-kontent-element-codename="title">
          <Link className="article__title-link" to={slug}>
            {title}
          </Link>
        </h2>
        <p
          className="article__description"
          data-kontent-element-codename="subitems"
        >
          {/* {subitems.map(category => {
            return (
              // <span
              //   className="article__meta-category"
              //   key={category.elements.slug.value}
              //   data-kontent-element-codename="category"
              // >
              //   <Link
              //     to={`/categories/${category.elements.slug.value}/`}
              //     className="article__meta-category-link"
              //   >
              //     {category.elements.title.value + " "}
              //   </Link>
              // </span>
              <span>s{console.log(category)}</span>
            )
          })} */}
        </p>
        <Link className="article__readmore" to={slug}>
          Read
        </Link>
      </div>
    )
  }
}

export default NavLinks
