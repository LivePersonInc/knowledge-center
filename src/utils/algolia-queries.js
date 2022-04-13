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
          modular_content {
            id
            system {
              type
              codename
              id
            }
            ... on kontent_item_video___widget {
              id
              elements {
                video_id {
                  value
                }
              }
              system {
                codename
                type
              }
            }
            ... on kontent_item_image__widget {
              id
              system {
                type
              }
              elements {
                description {
                  value
                }
                image {
                  value {
                    url
                    name
                    description
                    height
                    width
                  }
                  name
                }
                orientation {
                  value {
                    codename
                  }
                }
                product {
                  value {
                    id
                    system {
                      id
                    }
                  }
                }
              }
            }
            ... on kontent_item_code_sample {
              id
              system {
                type
                codename
              }
              elements {
                code {
                  value
                }
                language {
                  value {
                    codename
                  }
                }
              }
            }
            ... on kontent_item_contentbox {
              id
              system {
                codename
                type
              }
              elements {
                notice_text {
                  value
                }
                type {
                  value {
                    codename
                  }
                }
              }
            }
          }
          images {
            url
            image_id
          }
          links {
            url_slug
            type
            codename
            link_id
          }
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
        introduction {
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
          modular_content {
            id
            system {
              type
              codename
              id
            }
            ... on kontent_item_video___widget {
              id
              elements {
                video_id {
                  value
                }
              }
              system {
                codename
                type
              }
            }
            ... on kontent_item_image__widget {
              id
              system {
                type
              }
              elements {
                description {
                  value
                }
                image {
                  value {
                    url
                    name
                    description
                    height
                    width
                  }
                  name
                }
                orientation {
                  value {
                    codename
                  }
                }
                product {
                  value {
                    id
                    system {
                      id
                    }
                  }
                }
              }
            }
            ... on kontent_item_code_sample {
              id
              system {
                type
                codename
              }
              elements {
                code {
                  value
                }
                language {
                  value {
                    codename
                  }
                }
              }
            }
            ... on kontent_item_contentbox {
              id
              system {
                codename
                type
              }
              elements {
                notice_text {
                  value
                }
                type {
                  value {
                    codename
                  }
                }
              }
            }
          }
          images {
            url
            image_id
          }
          links {
            url_slug
            type
            codename
            link_id
          }
        }
        permalink {
          value
        }
        pagename {
          value
        }
        product_release_notes {
          value {
            id
            ... on kontent_item_product_release_notes {
              id
              elements {
                version_number {
                  value
                }
                release_date {
                  value
                }
                product_name {
                  value {
                    system {
                      name
                    }
                    ... on kontent_item_product_release_notes {
                      id
                      system {
                        name
                      }
                    }
                    id
                  }
                }
                fixes {
                  value
                  modular_content {
                    id
                    system {
                      type
                      codename
                      id
                    }
                    ... on kontent_item_video___widget {
                      id
                      elements {
                        video_id {
                          value
                        }
                      }
                      system {
                        codename
                        type
                      }
                    }
                    ... on kontent_item_image__widget {
                      id
                      system {
                        type
                      }
                      elements {
                        description {
                          value
                        }
                        image {
                          value {
                            url
                            name
                            description
                            height
                            width
                          }
                          name
                        }
                        orientation {
                          value {
                            codename
                          }
                        }
                        product {
                          value {
                            id
                            system {
                              id
                            }
                          }
                        }
                      }
                    }
                    ... on kontent_item_code_sample {
                      id
                      system {
                        type
                        codename
                      }
                      elements {
                        code {
                          value
                        }
                        language {
                          value {
                            codename
                          }
                        }
                      }
                    }
                    ... on kontent_item_contentbox {
                      id
                      system {
                        codename
                        type
                      }
                      elements {
                        notice_text {
                          value
                        }
                        type {
                          value {
                            codename
                          }
                        }
                      }
                    }
                  }
                }
                features {
                  value
                  modular_content {
                    id
                    system {
                      type
                      codename
                      id
                    }
                    ... on kontent_item_video___widget {
                      id
                      elements {
                        video_id {
                          value
                        }
                      }
                      system {
                        codename
                        type
                      }
                    }
                    ... on kontent_item_image__widget {
                      id
                      system {
                        type
                      }
                      elements {
                        description {
                          value
                        }
                        image {
                          value {
                            url
                            name
                            description
                            height
                            width
                          }
                          name
                        }
                        orientation {
                          value {
                            codename
                          }
                        }
                        product {
                          value {
                            id
                            system {
                              id
                            }
                          }
                        }
                      }
                    }
                    ... on kontent_item_code_sample {
                      id
                      system {
                        type
                        codename
                      }
                      elements {
                        code {
                          value
                        }
                        language {
                          value {
                            codename
                          }
                        }
                      }
                    }
                    ... on kontent_item_contentbox {
                      id
                      system {
                        codename
                        type
                      }
                      elements {
                        notice_text {
                          value
                        }
                        type {
                          value {
                            codename
                          }
                        }
                      }
                    }
                  }
                }
                enhancements {
                  value
                  modular_content {
                    id
                    system {
                      type
                      codename
                      id
                    }
                    ... on kontent_item_video___widget {
                      id
                      elements {
                        video_id {
                          value
                        }
                      }
                      system {
                        codename
                        type
                      }
                    }
                    ... on kontent_item_image__widget {
                      id
                      system {
                        type
                      }
                      elements {
                        description {
                          value
                        }
                        image {
                          value {
                            url
                            name
                            description
                            height
                            width
                          }
                          name
                        }
                        orientation {
                          value {
                            codename
                          }
                        }
                        product {
                          value {
                            id
                            system {
                              id
                            }
                          }
                        }
                      }
                    }
                    ... on kontent_item_code_sample {
                      id
                      system {
                        type
                        codename
                      }
                      elements {
                        code {
                          value
                        }
                        language {
                          value {
                            codename
                          }
                        }
                      }
                    }
                    ... on kontent_item_contentbox {
                      id
                      system {
                        codename
                        type
                      }
                      elements {
                        notice_text {
                          value
                        }
                        type {
                          value {
                            codename
                          }
                        }
                      }
                    }
                  }
                }
                channels_supported {
                  value {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  allKontentItemPostWhatsnew(filter: {system: {workflow_step: {eq: "published"}}}) {
    nodes {
      id
      elements {
        pagename {
          value
        }
        permalink {
          value
        }
        date {
          value
        }
        subtitle {
          value
          modular_content {
            id
            system {
              type
              codename
              id
            }
            ... on kontent_item_video___widget {
              id
              elements {
                video_id {
                  value
                }
              }
              system {
                codename
                type
              }
            }
            ... on kontent_item_image__widget {
              id
              system {
                type
              }
              elements {
                description {
                  value
                }
                image {
                  value {
                    url
                    name
                    description
                    height
                    width
                  }
                  name
                }
                orientation {
                  value {
                    codename
                  }
                }
                product {
                  value {
                    id
                    system {
                      id
                    }
                  }
                }
              }
            }
            ... on kontent_item_code_sample {
              id
              system {
                type
                codename
              }
              elements {
                code {
                  value
                }
                language {
                  value {
                    codename
                  }
                }
              }
            }
            ... on kontent_item_contentbox {
              id
              system {
                codename
                type
              }
              elements {
                notice_text {
                  value
                }
                type {
                  value {
                    codename
                  }
                }
              }
            }
          }
          images {
            url
            image_id
          }
          links {
            url_slug
            type
            codename
            link_id
          }
        }
        body {
          value
          modular_content {
            id
            system {
              type
              codename
              id
            }
            ... on kontent_item_video___widget {
              id
              elements {
                video_id {
                  value
                }
              }
              system {
                codename
                type
              }
            }
            ... on kontent_item_image__widget {
              id
              system {
                type
              }
              elements {
                description {
                  value
                }
                image {
                  value {
                    url
                    name
                    description
                    height
                    width
                  }
                  name
                }
                orientation {
                  value {
                    codename
                  }
                }
                product {
                  value {
                    id
                    system {
                      id
                    }
                  }
                }
              }
            }
            ... on kontent_item_code_sample {
              id
              system {
                type
                codename
              }
              elements {
                code {
                  value
                }
                language {
                  value {
                    codename
                  }
                }
              }
            }
            ... on kontent_item_contentbox {
              id
              system {
                codename
                type
              }
              elements {
                notice_text {
                  value
                }
                type {
                  value {
                    codename
                  }
                }
              }
            }
          }
          images {
            url
            image_id
          }
          links {
            url_slug
            type
            codename
            link_id
          }
        }
      }
    }
  }
  allKontentItemKcFaqs(filter: {system: {workflow_step: {eq: "published"}}}) {
    edges {
      node {
        elements {
          redirects {
            value
          }
          permalink {
            value
          }
          pagename {
            value
          }
          introduction {
            value
            modular_content {
              id
              system {
                type
                codename
                id
              }
              ... on kontent_item_video___widget {
                id
                elements {
                  video_id {
                    value
                  }
                }
                system {
                  codename
                  type
                }
              }
              ... on kontent_item_image__widget {
                id
                system {
                  type
                }
                elements {
                  description {
                    value
                  }
                  image {
                    value {
                      url
                      name
                      description
                      height
                      width
                    }
                    name
                  }
                  orientation {
                    value {
                      codename
                    }
                  }
                  product {
                    value {
                      id
                      system {
                        id
                      }
                    }
                  }
                }
              }
              ... on kontent_item_code_sample {
                id
                system {
                  type
                  codename
                }
                elements {
                  code {
                    value
                  }
                  language {
                    value {
                      codename
                    }
                  }
                }
              }
              ... on kontent_item_contentbox {
                id
                system {
                  codename
                  type
                }
                elements {
                  notice_text {
                    value
                  }
                  type {
                    value {
                      codename
                    }
                  }
                }
              }
            }
          }
          faq_items {
            value {
              ... on kontent_item_faq {
                id
                elements {
                  short_answer {
                    value
                  }
                  question {
                    value
                  }
                  long_answer {
                    value
                    modular_content {
                      id
                      system {
                        type
                        codename
                        id
                      }
                      ... on kontent_item_video___widget {
                        id
                        elements {
                          video_id {
                            value
                          }
                        }
                        system {
                          codename
                          type
                        }
                      }
                      ... on kontent_item_image__widget {
                        id
                        system {
                          type
                        }
                        elements {
                          description {
                            value
                          }
                          image {
                            value {
                              url
                              name
                              description
                              height
                              width
                            }
                            name
                          }
                          orientation {
                            value {
                              codename
                            }
                          }
                          product {
                            value {
                              id
                              system {
                                id
                              }
                            }
                          }
                        }
                      }
                      ... on kontent_item_code_sample {
                        id
                        system {
                          type
                          codename
                        }
                        elements {
                          code {
                            value
                          }
                          language {
                            value {
                              codename
                            }
                          }
                        }
                      }
                      ... on kontent_item_contentbox {
                        id
                        system {
                          codename
                          type
                        }
                        elements {
                          notice_text {
                            value
                          }
                          type {
                            value {
                              codename
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        id
      }
    }
    nodes {
      system {
        codename
        id
      }
      elements {
        permalink {
          name
          value
        }
        redirects {
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
      ...createObjectIdMap(
        data?.allKontentItemKcFaqs?.nodes,
        "faqs"
      ),
    ],
  },
]

module.exports = queries
