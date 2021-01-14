# stenajs-webui/grid-export

This package adds ability to export Excel (.xlsx) documents.

It exports `StandardTableExcelExportButton` component
which takes props `config` (StandardTable config) and `items`.

It also takes prop `filename` which is optional.
Default is `exported-spreadsheet`. File extension is added automatically.

When the user clicks the button, the download starts immediately.

Example:

```
<Column>
  <StandardTableExcelExportButton
    config={config}
    items={items}
    filename={"exported-user-list"}
  />
  <StandardTable config={config} items={items} />
</Column>
```
