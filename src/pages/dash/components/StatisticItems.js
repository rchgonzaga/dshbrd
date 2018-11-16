import React from 'react'
import { Statistic, Icon } from "semantic-ui-react"

const StatisticItems = (props) => {
    
    return (
        <Statistic.Group widths='eight'>

            <Statistic color='grey'>
                <Statistic.Value><Icon name='comments' /> {props.data.originalActivities.length}</Statistic.Value>
                <Statistic.Label>Subjects</Statistic.Label>
            </Statistic>

            <Statistic>
                <Statistic.Value style={{ color: '#c1c1c1' }}><Icon name='lock' /> {props.data.totalSubjectClosed}</Statistic.Value>
                <Statistic.Label>Closed</Statistic.Label>
            </Statistic>

            <Statistic>
                <Statistic.Value style={{ color: '#b2e8ab' }}><Icon name='lock open' /> {props.data.totalSubjectOpen + props.data.totalSubjectWaitingUser}</Statistic.Value>
                <Statistic.Label>Open</Statistic.Label>
            </Statistic>

            <Statistic color='grey' style={{margin: "0px -30px 0px -30px"}}>
                <Statistic.Value>|</Statistic.Value>
                <Statistic.Label>&nbsp;</Statistic.Label>
            </Statistic>

            <Statistic>
                <Statistic.Value style={{ color: '#e8abab' }} ><Icon name='hourglass one' /> {props.data.totalSubjectWaitingUser}</Statistic.Value>
                <Statistic.Label>L2 pending</Statistic.Label>
            </Statistic>

            <Statistic>
                <Statistic.Value style={{ color: '#b2e8ab' }} ><Icon name='pin' /> {props.data.totalL2Open}</Statistic.Value>
                <Statistic.Label>L2 Open</Statistic.Label>
            </Statistic>

            <Statistic color='black'>
                <Statistic.Value >
                    <Icon name='chess rock' />{props.data.totalL3LegacyOpen}</Statistic.Value>
                <Statistic.Label>L3 Legacy</Statistic.Label>
            </Statistic>

            <Statistic color='blue'>
                <Statistic.Value >
                    <Icon name='cloud' />{props.data.totalL3CloudOpen}</Statistic.Value>
                <Statistic.Label>L3 Cloud</Statistic.Label>
            </Statistic>

        </Statistic.Group>
    )
}

export default StatisticItems