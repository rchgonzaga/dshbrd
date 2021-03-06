import React from "react"
import { Grid, Button, Icon} from "semantic-ui-react"

// Import our Api Service Subscriber
import Api, { ApiSubscribe } from "../../state/Api"
import { PieChart } from "../dashpodpyar/components/PieChart"
import Hr from "../../components/Hr"
import LoaderSpinner from "../../components/Loader"
import { HorizontalGroupedBars } from "../dashpodpyar/components/HorizontalGroupedBars"
import StatisticItems from "../dashpodpyar/components/StatisticItems"
import MainGrid from "../dashpodpyar/components/MainGrid"
import HomeApi from "../../state/HomeState"
import UserFaces from "../dashpodpyar/components/UserFaces"
import ModalScrollingExample from "./components/ModalScrollingExample"
import { CSVLink  } from "react-csv";

class HomeChild extends React.Component {

  constructor(props){
    super(props)
    this.handleModal = this.handleModal.bind(this)
  }
  componentDidMount() {
    this.props.api.getCurrentSession('podargpy')
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
    let { api, globalApi } = this.props

    return (
      <div>
        {/* NORMAL STATE */}
        {api.state.isLoadingSession === false ? (
          <div>
            <h3>
              POD PY & AG -{" "}
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
                
                <CSVLink className="ui primary button" data={api.state.ticketList} filename={"Tickets.csv"} separator={";"}>
                  Tickets - Excel
                </CSVLink>

                <Button secondary onClick={() => api.getCurrentSession(8088)}>
                  Refresh
                </Button>
              </span>
              &nbsp;&nbsp; &nbsp;&nbsp; Status: 
              <Icon name='dot circle' color={api.state.currentStatus["LEGACY ITS"] === true ? "grey" : "olive"}/> Legacy | 
              <Icon name='dot circle' color={api.state.currentStatus["CLOUD ITS"] === true ? "grey" : "olive"}/> Cloud | 
              <Icon name='dot circle' color={api.state.currentStatus["CLOUD BARTER"] === true ? "grey" : "olive"}/> Barter
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
                        value: api.state.ticketList.filter(ticket => ticket.pai_status === 'Open').length,
                        color: "hsl(145, 70%, 50%)"
                      },
                      {
                        id: "Waiting",
                        label: "Waiting",
                        value: api.state.ticketList.filter(ticket => ticket.pai_status === 'Wating user').length,
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
                    dataAVG={api.state.ticketListAVG}
                    width={window.innerWidth / 3}
                    height={window.innerHeight / 1.8}
                  />
                </Grid.Column>
                <Grid.Column>
                  <UserFaces 
                    data={{
                      total: api.state.ticketList.length,
                      totalOneDay: (api.state.ticketList.filter(ticket => parseFloat(ticket.pai_age) <= 1).length),
                      totalThreeDay: (api.state.ticketList.filter(ticket => parseFloat(ticket.pai_age) > 1 && parseFloat(ticket.pai_age) <= 3).length),
                      totalRestDay: (api.state.ticketList.filter(ticket => parseFloat(ticket.pai_age) >= 4).length)
                    }}
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
                  (ticket.pai_product_model_version ? ticket.pai_product_model_version.indexOf('PY') > 0 : '')
                ).length,
                totalL3CloudOpen: api.state.ticketList.filter(
                  ticket => ticket.pai_assigned_group.substring(ticket.pai_assigned_group.length - 3).trim() === 'L3' &&
                  ticket.pai_status === 'Open'
                ).length
              }}
            />

            <Hr />
            <MainGrid
              data={api.state.ticketList}
              onDoubleClickRow={ticket => api.selectTicketAndModal({ showPopup: true, selectedTicket: ticket })}
            />
            {api.state.showPopup  ?
              (<ModalScrollingExample show={api.state.showPopup} data={api.state.selectedTicket} onClose={this.handleModal}/>) : (
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
      return <HomeChild api={homeApi} globalApi={api} />
    }}
  </ApiSubscribe>
)

export default Home
