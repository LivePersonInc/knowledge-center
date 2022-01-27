import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const BreadcrumbsStyles = styled.ul`
  li.breadcrumb-item.no-after {
    color: var(--text-lighter);
  }
`

const Breadcrumbs = ({ secondCrumbTitle, secondCrumbLink, thirdCrumb }) => {
  return (
    <div className="text-sm breadcrumbs">
      <BreadcrumbsStyles className="flex-wrap text-primary">
        <li className="breadcrumb-item m-0">
          <Link to="/">Knowledge Center</Link>
        </li>
        <li className="breadcrumb-item m-0">
          <Link to={`/${secondCrumbLink}`}>{secondCrumbTitle}</Link>
        </li>
        <li className="breadcrumb-item no-after m-0">{thirdCrumb}</li>
      </BreadcrumbsStyles>
    </div>
  )
}

export default Breadcrumbs
