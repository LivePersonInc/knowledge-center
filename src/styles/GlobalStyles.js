import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
  /* Scrollbar Styles */
  body::-webkit-scrollbar,#mysidebar::-webkit-scrollbar {
    width: 12px;
  }
  #mysidebar>.nav_item {
    padding-right: 12px;
}
@media(max-width:767px) {
.drawer-toggle:checked~.drawer-side {
    margin-right: -20px;
        direction: rtl;
}
ul#mysidebar {
    direction: ltr;
}
  #mysidebar>.nav_item {
    padding: 0 12px;
}
}
  html,#mysidebar {
    scrollbar-width: thin;
    scrollbar-color: var(--scroll-bg) green;
    scroll-behavior: smooth;
  }
  body::-webkit-scrollbar-track,#mysidebar::-webkit-scrollbar-track {
    background: var(--body-background);
  }
  body::-webkit-scrollbar-thumb,#mysidebar::-webkit-scrollbar-thumb {
    background-color: var(--scroll-bg) ;
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
