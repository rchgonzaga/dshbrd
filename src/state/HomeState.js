import { Container } from "unstated"
import Sessions from '../services/api/tickets/index'
import _ from 'lodash'

import UNSTATED from "unstated-debug"
UNSTATED.logStateChanges = false


// Create a Container for our React Context. This container will
// hold state and methods just like a react component would:
export class HomeContainer extends Container {
    constructor() {
        super()

        // The state will be available to any component we inject
        // the Container instance into
        this.state = {
            loggedIn: false,
            sideMenuVisible: false,
            isLoadingSession: false,
            ticketList: [],
            subjectNumer: 0,
            count: 10,
            barData: [
                {
                    id: "elixir",
                    label: "elixir",
                    value: 250,
                    color: "hsl(173, 70%, 50%)"
                },
                {
                    id: "erlang",
                    label: "erlang",
                    value: 493,
                    color: "hsl(240, 70%, 50%)"
                },
                {
                    id: "scala",
                    label: "scala",
                    value: 455,
                    color: "hsl(145, 70%, 50%)"
                },
                {
                    id: "lisp",
                    label: "lisp",
                    value: 490,
                    color: "hsl(225, 70%, 50%)"
                },
                {
                    id: "rust",
                    label: "rust",
                    value: 211,
                    color: "hsl(230, 70%, 50%)"
                }
            ],
            pieData: [
                {
                    country: "AD",
                    closed: 71,
                    open: 40,
                    waitinguser: 12
                },
                {
                    country: "AE",
                    closed: 152,
                    open: 25,
                    waitinguser: 8
                },
                {
                    country: "AF",
                    closed: 130,
                    open: 74,
                    waitinguser: 5
                },
                {
                    country: "AG",
                    closed: 55,
                    open: 199,
                    waitinguser: 22
                },
                {
                    country: "AI",
                    closed: 46,
                    open: 73,
                    waitinguser: 3
                },
                {
                    country: "AL",
                    closed: 105,
                    open: 121,
                    waitinguser: 7
                },
                {
                    country: "AM",
                    closed: 47,
                    open: 78,
                    waitinguser: 25
                }
            ]
        }
    }

    increment() {
        this.setState({ count: this.state.count + 10 })
    }

    changeAiMothaFocka() {
        this.setState({
            barData: [
                {
                    id: "elixir",
                    label: "elixir",
                    value: Math.floor(Math.random() * 100) + 1,
                    color: "hsl(173, 70%, 50%)"
                },
                {
                    id: "erlang",
                    label: "erlang",
                    value: Math.floor(Math.random() * 100) + 1,
                    color: "hsl(240, 70%, 50%)"
                },
                {
                    id: "scala",
                    label: "scala",
                    value: Math.floor(Math.random() * 100) + 1,
                    color: "hsl(145, 70%, 50%)"
                },
                {
                    id: "lisp",
                    label: "lisp",
                    value: Math.floor(Math.random() * 100) + 1,
                    color: "hsl(225, 70%, 50%)"
                },
                {
                    id: "rust",
                    label: "rust",
                    value: Math.floor(Math.random() * 100) + 1,
                    color: "hsl(230, 70%, 50%)"
                }
            ]
        })
    }

    getCurrentSession() {
        console.log('getCurrentSession')
        this.setState({
            isLoadingSession: true
        })
        Sessions.getSession().then(data => {

            // Treat the data to keep the root ticket opened if the child ticket is opened 
            if (data !== undefined) {
                data.map((item, index) => {
                    if (item.relations.length) {

                        item.relations.map((citem, cindex) => {
                            
                            if(citem.filho_status.trim() !== 'Done' && citem.filho_status.trim() != 'Closed' && citem.filho_status.trim() != 'Resolved' && citem.filho_status.trim() != null){
                                item.pai_status = 'Open'
                                item.pai_closed_date = 'null'
                            }
                            return item
                        })

                    }
                    return item
                })
            }

            this.setState({
                ticketList: data
            },
            () => {

                console.log(
                    this.state.ticketList
                )

            })

            this.setState({
                isLoadingSession: false
            })
        })
    }

    decrement() {
        this.setState({ count: this.state.count - 1 })
    }

    async handleSideMenu() {
        this.setState({ sideMenuVisible: !this.state.sideMenuVisible })
    }

}

const HomeApi = new HomeContainer()


export default HomeApi
