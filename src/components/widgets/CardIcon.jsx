import { Link } from "gatsby"
import React from "react"
import { CustomerSupport, MessagingIcon, ExploreIcon } from "../icons/home"

const CardIcon = ({ icon, title, desc, link }) => {
  return (
    <Link
      data-sal="fade"
      data-sal-duration="2000"
      data-sal-easing="ease"
      to={link}
      className="border border-card-border hover:shadow-xl transition-shadow compact side bg-card-background w-full flex-grow"
    >
      <div className="flex-row items-center space-x-4 card-body">
        <div className="flex-1">
          <div className="lp mb-4">
            {(() => {
              switch (icon) {
                case "MessagingIcon":
                  return <MessagingIcon />
                case "ExploreIcon":
                  return <ExploreIcon />
                case "CustomerSupport":
                  return <CustomerSupport />

                default:
                  return "-"
              }
            })()}
          </div>
          <h2 className="card-title text-card-title">{title}</h2>
          <p className="text-card-text">{desc}</p>
        </div>
      </div>
    </Link>
  )
}
export default CardIcon
