import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
 /* Scrollbar Styles */
body::-webkit-scrollbar,
#mysidebar::-webkit-scrollbar {
  width: 12px;
}
#mysidebar {
  list-style: none !important;
  & > .sidebar_item {
    padding-right: 12px;
  }
}
html,
#mysidebar {
  scrollbar-width: thin;
  scrollbar-color: var(--scroll-bg, #e7e8ec);
  scroll-behavior: smooth;
}
body::-webkit-scrollbar-track,
#mysidebar::-webkit-scrollbar-track {
  background: var(--body-background, #e7e8ec);
}
body::-webkit-scrollbar-thumb,
#mysidebar::-webkit-scrollbar-thumb {
  background-color: var(--scroll-bg, #e7e8ec);
  border-radius: 6px;
  border: 3px solid var(--body-background);
}
.anchor-address {
  display: flex;
  align-items: center;
  scroll-margin-top: 4em;
  @media (max-width: 1024px) {
    scroll-margin-top: 5em;
  }
  .anchor-link {
    display: none;
    margin-left: 8px;
    width: 25px;
    height: 25px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
  }
  &:hover {
    .anchor-link {
      display: block;
    }
  }
}
`

export default GlobalStyles
