import React from "react"
import sanitizeHtml from "sanitize-html"
// Imports your new content item resolver.
// fix me import { resolveItemInRichText } from "./utils/itemResolver"

export const postMarkup = (unsanitiedHtml, classDiv) => {
  const options = {
    allowedTags: [
      "address",
      "img",
      "article",
      "aside",
      "footer",
      "header",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "hgroup",
      "main",
      "nav",
      "section",
      "blockquote",
      "dd",
      "div",
      "dl",
      "dt",
      "figcaption",
      "figure",
      "hr",
      "li",
      "main",
      "ol",
      "p",
      "pre",
      "ul",
      "a",
      "abbr",
      "b",
      "bdi",
      "bdo",
      "br",
      "cite",
      "code",
      "data",
      "dfn",
      "em",
      "i",
      "kbd",
      "mark",
      "q",
      "rb",
      "rp",
      "rt",
      "rtc",
      "ruby",
      "s",
      "samp",
      "small",
      "span",
      "strong",
      "sub",
      "sup",
      "time",
      "u",
      "var",
      "wbr",
      "caption",
      "col",
      "colgroup",
      "table",
      "tbody",
      "td",
      "tfoot",
      "th",
      "thead",
      "tr",

    ],
    allowedAttributes: {
      "*": [
        "href",
        "align",
        "alt",
        "center",
        "bgcolor",
        "src",
        "type",
        "name",
        "class",
        "id",
      ],
    },
    // Lots of these won't come up by default because we don't allow them
    selfClosing: [
      "img",
      "br",
      "hr",
      "area",
      "base",
      "basefont",
      "input",
      "link",
      "meta",
    ],
    allowedIframeHostnames: ["www.youtube.com"],
  }

  const sanitizedHtml = sanitizeHtml(unsanitiedHtml, options)
  return (
    <div
      className={classDiv}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  )
}
