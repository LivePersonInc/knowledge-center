import React from "react"
import {
  RichTextElement,
  ImageElement,
} from "@kentico/gatsby-kontent-components"
import get from "lodash/get"
import { Link } from "gatsby"
import AnchorIcon from "../assets/images/anchor.svg"

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
              <div className="my-6 aspect-w-16 aspect-h-9">
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
                  " flex p-4"
                }
                className="my-6 text-center"
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
                    width={1000}
                    height={500}
                    backgroundColor="#bbbbbb"
                  />
                )}

                {linkedItem.elements.orientation.value[0].codename ===
                  "vertical" && (
                  <div>
                    <ImageElement
                      imgStyle={{ objectFit: `contain` }}
                      options={{
                        fit: "clip",
                      }}
                      className="mx-auto"
                      image={linkedItem.elements.image.value[0]}
                      width={320}
                      height={569}
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
          console.log("href: ", domNode.attribs?.href)
          return (
            <a
              data-tip="Click to copy direct link to this section"
              className="anchor-link tooltip tooltip-bottom tooltip-primary"
              href={domNode.attribs?.href}
              onClick={() => {
                navigator.clipboard.writeText(window.location.href)
              }}
            >
              <img src={AnchorIcon} alt="anchor link" />
            </a>
          )
        }
      }}
    />
  )
}
export default LpRichTextElement
