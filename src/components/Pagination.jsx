import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const PrevNext = styled.section`
  display: flex;
  justify-content: center;
`
const Button = styled.button`
  text-decoration: none;
  display: inline-block;
  padding: 8px 16px;
  background-color: #04aa6d;
  margin-right: 16px;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    transition: all ease-in-out 0.2s;
    background-color: #ddd;
    color: black;
  }
`

const Pagination = ({ prev, next }) => {
  const needsPagination = Boolean(prev) || Boolean(next)

  return (
    <>
      {needsPagination && (
        <PrevNext>
          {prev && (
            <Link to={`/${prev}`}>
              <Button>← Prev</Button>
            </Link>
          )}
          {next && (
            <Link to={`/${next}`}>
              <Button>Next →</Button>
            </Link>
          )}
        </PrevNext>
      )}
    </>
  )
}

export default Pagination
