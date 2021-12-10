import { Link } from "gatsby"
import React from "react"

const Card = ({ title, desc, link, icon, homeimg }) => {
  return (
    <Link
      data-sal="fade"
      data-sal-duration="2000"
      data-sal-easing="ease"
      to={link}
      style={{
        background: `url(${homeimg}) no-repeat center center fixed`,
        backgroundSize: "cover",
      }}
      className="card border border-card-border shadow-lg hover:shadow-xl compact side xl:w-5/12 w-full flex-grow p-7"
    >
      <div className="flex-row items-center space-x-4 card-body">
        <div className="flex-1">
          <img width="48" height="48" className="lp" src={icon} alt="logo" />
          <h2 className="card-title text-button-text">{title}</h2>
          <p className="text-button-text text-opacity-40 ">{desc}</p>
        </div>
      </div>
    </Link>
  )
}
export default Card
