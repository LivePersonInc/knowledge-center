import React from "react"
import moment from "moment"
import { useState, useEffect } from "react"

function useReadingTime(ref, wordsPerMinute = 260) {
  const [wordsCount, setWordsCount] = useState(1)

  useEffect(() => {
    const elem = ref.current
    const words = elem.innerText.match(/\w+/g)?.length

    setWordsCount(words ? words : null)
  }, [ref])

  return {
    readingTime: wordsCount ? Math.ceil(wordsCount / wordsPerMinute) : null,
    wordsCount,
  }
}
const ArticleMeta = ({ date, textRef }) => {
  const { readingTime } = useReadingTime(textRef)
  console.log(readingTime)
  return (
    <div className="ArticleMeta flex justify-start gap-4 text-xs text-footer-text font-semibold capitalize">
      <div>
        <div className="flex items-center gap-1">
          Updated: {"  "}
          <time
            className="article__meta-time flex"
            dateTime={moment(date).format("MMM D, YYYY")}
            data-kontent-element-codename="date"
          >
            {moment(date).format("YYYY") == new Date().getFullYear()
              // If you don't want to show the current year, remove YYYY
              ? moment(date).format("MMM D, YYYY")
              : moment(date).format("MMM D, YYYY")}
          </time>
        </div>
      </div>
      <div>
        {readingTime && (
          <div className="flex items-center">{readingTime} min read</div>
        )}
      </div>
    </div>
  )
}
export default ArticleMeta
