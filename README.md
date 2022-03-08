# DFS Token Icons

Package containing a registry of token icons to complement the [tokens](https://github.com/defisaver/defisaver-tokens) package. Because this package imports and exposes .svg files directly, it is meant to be used in a webpack (or similar) environment, with a loader configured for .svg files. 

## Adding new icons

- Add .svg file to icons/ folder using token symbol as the name;
- If token symbol contains non-alphanumeric characters, replace them with underscore and make sure to add a comment on the first line containing the actual token name (See [ETH2x-FLI](https://github.com/defisaver/defisaver-token-icons/blob/main/icons/ETH2x_FLI.svg) and [cWBTC Legacy](https://github.com/defisaver/defisaver-token-icons/blob/main/icons/cWBTC_Legacy.svg));
- Run `node scripts/generateIconsIndex` to generate the index.
