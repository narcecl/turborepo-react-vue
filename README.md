# Turborepo Design System Starter

This guide explains how to use a React & Vue for Design System starter powered by:

- 🏎 [Turborepo](https://turborepo.org) — High-performance build system for Monorepos.
- 🚀 [React](https://reactjs.org/) — A JavaScript library for building user interfaces.
- ⚡ [Vue](https://vuejs.org/) — An approachable, performant and versatile framework for building web user interfaces.
- 📖 [Storybook](https://storybook.js.org/) — A frontend workshop for building UI components and pages in isolation.

As well as a few others tools preconfigured:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [Changesets](https://github.com/changesets/changesets) for managing versioning and changelogs
- [GitHub Actions](https://github.com/changesets/action) for fully automated package publishing

### Useful Commands

- `npm run build` - Build all packages including the Storybook site
- `npm run dev` - Run all packages locally and preview with Storybook
- `npm run lint` - Lint all packages
- `npm run changeset` - Generate a changeset
- `npm run clean` - Clean up all `node_modules` and `dist` folders (runs each package's clean script)

## Turborepo

[Turborepo](https://turborepo.org) is a high-performance build system for JavaScript and TypeScript codebases. It was designed after the workflows used by massive software engineering organizations to ship code at scale. Turborepo abstracts the complex configuration needed for monorepos and provides fast, incremental builds with zero-configuration remote caching.

Using Turborepo simplifes managing your design system monorepo, as you can have a single lint, build, test, and release process for all packages. [Learn more](https://vercel.com/blog/monorepos-are-changing-how-teams-build-software) about how monorepos improve your development workflow.

## Apps & Packages

This Turborepo includes the following packages and applications:

- `apps/showcase`: Astro component showcase.
- `apps/storybook-react`: Storybook documentation for React library.
- `apps/storybook-vue`: Storybook documentation for Vue library.
- `packages/react-ui`: React Component library.
- `packages/vue-ui`: Vue Component library.

Turnorepo enables us to "hoist" dependencies that are shared between packages to the root `package.json`. This means smaller `node_modules` folders and a better local dev experience.

This example sets up your `.gitignore` to exclude all generated files, other folders like `node_modules` used to store your dependencies.

### Compilation

To make the core library code work across all browsers, we need to compile the raw TypeScript, React and Vue code to plain JavaScript. We can accomplish this with `vite`, which is great to improve performance.

Running `npm run build` from the root of the Turborepo will run the `build` command defined in each package's `package.json` file. Turborepo runs each `build` in parallel and caches & hashes the output to speed up future builds.


Run `npm run build` to confirm compilation is working correctly. You should see a `dist` folder in all packages, which contains the compiled output.

```bash
acme-core
└── dist
    ├── index.d.ts  <-- Types
    ├── index.js    <-- CommonJS version
    └── index.mjs   <-- ES Modules version
```

## Components

Based on `Atomic Design`, each file inside of the libraries is a component inside our Design System. For example:

```tsx
// react-ui/src/components/atoms/Button.tsx

import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

export interface ButtonProps extends ComponentProps<'button'>{
    children?: ReactNode;
    label?: string;
}

export const Button = (props: ButtonProps) => {
    const {
        children,
        type = 'primary',
        label = 'React Button',
        ...otherProps
    } = props;

    const cx = classNames.bind(styles);

    return (
        <button
            className={cx('button')}
            {...otherProps}
        >
            { children || label }
        </button>
    );
}

export default Button;
```

When adding a new component, ensure this is also exported from the entry `index.tsx` file:

```tsx
// react-ui/src/index.ts

export * from "./atoms/Button/Button";
// Add new component exports here
```

This example applys to the Vue Library as well.

## Storybook

Storybook provides us with an interactive UI playground for our components. This allows us to preview our components in the browser and instantly see changes when developing locally. This example preconfigures Storybook to:

- React use Vite and Vue use Webpack to bundle stories instantly (in milliseconds).
- Automatically find any stories inside the `src/stories/` folder.
- Support using module path aliases like `@react-ui` or `@vue-ui` for imports.
- Write MDX for component documentation pages.

For example, here's the included Story for our React `Button` component:

```ts
// apps/storybook-react/src/stories/Button.stories.ts

import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Button } from "@narcecl/react";

export default {
    title: "UI/Button",
    component: Button,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
        argTypes: {
    },
    args: { onClick: fn() },
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        label: "This is a React Button",
    },
};
```

## Versioning & Publishing Packages

This example uses [Changesets](https://github.com/changesets/changesets) to manage versions, create changelogs, and publish to npm. It's preconfigured so you can start publishing packages immediately.

You'll need to create an `NPM_TOKEN` and `GITHUB_TOKEN` and add it to your GitHub repository settings to enable access to npm. It's also worth installing the [Changesets bot](https://github.com/apps/changeset-bot) on your repository.

### Generating the Changelog

To generate your changelog, run `yarn changeset` locally:

1. **Which packages would you like to include?** – This shows which packages and changed and which have remained the same. By default, no packages are included. Press `space` to select the packages you want to include in the `changeset`.
1. **Which packages should have a major bump?** – Press `space` to select the packages you want to bump versions for.
1. If doing the first major version, confirm you want to release.
1. Write a summary for the changes.
1. Confirm the changeset looks as expected.
1. A new Markdown file will be created in the `changeset` folder with the summary and a list of the packages included.

### Releasing

When you push your code to GitHub, the [GitHub Action](https://github.com/changesets/action) will run the `release` script defined in the root `package.json`:

```bash
turbo run build --filter=docs^... && changeset publish
```

Turborepo runs the `build` script for all publishable packages (excluding docs) and publishes the packages to npm. By default, this example includes `acme` as the npm organization. To change this, do the following:

- Rename folders in `packages/*` to replace `acme` with your desired scope
- Search and replace `acme` with your desired scope
- Re-run `yarn install`

To publish packages to a private npm organization scope, **remove** the following from each of the `package.json`'s

```diff
- "publishConfig": {
-  "access": "public"
- },
```
