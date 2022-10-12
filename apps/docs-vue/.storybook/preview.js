import "../../../packages/core/_storybook.css"

export const parameters = {
    options: {
      storySort: (a, b) => {
        var aPath = a[0].replace('-overview--page', "");
        var bPath = b[0].replace('-overview--page', "");
        return aPath.localeCompare(bPath);
      },
    },
  };