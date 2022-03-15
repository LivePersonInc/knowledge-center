import SearchContextProvider from "./src/context/searchProvider"
import React from "react"

export const wrapPageElement = ({ element, props }) => (
  <SearchContextProvider {...props}>{element}</SearchContextProvider>
)
