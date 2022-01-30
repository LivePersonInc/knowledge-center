import { Link } from "gatsby"
import React from "react"

import Seo from "../components/Seo"

const NotFoundPage = () => {
  return (
    <div className="flex flex-col justify-center items-center w-[60%] mx-auto mt-[20vh] text-center">
      <Seo title="404: Not found" />
      <p>404: Not Found</p>
      <h1>Oops, we can&#39;t seem to find the page you are looking for</h1>
      <Link to="/">Go back to the homepage</Link>
    </div>
  )
}
export default NotFoundPage
