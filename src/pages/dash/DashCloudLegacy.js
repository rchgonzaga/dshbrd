import React from "react"
import { Grid, Button, Statistic, Icon, Image } from "semantic-ui-react"
import _ from "lodash"

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

  constructor(props) {
    super(props)
    this.state = {
      showPopup: false,
      selectedTicket: {}
    }
  }

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
            <Statistic.Group widths='five'>
              <Statistic style={{backgroundColor:  '#e3e3e3', borderRadius: '10px', margin: '0px 9px 22px 7%', padding: '10px'}}>
                <Statistic.Value>2 DAYS</Statistic.Value>
                <Statistic.Label>L2 / avg time</Statistic.Label>
              </Statistic>
          
              <Statistic style={{backgroundColor:  '#e3e3e3', borderRadius: '10px', margin: '0px 10px auto', padding: '10px'}}>
                <Statistic.Value>
                  4 DAYS
                </Statistic.Value>
                <Statistic.Label>L3 / avg time</Statistic.Label>
              </Statistic>
          
              <Statistic style={{backgroundColor:  '#e3e3e3', borderRadius: '10px', margin: '0px 10px auto', padding: '10px'}}>
                <Statistic.Value>
                  <Icon name='plane' />
                  5
                </Statistic.Value>
                <Statistic.Label>Tickets today</Statistic.Label>
              </Statistic>
          
              <Statistic style={{backgroundColor:  '#e3e3e3', borderRadius: '10px', margin: '0px 10px auto', padding: '10px'}}>
                <Statistic.Value>
                  <Image src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' className='circular inline' />
                  42
                </Statistic.Value>
                <Statistic.Label>Team Members</Statistic.Label>
              </Statistic>
            </Statistic.Group>

            <Hr />

            <Grid columns={3}>
              <Grid.Row>
                <Grid.Column>
                  <PieChart
                    data={[
                      {
                          id: "Closed",
                          label: "Closed",
                          value: (api.state.ticketList.filter(ticket => ticket.pai_status === 'Closed').length / api.state.ticketList.length * 100).toFixed(1),
                          color: "hsl(240, 70%, 50%)"
                      },
                      {
                          id: "Opened",
                          label: "Opened",
                          value: (api.state.ticketList.filter(ticket => ticket.pai_status === 'Open').length / api.state.ticketList.length * 100).toFixed(1),
                          color: "hsl(145, 70%, 50%)"
                      },
                      {
                          id: "Waiting",
                          label: "Waiting",
                          value: (api.state.ticketList.filter(ticket => ticket.pai_status === 'Wating user').length / api.state.ticketList.length * 100).toFixed(1),
                          color: "hsl(225, 70%, 50%)"
                      }
                  ]}
                    width={window.innerWidth / 3}
                    height={window.innerHeight / 2.5}
                  />
                </Grid.Column>
                <Grid.Column>
                  <HorizontalGroupedBars
                    data={api.state.ticketList}
                    width={window.innerWidth / 3}
                    height={window.innerHeight / 1.8}
                  />
                </Grid.Column>
                  <Grid.Column>
                    <UserFaces />
                    <PieChart
                    data={[
                      {
                          id: "Closed",
                          label: "Closed",
                          value: (api.state.ticketList.filter(ticket => ticket.pai_status === 'Closed').length / api.state.ticketList.length * 100).toFixed(1),
                          color: "hsl(240, 70%, 50%)"
                      },
                      {
                          id: "Opened",
                          label: "Opened",
                          value: (api.state.ticketList.filter(ticket => ticket.pai_status === 'Open').length / api.state.ticketList.length * 100).toFixed(1),
                          color: "hsl(145, 70%, 50%)"
                      },
                      {
                          id: "Waiting",
                          label: "Waiting",
                          value: (api.state.ticketList.filter(ticket => ticket.pai_status === 'Wating user').length / api.state.ticketList.length * 100).toFixed(1),
                          color: "hsl(225, 70%, 50%)"
                      }
                  ]}
                    width={window.innerWidth / 3}
                    height={window.innerHeight / 3.2}
                  />
                  </Grid.Column>
              </Grid.Row>
            </Grid>
            <Hr />
            <StatisticItems
              data={{
                originalActivities: api.state.ticketList,
                totalSubjectClosed: api.state.ticketList.filter(ticket => ticket.pai_status === 'Closed').length,
                totalSubjectOpen: api.state.ticketList.filter(ticket => ticket.pai_status === 'Open').length,
                totalSubjectWaitingUser: api.state.ticketList.filter(ticket => ticket.pai_status === 'Wating user').length,
                totalL2Open: api.state.ticketList.filter(
                  ticket => ticket.pai_assigned_group.substring(ticket.pai_assigned_group.length - 3).trim() === 'L2' && ticket.pai_status === 'Open'
                ).length,
                totalL3LegacyOpen: api.state.ticketList.filter(
                    ticket => ticket.pai_assigned_group.substring(ticket.pai_assigned_group.length - 3).trim() === 'L3' && 
                    ticket.pai_status === 'Open' &&
                    ticket.pai_product.search('Legacy Value Capture Retailer') === 0
                ).length,
                totalL3CloudOpen:  api.state.ticketList.filter(
                    ticket => ticket.pai_assigned_group.substring(ticket.pai_assigned_group.length - 3).trim() === 'L3' && 
                    ticket.pai_status === 'Open' &&
                    ticket.pai_product.search('Value Capture') === 0
                ).length
              }}
            />

            <Hr />
            <MainGrid 
              data={api.state.ticketList}
              onDoubleClickRow={ticket => this.setState({ showPopup: true, selectedTicket: ticket }) }
            />
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
