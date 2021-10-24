import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const BreadcrumbsStyles = styled.ul`
  flex-wrap: wrap;
  @media (max-width: 767px) {
    flex-wrap: wrap;
    flex-directon: column;
    align-items: flex-start;

    li.breadcrumb-item.no-after {
      color: var(--card-text);
    }
  }
`

const Breadcrumbs = ({ breadCrumbs, breadLink }) => {
  const createBreadCrumbs = () => {
    return breadCrumbs?.map((crumb, i) => {
      return i < breadCrumbs.length - 1 ? (
        <li key={crumb} className="breadcrumb-item">
          <Link to={`/${breadLink}`}>{crumb}</Link>
        </li>
      ) : (
        <li key={crumb} className="breadcrumb-item no-after">
          {crumb}
        </li>
      )
    })
  }

  return (
    <div className="text-sm breadcrumbs">
      <BreadcrumbsStyles>{createBreadCrumbs()}</BreadcrumbsStyles>
    </div>
  )
}

export default Breadcrumbs
