/** @type { import('@storybook/vue3').Preview } */

import "@narcecl/vue/dist/index.css";

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  }
}

export default preview
