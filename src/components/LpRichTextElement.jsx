import React from "react"
import {
  RichTextElement,
  ImageElement,
} from "@kentico/gatsby-kontent-components"
import get from "lodash/get"
import { Link } from "gatsby"

const LpRichTextElement = ({ body_content, bodyfield }) => {
  return (
    <RichTextElement
      value={body_content}
      images={bodyfield.images}
      links={bodyfield.links}
      linkedItems={bodyfield.modular_content}
      resolveImage={image => {
        return (
          <ImageElement
            image={image}
            alt="{image.description ? image.description : image.name}"
            width={200}
          />
        )
      }}
      resolveLink={(link, domNode) => {
        // const parentItemType =
        //   bodyfield.type

        // It is possible to use external data for resolution
        return (
          <Link to={`/${link?.url_slug || "#"}`}>
            {domNode.children[0].data}
          </Link>
        )
      }}
      resolveLinkedItem={linkedItem => {
        switch (get(linkedItem, "system.type")) {
          case "video___widget": {
            return (
              <div className="my-8 aspect-w-16 aspect-h-9">
                <iframe
                  title={linkedItem.elements.video_id.value}
                  className="mx-auto w-full"
                  src={
                    `https://player.vimeo.com/video/` +
                    linkedItem.elements.video_id.value +
                    `?h=038e0fbc6f`
                  }
                  width={640}
                  height={360}
                  frameBorder={0}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )
          }
          case "image__widget": {
            return (
              <div
                className={
                  "my-6 " +
                  linkedItem.elements.orientation.value[0].codename +
                  " flex flex-col p-4 text-center"
                }
                key={linkedItem.system.id}
              >
                {linkedItem.elements.orientation.value[0].codename ===
                  "horizontal" && (
                  <ImageElement
                    imgStyle={{ objectFit: `contain` }}
                    options={{
                      fit: "clip",
                    }}
                    image={linkedItem.elements.image.value[0]}
                    alt={
                      linkedItem.elements.image.description
                        ? linkedItem.elements.image.description
                        : linkedItem.elements.image.name
                    }
                    width={linkedItem.elements.image.width}
                    height={linkedItem.elements.image.height}
                    backgroundColor="#bbbbbb"
                  />
                )}

                {linkedItem.elements.orientation.value[0].codename ===
                  "vertical" && (
                  <div className="my-6 flex flex-col p-4 text-center">
                    <ImageElement
                      imgStyle={{ objectFit: `contain` }}
                      options={{
                        fit: "clip",
                      }}
                      className="mx-auto"
                      width={linkedItem.elements.image.width}
                      height={linkedItem.elements.image.height}
                      backgroundColor="#bbbbbb"
                      alt={
                        linkedItem.elements.image.description
                          ? linkedItem.elements.image.description
                          : linkedItem.elements.image.name
                      }
                    />
                  </div>
                )}
                <p className="text-center my-2">
                  {linkedItem.elements.description.value}
                </p>
              </div>
            )
          }

          case "code_sample": {
            return (
              <div
                data-sal="fade"
                data-sal-duration="2000"
                data-sal-easing="ease"
                className="my-6"
                style={{
                  background: "var(--card-background)",
                  whiteSpace: "break-spaces",
                }}
              >
                <h5 className="text-card-text text-sm mb-1 uppercase">
                  {linkedItem.elements.language.value[0].codename}:
                </h5>
                <div className="code_sample border p-4">
                  <code>{linkedItem.elements.code.value}</code>
                </div>
              </div>
            )
          }

          // case "reporting_metrics_table___widget": {
          //   return (
          //    <Tablecomplex />
          //   )
          // }

          case "contentbox": {
            return (
              <div
                data-sal="fade"
                data-sal-duration="2000"
                data-sal-easing="ease"
                className="my-6"
                key={linkedItem.elements.id}
              >
                <div
                  className={
                    "content-widget " +
                    linkedItem.elements.type.value[0].codename +
                    " flex p-4"
                  }
                >
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill={
                          "var(--" +
                          linkedItem.elements.type.value[0].codename +
                          "-color)"
                        }
                        fillRule="evenodd"
                        d={
                          (linkedItem.elements.type.value[0].codename ===
                            "notice" &&
                            "M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm10.838 1.184a.842.842 0 01-1.683 0l-.125-4.185A.97.97 0 1112.969 9l-.131 4.184zM13 16a1 1 0 11-2 0 1 1 0 012 0z") ||
                          (linkedItem.elements.type.value[0].codename ===
                            "warning" &&
                            "M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm6.136-5.12a.9.9 0 00-1.272 1.272l3.863 3.864-3.863 3.863a.9.9 0 001.272 1.273L12 13.288l3.864 3.864a.9.9 0 001.273-1.273l-3.864-3.864 3.864-3.863a.9.9 0 10-1.273-1.273L12 10.743 8.136 6.879z") ||
                          (linkedItem.elements.type.value[0].codename ===
                            "success" &&
                            "M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm5.601 7.176a.9.9 0 10-1.273-1.273l-6.341 6.341-2.39-2.39a.9.9 0 00-1.273 1.273l3.663 3.663L17.6 9.176z")
                        }
                        clipRule="evenodd"
                        opacity="0.9"
                      ></path>
                    </svg>
                  </div>
                  <div
                    className="px-3"
                    dangerouslySetInnerHTML={{
                      __html: linkedItem.elements.notice_text.value,
                    }}
                  />
                </div>
              </div>
            )
          }

          default: {
            return null
          }
        }
      }}
      resolveDomNode={(domNode, domToReact) => {
        if (domNode.name === "table") {
          // For options - check https://www.npmjs.com/package/html-react-parser#options
          return (
            <div className="overflow-x-auto">
              <div className="tablelp w-full table-compact">
                {domToReact([domNode])}
              </div>
            </div>
          )
        }
        if (domNode.attribs?.id === "anchor-link") {
          return (
            <a
              data-tip="Click to copy direct link to this section"
              className="anchor-link tooltip tooltip-bottom tooltip-primary"
              href={domNode.attribs?.href}
              onClick={() => {
                navigator.clipboard.writeText(
                  window.location.origin +
                    window.location.pathname +
                    domNode.attribs?.href
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
          )
        }
      }}
    />
  )
}
export default LpRichTextElement
