import React from "react";
import moment from "moment";

class Search extends React.Component {
  constructor() {
    super();
    this.state = { searchText: "" };
  }

  handleSearch = () => {
    this.props.filterSearch(this.state.searchText);
  };

  handleChange = e => {
    this.setState({
      searchText: e.target.value
    });
  };

  render() {
    const { searchedResults } = this.props;
    return (
      <div class="search-list">
        <input value={this.state.searchText} onChange={this.handleChange} />
        <button onClick={this.handleSearch}>Search</button>
        {searchedResults.map(sr => (
          <div>
            <span> {sr.hash} </span>
            <span> {moment(sr.time).format("hh:mm:ss")} </span>
            <span> {sr.valueBTC} </span>
          </div>
        ))}
      </div>
    );
  }
}

export default Search;
