# stenajs-webui

A design system and React component framework developed at Stena Line.

https://stenait.github.io/stenajs-webui

## Status

This project is very much in development, so there may be bugs.
If you have any issues, create an issue in Github, or submit a PR with a fix.

See CONTRIBUTING.md for more information on code conventions, etc.

## Prerequisites

`create-react-app` is the recommended way of setting up a project.

All documentation uses `yarn`.

`stenajs-webui` is built with `emotion` and `styled-system`.

`stenajs-webui` use Font Awesome for icons. 
`@stenajs-webui/core` does not use any icons, but most other packages require Font Awesome.

### Typescript

`stenajs-webui` is built with Typescript, and all types are included in the npm package.

There is no need for DefinitelyTyped.

## Installation

```
$ yarn add @stenajs-webui/core
```

Install any other `@stenajs-webui` packages in the same way.
`core` is required by all other packages, and most also require `elements`.

### Add dependencies

Most `stenajs-webui` packages have peer dependencies that have to be met in order to use them.
They are specified in their respective package.json.

For example, to use `@stenajs-webui/core` you must add the following dependencies:

```
$ yarn add @emotion/core \
           @emotion/styled \
           prop-types \
           react \
           react-dom \
           styled-system
```

If you are using Typescript, you must also add the following dependencies:

```
$ yarn add typescript
           @types/styled-system \
           @types/react \
           @types/react-dom
```

`typescript` is required by `create-react-app` when using Typescript, `stenajs-webui` does not require it.


If you are also using `@stenajs-webui/elements`, you must also add the following dependencies:

```
$ yarn add @fortawesome/fontawesome-svg-core \
           @fortawesome/free-solid-svg-icons \
           @fortawesome/react-fontawesome
```

See the `package.json` file for each package to see what dependencies are required.

### Add fonts

The default font is `Open Sans`. You must make sure that it is available in your browser.
An easy way to make it work is to add the following snippet to your applications HTML head.

```
<link
  href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i&display=swap"
  rel="stylesheet"
/>
```
