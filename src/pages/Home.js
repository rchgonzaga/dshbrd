import React from "react"
import { Grid } from "semantic-ui-react"
import ReactTable from "react-table"
import matchSorter from "match-sorter"

// Import our Api Service Subscriber
import { ApiSubscribe } from "../state/Api"
import { PieChart } from "./dash/components/PieChart"
import Hr from "../components/Hr"
import { HorizontalGroupedBars } from "./dash/components/HorizontalGroupedBars"

const Home = () => {
  return (
    <ApiSubscribe>
      {api => (
        <div>
          <h1>🏠 Home</h1>
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
          asdasdas
          <Hr />
          <ReactTable
            data={[]}
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
                    accessor: "firstName",
                    filterMethod: (filter, row) =>
                      row[filter.id].startsWith(filter.value) &&
                      row[filter.id].endsWith(filter.value)
                  },
                  {
                    Header: "Last Name",
                    id: "lastName",
                    accessor: d => d.lastName,
                    filterMethod: (filter, rows) =>
                      matchSorter(rows, filter.value, { keys: ["lastName"] }),
                    filterAll: true
                  }
                ]
              },
              {
                Header: "Info",
                columns: [
                  {
                    Header: "Age",
                    accessor: "age"
                  },
                  {
                    Header: "Over 21",
                    accessor: "age",
                    id: "over",
                    Cell: ({ value }) => (value >= 21 ? "Yes" : "No"),
                    filterMethod: (filter, row) => {
                      if (filter.value === "all") {
                        return true
                      }
                      if (filter.value === "true") {
                        return row[filter.id] >= 21
                      }
                      return row[filter.id] < 21
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
              <Grid.Column>
                <button onClick={() => api.changeAiMothaFocka()}>
                  changeIt
                </button>
              </Grid.Column>
              <Grid.Column>adasdsa</Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      )}
    </ApiSubscribe>
  )
}

export default Home
