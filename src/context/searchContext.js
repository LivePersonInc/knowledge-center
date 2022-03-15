import { createContext, useReducer, useEffect } from "react"

const SearchContext = createContext({
  redirectStatus: false,
  setRedirectStatus: () => {},

  query: "",

  searchState: "",
})

export default SearchContext
