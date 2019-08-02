import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import WebSocket from "./components/WebSocketTest";
import ChartShow from "./components/Chart";
import Search from "./components/Search";
class App extends Component {
  constructor() {
    super();
    this.state = {
      globalBitData: [],
      showChart: true,
      showSearch: false,
      searchedResults: []
    };
  }
  storeInGlobalData = data => {
    if (this.state.globalBitData.length < 10) {
      const globalBitDataLocal = this.state.globalBitData;
      globalBitDataLocal.push(data);
      this.setState({
        globalBitData: [...globalBitDataLocal]
      });
    }
  };
  getTopResults = () => {
    const localData = this.state.globalBitData.map(a => [
      a.time,
      a.valueBTC / Math.pow(10, 8)
    ]);
    console.log("localData--", localData);
    return localData.filter(ld => ld[1] > 1);
  };
  showChartFn = () => {
    this.setState({
      showChart: true,
      showSearch: false
    });
  };
  showSearchFn = () => {
    this.setState({
      showChart: false,
      showSearch: true
    });
  };
  getAllResults = () => {
    return this.state.searchedResults;
  };
  filterSearch = data => {
    let { globalBitData } = this.state;
    globalBitData = globalBitData.sort((a, b) => {
      a.valueBTC < b.valueBTC;
    });

    let count = 3;
    const filterData = globalBitData.filter(btData => {
      if (btData.valueBTC > data) {
        if (count-- > 0) {
          return btData;
        }
      }
      if (btData.valueBTC < data) {
        if (count-- > 0) {
          return btData;
        }
      }
    });
    this.setState({
      searchedResults: [...filterData]
    });
  };
  render() {
    const { showChart, showSearch } = this.state;
    return (
      <div className="App">
        <WebSocket storeInGlobalData={this.storeInGlobalData} />

        <div className="tab-container">
          <span onClick={this.showChartFn}>Show Chart</span>
          <span onClick={this.showSearchFn}>Show Search</span>
          {}
        </div>
        {showChart && <ChartShow globalBitData={this.getTopResults()} />}
        {showSearch && (
          <Search
            searchedResults={this.getAllResults()}
            filterSearch={this.filterSearch}
          />
        )}
      </div>
    );
  }
}

export default App;
