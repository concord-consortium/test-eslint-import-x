Repository showing a bug in the eslint import-x plugin.

This bug happens when the typescript recommended configuration is used in a workspace of a monorepo and the Yarn PnP install mode is used.

To see the bug:
- install dependencies: `yarn install`
- go into demo workspace: `cd demo`
- run eslint: `yarn lint`

This results in:
```
EslintPluginImportResolveError: typescript with invalid interface loaded as resolver
Occurred while linting /Users/scytacki/Development/test-eslint/demo/test.ts:1
Rule: "import-x/namespace"
    at requireResolver (file:///Users/scytacki/Development/test-eslint/.yarn/__virtual__/eslint-plugin-import-x-virtual-54f4e9d264/3/.yarn/berry/cache/eslint-plugin-import-x-npm-4.15.1-14cf13eac8-10c0.zip/node_modules/eslint-plugin-import-x/lib/utils/legacy-resolver-settings.js:100:21)
    at normalizeConfigResolvers (file:///Users/scytacki/Development/test-eslint/.yarn/__virtual__/eslint-plugin-import-x-virtual-54f4e9d264/3/.yarn/berry/cache/eslint-plugin-import-x-npm-4.15.1-14cf13eac8-10c0.zip/node_modules/eslint-plugin-import-x/lib/utils/legacy-resolver-settings.js:50:38)
    at fullResolve (file:///Users/scytacki/Development/test-eslint/.yarn/__virtual__/eslint-plugin-import-x-virtual-54f4e9d264/3/.yarn/berry/cache/eslint-plugin-import-x-npm-4.15.1-14cf13eac8-10c0.zip/node_modules/eslint-plugin-import-x/lib/utils/resolve.js:181:59)
    at relative (file:///Users/scytacki/Development/test-eslint/.yarn/__virtual__/eslint-plugin-import-x-virtual-54f4e9d264/3/.yarn/berry/cache/eslint-plugin-import-x-npm-4.15.1-14cf13eac8-10c0.zip/node_modules/eslint-plugin-import-x/lib/utils/resolve.js:207:12)
    at remotePath (file:///Users/scytacki/Development/test-eslint/.yarn/__virtual__/eslint-plugin-import-x-virtual-54f4e9d264/3/.yarn/berry/cache/eslint-plugin-import-x-npm-4.15.1-14cf13eac8-10c0.zip/node_modules/eslint-plugin-import-x/lib/utils/export-map.js:157:20)
    at captureDependency (file:///Users/scytacki/Development/test-eslint/.yarn/__virtual__/eslint-plugin-import-x-virtual-54f4e9d264/3/.yarn/berry/cache/eslint-plugin-import-x-npm-4.15.1-14cf13eac8-10c0.zip/node_modules/eslint-plugin-import-x/lib/utils/export-map.js:258:23)
    at captureDependencyWithSpecifiers (file:///Users/scytacki/Development/test-eslint/.yarn/__virtual__/eslint-plugin-import-x-virtual-54f4e9d264/3/.yarn/berry/cache/eslint-plugin-import-x-npm-4.15.1-14cf13eac8-10c0.zip/node_modules/eslint-plugin-import-x/lib/utils/export-map.js:252:13)
    at ExportMap.parse (file:///Users/scytacki/Development/test-eslint/.yarn/__virtual__/eslint-plugin-import-x-virtual-54f4e9d264/3/.yarn/berry/cache/eslint-plugin-import-x-npm-4.15.1-14cf13eac8-10c0.zip/node_modules/eslint-plugin-import-x/lib/utils/export-map.js:304:17)
    at ExportMap.for (file:///Users/scytacki/Development/test-eslint/.yarn/__virtual__/eslint-plugin-import-x-virtual-54f4e9d264/3/.yarn/berry/cache/eslint-plugin-import-x-npm-4.15.1-14cf13eac8-10c0.zip/node_modules/eslint-plugin-import-x/lib/utils/export-map.js:75:31)
    at ExportMap.get (file:///Users/scytacki/Development/test-eslint/.yarn/__virtual__/eslint-plugin-import-x-virtual-54f4e9d264/3/.yarn/berry/cache/eslint-plugin-import-x-npm-4.15.1-14cf13eac8-10c0.zip/node_modules/eslint-plugin-import-x/lib/utils/export-map.js:92:29)
```

To verify that the code being linted actually runs:
- `yarn demo` (inside of the demo folder)

This same configuration works when it is isn't in a monorepo workspace. To test that check out the `typescript` branch. 
Or:
- add the `packageManager` and `devEngines` properties from `package.json` to `demo/package.json`
- copy this modified `demo/package.json` to the top level
- replace `eslint.config.mjs` with `demo/eslint.config.mjs`
- copy `demo/test.ts` to `test.ts`

Then:
- reinstall dependencies `yarn install`
- test lint `yarn lint`

## VSCode
To keep this repo clean the VSCode configuration needed to work with Yarn PnP and typescript has been left out. If you want to enable it run:
`yarn dlx @yarnpkg/sdks vscode`
Then when VSCode prompts to use the workspace version of Typescript say yes. 

## Notes
- If the `nodeLinker` `.yarnrc.yml` property is changed to `node-modules` this demo works
- The error seems like the way `eslint-import-resolver-typescript` is loaded when it is in a yarn pnp monorepo is not working. There might be workaround by adding some configuration to the `.yarnrc.yml` `packageExtensions` property but I haven't found a config that works.