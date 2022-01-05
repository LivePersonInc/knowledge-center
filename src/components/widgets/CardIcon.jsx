import { Link } from "gatsby"
import React from "react"

const CardIcon = ({ icon, title, desc, link }) => {
  return (
    <Link
      data-sal="fade"
      data-sal-duration="2000"
      data-sal-easing="ease"
      to={link}
      className="border border-card-border hover:shadow-xl transition-shadow compact side bg-card-background w-full flex-grow p-7"
    >
      <div className="flex-row items-center space-x-4 card-body">
        <div className="flex-1">
          <img width="48" height="48" className="lp" src={icon} alt="logo" />
          <h2 className="card-title text-card-title">{title}</h2>
          <p className="text-card-text">{desc}</p>
        </div>
      </div>
    </Link>
  )
}
export default CardIcon
