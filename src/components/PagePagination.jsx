import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import moment from "moment"

const PrevNext = styled.section`
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`
const Span = styled.span`
  display: inline-block;
  color: blue;
  font-weight: bold;
  font-size: 23px;
`

const Flex = styled.div`
  display: flex;
  gap: 0.5rem;
  h4 {
    font-weight: bold;
    color: var(--link-color);
    margin: 0;
    text-transform: capitalize;
  }
`

const PagePagination = ({ prev, next, pagetype }) => {
  const needsPagination = Boolean(prev) || Boolean(next)

  return (
    <div
      style={{
        background: "var(--search-input-background)",
        marginTop: "var(--space8)",
        padding: "1.5rem",
      }}
    >
      {needsPagination && (
        <PrevNext>
          {prev && (
            <Link
              style={{ textDecoration: "none" }}
              to={`/${pagetype}/${prev?.permalink.value}`}
            >
              <Flex>
                <Span>
                  <svg
                    width="16"
                    height="20"
                    viewBox="0 0 16 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6.40889 10.5L10.7876 6.12132L8.66625 4L0.88808 11.7782L1.10067 11.9908L1.10049 11.9909L8.87866 19.7691L11 17.6478L6.85218 13.5H16V10.5H6.40889Z"
                      fill="var(--link-color)"
                    />
                  </svg>
                </Span>
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
            <Link
              style={{ textDecoration: "none" }}
              to={`/${pagetype}/${next?.permalink.value}`}
            >
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
                <Span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.59111 6.5L5.21243 2.12132L7.33375 0L15.1119 7.77817L14.8993 7.99077L14.8995 7.99095L7.12134 15.7691L5.00002 13.6478L9.14782 9.5H0V6.5H9.59111Z"
                      fill="var(--link-color)"
                    />
                  </svg>
                </Span>
              </Flex>
            </Link>
          )}
        </PrevNext>
      )}
    </div>
  )
}

export default PagePagination
