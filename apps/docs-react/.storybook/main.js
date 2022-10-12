const path = require("path");

module.exports = {
  stories: ["../stories/**/*.stories.@(mdx|js|jsx|ts|tsx)"],
  framework: "@storybook/react",
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-docs",
  ],
  core: {
    builder: "@storybook/builder-vite",
  },
  features: {
    previewMdx2: true,
  },
  async viteFinal(config, { configType }) {
    // customize the Vite config here
    return {
      ...config,
      resolve: {
        alias: [
          {
            find: "@react-ui",
            replacement: path.resolve(
              __dirname,
              "../../../packages/react-ui/src"
            ),
          },
        ],
      },
    };
  },
};
