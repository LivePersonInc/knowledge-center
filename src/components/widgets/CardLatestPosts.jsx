import { Link } from "gatsby"
import React from "react"
import HomeArticle from "./HomeArticle"
import { WhatsNewIcon, ReleaseNotesIcon } from "../icons/home"
import ButtonArrow from "./ButtonArrow"

const CardLatestPosts = ({ title, icon, link, alltype }) => {
  const items = []
  const homeArticles = alltype.nodes
  homeArticles.forEach(article => {
    items.push(
      <HomeArticle data={article} key={article.elements.permalink.value} />
    )
  })
  return (
    <div className="flex border border-card-border transition-shadow compact side bg-card-background w-full flex-grow">
      <div className="flex-col  space-x-4 card-body">
        <div className="flex flex-col flex-1">
          <div className="lp mb-4">
            {(() => {
              switch (icon) {
                case "WhatsNewIcon":
                  return <WhatsNewIcon />
                case "ReleaseNotesIcon":
                  return <ReleaseNotesIcon />

                default:
                  return "-"
              }
            })()}
          </div>
          <h2 className="card-title text-body-text" style={{ marginBottom: 0 }}>
            {title}
          </h2>
          <div className="whatsnewarticles">{items}</div>
          <Link to={link} className="pt-6">
            <ButtonArrow btnText="View All" />
          </Link>
        </div>
      </div>
    </div>
  )
}
export default CardLatestPosts
