import React, { Component } from 'react'
import { connect } from "react-redux";
import {dispatchSelectFood} from "../../actions/foodActions"
import FoodItem from './FoodItem'



class Food extends Component {
  constructor(props) {
    super()
    this.state = {
      phrase: "",
      displayHits: false,
      hits: [],
      selectedFood:null
    }
  }

  selectFood = (itemId) => {
    //to be passed into item component to select the correct item
    let selectedFood = this.state.hits.find(item => {
      return itemId === item.fields.item_id
    })  
    // dispatch the food to the main store
    this.props.dispatchSelectFood(selectedFood)
    this.setState({displayHits:false})
  }

  onKeyChange = (event) => {
    this.setState({ phrase: event.target.value })
  }
  handleKeyPress = (event) => {
    //use this to handle submitting with enter
  }
  searchPhrase = async (phrase) => {

    let phraseResults = await fetch(
      `/api/foods/searchByPhrase?phrase=${phrase}`)
      .then(r => r.json());
    this.setState({ hits: phraseResults.hits,displayHits:true })
  }
  renderHits = (results) => {
    if (!this.state.displayHits) {
      return <div></div>
    }
    else {
      return (
        <table>
          <thead>
            <tr>
              <th>Brand Name</th>
              <th>Item Name</th>
              <th>Calories</th>
            </tr>
          </thead>
          {results.map(hit => {
            return (
              <FoodItem item={hit} key={hit.id} selectFood={this.selectFood} />
            )
          })}
        </table>
      )
    }
  }
  renderSelectedFood() {
    if(this.props.food.fields)
    return (
      <div>
        Selected food: {this.props.food.fields.item_name}
      </div>
    )
  }
  render() {
    return (
      <div>
        <h3 className="foodTitle">First, let's find what you want to eat</h3>
        <div className="container">
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
          {this.renderSelectedFood()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  food:state.food
});
export default connect(
  mapStateToProps,
  {dispatchSelectFood} //search action
)(Food);
