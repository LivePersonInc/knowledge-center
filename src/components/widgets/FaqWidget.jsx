import { Link } from "gatsby"
import React from "react"
import LpRichTextElement from "../LpRichTextElement"
const FaqWidget = ({ questions }) => {
  return (
    <>
      {questions.map(node => (
        <div className="question_item">
          <button className="button">
            {node?.elements?.question?.value}
            <span className="control">—</span>
          </button>
          <div className="answer_wrapper">
            <div className="answer">
              <LpRichTextElement
                body_content={node?.elements?.long_answer?.value}
                bodyfield={node?.elements?.long_answer}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
export default FaqWidget
