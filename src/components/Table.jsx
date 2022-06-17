import React from "react"
import {
  useAsyncDebounce,
  useFilters,
  useGlobalFilter,
  useTable,
} from "react-table"
import json from "../assets/reportbuilder.json"
import { matchSorter } from "match-sorter"
import toTitleCase from "../utils/toTitleCase"
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, SelectorIcon } from "@heroicons/react/outline"

// 👋🏽 Hi there!
// This is a custom table component, built with React Table.
// for Reporting metrics page

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
    <div className="flex justify-between items-center mobile:flex-col mobile:items-start">
      <h3 className="metrics-title">Metrics list</h3>
      <input
        className="table-search-filter px-2 border"
        value={value || ""}
        onChange={e => {
          setValue(e.target.value)
          onChange(e.target.value)
        }}
        placeholder={`Search by Metric or Dashboard`}
      />
    </div>
  )
}

// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    return [
      "All",
      ...Object.keys(
        preFilteredRows
          .map(row => row.values[id])
          .flat()
          .reduce((a, v) => ({ ...a, [toTitleCase(v).trim()]: v }), {})
      )
        .filter(x => !!x)
        .filter(x => x !== "-")
        .sort(),
    ]
  }, [id, preFilteredRows])

  // Render a multi-select box
  // The styling for this has just been taken from the @headless-ui default Listbox example so feel free to change as you wish.

  return (
    <div>
      <Listbox value={filterValue || ""} onChange={setFilter}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full border p-3">
            <span className="block truncate">{filterValue || "All"}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={React.Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute list-none w-full py-1 mt-1 overflow-hidden text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none mobile:text-sm z-50">
              {options.map((option, idx) => (
                <Listbox.Option
                  key={idx}
                  className={({ active }) =>
                    `${active ? "text-body-text bg-amber-100" : "text-gray-900"}
                          cursor-default select-none relative py-2 text-sm`
                  }
                  value={option === "All" ? "" : option}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? "font-medium" : "font-normal"
                        } block truncate`}
                      >
                        {option}
                      </span>
                      {selected ? (
                        <span
                          className={`${
                            active ? "text-title-text" : "text-amber-600"
                          }
                                absolute inset-y-0 right-0 flex items-center pr-3`}
                        >
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
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
        return [key, value ? toTitleCase(value).trim().split(",") : ""]
      })
    )
  )
}

const Table = () => {
  const data = React.useMemo(() => preProcessJSON(json), [])

  const columns = React.useMemo(
    () => [
      {
        Header: "Metric",
        accessor: "ELEMENT_NAME", // accessor is the "key" in the data
      },
      {
        Header: "Analysis Type",
        accessor: "ANALYSIS_TYPE",
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: "Channel",
        accessor: "CHANNEL",
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: "Description",
        accessor: "DESCRIPTION",
      },
      {
        Header: "Dashboard",
        accessor: "DASHBOARD",
        Filter: SelectColumnFilter,
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
      <div className="table-style">
        <div className="header">
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
          <div className="flex mobile:flex-col text-sm">
            {headerGroups.map(headerGroup => {
              return headerGroup.headers.map(column => {
                if (column.filter) {
                  return (
                    <div className="px-2 flex-1 mobile:mt-4">
                      {column.render("Header")}
                      <div>
                        {column.canFilter ? column.render("Filter") : null}
                      </div>
                    </div>
                  )
                }
                return null
              })
            })}
          </div>
        </div>
        <div className="flex flex-col pb-6 z-10 center-block fix-width scroll-inner tablelp">
          <table
            {...getTableProps()}
            className="metrics table-compact table-fixed"
          >
            <thead className="sticky top-0 bg-body-background fixedHeader">
              {headerGroups.map(headerGroup => (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  className="tr flex flex-nowrap"
                >
                  {headerGroup.headers.map(column => (
                    <th
                      {...column.getHeaderProps()}
                      className="th  bg-body-background"
                    >
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
                  <tr className="tr flex" {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
export default Table
