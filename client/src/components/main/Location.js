import React, { Component } from 'react'
import { connect } from "react-redux";

import Container from './maps/Container'

class Location extends Component {
  constructor(){
    super()
    this.state = {
      currentLocation:null
    }
  }
  getLocation =  async () => {
   await navigator.geolocation.getCurrentPosition(location => {
     
     console.log(location.coords.latitude)
     fetch("/api/maps/findPlaces", {
       method: "post",
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({
         latitude:location.coords.latitude,
         longitude:location.coords.longitude,
         phrase:this.props.food.fields.brand_name
       })
     })
   })
  }
  renderMap = () => {
    if(this.state.currentLocation){
      return <Container location={this.state.currentLocation} phrase={this.props.food.fields.brand_name} />

    }
  }
  render() {
    console.log(this.state)
    return (
      <div>
        <button onClick={() => this.getLocation()}>Test</button>
        {/* {this.renderMap()} */}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  food: state.food
});
export default connect(
  mapStateToProps,
  null
)(Location);
