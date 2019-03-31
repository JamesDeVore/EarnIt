import React, { Component } from 'react'
import { connect } from "react-redux";
import {findPlaces} from '../../actions/mapsActions'
import Container from './maps/Container'

class Location extends Component {
  constructor(){
    super()
    this.state = {
      currentLocation:null
    }
  }
  requestPlaces = () => {
    this.props.findPlaces(this.props.food.fields.brand_name, this.props.food.fields.nf_calories)
    navigator.geolocation.getCurrentPosition(location => {
      let latLng = {
        latitude:location.coords.latitude,
        longitude:location.coords.longitude
      }
      this.setState({currentLocation:latLng})
    })
  }
  renderMap = () => {
    if(this.state.currentLocation && this.props.maps.results){
      return <Container location={this.state.currentLocation} phrase={this.props.food.fields.brand_name} places={this.props.maps.results}  />

    } else { 
      return <div>Loading?</div>
       }
  }
  render() {
    console.log(this.state)
    return (
      <div>
        <button onClick={() => this.requestPlaces()}>
          TODO: get the results from the place search on to an actual map
        </button>
        {this.renderMap()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  food: state.food,
  maps:state.maps
});
export default connect(
  mapStateToProps,
  {findPlaces}
)(Location);
