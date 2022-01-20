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
      className="border border-card-border hover:shadow-xl transition-shadow compact side w-full flex-grow"
    >
      <div className="flex-row items-center space-x-4 card-body">
        <div className="flex-1">
          <img
            width="32"
            height="32"
            className="lp mb-4"
            src={icon}
            alt="logo"
          />
          <h2 className="card-title text-button-text">{title}</h2>
          <p className="text-button-text text-opacity-40 ">{desc}</p>
        </div>
      </div>
    </Link>
  )
}
export default Card
