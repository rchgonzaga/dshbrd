import React from "react"
import { Grid, Button, Icon} from "semantic-ui-react"

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
import ModalScrollingExample from "./components/ModalScrollingExample"
import { CSVLink  } from "react-csv";


import { inject, observer } from "mobx-react";

@inject("UiStore", "Timer")
@observer
class HomeChild extends React.Component {

  constructor(props){
    super(props)
    this.handleModal = this.handleModal.bind(this)
  }

  componentDidMount() {
    this.props.api.getCurrentSession('itscloud')
  }

  // componentDidUpdate(prevProps, prevState) {
  //   // only update chart if the data has changed
  //   if (prevProps.data !== this.state) {
  //     console.log(prevProps, prevState)
  //   }
  // }

  handleModal(){
    this.props.api.handleModal()
  }

  render() {
    let { state, api, globalApi, UiStore, Timer} = this.props
    console.log(this.props)

    return (
      <div>
        {/* NORMAL STATE */}
        {state.isLoadingSession === false ? (
          <div>
            <h3>
              {/*UiStore.theme*/}{/*Timer.start*/}ITS Cloud & Legacy -{" "}
              <span style={{ color: "grey" }}>
                01/06/2018 ~ {new Date().toLocaleDateString("pt-BR")}
              </span>
              &nbsp;&nbsp; | &nbsp;&nbsp; Last update:{" "}
              <span style={{ color: "grey" }}>
                {" "}
                {new Date().toLocaleDateString("pt-BR")} &nbsp;&nbsp;
                
                <CSVLink className="ui primary button" data={api.extractSLAS()} filename={"SLA.csv"}>
                  SLA - Excel
                </CSVLink>
                
                <CSVLink className="ui primary button" data={state.ticketList} filename={"Tickets.csv"} separator={";"}>
                  Tickets - Excel
                </CSVLink>

                <Button secondary onClick={() => api.getCurrentSession('itscloud')}>
                  Refresh
                </Button>

                <Button secondary onClick={() => UiStore.toggleTheme()}>
                  Teste
                </Button>


              </span>
              &nbsp;&nbsp; &nbsp;&nbsp; Status: 
              <Icon name='dot circle' color={state.currentStatus["LEGACY ITS"] === true ? "grey" : "olive"}/> Legacy | 
              <Icon name='dot circle' color={state.currentStatus["CLOUD ITS"] === true ? "grey" : "olive"}/> Cloud | 
              <Icon name='dot circle' color={state.currentStatus["CLOUD BARTER"] === true ? "grey" : "olive"}/> Barter
            </h3>
            <Hr />
            {/*
            <Statistic.Group widths='five'>
              <Statistic style={{ backgroundColor: '#c3dfef', borderRadius: '10px', margin: '0px 9px 22px 7%', padding: '10px' }}>
                <Statistic.Value>2 DAYS</Statistic.Value>
                <Statistic.Label>L2 / avg time</Statistic.Label>
              </Statistic>

              <Statistic style={{ backgroundColor: '#c3efca', borderRadius: '10px', margin: '0px 10px auto', padding: '10px' }}>
                <Statistic.Value>
                  4 DAYS
                </Statistic.Value>
                <Statistic.Label>L3 / avg time</Statistic.Label>
              </Statistic>

              <Statistic style={{ backgroundColor: '#eeefc3', borderRadius: '10px', margin: '0px 10px auto', padding: '10px' }}>
                <Statistic.Value>
                  4 DAYS
                </Statistic.Value>
                <Statistic.Label>VC Legacy / avg time</Statistic.Label>
              </Statistic>

              <Statistic style={{ backgroundColor: '#efc3ec', borderRadius: '10px', margin: '0px 10px auto', padding: '10px' }}>
                <Statistic.Value>
                  4 DAYS
                </Statistic.Value>
                <Statistic.Label>VCT / avg time</Statistic.Label>
              </Statistic>

            </Statistic.Group>
            <Hr />
            */}


            <Grid columns={3}>
              <Grid.Row>
                <Grid.Column>
                  <PieChart
                    data={[
                      {
                        id: "Opened",
                        label: "Opened",
                        value: state.ticketList.filter(ticket => ticket.pai_status === 'Open').length,
                        color: "hsl(145, 70%, 50%)"
                      },
                      {
                        id: "Waiting",
                        label: "Waiting",
                        value: state.ticketList.filter(ticket => ticket.pai_status === 'Wating user').length,
                        color: "hsl(225, 70%, 50%)"
                      }
                    ]}
                    width={window.innerWidth / 3}
                    height={window.innerHeight / 2.5}
                  />
                </Grid.Column>
                <Grid.Column>
                  <HorizontalGroupedBars
                    data={state.ticketList}
                    dataAVG={state.ticketListAVG}
                    width={window.innerWidth / 3}
                    height={window.innerHeight / 1.8}
                  />
                </Grid.Column>
                <Grid.Column>
                  <UserFaces 
                    data={{
                      total: state.ticketList.length,
                      totalOneDay: (state.ticketList.filter(ticket => parseFloat(ticket.pai_age) <= 1).length),
                      totalThreeDay: (state.ticketList.filter(ticket => parseFloat(ticket.pai_age) > 1 && parseFloat(ticket.pai_age) <= 3).length),
                      totalRestDay: (state.ticketList.filter(ticket => parseFloat(ticket.pai_age) >= 4).length)
                    }}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Hr />
            <StatisticItems
              data={{
                originalActivities: state.ticketList,
                totalSubjectClosed: state.ticketList.filter(ticket => ticket.pai_status === 'Closed').length,
                totalSubjectOpen: state.ticketList.filter(ticket => ticket.pai_status === 'Open').length,
                totalSubjectWaitingUser: state.ticketList.filter(ticket => ticket.pai_status === 'Wating user').length,
                totalL2Open: state.ticketList.filter(
                  ticket => ticket.pai_assigned_group.substring(ticket.pai_assigned_group.length - 3).trim() === 'L2' && ticket.pai_status === 'Open'
                ).length,
                totalL3LegacyOpen: state.ticketList.filter(
                  ticket => ticket.pai_assigned_group.substring(ticket.pai_assigned_group.length - 3).trim() === 'L3' &&
                    ticket.pai_status === 'Open' &&
                    ticket.pai_product.search('Legacy Value Capture Retailer') === 0
                ).length,
                totalL3CloudOpen: state.ticketList.filter(
                  ticket => ticket.pai_assigned_group.substring(ticket.pai_assigned_group.length - 3).trim() === 'L3' &&
                    ticket.pai_status === 'Open' &&
                    ticket.pai_product.search('Value Capture') === 0
                ).length
              }}
            />

            <Hr />
            <MainGrid
              data={state.ticketList}
              onDoubleClickRow={ticket => api.selectTicketAndModal({ showPopup: true, selectedTicket: ticket })}
            />
            {state.showPopup  ?
              (<ModalScrollingExample show={state.showPopup} data={state.selectedTicket} onClose={this.handleModal}/>) : (
                <div></div>
              )
            }
            

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
      return <HomeChild {...homeApi} api={homeApi} globalApi={api} />
    }}
  </ApiSubscribe>
)

export default Home
