# How to contribute

## Libraries of choice

* `emotion` and `styled-system` for all styling.
* Hooks over HOC:s. `recompose` is used by some packages, but all new components should use hooks instead.
* Font Awesome for icons.

## Bloat

We try to avoid adding more dependencies as much as possible.

If your component requires a specific library as a dependency, create a separate package.

See `@stenajs-webui/select`, which uses react-select as a dependency.

## Code style

* Typescript, strict, no any.
* Prettier.
* No default exports. All exports should be named.
* Typed components, instead of typed props-argument.
* Use args destructuring.

Example:
```
interface Props {
    /**
    * The user ID of the user.
    */
    userId: string;
}

const MyComponent: React.FC<Props> = ({ userId }) => {
    // ... hooks.
    return (
        ...
    )
}
```

## Folder and files structure

* All source code in `<package>/src/`.
* Components with UI should be placed in `<package>/src/components/ui/<component>/`.
* Components with no UI should be placed in `<package>/src/components/util/` (with sub folder where appropriate).
* Shared util functions should be placed in `<package>/src/util/` (with sub folder where appropriate).
* Each type of component has own folder.
* All unit tests in `__tests__/<component>.test.tsx` next to `<component>.tsx`.
* All stories in `<component>.stories.tsx` next to `<component>.tsx` (no sub folder).
* Put hooks in own sub folder `hooks`.
* Put other util functions in sub folder `utils`.
* If your component has a theme, add `<component>Theme.ts` next to `<component>.tsx`.

## Themes

* If your component has a theme, add `<component>Theme.ts` next to `<component>.tsx`.
* The theme file should include an interface with same name as the file.
* It should also include a default theme, named `default<component>Theme`;
* Passing a theme to a component should always be done with a prop named `theme`.
* The `theme` prop should always be optional, falling back to a default theme.

Theme fields should allow for lookup in theme where possible.
For example:

```
interface BackgroundTheme {
    color: ThemeColorField | string;
}
```

Then use `useThemeFields` hook to easily allow resolving color from theme.

This is possible with colors, fonts, font-sizes and font-weights.

## Process

### 1) Create feature branch

On Github repo.

I.e. `feature/dropdown`

### 2) Create your component in the appropriate directory

I.e. a new button component would go into `src/components/ui/buttons/ButtonInFlames.ts`

#### Accessibility

All components that can be interacted with should work properly with keyboard-only navigation.

### 3) Add support for theme if appropriate

If the component uses a theme, add its type definition in the same folder: `ButtonInFlamesTheme.ts`
Also add a default theme for the component in the same file.

### 4) Add JSDocs to your components props

Add a comment above each prop in the interface for the props.

### 5) Add stories

Make a separate `<component>.stories.tsx` file for your component.

### 6) Add unit tests

Make a separate `__tests__/<component>.test.ts` file for your component.
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
