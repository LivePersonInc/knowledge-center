import React, { useState } from "react"
import {
  RichTextElement,
  ImageElement,
} from "@kentico/gatsby-kontent-components"
import Table from "../components/Table"
import TableMc from "../components/TableMc"
import get from "lodash/get"
import { Link } from "gatsby"
import Carousel, { Modal, ModalGateway } from "react-images"
import FaqWidgetItem from "./widgets/Faq/FaqWidgetItem"

// 👋🏽 Hi there!
// This component is a wrapper around the @kentico/gatsby-kontent-components/RichTextElement component.
// It's purpose is to provide customized components from the Kentico Kontent project.
// like the Table component, the TableMC component, the FaqWidgetItem component, the video element, the image__widget, etc.

const LpRichTextElement = ({ body_content, bodyfield }) => {
  const [currentImage, setCurrentImage] = useState(0)
  const [lightBoxImages, setLightBoxImages] = useState([])
  let lightBoxImagess = []
  const [viewerIsOpen, setViewerIsOpen] = useState(false)
  // useEffect(() => {
  //   console.log(lightBoxImagess)
  //   // setLightBoxImages([...lightBoxImagess])
  // }, [lightBoxImagess])

  const openLightbox = (value, view) => {
    let index = lightBoxImagess.findIndex(v => v.name === value.name)

    let imageObjects = []
    if (lightBoxImagess !== null && lightBoxImagess.length > 0) {
      lightBoxImagess.map((image, i) => {
        let imageObject = {
          src: image.url,
          caption: image.description,
        }
        imageObjects.push(imageObject)
        return image
      })
    }
    setLightBoxImages(imageObjects)
    setCurrentImage(index)
    setViewerIsOpen(true)
  }

  const closeLightbox = () => {
    setCurrentImage(0)
    setViewerIsOpen(false)
  }
  return (
    <>
      <RichTextElement
        value={body_content}
        images={bodyfield.images}
        links={bodyfield.links}
        linkedItems={bodyfield.modular_content}
        // resolveImage={image => {
        //   console.log(image)
        //   return <ImageElement />
        // }}
        resolveLink={(link, domNode) => {
          const parentItemType = link?.type
          // console.log(link.type)
          // It is possible to use external data for resolution
          if(!parentItemType)return <Link to={`/`}>
                    {domNode.children[0].data}
                  </Link>
          return (
            <>
              {(parentItemType === "post___whatsnew" && (
                <Link to={`/whats-new/${link?.url_slug || "#"}`}>
                  {domNode.children[0].data}
                </Link>
              )) ||
                (parentItemType === "release_notes_page" && (
                  <Link to={`/release-notes/${link?.url_slug || "#"}`}>
                    {domNode.children[0].data}
                  </Link>
                )) || (
                  <Link to={`/${link?.url_slug || "#"}`}>
                    {domNode.children[0].data}
                  </Link>
                )}
            </>
          )
        }}
        resolveLinkedItem={linkedItem => {
          switch (get(linkedItem, "system.type")) {
            case "video___widget": {
              // let videoType = linkedItem.elements.video_type.value[0].codename
              let videoId = linkedItem.elements.video_id.value
              return (
                <div className="my-8 aspect-w-16 aspect-h-9">
                  {linkedItem.elements.video_type.value[0]?.codename ===
                  "youtube" ? ( // if youtube video
                    <iframe
                      title={videoId}
                      width="640"
                      height="360"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      frameborder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  ) : linkedItem.elements.video_type.value[0]?.codename ===
                    "vidyard" ? (
                    <iframe
                      title={videoId}
                      className="vidyard_iframe"
                      src={`//play.vidyard.com/${videoId}`}
                      width="640"
                      height="360"
                      scrolling="no"
                      frameborder="0"
                      allowtransparency="true"
                      allowfullscreen
                    ></iframe>
                  ) : (
                    // if vimeo video
                    <iframe
                      title={videoId}
                      className="mx-auto w-full"
                      src={
                        `https://player.vimeo.com/video/` +
                        videoId +
                        `?h=038e0fbc6f`
                      }
                      width={640}
                      height={360}
                      frameBorder={0}
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    />
                  )}
                </div>
              )
            }
            case "image__widget": {
              let codeName = linkedItem.elements.orientation.value[0].codename
              let imgWidth = linkedItem.elements.image.value[0].width
              let imgHeight = linkedItem.elements.image.value[0].height
              if (codeName === "horizontal" || codeName === "vertical")
                lightBoxImagess.push(linkedItem.elements.image.value[0])
              return (
                <div
                  className={
                    "my-8 " +
                    linkedItem.elements.orientation.value[0].codename +
                    " flex flex-col text-center cursor-pointer"
                  }
                  style={{
                    cursor: "pointer",
                  }}
                  key={linkedItem.system.id}
                  role="none"
                  onClick={v => {
                    if (codeName === "horizontal" || codeName === "vertical")
                      openLightbox(
                        linkedItem.elements.image.value[0],

                        null
                      )
                    else return
                  }}
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
                      width={imgWidth ? imgWidth : 600}
                      height={imgHeight ? imgHeight : 400}
                      backgroundColor="#bbbbbb"
                    />
                  )}

                  {linkedItem.elements.orientation.value[0].codename ===
                    "vertical" && (
                    <ImageElement
                      imgStyle={{ objectFit: `contain` }}
                      options={{
                        fit: "clip",
                      }}
                      className="mx-auto"
                      width={imgWidth ? imgWidth : 400}
                      height={imgHeight ? imgHeight : 600}
                      backgroundColor="#bbbbbb"
                      alt={
                        linkedItem.elements.image.description
                          ? linkedItem.elements.image.description
                          : linkedItem.elements.image.name
                      }
                      image={linkedItem.elements.image.value[0]}
                    />
                  )}
                  <p className="text-center my-2 opacity-70 italic">
                    {linkedItem.elements.description.value}
                  </p>
                </div>
              )
            }

            case "code_sample": {
              return (
                <div
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

            case "reporting_metrics_table___widget": {
              return <Table />
            }

            case "messaging_channels___widget": {
              return <TableMc />
            }

            case "contentbox": {
              return (
                <div className="my-6" key={linkedItem.elements.id}>
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
                              "M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12ZM9.34214 9.62567V10.3529L10.5899 10.6524L9.22138 17.2834C9.1543 17.6114 9.10063 17.9109 9.06038 18.1818C9.02013 18.4528 9 18.7308 9 19.016C9 19.2585 9.09392 19.4866 9.28176 19.7005C9.48302 19.9002 9.83857 20 10.3484 20C10.5899 20 10.8449 19.9715 11.1132 19.9144C11.3816 19.8717 11.6432 19.8075 11.8981 19.7219C12.1665 19.6364 12.4147 19.5365 12.6428 19.4225C12.8843 19.3084 13.0922 19.1872 13.2667 19.0588V18.3316H11.8579L13.6692 9.1123L13.3069 8.85562C13.0252 8.85562 12.6964 8.88414 12.3208 8.94118C11.9585 8.98396 11.5895 9.041 11.2138 9.1123C10.8382 9.1836 10.4826 9.26916 10.1472 9.36898C9.81174 9.45455 9.5434 9.54011 9.34214 9.62567ZM11.4956 4.40642C11.187 4.67736 11.0327 5.05526 11.0327 5.54011C11.0327 5.99643 11.187 6.36007 11.4956 6.63102C11.8042 6.90196 12.1933 7.03743 12.6629 7.03743C13.1727 7.03743 13.5753 6.90196 13.8704 6.63102C14.179 6.36007 14.3333 5.99643 14.3333 5.54011C14.3333 5.05526 14.179 4.67736 13.8704 4.40642C13.5753 4.13547 13.1727 4 12.6629 4C12.1933 4 11.8042 4.13547 11.4956 4.40642Z") ||
                            (linkedItem.elements.type.value[0].codename ===
                              "warning" &&
                              "M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12ZM13.019 13.4362C13.0049 13.9357 12.5959 14.3333 12.0962 14.3333C11.5961 14.3333 11.1869 13.935 11.1734 13.4351L11.0277 8.02694C11.0125 7.46431 11.4645 7 12.0273 7H12.1715C12.7348 7 13.1869 7.46504 13.1711 8.02811L13.019 13.4362ZM13.2 16.9C13.2 17.5075 12.7075 18 12.1 18C11.4925 18 11 17.5075 11 16.9C11 16.2925 11.4925 15.8 12.1 15.8C12.7075 15.8 13.2 16.2925 13.2 16.9Z") ||
                            (linkedItem.elements.type.value[0].codename ===
                              "bad" &&
                              "M12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0ZM5.79289 5.79289C6.18342 5.40237 6.81658 5.40237 7.20711 5.79289L12 10.5858L16.7929 5.79289C17.1834 5.40237 17.8166 5.40237 18.2071 5.79289C18.5976 6.18342 18.5976 6.81658 18.2071 7.20711L13.4142 12L18.2071 16.7929C18.5976 17.1834 18.5976 17.8166 18.2071 18.2071C17.8166 18.5976 17.1834 18.5976 16.7929 18.2071L12 13.4142L7.20711 18.2071C6.81658 18.5976 6.18342 18.5976 5.79289 18.2071C5.40237 17.8166 5.40237 17.1834 5.79289 16.7929L10.5858 12L5.79289 7.20711C5.40237 6.81658 5.40237 6.18342 5.79289 5.79289Z") ||
                            (linkedItem.elements.type.value[0].codename ===
                              "success" &&
                              "M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12ZM19.2071 9.20711C19.5976 8.81658 19.5976 8.18342 19.2071 7.79289C18.8166 7.40237 18.1834 7.40237 17.7929 7.79289L10 15.5858L7.20711 12.7929C6.81658 12.4024 6.18342 12.4024 5.79289 12.7929C5.40237 13.1834 5.40237 13.8166 5.79289 14.2071L10 18.4142L19.2071 9.20711Z")
                          }
                          clipRule="evenodd"
                          opacity="0.9"
                        ></path>
                      </svg>
                    </div>
                    <div className="px-3">
                      <RichTextElement
                        value={linkedItem.elements.notice_text.value}
                        links={linkedItem.elements.notice_text.links}
                        linkedItems={
                          linkedItem.elements.notice_text.modular_content
                        }
                        resolveLink={(innerlink, innerDomNode) => {
                          const parentNoticeItemType = innerlink.type
                          return (
                            <>
                              {(parentNoticeItemType === "post___whatsnew" && (
                                <Link
                                  to={`/whats-new/${
                                    innerlink?.url_slug || "#"
                                  }`}
                                >
                                  {innerDomNode.children[0].data}
                                </Link>
                              )) ||
                                (parentNoticeItemType ===
                                  "release_notes_page" && (
                                  <Link
                                    to={`/release-notes/${
                                      innerlink?.url_slug || "#"
                                    }`}
                                  >
                                    {innerDomNode.children[0].data}
                                  </Link>
                                )) || (
                                  <Link to={`/${innerlink?.url_slug || "#"}`}>
                                    {innerDomNode.children[0].data}
                                  </Link>
                                )}
                            </>
                          )
                        }}
                      />
                    </div>
                  </div>
                </div>
              )
            }

            case "faq": {
              return (
                <div className="mt-4">
                  <FaqWidgetItem node={linkedItem} />
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
                <div className="tablelp w-full table-compact kontent-table">
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
      {viewerIsOpen && (
        <span id="tModalLightbox" className="sr-only">
          f
        </span>
      )}
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel currentIndex={currentImage} views={lightBoxImages} />
          </Modal>
        ) : null}
      </ModalGateway>
    </>
  )
}
export default LpRichTextElement
