import { Link } from "gatsby"
import React from "react"

const CardIcon = ({ icon, title, desc, link }) => {
  return (
    <Link
      to={link}
      className="card border border-card-border shadow-lg hover:shadow-xl transition duration-300 ease-in-out compact side bg-card-background xl:w-5/12 w-full flex-grow p-7"
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
