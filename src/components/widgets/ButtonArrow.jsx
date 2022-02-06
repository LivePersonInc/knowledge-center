import React from "react"

const ButtonArrow = ({ btnText }) => {
  return (
    <h6 className="flex items-center mb-2 font-bold text-primary hover:text-primary-hover transition-all text-opacity-40 underline">
      {btnText}
      <svg
        className="w-4 h-4 ml-2"
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.50016 0.833374L6.32516 2.00837L10.9752 6.66671H0.833496V8.33337H10.9752L6.32516 12.9917L7.50016 14.1667L14.1668 7.50004L7.50016 0.833374Z"
          fill="currentColor"
        />
      </svg>
    </h6>
  )
}
export default ButtonArrow
