import React from "react";
import { ResponsivePie } from "@nivo/pie";

export class PieChart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            innerData: this.props.data,
            innerWidth: this.props.width,
            innerHeight: this.props.height,
            totalSubjects: 200,
            topics: [
                {
                    id: "Closed",
                    label: "Closed",
                    value: (this.props.data.filter(ticket => ticket.pai_status === 'Closed').length / this.props.data.length * 100).toFixed(1),
                    color: "hsl(240, 70%, 50%)"
                },
                {
                    id: "Opened",
                    label: "Opened",
                    value: (this.props.data.filter(ticket => ticket.pai_status === 'Open').length / this.props.data.length * 100).toFixed(1),
                    color: "hsl(145, 70%, 50%)"
                },
                {
                    id: "Waiting",
                    label: "Waiting",
                    value: (this.props.data.filter(ticket => ticket.pai_status === 'Wating user').length / this.props.data.length * 100).toFixed(1),
                    color: "hsl(225, 70%, 50%)"
                }
            ]
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
                    data={this.state.topics}
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
                    defs={[
                        {
                            id: "dots",
                            type: "patternDots",
                            background: "inherit",
                            color: "rgba(255, 255, 255, 0.3)",
                            size: 4,
                            padding: 1,
                            stagger: true
                        },
                        {
                            id: "lines",
                            type: "patternLines",
                            background: "inherit",
                            color: "rgba(255, 255, 255, 0.3)",
                            rotation: -45,
                            lineWidth: 6,
                            spacing: 10
                        }
                    ]}
                    fill={[
                        {
                            match: {
                                id: "ruby"
                            },
                            id: "dots"
                        },
                        {
                            match: {
                                id: "c"
                            },
                            id: "dots"
                        },
                        {
                            match: {
                                id: "go"
                            },
                            id: "dots"
                        },
                        {
                            match: {
                                id: "python"
                            },
                            id: "dots"
                        },
                        {
                            match: {
                                id: "Opened"
                            },
                            id: "lines"
                        },
                        {
                            match: {
                                id: "Waiting"
                            },
                            id: "lines"
                        },
                        {
                            match: {
                                id: "Subjects"
                            },
                            id: "lines"
                        },
                        {
                            match: {
                                id: "javascript"
                            },
                            id: "lines"
                        }
                    ]}
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
