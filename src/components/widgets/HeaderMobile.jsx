import React, { useState } from "react"
import { Link } from "gatsby"
import algoliasearch from "algoliasearch/lite"
import {
  InstantSearch,
  connectHits,
  connectStateResults,
  Index,
  SearchBox,
  Highlight,
} from "react-instantsearch-dom"

const SearchMobile = () => {
  let appId = process.env.GATSBY_ALGOLIA_APP_ID
  let apiKey = process.env.GATSBY_ALGOLIA_APP_KEY

  const searchClient = algoliasearch(appId, apiKey)
  const [redirectStatus, setRedirectStatus] = useState(false)

  const IndexResults = connectStateResults(
    ({ searchState, searchResults, children }) => {
      if (redirectStatus) {
        searchState.query = ""
      }
      return searchResults && searchResults.nbHits !== 0 && searchState.query
        ? children
        : null
    }
  )

  return (
    <div className="flex items-stretch w-full flex-col relative mobile-search-component">
      <InstantSearch
        indexName="helpcenter"
        searchClient={searchClient}
        onSearchStateChange={() => {
          setRedirectStatus(false)
        }}
        refresh={true}
        searchable={true}
      >
        <SearchBox
          submit={
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 19.6L16.5 15C17.5 13.7 18 12.2 18 10.5C18 6.4 14.6 3 10.5 3C6.4 3 3 6.4 3 10.5C3 14.6 6.4 18 10.5 18C12.2 18 13.8 17.4 15 16.5L19.5 21L21 19.6ZM10.5 16C7.5 16 5 13.5 5 10.5C5 7.5 7.5 5 10.5 5C13.5 5 16 7.5 16 10.5C16 13.5 13.5 16 10.5 16Z"
                fill="var(--search-input-color)"
              />
            </svg>
          }
          style={{ borderRadius: `32px`, backgroundColor: "#EEEFF1" }}
          type="text"
          placeholder="SEARCH"
          className="search-input w-full rounded-full"
        />
        <Index indexName="helpcenter">
          <IndexResults>
            <div
              className="right-panel"
              style={{
                background: "var(--body-background)",
                color: "var(--body-text)",
                borderRadius: 5,
                zIndex: 9999,
                position: "sticky",
                top: "3rem",
                width: "100%",
                maxHeight: "90vh",
                overflowY: "auto",
                boxShadow: "inset 0px -1px 1px var(--search-input-background)",
              }}
            >
              <CustomHits onClose={() => setRedirectStatus(true)} />
            </div>
          </IndexResults>
        </Index>
      </InstantSearch>
    </div>
  )
}

const Hit = props => {
  return (
    <div>
      {props?.hits?.length > 0
        ? props.hits.map((pP, index) => {
            return (
              <div key={index} className="hit-block">
                <Link to={`/${pP.link}`} onClick={props.onClose}>
                  <div className="hit-name">
                    <p className="font-bold" attribute="name">
                      <Highlight attribute="title" hit={pP} />
                    </p>
                  </div>
                  <Highlight attribute="subtitle" hit={pP} />
                </Link>
              </div>
            )
          })
        : null}
    </div>
  )
}

const CustomHits = connectHits(props => <Hit {...props} />)

const HeaderMobile = () => {
  return (
    <div className="lg:hidden">
      <label for="my-modal-2" className="modal-button">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 16.6L13.5 12C14.5 10.7 15 9.2 15 7.5C15 3.4 11.6 0 7.5 0C3.4 0 0 3.4 0 7.5C0 11.6 3.4 15 7.5 15C9.2 15 10.8 14.4 12 13.5L16.5 18L18 16.6ZM7.5 13C4.5 13 2 10.5 2 7.5C2 4.5 4.5 2 7.5 2C10.5 2 13 4.5 13 7.5C13 10.5 10.5 13 7.5 13Z"
            fill="var(--body-text)"
          />
        </svg>
      </label>

      <input type="checkbox" id="my-modal-2" className="modal-toggle" />
      <div className="modal" style={{ alignItems: "flex-start" }}>
        <div
          className="modal-box"
          style={{ maxHeight: "unset", padding: "1rem" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              gap: "10px",
            }}
          >
            <SearchMobile />
            <label
              for="my-modal-2"
              className="modal-button"
              style={{ paddingTop: "18px" }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
                  fill="#101040"
                />
              </svg>
            </label>
          </div>

          {/* <div className="modal-action">
            <label for="my-modal-2" className="btn btn-primary">
              Accept
            </label>
            <label for="my-modal-2" className="btn">
              Close
            </label>
          </div> */}
        </div>
      </div>
    </div>
  )
}
export default HeaderMobile
