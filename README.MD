## react-use-stream

Eagerly fetch pages of data for use in your react application.

### Installing

Using NPM:

```bash
npm i react-use-stream
```

Using yarn:

```bash
yarn add react-use-stream
```

# useStream

`useStream` allows to fetch all the pages of data from your server.

### Hook options

`useStream` take the following options.

- `getPage: function(page) -> response`

  - required
  - This function accepts a page number and should return the page data fetched from your server.
  - The returned response must contain the row data for this page and the total record count.

- `totalRecordsLocation: String`

  - optional
  - defaults to `total`
  - This option is passed to `_.get` to retrieve the total record count from the response returned by the `getPage`.

- `dataLocation: String`
  - optional
  - defaults to `data`
  - This option is passed to `_.get` to retrieve the row data from the response returned by the `getPage`.

### Returns

The an object containing data retrieved and some additional meta.

- `rows`: The rows fetched
- `streamInfo`: Object
    - `isStreaming`: Boolean indicating if we are still fetching data
    - `totalRecords`: The total record count as returned in the response of first page
    - `isLoading`: Boolean indicating if we are still loading the first page
    - `progress`: Float between 0 - 1. Indicates the percentage of data loaded.
    - `error`: Any error occurred during the stream

### Example

```js
const { rows, isStreaming, totalRecords, isLoading, progress } = useStream(
  useCallback(page => fetchDataFromServer(page), [])
)
return (
    <>
        {
            isLoading ? <div>Loading</div> : (
                {
                    isStreaming ? (
                        <progress value={progress}/>
                    ) : null
                }
                <Table
                    rows={rows}
                    streamInfo={{ isStreaming, totalRecords, isLoading }}
                />
            )
        }
    </>
)
```

Check the live demo [here](https://codesandbox.io/s/affectionate-einstein-tmvq0)