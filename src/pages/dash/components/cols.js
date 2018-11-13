import _ from "lodash"
const mainChildCols = [
    {
        Header: "Project",
        columns: [
            {
                Header: "Key",
                accessor: "filho_key",
                width: 50
            },
            {
                Header: "Project",
                accessor: "project",
                width: 220
            },
            {
                Header: "Jira",
                accessor: "pai_vendor_ticket_number",
                width: 95
            },
            {
                Header: "Ticket",
                accessor: "filho_ticket_number",
                width: 170
            },
            {
                Header: "Summary",
                accessor: "filho_summary",
                width: 370
            },
            {
                Header: "Status",
                accessor: "filho_status",
                width: 80
            },
            {
                Header: "Priority",
                accessor: "filho_priority",
                width: 80
            },
            {
                Header: "Submited date",
                accessor: "filho_submit_date",
                width: 100
            },
            {
                Header: "Closed date",
                accessor: "filho_closed_date",
                width: 100
            },
            {
                Header: "Resolution",
                accessor: "filho_resolution",
                width: 370
            },
            {
                Header: "Customer",
                accessor: "filho_customer_name",
                width: 220
            },
            {
                Header: "Assignee",
                accessor: "filho_assignee",
                width: 220
            },
            {
                Header: "Subject",
                accessor: "filho_product_tier_3",
                width: 120
            },
            {
                Header: "Notes",
                accessor: "filho_notes",
                width: 420
            }
        ]
    }
];

const mainCols = [
    {
        Header: "Project",
        columns: [
            {
                Header: "Key",
                accessor: "pai_key",
                width: 95
            },
            {
                Header: "Childs",
                id: "relations",
                accessor: d => {
                    return _.values(d.relations).length;
                },
                width: 40
            },
            {
                Header: "Ticket",
                accessor: "pai_ticket_number",
                width: 160
            },
            {
                Header: "Subject",
                accessor: "pai_product_model_version",
                width: 320
            },
            {
                Header: "Summary",
                accessor: "pai_summary",
                width: 470
            },
            {
                Header: "Status",
                accessor: "pai_status",
                width: 80
            },
            {
                Header: "Priority",
                accessor: "pai_priority",
                width: 80
            },
            {
                Header: "Submit date",
                accessor: "pai_submit_date",
                width: 100
            },
            {
                Header: "Closed date",
                accessor: "pai_closed_date",
                width: 100
            },
            {
                Header: "Responsible",
                accessor: "pai_customer_name",
                width: 220
            },
            {
                Header: "Assignee",
                accessor: "pai_assignee",
                width: 220
            }
        ]
    }
]

export { mainCols, mainChildCols }