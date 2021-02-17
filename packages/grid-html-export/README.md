# stenajs-webui/grid-html-export

This package adds ability to copy table to clipboard.

It exports `StandardTableHtmlExportButton` component
which takes props `config` (StandardTable config), `items`, `renderContent`, `label` and `labelAfterCopy`.

When the user clicks the button, the table is copied to clipboard.

Example:

```
<Column>
  <StandardTableHtmlExportButton
    config={config}
    items={items}
  />
  <StandardTable config={config} items={items} />
</Column>
```
