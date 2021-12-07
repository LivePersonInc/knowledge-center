import React from "react"
import { Link } from "gatsby"
// import styled from "styled-components"

// const BreadcrumbsStyles = styled.ul`
//   flex-wrap: wrap;
//   @media (max-width: 767px) {
//     flex-wrap: wrap;
//     flex-directon: column;
//     align-items: flex-start;

//     li.breadcrumb-item.no-after {
//       color: var(--card-text);
//     }
//   }
// `

const Breadcrumbs = ({ secondCrumbTitle, secondCrumbLink, thirdCrumb }) => {
  return (
    <div className="text-sm breadcrumbs">
      <ul>
        <li className="breadcrumb-item">
          <Link to="/">Knowledge Center</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`/${secondCrumbLink}`}>{secondCrumbTitle}</Link>
        </li>
        <li className="breadcrumb-item no-after">{thirdCrumb}</li>
      </ul>
    </div>
  )
}

export default Breadcrumbs
