import React, { useContext } from "react"
import Breadcrumbs from "../components/Breadbrumbs"
import { Link } from "gatsby"

import {
  connectHits,
  connectStateResults,
  Highlight,
  connectRefinementList,
  connectCurrentRefinements,
} from "react-instantsearch-dom"
import SearchContext from "../context/searchContext"
import CustomHighlight from "../components/search/highlight"
import CustomPagination from "../components/search/pagination"
import Footer from "../components/Footer"

const tags = [
  { type: "knowledge-center", title: "Articles" },
  { type: "release-notes", title: "Release notes" },
  { type: "whats-new", title: "News" },
]

const Hit = props => {
  //   useEffect(()=>{
  // updateHits(props)
  //   },[props.hits])
  return (
    <div>
      {props?.hits?.length > 0
        ? props.hits.map((hit, index) => {
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
                key={index}
              >
                <div className="card-search-result mb-8">
                  <div className="hit-name">
                    <p
                      className="text-primary mb-1 title-search underline hover:no-underline"
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
                          <li className="m-0 text-xs">
                            {hit.categoryName}
                            {"\u00A0"}
                          </li>
                          {hit.subCategoryName && (
                            <li className="m-0 text-xs">
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
const StateResults = ({ searchResults, searchState }) => {
  const hasResults = searchResults && searchResults.nbHits !== 0
  const nbHits = searchResults && searchResults.nbHits
  const query = searchState.query
  if (query)
    return (
      <div>
        <p hidden={!hasResults}>
          {nbHits} items with {`"${query}"`} found
        </p>
        <p hidden={hasResults}>There is no results</p>
      </div>
    )
  else return null
}
const CustomStateResults = connectStateResults(StateResults)

const RefinementLisst = ({ items, refine, createURL, currentRefinement }) => {
  // const [showMore, setShowMore] = useState(false)
  const ClearRefinements = ({ items, refine }) => (
    <Link
      to="#"
      className="search-tags"
      style={{
        background:
          currentRefinement.length === 0 ? "var(--search-tags-activated)" : "",
        borderColor:
          currentRefinement.length === 0 ? "var(--search-tags-activated)" : "",
      }}
      onClick={event => {
        event.preventDefault()
        refine(items)
      }}
    >
      All Results
    </Link>
  )

  const CustomClearRefinements = connectCurrentRefinements(ClearRefinements)
  return (
    <nav className="breadcrumbs" style={{ marginBottom: "var(--space8)" }}>
      <ul className="bread-crumbs flex-wrap text-primary justify-content-between gap-1">
        <li className="flex" style={{ marginBottom: 0 }}>
          <CustomClearRefinements />
        </li>
        {items.length &&
          tags.map((tag, k) => {
            // if(k+1> limit && showMore){
            //    return (
            //      <li
            //        className=""
            //        key={item.label}
            //      >
            //        <a
            //          href={createURL(item.value)}
            //          style={{ fontWeight: item.isRefined ? "bold" : "" }}
            //          onClick={event => {
            //            event.preventDefault()
            //            refine(item.value)
            //          }}
            //        >
            //          {item.label.toUpperCase()} ({item.count})
            //        </a>
            //      </li>
            //    )
            // }else if (k+1 > limit && !showMore) {
            //   return null
            // } else {
            // let foundLabel = tags.filter(v => v.type === item.label)[0]
            let item = items.filter(v => v.label === tag.type)[0]
            // console.log(item, items)

            return (
              <li className="flex" style={{ marginBottom: 0 }} key={k}>
                {item && (
                  <a
                    href={createURL(item.value)}
                    className="search-tags"
                    style={{
                      background: item.isRefined
                        ? "var(--search-tags-activated)"
                        : "",
                      borderColor: item.isRefined
                        ? "var(--search-tags-activated)"
                        : "",
                    }}
                    onClick={event => {
                      event.preventDefault()
                      refine(item.value)
                    }}
                  >
                    {tag.title}
                  </a>
                )}
              </li>
            )
          })}
        {/* {items.length>2&& !showMore&& <li>
          <button
            onClick={event => {
              event.preventDefault()
              setShowMore(true)
            }}
          >
            Show More
          </button>
        </li>} */}
      </ul>
    </nav>
  )
}
const CustomRefinementList = connectRefinementList(RefinementLisst)

export default function SearchCom() {
  const { setRedirectStatus } = useContext(SearchContext)
  return (
    <div>
      <Breadcrumbs thirdCrumb={"Search Result"} />
      <h1 className="h1">Search Results</h1>
      <CustomStateResults />

      <CustomRefinementList
        attribute="type"
        noResults="No results"
        limit={2}
        showMoreLimit={5}
        showMore={true}
        searchable={false}
        facetOrdering={false}
      />
      <CustomHits onClose={() => setRedirectStatus(true)} />
      <CustomPagination />
      <Footer />
    </div>
  )
}
