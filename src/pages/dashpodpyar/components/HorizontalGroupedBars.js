import React from "react"
import { ResponsiveBar } from "@nivo/bar"
import _ from "lodash"
import moment from "moment"

export class HorizontalGroupedBars extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      innerData: [],
      ticketListAVG: [],
      innerWidth: this.props.width,
      innerHeight: this.props.height
    }
  }

  componentDidMount() {
    
    let arr = []

      this.calculateAVDDays()
        .forEach(element => {
          if((element.waitingUser + element.open) > 0 && element.avg.startsWith('null') === false) {
            arr.push( element )
          }          
      })

    this.setState({
      innerData: arr
    })

  }

  // componentDidUpdate(prevProps, prevState) {
  //   // only update chart if the data has changed
  //   if (prevProps.data !== this.state) {
  //     console.log(prevProps, prevState)
  //   }
  // }
  
  calculateAVDDays(){

      // GROUP FOR SUBJECT GRAPH
      let toAnotherBar = []
      let sumAverage = [] 

      _.forEach(_.groupBy(this.props.data, i => {

          let tmpSplit = (i.pai_product_model_version != null ? i.pai_product_model_version.split('/') : '')
          let splt = tmpSplit.length > 1 ? tmpSplit[0] : i.pai_product_model_version

          let toGroup = splt === 'ITS-Relatórios'           ? 'ITS-Relatórios' :
                          splt === 'ITS-Relatório'            ? 'ITS-Relatórios' :
                          splt === 'ITS-Webservice'           ? 'ITS-Webservice' :
                          splt === 'ITS-WebService'           ? 'ITS-Webservice' :
                          splt === 'ITS-Indisponibilidade'    ? 'ITS-Indisponibilidade' :
                          splt === 'ITS- Indisponibilidade'   ? 'ITS-Indisponibilidade' :
                          splt === 'ITS' ? i.pai_product_model_version :
                          // splt === 'ITS-Agricultor' ? i.pai_product_model_version :
              splt

          let startDate = moment(i.pai_submit_date, "YYYY-MM-DD");
          let endDate = moment(i.pai_closed_date, "YYYY-MM-DD");
          if (i.pai_closed_date === 'null') {
              endDate = moment(moment(Date()).format('YYYY-MM-DD'), "YYYY-MM-DD");
          }

          let result = endDate.diff(startDate, 'days');

          sumAverage.push({group: toGroup, days: (result > -1 ? result : 0)})

          return toGroup
      }), (value, key) => {
          let toSplit = _.groupBy(value, z => z.pai_status)
          toAnotherBar.push({
              subject: key,
              open: (toSplit['Open'] !== undefined ? toSplit['Open'].length : 0),
              closed: (toSplit['Closed'] !== undefined ? toSplit['Closed'].length : 0),
              waitingUser: (toSplit['Wating user'] !== undefined ? toSplit['Wating user'].length : 0)
          })

          let resultTypes = _.map(_.groupBy(sumAverage, 'group'), (val, key) => {
              return _.reduce(val, (memo, v) => {
                  return memo + v.days; 
              }, 0) / val.length;
          });

          toAnotherBar.map((item, index) => {
              return toAnotherBar[index] = {
                  ...item, 
                  average: resultTypes[index], 
                  avg: `${item.subject} (avg ${(Math.round(resultTypes[index])+'')} days)`
              }
          })

      });
      return toAnotherBar
  }

  render() {
    return (
      <div
        style={{ width: this.state.innerWidth, height: this.state.innerHeight }}
      >
        <ResponsiveBar
          data={this.state.innerData}
          keys={[ "open", "waitingUser"]}
          indexBy="avg"
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
