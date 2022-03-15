import { connectPagination } from "react-instantsearch-dom"
import React from "react"
import { Link } from "gatsby"

const Pagination = ({ currentRefinement, nbPages, refine, createURL }) => (
  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
    style={{
      fontFamily: 'Space Grotesk',
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '18px',
      lineHeight: '28px',
    }}>
    {currentRefinement > 1 && (
      <Link
        to="#"
        className="relative inline-flex items-center px-2 py-2"
        onClick={event => {
          event.preventDefault()
          refine(currentRefinement - 1)
        }}
      >
        <span>Previous</span>
      </Link>
    )}
    {new Array(nbPages).fill(null).length > 1 &&
      new Array(nbPages).fill(null).map((_, index) => {
        const page = index + 1
        const style = {
          fontWeight: currentRefinement === page ? "bold" : "",
        }

        return (
          <a
            href={createURL(page)}
            style={style}
            onClick={event => {
              event.preventDefault()
              refine(page)
            }}
            key={index}
            className="relative inline-flex items-center px-2 py-2"
          >
            {page}
          </a>
        )
      })}
    {currentRefinement < nbPages && (
      <Link
        to="#"
        className="relative inline-flex items-center p-1 px-2 py-2"
        onClick={event => {
          event.preventDefault()
          refine(currentRefinement + 1)
        }}
      >
        <span>Next </span>
      </Link>
    )}
  </nav>
)

const CustomPagination = connectPagination(Pagination)
export default CustomPagination