# stenajs-webui [![CI](https://github.com/StenaIT/stenajs-webui/actions/workflows/nodejs.yml/badge.svg)](https://github.com/StenaIT/stenajs-webui/actions/workflows/nodejs.yml) [![stenajs-webui](https://img.shields.io/npm/v/@stenajs-webui/core?label=stenajs-webui)](https://www.npmjs.com/package/@stenajs-webui/core)

A design system and React component framework developed at Stena Line.

[CHANGELOG](CHANGELOG.md)

## Storybook

All components are available to see in Storybook.

[https://stenait.github.io/stenajs-webui](https://stenait.github.io/stenajs-webui)

## Packages

| Package                                       | NPM version                                                                                                                                                                         |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [calendar](packages/calendar/README.md)       | [![@stenajs-webui/calendar](https://img.shields.io/npm/v/@stenajs-webui/calendar?label=%40stenajs-webui%2Fcalendar)](https://www.npmjs.com/package/@stenajs-webui/calendar)         |
| [core](packages/core/README.md)               | [![@stenajs-webui/core](https://img.shields.io/npm/v/@stenajs-webui/core?label=%40stenajs-webui%2Fcore)](https://www.npmjs.com/package/@stenajs-webui/core)                         |
| [elements](packages/elements/README.md)       | [![@stenajs-webui/elements](https://img.shields.io/npm/v/@stenajs-webui/elements?label=%40stenajs-webui%2Felements)](https://www.npmjs.com/package/@stenajs-webui/elements)         |
| [forms](packages/forms/README.md)             | [![@stenajs-webui/forms](https://img.shields.io/npm/v/@stenajs-webui/forms?label=%40stenajs-webui%2Fforms)](https://www.npmjs.com/package/@stenajs-webui/forms)                     |
| [grid](packages/grid/README.md)               | [![@stenajs-webui/grid](https://img.shields.io/npm/v/@stenajs-webui/grid?label=%40stenajs-webui%2Fgrid)](https://www.npmjs.com/package/@stenajs-webui/grid)                         |
| [grid-export](packages/grid-export/README.md) | [![@stenajs-webui/grid-export](https://img.shields.io/npm/v/@stenajs-webui/grid-export?label=%40stenajs-webui%2Fgrid)](https://www.npmjs.com/package/@stenajs-webui/grid-export)    |
| [input-mask](packages/input-mask/README.md)   | [![@stenajs-webui/input-mask](https://img.shields.io/npm/v/@stenajs-webui/input-mask?label=%40stenajs-webui%2Finput-mask)](https://www.npmjs.com/package/@stenajs-webui/input-mask) |
| [modal](packages/modal/README.md)             | [![@stenajs-webui/modal](https://img.shields.io/npm/v/@stenajs-webui/modal?label=%40stenajs-webui%2Fmodal)](https://www.npmjs.com/package/@stenajs-webui/modal)                     |
| [panels](packages/panels/README.md)           | [![@stenajs-webui/panels](https://img.shields.io/npm/v/@stenajs-webui/panels?label=%40stenajs-webui%2Fpanels)](https://www.npmjs.com/package/@stenajs-webui/panels)                 |
| [redux](packages/redux/README.md)             | [![@stenajs-webui/redux](https://img.shields.io/npm/v/@stenajs-webui/redux?label=%40stenajs-webui%2Fredux)](https://www.npmjs.com/package/@stenajs-webui/redux)                     |
| [select](packages/select/README.md)           | [![@stenajs-webui/select](https://img.shields.io/npm/v/@stenajs-webui/select?label=%40stenajs-webui%2Fselect)](https://www.npmjs.com/package/@stenajs-webui/select)                 |
| [theme](packages/theme/README.md)             | [![@stenajs-webui/theme](https://img.shields.io/npm/v/@stenajs-webui/theme?label=%40stenajs-webui%2Ftheme)](https://www.npmjs.com/package/@stenajs-webui/theme)                     |
| [tooltip](packages/tooltip/README.md)         | [![@stenajs-webui/tooltip](https://img.shields.io/npm/v/@stenajs-webui/tooltip?label=%40stenajs-webui%2Ftooltip)](https://www.npmjs.com/package/@stenajs-webui/tooltip)             |

## Status

This project is very much in development, so there may be bugs.
If you have any issues, create an issue in Github, or submit a PR with a fix.

See [CONTRIBUTING.md](CONTRIBUTING.md) for more information on code conventions, etc.

## Prerequisites

`create-react-app` is the recommended way of setting up a project.

All documentation uses `yarn`.

`stenajs-webui` is built with `emotion` and `styled-system`.

`stenajs-webui` use Font Awesome for icons.
`@stenajs-webui/core` does not use any icons, but most other packages require Font Awesome.

### Styling

New and converted `stenajs-webui` components use [CSS variables](packages/elements/default-theme.css).
They can be styled by changing the CSS variables defined in their corresponding `.module.css` file.

### Typescript

`stenajs-webui` is built with Typescript, and all types are included in the npm package.

There is no need for DefinitelyTyped.

## Installation

```shell
$ yarn add @stenajs-webui/core
```

Install any other `@stenajs-webui` packages in the same way.
`core` is required by all other packages, and most also require `elements`.

### Add dependencies

Most `stenajs-webui` packages have peer dependencies that have to be met in order to use them.
They are specified in their respective package.json.

For example, to use `@stenajs-webui/core` you must add the following dependencies:

```shell
$ yarn add @emotion/react \
           @emotion/styled \
           csstype \
           lodash \
           prop-types \
           react \
           react-dom \
           styled-system
```

If you are using Typescript, you must also add the following dependencies:

```shell
$ yarn add typescript
           @types/lodash \
           @types/react \
           @types/react-dom \
           @types/styled-system
```

`typescript` is required by `create-react-app` when using Typescript, `stenajs-webui` does not require it.

If you are also using `@stenajs-webui/elements`, you must also add the following dependencies:

```shell
$ yarn add @fortawesome/fontawesome-svg-core \
           @fortawesome/free-solid-svg-icons \
           @fortawesome/react-fontawesome
```

See the `package.json` file for each package to see what dependencies are required.

### Testing changes locally using Yalc

If you need to make changes to the library code and test it in your application, you can use Yalc.

[See our Yalc guide](YALC.md)

### Add fonts

Copy this `<link>` tag into the `<head>` tag in your `public/index.html` to define the font in your app:

```html
<link
  href="https://d2zob0vy63qnjk.cloudfront.net/StenaSans.css"
  rel="stylesheet"
  type="text/css"
/>
```
