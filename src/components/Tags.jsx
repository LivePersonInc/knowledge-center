import React from "react"

const Tags = ({ tags }) => {
  // if (tags[0] === "Both") {
  //   tags = ["Chat", "Messaging"]
  // }

  return (
    <ul data-testid="tags" className="indicators flex my-4">
      {tags.map(tag => (
        <li
          key={tag}
          className="tag text-xs badge bg-tags-background text-tags-color border-transparent mr-2 py-3 px-4 mb-0"
        >
          {tag}
        </li>
      ))}
    </ul>
  )
}
export default Tags
