import algoliasearch from "algoliasearch/lite"
import { createRef, default as React, useState } from "react"
import { InstantSearch } from "react-instantsearch-dom"
import { ThemeProvider } from "styled-components"
import StyledSearchBox from "./styled-search-box"
import StyledSearchResult from "./styled-search-result"
import StyledSearchRoot from "./styled-search-root"
import useClickOutside from "./use-click-outside"
const theme = {
  foreground: "#050505",
  background: "white",
  faded: "#888",
}

let appId = process.env.GATSBY_ALGOLIA_APP_ID
let apiKey = process.env.GATSBY_ALGOLIA_APP_KEY

const searchClient = algoliasearch(appId, apiKey)

export default function Search({ indices }) {
  const rootRef = createRef()
  const [query, setQuery] = useState()
  const [hasFocus, setFocus] = useState(false)

  useClickOutside(rootRef, () => setFocus(false))
  return (
    <ThemeProvider theme={theme}>
      <StyledSearchRoot ref={rootRef}>
        <InstantSearch
          searchClient={searchClient}
          indexName="helpcenter"
          onSearchStateChange={({ query }) => setQuery(query)}
        >
          <StyledSearchBox onFocus={() => setFocus(true)} hasFocus={hasFocus} />
          <StyledSearchResult
            show={query && query.length > 0 && hasFocus}
            indices={indices}
          />
        </InstantSearch>
      </StyledSearchRoot>
    </ThemeProvider>
  )
}