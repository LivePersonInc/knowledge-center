import React from "react"
import { ThemeToggler } from "gatsby-plugin-dark-mode"

// 👋🏽 Hi there!
// This is a component that I use to toggle the theme from dark mode to light mode.

export default function ThemeToggle() {
  return (
    <ThemeToggler>
      {({ theme, toggleTheme }) => {
        if (theme == null) return null
        return (
          <div className="theme-switch-wrapper">
            <label className="theme-switch">
              <input
                className="toggle toggle-accent"
                type="checkbox"
                onChange={e => toggleTheme(e.target.checked ? "dark" : "light")}
                checked={theme === "dark"}
              />
              <div className="slider round hover:opacity-80">
                <span className="toggle-title-light">Light theme</span>
                <span className="toggle-title-dark">Dark theme</span>
              </div>
            </label>
          </div>
        )
      }}
    </ThemeToggler>
  )
}
