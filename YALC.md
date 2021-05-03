# Testing changes locally using Yalc

1. Download [Yalc](https://github.com/wclr/yalc) and install globally (`yarn global add`/`npm install --global`)
2. Make changes in one or more packages (for example `packages/grid`)
3. Run `yalc publish` in these packages
4. Run `yalc add @stenajs-webui/grid` in the project you're working in. This will modify the `package.json` file, changing the version to a `file://` path. **DO NOT COMMIT THIS**
5. Re-run `yalc publish` if you make more changes
