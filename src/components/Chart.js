import React from "react";
import { Chart } from "react-charts";

class ChartShow extends React.Component {
  constructor() {
    super();
  }

  render() {
    console.log("---globalBitData--", this.props.globalBitData);
    const data = this.props.globalBitData;
    return (
      <div>
        <div
          style={{
            width: "400px",
            height: "300px"
          }}
        >
          <Chart
            data={[
              {
                label: "Series 1",
                data
              }
            ]}
            axes={[
              { primary: true, type: "linear", position: "bottom" },
              { type: "linear", position: "left" }
            ]}
          />
        </div>
      </div>
    );
  }
}

export default ChartShow;
