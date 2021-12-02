module.exports = {
  "stories": ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  "addons": ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-actions", "@storybook/addon-links", "@storybook/addon-viewport/register", "@storybook/addon-storysource"],
  "framework": "@storybook/react",
  core: {
    builder: "webpack5"
  }
};