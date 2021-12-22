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
        permalink {
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
        subtitle {
          value
        }
        permalink {
          value
        }
        pagename {
          value
        }
       
      }
    }
  }
}
`

const createObjectIdMap = (nodeSet, type) => {
  return nodeSet.map(x => {
    return {
      objectID: x.id,
      type: type,
      title: x.elements.pagename.value,
      link: x.elements.permalink.value,
      categoryName: x?.elements?.categoryname?.value ? x?.elements?.categoryname?.value : null,
      subCategoryName: x?.elements?.subcategoryname?.value ? x.elements.subcategoryname.value : null,
      body: x?.elements?.body?.value ? x.elements.body.value : null
    }
  })
}

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => [
      ...createObjectIdMap(data?.allKontentItemKnowledgeCenterMarkdownPage?.nodes, "knowledge-center"),
      ...createObjectIdMap(data?.allKontentItemPostWhatsnew?.nodes, "whats-new"),
      ...createObjectIdMap(data?.allKontentItemReleaseNotesPage?.nodes, "release-notes")
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