import React from "react"
import { Grid, Icon, Button, Statistic } from "semantic-ui-react"
import ReactTable from "react-table"
import matchSorter from "match-sorter"

// Import our Api Service Subscriber
import { ApiSubscribe } from "../state/Api"
import { PieChart } from "./dash/components/PieChart"
import Hr from "../components/Hr"
import LoaderSpinner from "../components/Loader"
import { HorizontalGroupedBars } from "./dash/components/HorizontalGroupedBars"

class HomeChild extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.api.getCurrentSession()
  }

  render() {
    let { api } = this.props
    return (
      <div>
        {/* NORMAL STATE */}
        {api.state.isLoadingSession == false ? (
          <div>
            <h1>
              🏠 Home
              <Button primary onClick={() => api.changeAiMothaFocka()}>Update</Button>
              <Button secondary onClick={() => api.getCurrentSession()}>Update Grid</Button>
            </h1>
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

            <Statistic.Group widths="four">
              <Statistic>
                <Statistic.Value>22</Statistic.Value>
                <Statistic.Label>Saves</Statistic.Label>
              </Statistic>

              <Statistic>
                <Statistic.Value text>
                  Three
                  <br />
                  Thousand
                </Statistic.Value>
                <Statistic.Label>Signups</Statistic.Label>
              </Statistic>

              <Statistic>
                <Statistic.Value>
                  <Icon name="hourglass" />5
                </Statistic.Value>
                <Statistic.Label>Flights</Statistic.Label>
              </Statistic>

              <Statistic>
                <Statistic.Value>
                  <Icon name="cloud" />
                  42
                </Statistic.Value>
                <Statistic.Label>Team Members</Statistic.Label>
              </Statistic>
            </Statistic.Group>

            <Hr />
            <ReactTable
              data={api.state.ticketList}
              filterable
              defaultFilterMethod={(filter, row) =>
                String(row[filter.id]) === filter.value
              }
              columns={[
                {
                  Header: "Name",
                  columns: [
                    {
                      Header: "First Name",
                      accessor: "name",
                      filterMethod: (filter, row) =>
                        row[filter.id].startsWith(filter.value) &&
                        row[filter.id].endsWith(filter.value)
                    },
                    {
                      Header: "Last Name",
                      id: "username",
                      accessor: d => d.username,
                      filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, {
                          keys: ["username"]
                        }),
                      filterAll: true
                    }
                  ]
                },
                {
                  Header: "Info",
                  columns: [
                    {
                      Header: "Age",
                      accessor: "id"
                    },
                    {
                      Header: "Over 3",
                      accessor: "id",
                      id: "over",
                      Cell: ({ value }) => (value >= 3 ? "Yes" : "No"),
                      filterMethod: (filter, row) => {
                        if (filter.value === "all") {
                          return true
                        }
                        if (filter.value === "true") {
                          return row[filter.id] >= 3
                        }
                        return row[filter.id] < 3
                      },
                      Filter: ({ filter, onChange }) => (
                        <select
                          onChange={event => onChange(event.target.value)}
                          style={{ width: "100%" }}
                          value={filter ? filter.value : "all"}
                        >
                          <option value="all">Show All</option>
                          <option value="true">Can Drink</option>
                          <option value="false">Can't Drink</option>
                        </select>
                      )
                    }
                  ]
                }
              ]}
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
