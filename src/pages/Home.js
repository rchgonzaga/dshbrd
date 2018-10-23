import React from "react"
import { Grid } from "semantic-ui-react"

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
