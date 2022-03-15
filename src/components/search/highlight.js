import React from "react"
import { connectHighlight } from "react-instantsearch-dom"
import parse from "html-react-parser"
const Highlight = ({ highlight, attribute, hit }) => {
  const parsedHit = highlight({
    highlightProperty: "_highlightResult",
    attribute,
    hit,
  })

  // console.log("parsedHit")
  let type = hit.type

  return (
    <p className="text-lm subtitle-search text-body-text">
      {parsedHit.map((part, index) => {
        let strippedHit = part.value
        if (type === "release-notes") {
          strippedHit = strippedHit.replace(/(<([^>]+)>)/gi, "")
          return part.isHighlighted ? (
            <mark className="ais-Highlight-highlighted font-bold" key={index}>
              {parse(strippedHit)}
            </mark>
          ) : (
            <span
              className="ais-Highlight-nonHighlighted font-bold"
              key={index}
            >
              {parse(strippedHit)}
            </span>
          )
        } else {
          return part.isHighlighted ? (
            <mark
              className="ais-Highlight-highlighted font-bold text-body-text"
              key={index}
            >
              {part.value}
            </mark>
          ) : (
            <span className="ais-Highlight-nonHighlighted " key={index}>
              {part.value}
            </span>
          )
        }
      })}
    </p>
  )
}

const CustomHighlight = connectHighlight(Highlight)
export default CustomHighlight
