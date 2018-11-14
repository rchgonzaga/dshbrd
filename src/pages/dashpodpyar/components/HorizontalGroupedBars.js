import React from "react"
import { ResponsiveBar } from "@nivo/bar"
import _ from "lodash"

export class HorizontalGroupedBars extends React.Component {
  constructor(props) {
    super(props)
    
    // It shouldn't be here
    // TODO: fix it
    let arr = []
    if(Object.keys(_.groupBy(this.props.data, x => x.pai_biggroup)).length) {

      Object.entries(_.groupBy(this.props.data, x => x.pai_biggroup))
        .map(([key, value]) => ({key,value}))
        .forEach(element => {

          let status = _.groupBy(element.value, y => y.pai_status)

          let newItem = {
            subject:      element.key,
            closed:       status['Closed'] ? status['Closed'].length : 0,
            waitinguser:  status['Wating user'] ? status['Wating user'].length : 0,
            open:         status['Open'] ? status['Open'].length : 0
          }

          if((newItem.closed + newItem.waitinguser + newItem.open) > 1 && newItem.subject !== 'undefined') {
            arr.push( newItem )
          }

          
      })
    }

    this.state = {
      innerData: Object.values(arr ? arr : []),
      innerWidth: this.props.width,
      innerHeight: this.props.height
    }
  }

  render() {
    return (
      <div
        style={{ width: this.state.innerWidth, height: this.state.innerHeight }}
      >
        <ResponsiveBar
          data={this.state.innerData}
          keys={[  "waitinguser", "closed", "open"]}
          indexBy="subject"
          margin={{ top: 5, right: 180, bottom: 100, left: 200 }}
          layout="horizontal"
          colors="set2"
          labelSkipWidth={12}
          labelSkipHeight={12}
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [{ on: "hover", style: { itemOpacity: 1 } }]
            }
          ]}
        />{" "}
      </div>
    )
  }
}
