import React from "react"

const Tags = ({ tags }) => {
  // if (tags[0] === "Both") {
  //   tags = ["Chat", "Messaging"]
  // }

  return (
    <ul data-testid="tags" className="indicators flex my-4">
      {tags.map(tag => (
        <li key={tag} className="tag badge bg-gray-lightest mr-2">
          {tag}
        </li>
      ))}
    </ul>
  )
}
export default Tags
