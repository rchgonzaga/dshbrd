import React from "react"
import { Grid, Button } from "semantic-ui-react"

// Import our Api Service Subscriber
import Api, { ApiSubscribe } from "../../state/Api"
import { PieChart } from "../dash/components/PieChart"
import Hr from "../../components/Hr"
import LoaderSpinner from "../../components/Loader"
import { HorizontalGroupedBars } from "../dash/components/HorizontalGroupedBars"
import StatisticItems from "../dash/components/StatisticItems"
import MainGrid from "../dash/components/MainGrid"
import HomeApi from "../../state/HomeState"
import UserFaces from "../dash/components/UserFaces"

class HomeChild extends React.Component {
  componentDidMount() {
    this.props.api.getCurrentSession()
  }

  render() {
    let { api, globalApi } = this.props

    return (
      <div>
        {/* NORMAL STATE */}
        {api.state.isLoadingSession === false ? (
          <div>
            <h2>
              Dashboard -{" "}
              <span style={{ color: "grey" }}>
                01/06/2018 ~ {new Date().toLocaleDateString("pt-BR")}
              </span>
              &nbsp;&nbsp; | &nbsp;&nbsp; Last update:{" "}
              <span style={{ color: "grey" }}>
                {" "}
                {new Date().toLocaleDateString("pt-BR")} &nbsp;&nbsp;
                <Button primary onClick={() => api.changeAiMothaFocka()}>
                  Update
                </Button>
                <Button secondary onClick={() => api.getCurrentSession()}>
                  Update Grid
                </Button>
              </span>
            </h2>
            <Hr />
            <Grid columns={3}>
              <Grid.Row>
                <Grid.Column>
                  <PieChart
                    data={api.state.barData}
                    width={window.innerWidth / 3}
                    height={window.innerHeight / 2}
                  />
                </Grid.Column>
                <Grid.Column>
                  <HorizontalGroupedBars
                    data={api.state.pieData}
                    width={window.innerWidth / 3}
                    height={window.innerHeight / 2}
                  />
                </Grid.Column>
                <Grid.Column>
                  <UserFaces
                    data={api.state.pieData}
                    width={window.innerWidth / 2}
                    height={window.innerHeight / 2}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Hr />

            <StatisticItems
              data={{
                originalActivities: [],
                totalSubjectClosed: 31,
                totalSubjectOpen: 12,
                totalSubjectWaitingUser: 78,
                totalL2Open: 2,
                totalL3LegacyOpen: 5,
                totalL3CloudOpen: 7
              }}
            />

            <Hr />
            <MainGrid data={api.state.ticketList} />
            <br />
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

const Home = () => (
  <ApiSubscribe to={[Api, HomeApi]}>
    {(api, homeApi) => {
      return <HomeChild api={homeApi} globalApi={api} />
    }}
  </ApiSubscribe>
)

export default Home
