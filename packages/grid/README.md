# @stenajs-webui/grid

This package contains hooks and components that can help create grids that can be navigated similar to Excel.

# StandardTable

## Summary rows

Column configs has three options for summary rows:

- `renderSummaryCell`
- `summaryText`
- `summaryCellColSpan`

### renderSummaryCell and summaryText

If `renderSummaryCell` or `summaryText` is set for any column,
the table will get a summary row at the bottom.

#### `summaryText`

Receives `items` in argument object, and must return a string.

#### `renderSummaryCell`

Receives `items` and `text` in argument object.
If no `summaryText` was specified, then `text` will be undefined.

If no `renderSummaryCell` is specified, then a default renderer for summary
will be used.

Examples:

```
summaryText: ({ items }) =>
  String(sumBy(items, (item) => item.numPassengers ?? 0)),
```

```
renderSummaryCell: ({ items, text }) => (
  <Indent>
    <Tag label={text} />
  </Indent>
)
```

### summaryCellColSpan

`summaryCellColSpan` can be set to make the cell span multiple columns.

If any columns after the spanning column has summary options, they will be ignored.

If there are column groups, a column can only span over columns of that column group.

If `summaryCellColSpan` is too high and won't fit into the table (or column group) then
the col span will be limited so that it fits.
