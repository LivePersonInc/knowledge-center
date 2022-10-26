import "regenerator-runtime/runtime"
import React from "react"
import {
  useAsyncDebounce,
  useFilters,
  useGlobalFilter,
  useTable,
} from "react-table"
import json from "../assets/capabilities.json"
import { matchSorter } from "match-sorter"
import {
  AbcIcon,
  FbMessengerIcon,
  GoggleRscIcon,
  KakIcon,
  GcIcon,
  LineIcon,
  MessagingWindowApiIcon,
  MobileAppMessagingIcon,
  SmsIcon,
  TwitterIcon,
  ViberIcon,
  WebMessagingIcon,
  WeChatIcon,
  WhatsappIcon,
  InstagramIcon,
} from "./icons/metric-table"

// 👋🏽 Hi there!
// This is a custom table component, built with React Table.
// for messaging-channels-messaging-channels-capabilities-comparison page

// Define a default UI for filtering
function GlobalFilter({ globalFilter, setGlobalFilter }) {
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
        placeholder={`Search by capability name`}
      />
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
  const arr = []
  for (const x of json) {
    let add = true
    if (add) {
      arr.push({
        appleBusinessChat: <AbcIcon />,
        facebook: <FbMessengerIcon />,
        featureName: x.categoryName,
        googleBusinessMessaging: <GcIcon />,
        googleRCS: <GoggleRscIcon />,
        kakaoTalk: <KakIcon />,
        line: <LineIcon />,
        messagingWindowAPI: <MessagingWindowApiIcon />,
        mobileAppMessaging: <MobileAppMessagingIcon />,
        sms: <SmsIcon />,
        twitter: <TwitterIcon />,
        viber: <ViberIcon />,
        weChat: <WeChatIcon />,
        webMessaging: <WebMessagingIcon />,
        instagram: <InstagramIcon />,
        whatsapp: <WhatsappIcon />,
        search: true,
      })
    }
    for (const y of x.features) {
      arr.push(Object.assign({}, ...y.channels, { featureName: y.featureName }))
    }
    add = false
  }
  return arr
}

const data = preProcessJSON(json)

const TableMc = () => {
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
        Header: "Instagram",
        accessor: "instagram",
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
      <div className="table-style">
        <div className="header">
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        </div>
        <div className="flex flex-col pb-6 z-10 center-block fix-width scroll-inner tablelp">
          <table
            {...getTableProps()}
            className="messaging-channels table-compact table-fixed"
          >
            <thead className="sticky top-0 bg-body-background fixedHeader">
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()} className="tr flex">
                  {headerGroup.headers.map(column => (
                    <th
                      {...column.getHeaderProps()}
                      className="th"
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
                    <tr {...row.getRowProps()} className="categoryrow tr flex">
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
                    <tr {...row.getRowProps()} className="tr flex">
                      {row.cells.map(cell => {
                        return (
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        )
                      })}
                    </tr>
                  )
                ) : (
                  !row.original.search && (
                    <tr {...row.getRowProps()}>
                      {row.cells.map(cell => {
                        return (
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        )
                      })}
                    </tr>
                  )
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
export default TableMc
