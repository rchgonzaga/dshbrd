import React from "react";
import { ResponsivePie } from "@nivo/pie";

export class PieChart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            innerData: this.props.data,
            innerWidth: this.props.width,
            innerHeight: this.props.height
        };
    }

    componentDidUpdate(prevProps) {
        // // Typical usage (don't forget to compare props):
        if (this.state.innerData !== prevProps.data) {
            this.setState({innerData: prevProps.data})
        }
    }

    render() {
        return (
            <div style={{ width: this.state.innerWidth, height: this.state.innerHeight }}>
                <ResponsivePie
                    data={this.state.innerData}
                    margin={{
                        top: 40,
                        right: 80,
                        bottom: 80,
                        left: 80
                    }}
                    colors="set3"
                    colorBy="id"
                    borderWidth={1}
                    borderColor="inherit:darker(0.2)"
                    radialLabelsSkipAngle={10}
                    radialLabelsTextXOffset={6}
                    radialLabelsTextColor="#333333"
                    radialLabelsLinkOffset={0}
                    radialLabelsLinkDiagonalLength={16}
                    radialLabelsLinkHorizontalLength={24}
                    radialLabelsLinkStrokeWidth={1}
                    radialLabelsLinkColor="inherit"
                    slicesLabelsSkipAngle={10}
                    slicesLabelsTextColor="#333333"
                    animate={false}
                    padding={0.06}
                    motionStiffness={90}
                    motionDamping={15}
                    legends={[
                        {
                            anchor: "bottom",
                            direction: "row",
                            translateY: 56,
                            itemWidth: 100,
                            itemHeight: 18,
                            itemTextColor: "#999",
                            symbolSize: 18,
                            symbolShape: "circle",
                            effects: [
                                {
                                    on: "hover",
                                    style: {
                                        itemTextColor: "#000"
                                    }
                                }
                            ]
                        }
                    ]}
                />
            </div>
        );
    }
}
