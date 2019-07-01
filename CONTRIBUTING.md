# How to contribute

## Building the library

```
$ yarn
$ yarn lerna link
$ yarn build-all
```

## Libraries of choice

- `emotion` and `styled-system` is used for all styling.
- Hooks over HOC:s. `recompose` is used by some packages, but all new components should use hooks instead.
- Font Awesome is used for all icons.

### Resources

* https://emotion.sh/docs/introduction
* https://styled-system.com/

## Dependencies

We try to avoid adding more dependencies as much as possible.

If your component requires a specific library as a dependency, create a separate package for your component.

See `@stenajs-webui/select`, which uses `react-select` as a dependency.

## Adding new packages

- Copy `<git-root>/template` to `<git-root>/packages/` and rename it.
- Update name and version in `package.json`.
- Update dependency versions in `package.json`.
- Run `yarn check-deps-match` in git-root to check that dependencies are correct.
- Write code.
- Export code in index.ts.
- Run `yarn build` in package folder.
- Run `yarn check-builds` in git-root to check that the build is correct.

## Code style

- Typescript, strict, no any.
- Prettier.
- No default exports. All exports should be named.
- Use args destructuring.

## Imports from other stenajs-webui packages

When you import code from other packages, you must do it from package name.

```js
import { Box } from "@stenajs-webui/core";
```

This is incorrect:

```js
import { Box } from "../../../core/src/etc";
```

This will cause the build to get an incorrect folder structure,
and importing your package from other projects will fail.

You can verify that the build is correct by running `yarn check-builds` in git-root after you build your package.

## Components

- Typed components, instead of typed props-argument.
- As little logic in components as possible, use hooks instead.
- No class components
- Use React.FC<Props> type for components.
- Add JSDocs to your props interface. If it is optional with default value, specify `@default`.

Example:

```
export interface NiceButtonProps {
    /**
    * onClick button callback.
    */
    onClick: () => void;
}

export const NiceButton: React.FC<NiceButtonProps> = ({ onClick }) => {
    // maybe hooks.
    return (
        <div>
            Hello
        </div>
    );
}
```

## Naming

- Folder names use `kebab-case`.
- Files and components use `CamelCase` with first letter capitalized.
- Module scoped constants use `UPPER_CASE_SNAKE_CASE`.
- All other variables (included locally scoped constants) use `camelCase`.

## Folder and files structure

- All source code in `<package>/src/`.
- Components with UI should be placed in `<package>/src/components/ui/<component-folder>/<Component>.tsx`.
- Components with no UI should be placed in `<package>/src/components/util/` (with sub folder where appropriate).
- Shared util functions should be placed in `<package>/src/util/` (with sub folder where appropriate).
- Each type of component has own folder.
- All unit tests in `__tests__/<Component>.test.tsx` next to `<Component>.tsx`.
- Add stories in `<Component>.stories.tsx` next to `<Component>.tsx` (no sub folder).
- Put hooks in own sub folder `hooks`.
- Put other util functions in sub folder `utils`.

## Themes

- If your component has a theme, add `<Component>Theme.ts` next to `<Component>.tsx`.
- The theme file should include an interface with same name as the file.
- It should also include a default theme, named `default<Component>Theme`;
- Passing a theme to a component should always be done with a prop named `theme`.
- The `theme` prop should always be optional, falling back to a default theme.
- If the users might need to set theme globally, add a context provider that uses the default theme as default value.
- Theme fields should allow for lookup in theme if color, font, font-size or font-weight.
- Theme interface and default theme should be exported and available to use.

Example:

```
export interface BackgroundTheme {
    color: ThemeColorField | string;
}

export const defaultBackgroundTheme: BackgroundTheme {
    color: 'primaryBg',
}
```

Then use `useThemeFields` hook which can resolve the color from theme.

`useThemeFields` can resolve colors, fonts, font-sizes and font-weights.

## Process

### 1) Create feature branch

On Github repo.

I.e. `feature/dropdown`

### 2) Create your component in the appropriate directory

I.e. a new button component would go into `src/components/ui/buttons/ButtonInFlames.ts`

#### Accessibility

All components that can be interacted with should work properly with keyboard-only navigation.

### 3) Add support for theme if appropriate

See `themes` section.

### 4) Add JSDocs to your components props

Add a comment above each prop in the interface for the props.

### 5) Add stories

Make a separate `<Component>.stories.tsx` file for your component.

### 6) Add unit tests

Make a separate `__tests__/<Component>.test.ts` file for your component.
Make sure that all conditional parts of the component are tested.

```
<Clickable onClick={disabled ? undefined : onToggle}>
```

Make sure that there are tests for disabled=true and disabled=false.

### 7) Verifying in browser

The component should work and look as expected in:
Chrome, Firefox, Edge, Safari.

### 8) Export your component

In `<package>/src/index.ts`, make sure that you export at least your component and the props interface.
Do not export everything, only the things that should be available to the users (developers).

### 9) Create a pull request in Github

Add screenshots for extra points!

Wait for peer review.
