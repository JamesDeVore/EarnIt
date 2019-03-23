import React, { Component } from 'react'
import { connect } from "react-redux";
import FoodItem from './FoodItem'



class Food extends Component {
  constructor(props) {
    super()
    this.state = {
      phrase: "",
      displayResults: false,
      hits: []
    }
  }
  onKeyChange = (event) => {
    this.setState({ phrase: event.target.value })

  }
  handleKeyPress = (event) => {
    //use this to handle submitting with enter
  }
  searchPhrase = async (phrase) => {

    let phraseResults = await fetch(
      `/api/foods/searchByPhrase?phrase=${phrase}`
    ).then(r => r.json());
    this.setState({ hits: phraseResults.hits })
  }
  renderHits = (results) => {
    if (!results) {
      return <div></div>
    }
    else {
      return (
        <table>
          <thead>
            <tr>
              <th>Brand Name</th>
              <th>Item Name</th>
              <th>Serving Size</th>
            </tr>
          </thead>
          {results.map(hit => {
            return (
              <FoodItem item={hit} key={hit.id} />
            )
          })}
        </table>
      )
    }
  }
  render() {
    return (
      <div>
        <h1>First, let's find what you want to eat</h1>
        <div>
          What would you like?
          <input
            value={this.state.phrase}
            onChange={e => this.onKeyChange(e)}
            onKeyPress={e => this.handleKeyPress(e)}
            placeholder="Whopper"
            type="text"
          />
          <button
            className="waves-effect waves-light btn"
            onClick={() => this.searchPhrase(this.state.phrase)}
          >
            Clickity-Click
          </button>
          {this.renderHits(this.state.hits)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  {} //search action
)(Food);
