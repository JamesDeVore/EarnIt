import React, { Component, Fragment } from 'react'
import { connect } from "react-redux";
import {findPlaces} from '../../actions/mapsActions'
import Container from './maps/Container'

class Location extends Component {
  constructor(){
    super()
    this.state = {
      currentLocation:null,
      mapLoading:false,
    }
  }
  requestPlaces = () => {
    this.props.findPlaces(this.props.food.fields.brand_name, this.props.food.fields.nf_calories)
    navigator.geolocation.getCurrentPosition(location => {
      let latLng = {
        latitude:location.coords.latitude,
        longitude:location.coords.longitude
      }
      this.setState({currentLocation:latLng, mapLoading:true})
    })
  }
  loadMap = () => {
    this.setState({mapLoading:false})
  }
  renderMap = () => {
    if(this.state.currentLocation && this.props.maps.results ){
      return <Container location={this.state.currentLocation} phrase={this.props.food.fields.brand_name} places={this.props.maps.results}  />

    } 
    else { 
      return <div></div>
       }
  }
  render() {
    return (
      <Fragment>
        <div className="col s6 offset-4">
          <button className="btn " onClick={() => this.requestPlaces()}>
            Earn it! <i className="material-icons right">whatshot</i>
          </button>
        </div>
        <div className="">{this.renderMap()}</div>
      </Fragment>
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
