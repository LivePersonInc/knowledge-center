import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { postMarkup } from "../../utils"
import moment from "moment"
import * as _ from "lodash"

const HomeArticleStyles = styled.div`
  h2 {
    display: none;
  }
`

class HomeArticle extends React.Component {
  render() {
    const title = _.get(this.props, "data.elements.pagename.value", "N/A")
    const date = _.get(this.props, "data.elements.date.value", "N/A")
    const subTitle = _.get(this.props, "data.elements.subtitle.value", "N/A")
    const slug = `${_.get(this.props, "data.elements.permalink.value", "N/A")}`
    const itemId = _.get(this.props, "data.system.id")

    return (
      <HomeArticleStyles
        className="NavLinks pt-6"
        data-kontent-item-id={itemId}
      >
        {console.log(itemId)}
        {/* {location.pathname === "/" ? (
          <HomeStyles>
            <HomeContentStyles className="smobile:py-4 py-8">
              {children}
            </HomeContentStyles>
          </HomeStyles>
        ) : (
          <SiteLayoutStyles>
            <ContentStyles className="smobile:py-4 py-8">
              {children}
            </ContentStyles>
          </SiteLayoutStyles>
        )} */}
        <h6
          className="mb-2 font-bold text-primary hover:text-primary-hover"
          data-kontent-element-codename="title"
        >
          <Link style={{ textDecoration: "none" }} to={`/${slug || "#"}`}>
            {title}
          </Link>
        </h6>
        <time
          className="article__meta-time flex mb-2"
          dateTime={moment(date).format("MMMM D, YYYY HH:mm")}
          data-kontent-element-codename="date"
        >
          {moment(date).format("MMMM D YY, HH:mmA")}
        </time>
        {subTitle !== "<p><br></p>" && (
          <Link
            to={`/${slug || "#"}`}
            style={{
              textDecoration: "none",
              color: "var(--body-text)",
              marginTop: "5px",
            }}
            className="text-body-text"
            id="subtitle"
          >
            {postMarkup(subTitle, "post-content")}
            <span
              to={`/${slug || "#"}`}
              className="text-primary underline hover:text-primary-hover"
              id="subtitle"
            >
              More...
            </span>
          </Link>
        )}
      </HomeArticleStyles>
    )
  }
}

export default HomeArticle
