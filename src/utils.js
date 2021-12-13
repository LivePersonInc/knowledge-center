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

// Customize Body Content

export const customBodyContent = body_content => {
  const innerHTMLarr = body_content
    .match(/<h2>.*(?=<\/h2>)/g)
    ?.map(x => encodeURI(x.substring(4)))

  let idx = 0
  const h2Len = innerHTMLarr?.length

  const custom_body_content = body_content.replace(
    /<h2>(.*)(?=<\/h2>)/g,

    function (tag, select1) {
      if (idx === h2Len - 1) {
        return `<h2 class="anchor-address" id="${innerHTMLarr[idx]}">${select1}<a href="#${innerHTMLarr[idx]}" id='anchor-link'></a></h2>`
      }
      const res = `<h2 class="anchor-address" id="${
        innerHTMLarr[idx]
      }">${select1}<a href="#${innerHTMLarr[idx + 1]}" id='anchor-link'></a>
    </h2>`
      idx++

      return res
    }
  )

  return custom_body_content
}
