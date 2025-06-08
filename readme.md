Repository showing a bug in the eslint import-x plugin.

This bug happens when the `npm:` protocol is used to alias a dependency in package.json and the Yarn PnP install mode is used.

To see the bug:
- install dependencies: `yarn install`
- run eslint: `yarn lint`

This results in:
```
thread '<unnamed>' panicked at /Users/runner/work/unrs-resolver/unrs-resolver/src/lib.rs:930:80:
called `Option::unwrap()` on a `None` value
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
```

To verify that the code being linted actually runs:
- `yarn demo` or `yarn node test.mjs hello`

Notes:
- `pnpm` and `node-modules` install modes do not have this problem
- in this case the use of the `npm:` approach is pointless, in practice we use it so we can replace a dependency with a customized version without updating all of the references to it in the codebase.


