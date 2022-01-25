import { Link } from "gatsby"
import React from "react"
import HomeArticle from "./HomeArticle"
import { WhatsNewIcon, ReleaseNotesIcon } from "../icons/home"

const CardLatestPosts = ({ title, icon, link, alltype }) => {
  const items = []
  const homeArticles = alltype.nodes
  homeArticles.forEach(article => {
    items.push(
      <HomeArticle data={article} key={article.elements.permalink.value} />
    )
  })
  return (
    <div className="flex border border-card-border hover:shadow-xl transition-shadow compact side bg-card-background w-full flex-grow">
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
          <h2 className="card-title text-card-title">{title}</h2>
          <div className="whatsnewarticles">{items}</div>
          <Link
            to={link}
            className="text-link-color text-opacity-40 mt-auto underline"
          >
            View All
          </Link>
        </div>
      </div>
    </div>
  )
}
export default CardLatestPosts
