import React from "react"

const Button = ({ btnText }) => {
  return (
    <button
      className="btn btn-secondary hover:btn-secondary-hover transition-all"
      style={{
        border: "1px solid #FCFCFC",
        boxSizing: "border-box",
        borderRadius: "24px",
        fontFamily: "Space Grotesk",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "16px",
        lineHeight: "24px",
        textTransform: "capitalize",
        color: "#000000",
      }}
    >
      {btnText}
    </button>
  )
}
export default Button
