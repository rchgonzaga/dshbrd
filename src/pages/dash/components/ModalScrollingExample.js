import React from "react"
import _ from "lodash";
import {
    Grid,
    Icon,
    Button, Header, Modal, Form
} from "semantic-ui-react";
import ReactTable from "react-table";
import { mainChildCols } from "./cols"

const ModalScrollingExample = props => {
    
    console.log(props)

    return (
    <Modal open={props.show} centered={false} size={'fullscreen'}>
        <Modal.Header>
            <Header>
                {props.data.pai_summary}
                <Header.Subheader>
                    Customer: {props.data.pai_customer_name}
                    Assignee: {props.data.pai_assignee}
                </Header.Subheader>
            </Header>
        </Modal.Header>
        <Modal.Content>
            <Modal.Description>
                <Header>
                    {props.data.ticket_number}
                    <Header.Subheader>
                        {props.data.pai_product_model_version}
                    </Header.Subheader>
                </Header>

                <hr />
                <Grid divided='vertically'>
                    <Grid.Row columns={2}>
                        <Grid.Column width={12}>
                            <p>{props.data.pai_notes}</p>
                            <br />
                            <p>{props.data.pai_notes}</p>
                            <br />
                            <ReactTable
                                data={_.values(props.data.relations)}
                                filterable
                                columns={mainChildCols}
                                defaultPageSize={_.values(props.data.relations).length}
                                showPagination={false}
                            />
                        </Grid.Column>
                        <Grid.Column width={4}>

                            <Form>

                                <Form.Group widths='equal'>
                                    <Form.Select fluid label='Subject' options={[
                                        { key: 'm', text: 'Male', value: 'male' },
                                        { key: 'f', text: 'Female', value: 'female' },
                                    ]} placeholder='Subject'
                                        name='subject'
                                        value={props.subject}
                                         />
                                </Form.Group>

                                <Form.Group inline>
                                    <label>Priority</label>
                                    <Form.Radio
                                        label='High'
                                        value='hg'
                                        checked={false}
                                        
                                    />
                                    <Form.Radio
                                        label='Medium'
                                        value='md'
                                        checked={false}
                                        
                                    />
                                    <Form.Radio
                                        label='Low'
                                        value='lg'
                                        checked={false}
                                        
                                    />
                                </Form.Group>

                                <Form.Group inline>
                                    <label>P.Status</label>
                                    <Form.Radio
                                        label='Aware'
                                        value='yes'
                                        checked={false}
                                       
                                    />
                                    <Form.Radio
                                        label='Not aware'
                                        value='no'
                                        checked={false}
                                       
                                    />
                                    <Form.Radio
                                        label='Following'
                                        value='flw'
                                        checked={false}
                                       
                                    />
                                </Form.Group>

                                <Form.TextArea
                                    label='Description'
                                    placeholder='Brief description ...'
                                    value={props[props.data.ticket_number + 'briefDescrip']}
                                    name={props.data.ticket_number + 'briefDescrip'}
                                     />
                                <Form.Button>Save</Form.Button>
                            </Form>

                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
            <Button primary onClick={() => { this.setState({ showPopup: false, data: {} }) }}>
                Close <Icon name='right chevron' />
            </Button>
        </Modal.Actions>
    </Modal>
)}

export default ModalScrollingExample;