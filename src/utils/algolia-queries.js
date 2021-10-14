const pageQuery = `
{
  allKontentItemKnowledgeCenterMarkdownPage {
    nodes {
      elements {
        body {
          value
        }
        subtitle {
          value
        }
        subcategoryname {
          value
        }
        redirects {
          value
        }
        permalink {
          value
        }
        pagename {
          value
        }
        categoryname {
          value
        }
      }
      id
    }
  }
}
`

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) =>
      data.allKontentItemKnowledgeCenterMarkdownPage.nodes,
  },
]

module.exports = queries
