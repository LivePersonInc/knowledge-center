import React from "react"
import { QuestionMarkCircleIcon } from "@heroicons/react/outline"
const AlertComponent = () => {
  return (
    <div
      data-sal="fade"
      data-sal-duration="2000"
      data-sal-easing="ease"
      className="mt-6 pt-6 border-t"
    >
      <h4>Missing something?</h4>
      <div className="content-widget missing-something p-4">
        <p>
          <QuestionMarkCircleIcon
            className="w-6 h-6 float-left mr-1"
            style={{
              stroke: "var(--missing-something-background)",
              fill: "var(--missing-something-color)",
            }}
          />
          We'd be happy to hear from you. You can
          <a
            rel="noreferrer"
            href="https://github.com/EdenKupe/knowledge-center/issues/new"
            target="_blank"
          >
            open
          </a>
          an issue if you find anything that needs correcting or
          <a
            rel="noreferrer"
            href="https://lpproduct.typeform.com/to/ffxrtD"
            target="_blank"
          >
            submit
          </a>
          a request for a document you think is missing. Check out our
          <a
            rel="noreferrer"
            href="https://developers.liveperson.com"
            target="_blank"
          >
            Developers' Community
          </a>
          for more in-depth documentation.
        </p>
      </div>
    </div>
  )
}
export default AlertComponent
