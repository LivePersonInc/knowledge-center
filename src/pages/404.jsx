import { Link } from "gatsby"
import React from "react"

import Seo from "../components/Seo"

const NotFoundPage = () => {
  return (
    <>
      <Seo title="404: Not found" />
      <h1>404: Not Found</h1>
      <p>Oops, we can&#39;t seem to find the page you are looking for</p>
      <Link to="/">Go back to the homepage</Link>
    </>
  )
}
export default NotFoundPage
