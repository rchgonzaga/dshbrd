import React from "react"
import { ResponsiveBar } from "@nivo/bar"

export class HorizontalGroupedBars extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      innerData: this.props.data,
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
          keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
          indexBy="country"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          layout="horizontal"
          colors="nivo"
          colorBy="id"
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "#38bcb2",
              size: 4,
              padding: 1,
              stagger: true
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "#eed312",
              rotation: -45,
              lineWidth: 6,
              spacing: 10
            }
          ]}
          fill={[
            { match: { id: "fries" }, id: "dots" },
            { match: { id: "sandwich" }, id: "lines" }
          ]}
          borderColor="inherit:darker(1.6)"
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
