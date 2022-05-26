import React from "react"
import { Link } from "gatsby"
import Slash from "./widgets/Slash"

const BreadcrumbsDynamic = ({ crumbArray, lastCrumb }) => {
  return (
    <nav className="breadcrumbs">
      <ul className="bread-crumbs flex-wrap text-primary">
        <li className="breadcrumbs-item m-0 hover:text-primary-hover">
          <Link to="/">Knowledge Center</Link>
        </li>
        {crumbArray &&
          crumbArray.length > 0 &&
          crumbArray.map((v, k) => (
            <>
              <li className="m-0">
                <Slash />
              </li>
              <li className="breadcrumbs-item m-0 hover:text-primary-hover">
                <Link to={`/${v.url}`}>{v.title}</Link>
              </li>
            </>
          ))}

        <li className="m-0">
          <Slash />
        </li>
        <li className="breadcrumbs-item text-body-text m-0">{lastCrumb}</li>
      </ul>
    </nav>
  )
}

export default BreadcrumbsDynamic
