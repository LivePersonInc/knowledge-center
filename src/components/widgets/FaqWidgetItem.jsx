import React, { useState, useRef, useEffect } from "react"
import LpRichTextElement from "../LpRichTextElement"
import styled from "styled-components"

const QuestionStyles = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: var(--table-even-background);
  padding: 1rem;
  button {
    font-family: "Space Grotesk";
    font-style: normal;
    font-weight: 700;
    font-size: 1.5rem;
    line-height: 2rem;
    gap: 0.5rem;
  }

  .question-section {
    background: transparent;
    border: 1px solid lightgray;
    border-radius: 8px;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    cursor: pointer;
    width: 92vw;
  }

  .rotate {
    transform: rotate(45deg);
  }

  .answer {
    margin-left: 8px;
    margin-right: 8px;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.6s ease;
    text-align: left;
  }
`

function FaqWidgetItem({ node }) {
  const [active, setActive] = useState(false)

  const contentRef = useRef(null)

  useEffect(() => {
    contentRef.current.style.maxHeight = active
      ? `${contentRef.current.scrollHeight}px`
      : "0px"
  }, [contentRef, active])

  const toggleAccordion = () => {
    setActive(!active)
  }
  return (
    <>
      <QuestionStyles
        key={node.id}
        className={`question_item ${active}`}
        onClick={toggleAccordion}
      >
        <button className="faq-question button flex">
          <svg
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
              fill="var(--link-color)"
            />
          </svg>

          {node?.elements?.question?.value}

          <div className={active ? `question-icon rotate` : `question-icon`}>
            =
          </div>
        </button>
        <div ref={contentRef} className={active ? `faq-answer` : `answer`}>
          <LpRichTextElement
            body_content={node?.elements?.short_answer?.value}
            bodyfield={node?.elements?.short_answer}
          />
          <LpRichTextElement
            body_content={node?.elements?.long_answer?.value}
            bodyfield={node?.elements?.long_answer}
          />
        </div>
      </QuestionStyles>
    </>
  )
}
export default FaqWidgetItem
