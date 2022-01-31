import React from "react"

const HeaderMobile = () => {
  return (
    <div className="lg:hidden">
      <label for="my-modal-2" className="modal-button">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 16.6L13.5 12C14.5 10.7 15 9.2 15 7.5C15 3.4 11.6 0 7.5 0C3.4 0 0 3.4 0 7.5C0 11.6 3.4 15 7.5 15C9.2 15 10.8 14.4 12 13.5L16.5 18L18 16.6ZM7.5 13C4.5 13 2 10.5 2 7.5C2 4.5 4.5 2 7.5 2C10.5 2 13 4.5 13 7.5C13 10.5 10.5 13 7.5 13Z"
            fill="#101040"
          />
        </svg>
      </label>

      <input type="checkbox" id="my-modal-2" className="modal-toggle" />
      <div className="modal" style={{ alignItems: "flex-start" }}>
        <div className="modal-box">
          <p>need to add search here</p>
          <div className="modal-action">
            <label for="my-modal-2" className="btn btn-primary">
              Accept
            </label>
            <label for="my-modal-2" className="btn">
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
export default HeaderMobile
