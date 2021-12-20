const pageQuery = `
{
  allKontentItemKnowledgeCenterMarkdownPage {
    nodes {
      id
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
     
    }
  }
  allKontentItemReleaseNotesPage {
    nodes {
      id
      elements {
        subtitle {
          value
        }
        pagename {
          value
        }
      }
    }
  }
  allKontentItemPostWhatsnew {
    nodes {
      id
      elements {
        body {
          value
        }
        pagename {
          value
        }
        subtitle {
          value
        }
        permalink {
          value
        }
      }
    }
  }
}
`

const createObjectIdMap = (nodeSet) => {
  return nodeSet.map(x => {
    x.objectID = x.id;
    delete x.id;
  })
}

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => [
      ...data?.allKontentItemKnowledgeCenterMarkdownPage?.nodes,
      ...data?.allKontentItemPostWhatsnew?.nodes,
      ...data?.allKontentItemReleaseNotesPage?.nodes
    ]
    // add
    // allKontentItemPostWhatsnew
    // allKontentItemReleaseNotesPage
  },
]

module.exports = queries

// const allData = (data) => {
//   return ({
//     ...data.allKontentItemKnowledgeCenterMarkdownPage.nodes,
//     ...data.allKontentItemPostWhatsnew.nodes,
//     ...data.allKontentItemReleaseNotesPage.nodes,
//   })
// }

// const queries = [
//   {
//     query: pageQuery,
//     transformer: ({ data }) => allData(data)
//   },
// ]

// module.exports = queries
