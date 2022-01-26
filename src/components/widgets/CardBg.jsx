import { Link } from "gatsby"
import React from "react"
import { LearnMoreIcon } from "../icons/home"

const CardBg = ({ title, desc, link, icon, homeimg }) => {
  return (
    <Link
      to={link}
      style={{
        background: `var(--card-bg-background),url(${homeimg}) no-repeat center center`,
        backgroundSize: "cover",
      }}
      className="compact side w-full flex-grow"
    >
      <div className="flex-row items-center space-x-4 card-body">
        <div className="flex-1">
          <div className="lp mb-4">
            <LearnMoreIcon />
          </div>
          <h2 className="card-title text-button-text">{title}</h2>
          <p className="text-button-text text-opacity-40 ">{desc}</p>
        </div>
      </div>
    </Link>
  )
}
export default CardBg
