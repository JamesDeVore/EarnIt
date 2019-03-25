import React, { Component } from 'react'

export default class Location extends Component {
  constructor(){
    super()
    this.state = {
      currentLocation:null
    }
  }
  getLocation =  () => {
   navigator.geolocation.getCurrentPosition(location => this.setState({currentLocation:location.coords}))
  }
  render() {
    console.log(this.state)
    return (
      <div>
        <button onClick={() => this.getLocation()}>Test</button>
      </div>
    )
  }
}
