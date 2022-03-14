import React, { useContext, useEffect } from "react"
import Breadcrumbs from "../components/Breadbrumbs"
import { Link } from "gatsby"

import { connectHits, Pagination, Highlight } from "react-instantsearch-dom"
import SearchContext from "../context/searchContext"
import CustomHighlight from "../components/search/highlight"
import { InstantSearch as InstantSearchHook } from "react-instantsearch-hooks"

const Hit = props => {
  //   useEffect(()=>{
  // updateHits(props)
  //   },[props.hits])
  return (
    <div>
      {props?.hits?.length > 0
        ? props.hits.map((hit, index) => {
            console.log(hit)

            //  if (strippedHit.length > 100)
            //    strippedHit = strippedHit.substring(0, 100) + "..."
            return (
              <Link
                to={
                  hit.type === "release-notes" || hit.type === "whats-new"
                    ? `/${hit.type}/${hit.link}`
                    : `/${hit.link}`
                }
                onClick={props.onClose}
              >
                <div key={index} className="card-search-result">
                  <div className="hit-name">
                    <p
                      className="text-primary mb-1 title-search"
                      attribute="name"
                    >
                      <Highlight attribute="title" hit={hit} />
                    </p>
                    {hit.categoryName && (
                      <nav
                        className="breadcrumbs"
                        style={{ marginBottom: "8px" }}
                      >
                        <ul className="bread-crumbs flex-wrap text-footer-text">
                          <li className="breadcrumbs-item m-0 ">
                            {hit.categoryName}
                            {"\u00A0"}
                          </li>
                          {hit.subCategoryName && (
                            <li className="breadcrumbs-item  m-0">
                              \{"\u00A0"}
                              {hit.subCategoryName}
                            </li>
                          )}
                        </ul>
                      </nav>
                    )}
                  </div>

                  <CustomHighlight
                    className="text-footer-text subtitle-search"
                    attribute="subtitle"
                    hit={hit}
                  />
                </div>
              </Link>
            )
          })
        : null}
    </div>
  )
}
const CustomHits = connectHits(props => <Hit {...props} />)

export default function SearchCom() {
  const { setRedirectStatus, filterTypes, query, searchClient, searchState } =
    useContext(SearchContext)
  // const {hits}=useHits()
  return (
    <div>
      <Breadcrumbs thirdCrumb={"Search Result"} />
      <h1 className="h1">Search Results</h1>

      {/* <nav className="breadcrumbs">
        <ul className="bread-crumbs flex-wrap text-primary">
          <li className="breadcrumbs-item m-0 ">All Results</li>
          {filterTypes.length &&
            filterTypes.map(v => {
              return <li className="breadcrumbs-item m-0 ">{v}</li>
            })}
        </ul>
      </nav> */}
      <InstantSearchHook
        indexName="helpcenter"
        searchClient={searchClient}
        searchState={searchState}
        refresh={true}
        searchable={true}
      >
        {" "}
        <p>
          Showing {""} with {`"${query}"`} found
        </p>
        <CustomHits onClose={() => setRedirectStatus(true)} />
        <Pagination />
      </InstantSearchHook>
    </div>
  )
}
