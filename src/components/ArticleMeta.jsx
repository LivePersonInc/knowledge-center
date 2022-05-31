import React from "react"
import moment from "moment"
import { useState, useEffect } from "react"

function useReadingTime(ref, wordsPerMinute = 260) {
  const [wordsCount, setWordsCount] = useState(1)

  useEffect(() => {
    const elem = ref.current
    const words = elem.innerText.match(/\w+/g).length
    setWordsCount(words)
  }, [ref])

  return { readingTime: Math.ceil(wordsCount / wordsPerMinute), wordsCount }
}
const ArticleMeta = ({ date, textRef }) => {
  const { readingTime } = useReadingTime(textRef)
  console.log(readingTime)
  return (
    <div className="ArticleMeta flex justify-start gap-4 text-xs text-footer-text font-semibold">
      {/* <div>
        <div className="flex items-center">Suggest changes</div>
      </div> */}
      <div>
        <div className="flex items-center gap-1">
          Last updated {"  "}
          <time
            className="article__meta-time flex"
            dateTime={moment(date).format("MMMM D, YYYY")}
            data-kontent-element-codename="date"
          >
            {moment(date).format("YYYY") == new Date().getFullYear()
              ? moment(date).format("MMMM D")
              : moment(date).format("MMMM D, YYYY")}
          </time>
        </div>
      </div>
      <div>
        <div className="flex items-center">{readingTime} min read</div>
      </div>
    </div>
  )
}
export default ArticleMeta
