import { Link } from "gatsby"
import React from "react"

const CardWhatsnew = ({ title, icon }) => {
  return (
    <div
      data-sal="fade"
      data-sal-duration="2000"
      data-sal-easing="ease"
      className="flex border border-card-border hover:shadow-xl transition-shadow compact side w-full flex-grow p-7"
    >
      <div className="flex-col  space-x-4 card-body">
        <div className="flex flex-col flex-1">
          <img width="48" height="48" className="lp" src={icon} alt="logo" />
          <h2 className="card-title text-card-title">{title}</h2>
          <Link
            to="/whats-new"
            className="text-card-title text-opacity-40 mt-auto"
          >
            View all news
          </Link>
        </div>
      </div>
    </div>
  )
}
export default CardWhatsnew
