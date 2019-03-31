import React, { Component } from 'react'
import { Map, InfoWindow, Circle, Marker, GoogleApiWrapper } from 'google-maps-react';
import { GAPI_KEY } from '../../../config'


export class MapContainer extends Component {
  
  renderMap = () => {
    let initalCenter = {
      lat: this.props.location.latitude,
      lng: this.props.location.longitude
    }

    let markers = this.props.places.map(place => {
      let { name, id, geometry: { location } } = place
      let latLng = { lat: location.lat, lng: location.lng }
      return <Marker position={latLng} name={name} title={name} key={id} />
    })
    console.log(markers[0], <Marker position={initalCenter} />)
    return (
      <div className="">
        <div id="map" />
        <Map
          google={this.props.google}
          zoom={13}
          initialCenter={initalCenter}
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
