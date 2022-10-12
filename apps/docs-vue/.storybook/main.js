const path = require("path");

module.exports = {
  stories: ["../stories/**/*.stories.@(mdx|js|jsx|ts|tsx)"],
  framework: "@storybook/vue",
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-docs",
  ],
  features: {
    previewMdx2: true,
  },
  async webpackFinal(config, { configType }) {
    return {
      ...config,
      resolve: {
        alias: {
          "@vue-ui": path.resolve(__dirname, '../../../packages/vue-ui/src'),
          'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
        },
      },
    };
  },
};