import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { GAPI_KEY } from '../../../config'


export class MapContainer extends Component {
  
  renderPlaces = () => {
    console.log(this.props)
    //put each place in a marker component

    
  }
  renderMap = () => {
    let initalCenter = {
      lat: this.props.location.latitude,
      lng: this.props.location.longitude
    }
    let markers = this.props.places.map(place => {
      let { name, geometry: { location } } = place
      let latLng = { lat: location.lat, lng: location.lng }
      return <Marker position={latLng} name={name} />
    })
    console.log(markers[0], <Marker position={initalCenter} />)
    return (
      <div>
        <div id="map"></div>
        <Map
          google={this.props.google}
          zoom={11}
          initialCenter={initalCenter}
          onReady={this.renderPlaces}
        >
         {markers}
        </Map>
      </div>
    );
  }

  render() {
    return <div>{this.renderMap()}</div>
  }
}


export default GoogleApiWrapper({
  apiKey:GAPI_KEY
})(MapContainer);
