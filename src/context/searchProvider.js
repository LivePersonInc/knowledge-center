import React, { useState } from "react"
import algoliasearch from "algoliasearch/lite"
import SearchContext from "./searchContext"
import { InstantSearch } from "react-instantsearch-dom"

let appId = process.env.GATSBY_ALGOLIA_APP_ID
let apiKey = process.env.GATSBY_ALGOLIA_APP_KEY

const searchClient = algoliasearch(appId, apiKey)
const SearchContextProvider = ({ children }) => {
  const [redirectStatus, setRedirectStatus] = useState(false)

  let initialSearchState = {
    query: null,
  }
  let initialQuery = ""
  const [query, setQuery] = useState(initialQuery)
  const [searchState, setSearchState] = useState(initialSearchState)
  // const [filterTypes, setFilterTypes] = useState(initialSearchState)

  // const updateHits = v => {
  //   console.log(v)
  //   setTtemsLength(v.hits.length)
  //   if (v.hits.length) {
  //     let foundTypes = []
  //     v.hits.map(c => {
  //       if (!foundTypes.includes(c.type)) foundTypes.push(c.type)
  //     })
  //     setFilterTypes(foundTypes)
  //   }
  // }
  const onSearchStateChange = updatedSearchState => {
    // console.log(updatedSearchState);
    setRedirectStatus(false)
    setSearchState(updatedSearchState)
    if (updatedSearchState.query !== undefined)
      setQuery(updatedSearchState.query)
  }
  return (
    <SearchContext.Provider
      value={{
        redirectStatus,
        setRedirectStatus,

        query,

        searchState,
      }}
    >
      <InstantSearch
        indexName="helpcenter"
        searchClient={searchClient}
        searchState={searchState}
        onSearchStateChange={onSearchStateChange}
        refresh={true}
        searchable={true}
      >
        {children}
      </InstantSearch>
    </SearchContext.Provider>
  )
}
export default SearchContextProvider