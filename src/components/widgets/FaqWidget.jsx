import React from "react"
import FaqWidgetItem from "./FaqWidgetItem"

function FaqWidget({ questions }) {
  return (
    <>
      {questions.map(node => (
        <FaqWidgetItem node={node} />
      ))}
    </>
  )
}
export default FaqWidget
