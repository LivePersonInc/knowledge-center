import { Link } from "gatsby"
import React from "react"
import HomeArticle from "./HomeArticle"

const CardLatestPosts = ({ title, icon, link, alltype }) => {
  const items = []
  const homeArticles = alltype.nodes
  homeArticles.forEach(article => {
    items.push(
      <HomeArticle data={article} key={article.elements.permalink.value} />
    )
  })
  return (
    <div
      data-sal="fade"
      data-sal-duration="2000"
      data-sal-easing="ease"
      className="flex border border-card-border hover:shadow-xl transition-shadow compact side w-full flex-grow"
    >
      <div className="flex-col  space-x-4 card-body">
        <div className="flex flex-col flex-1">
          <img width="48" height="48" className="lp" src={icon} alt="logo" />
          <h2 className="card-title text-card-title">{title}</h2>
          <div className="whatsnewarticles">{items}</div>
          <Link to={link} className="text-link-color text-opacity-40 mt-auto">
            View All
          </Link>
        </div>
      </div>
    </div>
  )
}
export default CardLatestPosts
