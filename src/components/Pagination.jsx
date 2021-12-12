import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import moment from "moment"

const PrevNext = styled.section`
  display: flex;
  justify-content: space-between;
`
const Span = styled.span`
  display: inline-block;
  color: blue;
  font-weight: bold;
  font-size: 23px;
`
const Flex = styled.div`
  display: flex;
  h4 {
    font-size: 1rem;
    font-weight: bold;
    color: var(--link-color);
    margin: 0;
    text-transform: capitalize;
  }
`

const Pagination = ({ prev, next }) => {
  const date = prev?.date.value
  const needsPagination = Boolean(prev) || Boolean(next)

  return (
    <div
      style={{ borderTop: "1px solid var(--card-border)", paddingTop: "2rem" }}
    >
      {needsPagination && (
        <PrevNext>
          {prev && (
            <Link to={`/${prev?.permalink.value}`}>
              <Flex>
                <Span>← </Span>
                <div>
                  <h4>{prev?.pagename.value}</h4>
                  <time
                    className="article__meta-time flex"
                    dateTime={moment(prev?.date.value).format(
                      "MMMM D, YYYY HH:mm"
                    )}
                  >
                    {moment(prev?.date.value).format("MMMM D YY, HH:mmA")}
                  </time>
                  {/* <LpRichTextElement
                    body_content={prev?.subtitle.value}
                    bodyfield={prev?.subtitle}
                  /> */}
                </div>
              </Flex>
            </Link>
          )}
          {next && (
            <Link to={`/${next?.permalink.value}`}>
              <Flex>
                <div>
                  <h4>{next?.pagename.value}</h4>

                  <time
                    className="article__meta-time flex"
                    dateTime={moment(next?.date.value).format(
                      "MMMM D, YYYY HH:mm"
                    )}
                  >
                    {moment(next?.date.value).format("MMMM D YY, HH:mmA")}
                  </time>
                  {/* <LpRichTextElement
                    body_content={next?.subtitle.value}
                    bodyfield={next?.subtitle}
                  /> */}
                </div>
                <Span> →</Span>
              </Flex>
            </Link>
          )}
        </PrevNext>
      )}
    </div>
  )
}

export default Pagination
