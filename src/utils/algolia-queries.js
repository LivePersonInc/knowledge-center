const pageQuery = `
{
  allKontentItemKnowledgeCenterMarkdownPage(
    filter: {system: {workflow_step: {eq: "published"}}}
  ) {
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
  allKontentItemReleaseNotesPage(
    filter: {system: {workflow_step: {eq: "published"}}}
  ) {
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
  allKontentItemPostWhatsnew(filter: {system: {workflow_step: {eq: "published"}}}) {
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
      subtitle: x.elements.subtitle.value,
      link: x.elements.permalink.value,
      categoryName: x?.elements?.categoryname?.value
        ? x?.elements?.categoryname?.value
        : null,
      subCategoryName: x?.elements?.subcategoryname?.value
        ? x.elements.subcategoryname.value
        : null,
      body: x?.elements?.body?.value ? x.elements.body.value : null,
    }
  })
}

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => [
      ...createObjectIdMap(
        data?.allKontentItemKnowledgeCenterMarkdownPage?.nodes,
        "knowledge-center"
      ),
      ...createObjectIdMap(
        data?.allKontentItemPostWhatsnew?.nodes,
        "whats-new"
      ),
      ...createObjectIdMap(
        data?.allKontentItemReleaseNotesPage?.nodes,
        "release-notes"
      ),
    ],
  },
]

module.exports = queries
