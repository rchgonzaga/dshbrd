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
            count: 10
        }
    }

    increment() {
        this.setState({ count: this.state.count + 10 })
    }

    changeAiMothaFocka() {
    }

    getCurrentSession() {
        // console.log('getCurrentSession')
        this.setState({
            isLoadingSession: true
        })
        Sessions.getSession().then(data => {

            // Treat the data to keep the root ticket opened if the child ticket is opened 
            if (data !== undefined) {
                data.map((item, index) => {

                    // Create a big group
                    if(item && item.pai_product_model_version){
                        if(item.pai_product_model_version.split('/').length >= 1) {
                            item.pai_biggroup = item.pai_product_model_version.split('/')[0]
                        } else {
                            console.log('Creating a big group: false')
                            item.pai_biggroup = 'N/A'
                        }
                    }

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

                // console.log(
                //     this.state.ticketList
                // )

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
