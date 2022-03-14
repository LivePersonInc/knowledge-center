import React from "react"
import { connectSearchBox } from "react-instantsearch-dom"
import { navigate } from "gatsby"

export default connectSearchBox(
  ({ refine, currentRefinement, className, onFocus }) => {
    const onKeyDown = event => {
      if (event.key === "Enter") {
        navigate("/search/", {
          state: { search: event.target.value },
        })
      }
    }
    return (
      <form className={className}>
        <input
          className="SearchInput"
          type="text"
          placeholder="Search"
          aria-label="Search"
          onChange={e => refine(e.target.value)}
          value={currentRefinement}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
        />
      </form>
    )
  }
)
