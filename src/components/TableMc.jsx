import React, { useState } from "react"
import {
  useAsyncDebounce,
  useFilters,
  useGlobalFilter,
  useTable,
} from "react-table"
import json from "../assets/capabilities.json"
import { matchSorter } from "match-sorter"
// Define a default UI for filtering
function GlobalFilter({ globalFilter, setGlobalFilter }) {
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <input
      className="w-full px-2 border"
      value={value || ""}
      onChange={e => {
        setValue(e.target.value)
        onChange(e.target.value)
      }}
      placeholder={`Search by capability name`}
      style={{
        fontSize: "1.1rem",
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
  const arr = []
  json.map(x => {
    let add = true
    if (add) {
      arr.push({
        appleBusinessChat: "AA",
        connectorAPI: "BB",
        facebook: "CC",
        featureName: x.categoryName,
        googleBusinessMessaging: "DD",
        googleRCS: "EE",
        kakaoTalk: "FF",
        line: "GG",
        messagingWindowAPI: "HH",
        mobileAppMessaging: "II",
        sms: "JJ",
        twitter: "KK",
        viber: "LL",
        weChat: "MM",
        webMessaging: "NN",
        whatsapp: "OO",
        search: true,
      })
    }
    x.features.map(y => {
      arr.push(Object.assign({}, ...y.channels, { featureName: y.featureName }))
    })
    add = false
  })
  return arr
}

const TableMc = () => {
  const [data, setData] = useState(preProcessJSON(json))

  const columns = React.useMemo(
    () => [
      {
        Header: "",
        accessor: "featureName", // accessor is the "key" in the data
      },
      {
        Header: "Mobile App Messaging",
        accessor: "mobileAppMessaging",
        filter: "includes",
      },
      {
        Header: "Web Messaging",
        accessor: "webMessaging",
        filter: "includes",
      },
      {
        Header: "Apple Business chat",
        accessor: "appleBusinessChat",
      },
      {
        Header: "SMS",
        accessor: "sms",
        filter: "includes",
      },
      {
        Header: "Facebook",
        accessor: "facebook",
      },
      {
        Header: "Twitter",
        accessor: "twitter",
      },
      {
        Header: "WhatsApp",
        accessor: "whatsapp",
      },
      {
        Header: "Google RCS",
        accessor: "googleRCS",
      },
      {
        Header: "LINE",
        accessor: "line",
      },
      {
        Header: "Messaging Window API",
        accessor: "messagingWindowAPI",
      },
      {
        Header: "Connector API",
        accessor: "connectorAPI",
      },
      {
        Header: "WeChat",
        accessor: "weChat",
      },
      {
        Header: "Viber",
        accessor: "viber",
      },
      {
        Header: "Google Business Messaging",
        accessor: "googleBusinessMessaging",
      },
      {
        Header: "KakaoTalk",
        accessor: "kakaoTalk",
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
      </div>
      <table {...getTableProps()} className="tablelp w-full table-compact">
        <thead className="sticky top-0 bg-white py-5">
          {headerGroups.map(headerGroup => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className="tr flex w-full"
            >
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps()}
                  className="th flex-1"
                  style={{ background: "#090c43", color: "white" }}
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
            return rows.length === data.length ? (
              row.original.search ? (
                <tr {...row.getRowProps()} className="categoryrow">
                  {row.cells.map(cell => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        style={{ background: "#162036", color: "white" }}
                      >
                        {cell.render("Cell")}
                      </td>
                    )
                  })}
                </tr>
              ) : (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    )
                  })}
                </tr>
              )
            ) : (
              !row.original.search && (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    )
                  })}
                </tr>
              )
            )
          })}
        </tbody>
      </table>
    </>
  )
}
export default TableMc
