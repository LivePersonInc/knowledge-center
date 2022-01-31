import React from "react"
import { Link } from "gatsby"
import Slash from "./widgets/Slash"

const Breadcrumbs = ({ secondCrumbTitle, secondCrumbLink, thirdCrumb }) => {
  return (
    <nav className="breadcrumbs">
      <ul className="bread-crumbs flex-wrap text-primary">
        <li className="breadcrumbs-item m-0">
          <Link to="/">Knowledge Center</Link>
        </li>
        <li className="m-0">
          <Slash />
        </li>
        <li className="breadcrumbs-item m-0">
          <Link to={`/${secondCrumbLink}`}>{secondCrumbTitle}</Link>
        </li>
        <li className="m-0">
          <Slash />
        </li>
        <li className="breadcrumbs-item text-body-text m-0">{thirdCrumb}</li>
      </ul>
    </nav>
  )
}

export default Breadcrumbs
