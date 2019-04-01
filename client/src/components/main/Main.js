import React, { Component } from 'react'
import { connect } from "react-redux";
import {dispatchSelectFood} from '../../actions/foodActions'
import Location from './Location'

import Food from './Food'

class Main extends Component {
  constructor(props){
    super()
    this.state = {
      phrase:"",
      selectedFood:null
    }
  }
  render() {
    console.log(process.env)
    return (
      <div className="container">
      <div className="row">
      <h2>How it works:</h2>
      <p className="flow-text">Enter the food you want to eat, and we find restaraunts 
      that are far enough away that you will burn the calories walking there that you will 
      get from eating the food!</p>
      <p>I need a better way to word that</p>
      </div>
        <div className="row">
          <Food />
        </div>
        <div className="row">
          {this.props.food._id ? <Location />:<div></div>}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  food:state.food
});
export default connect(
  mapStateToProps,
  { dispatchSelectFood } //search action
)(Main);
