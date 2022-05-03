import React, { useState, useRef, useEffect } from "react"
import LpRichTextElement from "../../LpRichTextElement"
import styled from "styled-components"
import ArrowLeft from "../../icons/ArrowLeft"
import RelatedFaqArticles from "./RelatedFaqArticles"

const QuestionStyles = styled.section`
  display: flex;
  background-color: var(--table-even-background);
  padding: 1rem;
  gap: 0.5rem;
  @media (max-width: 1023px) {
    padding: 0.5rem;
  }
  button {
    font-family: "Space Grotesk";
    font-style: normal;
    font-weight: 700;
    font-size: 1.5rem;
    line-height: 2rem;
    gap: 0.5rem;
    justify-content: space-between;
    width: 100%;
  }

  .rotate {
    transform: rotate(-90deg);
  }
  .question-icon {
    display: flex;
    align-items: center;
    transition: transform 250ms ease;
  }
  .answer {
    max-height: 0;
    overflow: hidden;
    transition: all 250ms ease;
    text-align: left;
  }
  .faq-answer {
    margin-top: 1rem;
    transition: all 250ms ease;
  }
`

function FaqWidgetItem({ node }) {
  const [active, setActive] = useState(false)

  const contentRef = useRef(null)

  useEffect(() => {
    let el = document.getElementById("tModalLightbox")

    contentRef.current.style.maxHeight =
      active || el ? `${contentRef.current.scrollHeight}px` : "0px"
  }, [contentRef, active])

  const toggleAccordion = () => {
    setActive(!active)
  }

  // Related Articles
  const relatedFaqArticleList = node?.elements?.related_article.value

  return (
    <>
      <QuestionStyles key={node.id} className={`question_item ${active}`}>
        <svg
          onClick={toggleAccordion}
          className=""
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.9"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4 16C4 9.37258 9.37258 4 16 4C22.6274 4 28 9.37258 28 16C28 22.6274 22.6274 28 16 28C9.37258 28 4 22.6274 4 16ZM13.2971 9.62281C14.1684 8.86433 15.2641 8.5 16.5441 8.5C17.8491 8.5 18.9381 8.87 19.7484 9.66174C20.5667 10.4475 20.9546 11.5039 20.9546 12.7702C20.9546 13.5805 20.7619 14.3459 20.3784 15.0589L20.3774 15.0609C19.9913 15.7711 19.2862 16.5584 18.3083 17.4208L18.3 17.4281L18.2914 17.4351C17.7496 17.8719 17.4213 18.4721 17.32 19.2777C17.2508 19.8275 16.7994 20.3356 16.165 20.3356C15.5511 20.3356 15.0044 19.8235 15.0696 19.1554C15.1228 18.6102 15.2326 18.1263 15.411 17.7158C15.6625 17.137 16.1747 16.5118 16.8859 15.8434C17.5856 15.1792 17.9982 14.7443 18.164 14.5172L18.1655 14.5152C18.3378 14.2816 18.4676 14.0296 18.5562 13.7575L18.5583 13.7512C18.6499 13.482 18.7003 13.1639 18.7003 12.7904C18.7003 12.0441 18.4944 11.5225 18.1377 11.16L18.1326 11.1548C17.7853 10.7915 17.2796 10.5815 16.5441 10.5815C15.7969 10.5815 15.2427 10.7851 14.8326 11.1517C14.5426 11.4108 14.3538 11.7352 14.2656 12.142C14.1567 12.6447 13.7278 13.1489 13.0913 13.1489C12.4879 13.1489 11.901 12.637 12.0141 11.9353C12.1636 11.0078 12.5933 10.2299 13.2971 9.62281ZM15.2235 22.29C15.493 22.0081 15.8503 21.8929 16.2279 21.8929C16.5994 21.8929 16.9481 22.0084 17.2142 22.282C17.4715 22.5327 17.6028 22.8534 17.6028 23.2116C17.6028 23.5713 17.4656 23.89 17.2064 24.1385C16.9371 24.3968 16.5905 24.5 16.2279 24.5C15.8624 24.5 15.5106 24.399 15.2389 24.1385L15.2307 24.1306L15.2229 24.1224C14.983 23.8705 14.8636 23.5568 14.8636 23.2116C14.8636 22.8641 14.9808 22.5449 15.2235 22.29Z"
            fill="var(--faq-icon)"
          />
        </svg>
        <div className="flex flex-col grow w-full">
          <button className="faq-question button flex">
            <span className="flex gap-2">
              <span
                className="anchor-address"
                id={`${encodeURI(node.id)}`}
                style={{ margin: 0 }}
              >
                <span onClick={toggleAccordion}>
                  {node?.elements?.question?.value}
                </span>
                <a
                  data-tip="Click to copy direct link to this section"
                  className="anchor-link tooltip tooltip-bottom tooltip-primary"
                  href={`#${encodeURI(node?.system?.name)}`}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      window.location.origin +
                        window.location.pathname +
                        `#${encodeURI(node?.system?.name)}`
                    )
                  }}
                >
                  {/* anchor icon */}
                  <svg
                    width="21"
                    height="22"
                    viewBox="0 0 21 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.9">
                      <path
                        d="M19.7979 2.16181C21.36 3.7239 21.36 6.25656 19.7979 7.81866L16.9694 10.6471C16.1312 11.4853 15.0127 11.8737 13.9166 11.8124C13.6408 11.797 13.4298 11.561 13.4452 11.2853C13.4607 11.0096 13.6967 10.7985 13.9724 10.814C14.7963 10.86 15.6337 10.5686 16.2623 9.93998L19.0908 7.11155C20.2623 5.93998 20.2623 4.04049 19.0908 2.86891C17.9192 1.69734 16.0197 1.69734 14.8481 2.86891L12.0197 5.69734C11.3911 6.32596 11.0997 7.16333 11.1457 7.9873C11.1611 8.26301 10.9501 8.49901 10.6744 8.51443C10.3987 8.52984 10.1627 8.31882 10.1473 8.04311C10.086 6.94698 10.4743 5.82847 11.3126 4.99023L14.141 2.16181C15.7031 0.59971 18.2358 0.59971 19.7979 2.16181Z"
                        fill="var(--link-color)"
                      />
                      <path
                        d="M2.12128 19.8382C0.559183 18.2761 0.559183 15.7434 2.12128 14.1813L4.94971 11.3529C5.78794 10.5147 6.90646 10.1263 8.00258 10.1876C8.2783 10.203 8.48931 10.439 8.4739 10.7147C8.45849 10.9904 8.22248 11.2015 7.94677 11.186C7.1228 11.14 6.28543 11.4314 5.65681 12.06L2.82839 14.8884C1.65681 16.06 1.65681 17.9595 2.82839 19.1311C3.99996 20.3027 5.89945 20.3027 7.07103 19.1311L9.89945 16.3027C10.5281 15.674 10.8195 14.8367 10.7734 14.0127C10.758 13.737 10.969 13.501 11.2447 13.4856C11.5205 13.4702 11.7565 13.6812 11.7719 13.9569C11.8331 15.053 11.4448 16.1715 10.6066 17.0098L7.77813 19.8382C6.21604 21.4003 3.68338 21.4003 2.12128 19.8382Z"
                        fill="var(--link-color)"
                      />
                      <path
                        d="M6.71745 14.5351C6.52219 14.7304 6.52219 15.047 6.71745 15.2422C6.91271 15.4375 7.2293 15.4375 7.42456 15.2422L15.2027 7.46405C15.398 7.26879 15.398 6.95221 15.2027 6.75694C15.0075 6.56168 14.6909 6.56168 14.4956 6.75694L6.71745 14.5351Z"
                        fill="var(--link-color)"
                      />
                    </g>
                  </svg>
                </a>
              </span>
            </span>
            <div
              onClick={toggleAccordion}
              className={active ? `question-icon rotate` : `question-icon`}
            >
              <ArrowLeft />
            </div>
          </button>
          <div ref={contentRef} className={active ? `faq-answer` : `answer`}>
            <LpRichTextElement
              body_content={node?.elements?.long_answer?.value}
              bodyfield={node?.elements?.long_answer}
            />
            {relatedFaqArticleList.length > 0 && (
              <div id="relatedArticles" style={{ paddingTop: "2px" }}>
                <RelatedFaqArticles related={relatedFaqArticleList} />
              </div>
            )}
          </div>
        </div>
      </QuestionStyles>
    </>
  )
}
export default FaqWidgetItem
