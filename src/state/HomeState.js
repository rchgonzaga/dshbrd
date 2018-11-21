import { Container } from "unstated"
import Sessions from '../services/api/tickets/index'
import _ from 'lodash'
import moment from 'moment'

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
            ticketListAVG: [],
            subjectNumer: 0,
            count: 10,
            showPopup: false,
            selectedTicket: null,

            isCurrentStatusLoading: false,
            currentStatus: {}
        }


        const start = () => {
            setTimeout(() => {
                this.getCurrentStatus(8080)
                start()
            }, 5000)
        }
        
        // Begins
        start()

    }

    /**
     * TODO: Remove it
     */
    increment() {
        this.setState({ count: this.state.count + 10 })
    }

    /**
     * Info: Extract all and structure the tickets tha are on the grid, in a way that the user can work with the data in diffente ways, using excel.
     * Required data: this.state.ticketList
     * Optional data: none
     * @TODO: Refector this function and make the dashbard download the CSV file
     */
    extractSLAS() {
        let count = 0

        let data = this.state.ticketList

        let obj = data
        let line = 'SUBJECT;L2 START - INC/WO;CREATED_AT;L2 - WO;CREATED_AT;CLOSED_AT;L3 START - JIRA; CREATED_AT; ASSINED_AD; CLOSED_AT;\n'
        if(obj) {
            obj.map((item, index) => {

                count++

                line += item.pai_product_model_version + ';'

                if (item.relations.length > 0) {
                    let min = _.minBy(item.relations, function (o) { return o.filho_submit_date; })
                    if (min) {
                        // console.log('INICIO L2: ' + min.filho_ticket_number + ' - submit_date: ', min.filho_submit_date)
                        line += (min.filho_ticket_number ? min.filho_ticket_number : 'N/A') + ';' + (min.filho_submit_date ? min.filho_submit_date : 'N/A') + ';'

                        // console.log('INICIO L2: ' + item.ticket_number + ' - submit_date: ', min.pai_submit_date, ' - pai_date_closed: ', min.pai_closed_date)
                        line += (item.ticket_number ? item.ticket_number : 'N/A') + ';' + (min.pai_submit_date ? min.pai_submit_date : 'N/A') + ';' + (min.pai_closed_date ? min.pai_closed_date : 'N/A') + ';'
                    } else {
                        // console.log('INICIO L2: ' + item.ticket_number + ' - submit_date: ', item.pai_submit_date, ' - pai_date_closed: ', item.pai_closed_date)
                        line += ';;' + (item.ticket_number ? item.ticket_number : 'N/A') + ';' + (item.pai_submit_date ? item.pai_submit_date : 'N/A') + ';' + (item.pai_closed_date ? item.pai_closed_date : 'N/A') + ';'
                    }
                } else {
                    // console.log('INICIO L2: ' + item.ticket_number + ' - submit_date: ', item.pai_submit_date, ' - pai_last_modified_date: ', item.pai_last_modified_date, ' - filho_updated_date: ', item.filho_updated_date)
                    line += ';;' + (item.ticket_number ? item.ticket_number : 'N/A') + ';' + (item.pai_submit_date ? item.pai_submit_date : 'N/A') + ';' + (item.pai_last_modified_date ? item.pai_last_modified_date : 'N/A') + ';' + (item.filho_updated_date ? item.filho_updated_date : 'N/A') + ';'
                }

                item.relations.map((ritem, rindex) => {
                    if (ritem.pai_vendor_ticket_number !== 'null') {
                        // console.log('JIRA filho_ticket_number: ', (ritem.pai_vendor_ticket_number !== 'null' ? ritem.pai_vendor_ticket_number : ritem.filho_ticket_number), ' - filho_submit_date: ', ritem.filho_submit_date, ' - filho_updated_date: ', ritem.filho_updated_date, ' - filho_closed_date:', ritem.filho_closed_date)
                        line += (ritem.pai_vendor_ticket_number !== 'null' ? ritem.pai_vendor_ticket_number : ritem.filho_ticket_number) + ';' + (ritem.filho_submit_date ? ritem.filho_submit_date : 'N/A') + ';' + (ritem.filho_updated_date ? ritem.filho_updated_date : 'N/A') + ';' + (ritem.filho_closed_date ? ritem.filho_closed_date : 'N/A') + ';'
                    } else {
                        // console.log('REMEDY filho_ticket_number: ', (ritem.pai_vendor_ticket_number !== 'null' ? ritem.pai_vendor_ticket_number : ritem.filho_ticket_number), ' - filho_submit_date: ', ritem.filho_submit_date, ' - filho_updated_date: ', ritem.filho_updated_date, ' - filho_closed_date:',  ritem.filho_closed_date)  
                    }
                })
                line += '\n'
                // console.log('\n')


            })
        }
        // console.log(count)
        return line.replace(/null/g, '').replace(/N\/A/g, '')

    }

    /**
     * Info: Call the api responsible for populating all the current dashboard
     * Required data: none
     * Optional data: none
     * @TODO: Extract the part where it changes the data to keep the main ticket (father) opened if it has any child opened
     */
    getCurrentSession(port) {
        this.setState({
            isLoadingSession: true
        })
        Sessions.getSession(port).then(data => {
            // Treat the data to keep the root ticket opened if the child ticket is opened 
            if (data !== undefined) {
                data.map((item, index) => {

                    // Create a big group
                    if (item && item.pai_product_model_version) {
                        if (item.pai_product_model_version.split('/').length >= 1) {
                            item.pai_biggroup = item.pai_product_model_version.split('/')[0]
                        } else {
                            console.log('Creating a big group: false')
                            item.pai_biggroup = 'N/A'
                        }
                    }

                    if (item.relations.length) {

                        item.relations.map((citem, cindex) => {

                            if (citem.filho_status.trim() !== 'Done' && citem.filho_status.trim() != 'Closed' && citem.filho_status.trim() != 'Resolved' && citem.filho_status.trim() != null) {
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


    /**
     * Info: Call the api responsible for populating all the current dashboard
     * Required data: none
     * Optional data: none
     * @TODO: Extract the part where it changes the data to keep the main ticket (father) opened if it has any child opened
     */
    getCurrentStatus(port) {
        // console.log('getCurrentSession')
        this.setState({
            isCurrentStatusLoading: true
        })
        Sessions.getCurrentJiraStatus(port).then(data => {
            this.setState({
                currentStatus: data
            },
            () => {
                this.setState({
                    isCurrentStatusLoading: false
                })
            })
        })
    }
    /**
     * TODO: Remove it
     */
    decrement() {
        this.setState({ count: this.state.count - 1 })
    }
    
    /**
     * TODO: Refector it to the menu component.
     */
    async handleSideMenu() {
        this.setState({ sideMenuVisible: !this.state.sideMenuVisible })
    }

    /**
     * Info: Select a ticket and set the modal to true or false, cleaning the selected item
     * Required data: state
     * Optional data: none
     */
    selectTicketAndModal(state){
        console.log(state)
        this.setState(state)
    }

    handleModal(){
        this.setState({
            showPopup: !this.state.showPopup
        })
    }

}

const HomeApi = new HomeContainer()

export default HomeApi
