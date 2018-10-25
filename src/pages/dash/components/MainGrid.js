import React from "react";
import { Icon } from "semantic-ui-react"
import ReactTable from "react-table";
import matchSorter from "match-sorter";
import moment from "moment";
import _ from "lodash";

const MainGrid = props => {
    const cols = [
        {
            Header: "",
            columns: [
                {
                    Header: "Key",
                    accessor: "pai_key",
                    width: 47,
                    Cell: row => {
                        let status = row.original.pai_status;
                        let cloud = row.original.pai_summary
                            ? row.original.pai_summary.indexOf("ITS Cloud")
                            : 0;
                        let st = {
                            color:
                                status === "Closed"
                                    ? "#000"
                                    : status === "Wating user"
                                        ? "#000"
                                        : "#000",
                            transition: "all .3s ease"
                        };

                        let icon =
                            cloud > -1 ? (
                                <Icon
                                    name="cloud"
                                    style={{ fontSize: "25px", color: "#2185d0" }}
                                />
                            ) : (
                                    <Icon
                                        name="chess rock"
                                        style={{ fontSize: "25px", color: "#000" }}
                                    />
                                );

                        return (
                            <span>
                                <span style={st}> {icon} </span>
                            </span>
                        );
                    }
                },
                {
                    Header: "Childs",
                    id: "relations",
                    accessor: d => {
                        return _.values(d.relations).length;
                    },
                    width: 30
                },
                {
                    Header: "Lvl",
                    id: "pai_assigned_group",
                    accessor: d => {
                        return d.pai_assigned_group
                            ? d.pai_assigned_group.substring(d.pai_assigned_group.length - 3)
                            : 0;
                    },
                    width: 30,
                    filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["pai_assigned_group"] }),
                    filterAll: true
                },
                {
                    Header: "Ticket",
                    accessor: "pai_ticket_number",
                    width: 160,
                    filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["pai_ticket_number"] }),
                    filterAll: true
                },
                {
                    Header: "Subject",
                    accessor: "pai_product_model_version",
                    width: 420,
                    filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, {
                            keys: ["pai_product_model_version"]
                        }),
                    filterAll: true
                },
                {
                    Header: "Summary",
                    accessor: "pai_summary",
                    width: 270,
                    filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["pai_summary"] }),
                    filterAll: true
                },
                {
                    Header: "Status",
                    accessor: "pai_status",
                    width: 80,
                    filterMethod: (filter, row) => {
                        if (filter.value === "all") {
                            return true;
                        }
                        if (filter.value === "open") {
                            return row[filter.id] === "Open";
                        }
                        if (filter.value === "closed") {
                            return row[filter.id] === "Closed";
                        }
                        if (filter.value === "waiting_user") {
                            return row[filter.id] === "Wating user";
                        }
                    },
                    Filter: ({ filter, onChange }) => (
                        <select
                            onChange={event => onChange(event.target.value)}
                            style={{ width: "100%" }}
                            value={filter ? filter.value : "all"}
                        >
                            <option value="all">Show All</option>
                            <option value="open">Open</option>
                            <option value="closed">Closed</option>
                            <option value="waiting_user">Waiting user</option>
                        </select>
                    )
                },
                {
                    Header: "Priority",
                    accessor: "pai_priority",
                    width: 90,
                    filterMethod: (filter, row) => {
                        if (filter.value === "all") {
                            return true;
                        }
                        if (filter.value === "high") {
                            return row[filter.id] === "1 - High";
                        }
                        if (filter.value === "medium") {
                            return row[filter.id] === "2 - Medium";
                        }
                        if (filter.value === "low") {
                            return row[filter.id] === "3 - Low";
                        }
                    },
                    Filter: ({ filter, onChange }) => (
                        <select
                            onChange={event => onChange(event.target.value)}
                            style={{ width: "100%" }}
                            value={filter ? filter.value : "all"}
                        >
                            <option value="all">Show All</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    )
                },
                {
                    Header: "Submit date",
                    id: "pai_submit_date",
                    accessor: d => {
                        return d.pai_submit_date
                            ? moment(d.pai_submit_date.trim()).format("DD/MM/YYYY")
                            : 0;
                    },
                    width: 100,
                    filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["pai_submit_date"] }),
                    filterAll: true
                },
                {
                    Header: "Closed date",
                    id: "pai_closed_date",
                    accessor: d => {
                        return d.pai_closed_date
                            ? d.pai_closed_date !== "null"
                                ? moment(d.pai_closed_date.trim()).format("DD/MM/YYYY")
                                : ""
                            : 0;
                    },
                    width: 100,
                    filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["pai_closed_date"] }),
                    filterAll: true
                },
                {
                    Header: "Age",
                    id: "pai_submit_dates",
                    accessor: d => {
                        let startDate = moment(d.pai_submit_date, "YYYY-MM-DD");
                        let endDate = moment(d.pai_closed_date, "YYYY-MM-DD");
                        if (d.pai_closed_date === "null") {
                            endDate = moment(
                                moment(Date()).format("YYYY-MM-DD"),
                                "YYYY-MM-DD"
                            );
                        }

                        let result = endDate.diff(startDate, "days");

                        return result > -1 ? result : "";
                    },
                    width: 40
                },
                {
                    Header: "Responsible",
                    accessor: "pai_customer_name",
                    width: 220,
                    filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["pai_customer_name"] }),
                    filterAll: true
                },
                {
                    Header: "Assignee",
                    accessor: "pai_assignee",
                    width: 220,
                    filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["pai_assignee"] }),
                    filterAll: true
                }
            ]
        }
    ];

    return (
        <ReactTable
            data={props.data}
            filterable
            multiSort={true}
            defaultFilterMethod={(filter, row) =>
                String(row[filter.id]) === filter.value
            }
            columns={cols}
            defaultPageSize={50}
            style={{
                height: "850px",
                zoom: "0.68"
            }}
            className="-striped -highlight"
            getTrProps={(state, rowInfo, column) => {
                let clr = "";

                if (rowInfo != undefined) {
                    clr =
                        rowInfo.row.pai_status == "Wating user"
                            ? "#e8abab"
                            : rowInfo.row.pai_status == "Open"
                                ? "#b2e8ab"
                                : "#e1e8e1";
                }

                return {
                    style: {
                        background: clr
                    },
                    onDoubleClick: (e, handleOriginal) => {
                        console.log("It was in this row:", rowInfo.original);
                        if (handleOriginal) {
                            handleOriginal();
                        }
                    }
                };
            }}
        />
    );
};

export default MainGrid;
