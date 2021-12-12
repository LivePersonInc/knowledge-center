import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import LpRichTextElement from "./LpRichTextElement"

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
`

const Pagination = ({ prev, next }) => {
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
                  <p>{prev?.date.value}</p>
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
                  <p>{next?.date.value}</p>
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
