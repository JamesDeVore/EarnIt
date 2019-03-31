import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { GAPI_KEY } from '../../../config'


export class MapContainer extends Component {
  
  


  render() {
    console.log(this.props)
    let initalCenter = {
      lat:this.props.location.latitude,
      lng:this.props.location.longitude
    }
    return (
      <div>
        <div id="map"></div>
        <Map
          google={this.props.google}
          zoom={14}
          initialCenter={initalCenter}
        />
      </div>
    );
  }
}


export default GoogleApiWrapper({
  apiKey:GAPI_KEY
})(MapContainer);
