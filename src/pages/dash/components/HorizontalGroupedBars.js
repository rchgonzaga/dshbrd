import React from "react"
import { ResponsiveBar } from "@nivo/bar"
import _ from "lodash"

export class HorizontalGroupedBars extends React.Component {
  constructor(props) {
    super(props)
    
    let arr = []
    if(Object.keys(_.groupBy(this.props.data, x => x.pai_biggroup)).length) {

      Object.entries(_.groupBy(this.props.data, x => x.pai_biggroup))
        .map(([key, value]) => ({key,value}))
        .forEach(element => {
          arr.push({
          country: element.key,
          closed: Math.floor(Math.random() * 100) + 1,
          open: Math.floor(Math.random() * 100) + 1,
          waitinguser: Math.floor(Math.random() * 100) + 1
        })
      })

      console.log(arr)

    }

    this.state = {
      innerData: Object.values(arr ? arr : []),
      innerWidth: this.props.width,
      innerHeight: this.props.height
    }
  }

  /**
   * TODO: Need to be checked if this method is the optimal one to use in the case
   **/
  componentDidUpdate(prevProps) {
    // // Typical usage (don't forget to compare props):
    if (this.state.innerData !== prevProps.data) {
      this.setState({
        innerData: prevProps.data
      })
    }
  }

  render() {
    return (
      <div
        style={{ width: this.state.innerWidth, height: this.state.innerHeight }}
      >
        <ResponsiveBar
          data={this.state.innerData}
          keys={[ "closed", "open", "waitinguser"]}
          indexBy="country"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          layout="horizontal"
          colors="set3"
          colorBy="id"
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "country",
            legendOffset: 36
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "food",
            legendOffset: -40
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor="inherit:darker(1.6)"
          animate={true}
          motionStiffness={90}
          motionDamping={15}
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
