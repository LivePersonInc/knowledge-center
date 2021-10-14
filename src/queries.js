;`{
  allKontentItemKcProductOverview {
    edges {
      node {
				...PO
      }
    }
  }
}

fragment PO on kontent_item_kc_product_overview {
  elements {
    how_it_works {
      value
    }
    benefits {
      value
    }
    title {
      value
    }
    chat_messaging__chat_vs_messaging {
      value {
        name
      }
    }
    introduction {
      value
    }
    next_steps__next_steps {
      value {
        id
      }
    }
    use_cases {
      value
    }
    url_slug {
      value
    }
    key_components {
      value
    }
  }
}
`
