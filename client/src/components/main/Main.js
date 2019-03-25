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
      selectedFood:null,
      location:{}

    }
  }
  render() {
    return (
      <div>
        This is going to be the main part of the whole app
        <div>
          <Food />
        </div>
        <div>
          <Location />
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
