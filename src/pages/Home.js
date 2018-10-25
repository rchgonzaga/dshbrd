import React from "react"
import { Grid, Icon, Button } from "semantic-ui-react"
import ReactTable from "react-table"
import matchSorter from "match-sorter"
import moment from "moment";
import _ from "lodash";

// Import our Api Service Subscriber
import { ApiSubscribe } from "../state/Api"
import { PieChart } from "./dash/components/PieChart"
import Hr from "../components/Hr"
import LoaderSpinner from "../components/Loader"
import { HorizontalGroupedBars } from "./dash/components/HorizontalGroupedBars"
import StatisticItems from "./dash/components/StatisticItems";

class HomeChild extends React.Component {

    componentDidMount() {
        this.props.api.getCurrentSession()
    }

    render() {
        let { api } = this.props
        let today = new Date();

        const cols = [
            {
                Header: "",
                columns: [
                    {
                        Header: "Key",
                        accessor: "pai_key",
                        width: 47,
                        Cell: (row) => {
                            let status = row.original.pai_status
                            let cloud = row.original.pai_summary ? 
                                row.original.pai_summary.indexOf('ITS Cloud') :
                                0
                            let st = {
                                color: status === 'Closed' ? '#000' :
                                    status === 'Wating user' ? '#000' :
                                        '#000',
                                transition: 'all .3s ease'
                            }

                            let icon = cloud > -1 ? <Icon name='cloud' style={{ fontSize: '25px', color: '#2185d0' }} /> :
                                <Icon name='chess rock' style={{ fontSize: '25px', color: '#000' }} />

                            return (
                                <span>
                                    <span style={st}> {icon} </span>
                                </span>
                            )
                        }
                    },
                    {
                        Header: "Childs",
                        id: "relations",
                        accessor: d => {
                            return _.values(d.relations).length;
                        },
                        width: 60
                    },
                    {
                        Header: "Lvl",
                        id: "pai_assigned_group",
                        accessor: d => {
                            return d.pai_assigned_group ? 
                            d.pai_assigned_group.substring(d.pai_assigned_group.length - 3) :
                            0
                        },
                        width: 40,
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
                            matchSorter(rows, filter.value, { keys: ["pai_product_model_version"] }),
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
                                return row[filter.id] === 'Open';
                            }
                            if (filter.value === "closed") {
                                return row[filter.id] === 'Closed';
                            }
                            if (filter.value === "waiting_user") {
                                return row[filter.id] === 'Wating user';
                            }
                        },
                        Filter: ({ filter, onChange }) =>
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
                                return row[filter.id] === '1 - High';
                            }
                            if (filter.value === "medium") {
                                return row[filter.id] === '2 - Medium';
                            }
                            if (filter.value === "low") {
                                return row[filter.id] === '3 - Low';
                            }
                        },
                        Filter: ({ filter, onChange }) =>
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
                    },
                    {
                        Header: "Submit date",
                        id: "pai_submit_date",
                        accessor: d => {
                            return d.pai_submit_date ? 
                            moment(d.pai_submit_date.trim()).format('DD/MM/YYYY') :
                            0
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
                            return d.pai_closed_date ?
                            (d.pai_closed_date !== 'null' ? moment(d.pai_closed_date.trim()).format('DD/MM/YYYY') : '') :
                            0
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
                            if (d.pai_closed_date === 'null') {
                                endDate = moment(moment(Date()).format('YYYY-MM-DD'), "YYYY-MM-DD");
                            }

                            let result = endDate.diff(startDate, 'days');

                            return (result > -1 ? result : '');
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
        ]

        return (
            <div>
                {/* NORMAL STATE */}
                {api.state.isLoadingSession === false ? (
                    <div>
                        <h2>
                            Dashboard - <span style={{ color: 'grey' }}>01/06/2018 ~ {today.toLocaleDateString("pt-BR")}</span>
                            &nbsp;&nbsp; | &nbsp;&nbsp; Last update: <span style={{ color: 'grey' }}> {today.toLocaleDateString("pt-BR")} &nbsp;&nbsp;
                            <Button primary onClick={() => api.changeAiMothaFocka()}>Update</Button>
                                <Button secondary onClick={() => api.getCurrentSession()}>Update Grid</Button>
                            </span>
                        </h2>
                        <Hr />
                        <Grid columns={2}>
                            <Grid.Row>
                                <Grid.Column>
                                    <PieChart
                                        data={api.state.barData}
                                        width={window.innerWidth / 2}
                                        height={window.innerHeight / 2}
                                    />
                                </Grid.Column>
                                <Grid.Column>
                                    <HorizontalGroupedBars
                                        data={api.state.pieData}
                                        width={window.innerWidth / 2}
                                        height={window.innerHeight / 2}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <Hr />

                        <StatisticItems data={{
                            originalActivities: [],
                            totalSubjectClosed: 31,
                            totalSubjectOpen: 12,
                            totalSubjectWaitingUser: 78,
                            totalL2Open: 2,
                            totalL3LegacyOpen: 5,
                            totalL3CloudOpen: 7
                        }} />

                        <Hr />
                        <ReactTable
                            data={api.state.ticketList}
                            filterable
                            multiSort={true}
                            defaultFilterMethod={(filter, row) =>
                                String(row[filter.id]) === filter.value
                            }
                            columns={cols}
                            defaultPageSize={10}
                            className="-striped -highlight"
                        />
                        <Grid columns={2}>
                            <Grid.Row>
                                <Grid.Column>as</Grid.Column>
                                <Grid.Column>adasdsa</Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                ) : (
                        <div>
                            {/* LOADING STATE */}
                            <LoaderSpinner />
                        </div>
                    )}
            </div>
        )
    }
}

// const Home = () => {
//   return (
//     <ApiSubscribe to={[Api]}>
//       {(api) => (
//         <HomeChild api={api} />
//       )}
//     </ApiSubscribe>
//     )
// }
const Home = () => <ApiSubscribe>{api => <HomeChild api={api} />}</ApiSubscribe>

export default Home
