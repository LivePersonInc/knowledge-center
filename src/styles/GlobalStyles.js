import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
  /* Scrollbar Styles */
  body::-webkit-scrollbar {
    width: 12px;
  }
  html {
    scrollbar-width: thin;
    scrollbar-color: var(--secondary) var(--white);
  }
  body::-webkit-scrollbar-track {
    background: var(--body-background);
  }
  body::-webkit-scrollbar-thumb {
    background-color: var(--secondary) ;
    border-radius: 6px;
    border: 3px solid var(--body-background);
  }

`

export default GlobalStyles
