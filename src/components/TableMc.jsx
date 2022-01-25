import React from "react"
import {
  useAsyncDebounce,
  useFilters,
  useGlobalFilter,
  useTable,
} from "react-table"
import json from "../assets/capabilities.json"
import { matchSorter } from "match-sorter"
import toTitleCase from "../utils/toTitleCase"

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <input
      className="w-full px-2"
      value={value || ""}
      onChange={e => {
        setValue(e.target.value)
        onChange(e.target.value)
      }}
      placeholder={`Search by capability name`}
      style={{
        fontSize: "1.1rem",
        border: "0",
      }}
    />
  )
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}
fuzzyTextFilterFn.autoRemove = val => !val

/*
 * We're splitting comma-separated values into individual array items so they can be indexed
 *  */
const preProcessJSON = json => {
  return json.map(x =>
    Object.fromEntries(
      Object.entries(x).map(([key, value]) => {
        return [key, value ? value : ""]
        // return [key, value ? toTitleCase(value).trim().split(",") : ""]
      })
    )
  )
}

const TableMc = () => {
  const data = React.useMemo(() => preProcessJSON(json), [])

  const columns = React.useMemo(
    () => [
      {
        Header: "",
        accessor: "categoryName", // accessor is the "key" in the data
      },
      {
        Header: "Analysis Type",
        accessor: "ANALYSIS_TYPE",
        filter: "includes",
      },
      {
        Header: "Channel",
        accessor: "CHANNEL",
        filter: "includes",
      },
      {
        Header: "Description",
        accessor: "DESCRIPTION",
      },
      {
        Header: "Dashboard",
        accessor: "DASHBOARD",
        filter: "includes",
      },
      {
        Header: "Filtered By",
        accessor: "FILTERED_BY",
      },
      {
        Header: "Formula (Optional)",
        accessor: "FORMULA",
      },
    ],
    []
  )

  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"fast-reduce.ts
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: () => null,
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
    },
    useFilters, // useFilters!
    useGlobalFilter // useGlobalFilter!
  )

  return (
    <>
      <div className="flex w-full pb-6 z-10">
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        {headerGroups.map(headerGroup => {
          return headerGroup.headers.map(column => {
            if (column.filter) {
              return (
                <div className="w-full px-2">
                  {column.render("Header")}
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </div>
              )
            }
            return null
          })
        })}
      </div>
      <table {...getTableProps()} className="tablelp w-full table-compact">
        <thead className="sticky top-0 bg-white py-5">
          {headerGroups.map(headerGroup => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className="tr flex w-full"
            >
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} className="th flex-1">
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
export default TableMc
