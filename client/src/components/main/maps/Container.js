import React, { Component, Fragment } from 'react'
import { Map, InfoWindow, Circle, Marker, GoogleApiWrapper } from 'google-maps-react';
import { GAPI_KEY } from '../../../config'
import { BounceLoader } from 'react-spinners'



export class MapContainer extends Component {
  
  renderMap = () => {
    if(this.props.places[0]){

    let initalCenter = {
      lat: this.props.location.latitude,
      lng: this.props.location.longitude
    }

    let markers = this.props.places.map(place => {
      let { name, id, geometry: { location } } = place
      let latLng = { lat: location.lat, lng: location.lng }
      return <Marker position={latLng} name={name} title={name} key={id} />
    })
    const style = {
      width:'80%',
      height:'100%',
    }
    return (
      <div className="mapContainer">
        <Map
          google={this.props.google}
          zoom={13}
          initialCenter={initalCenter}
          style={style}
        >
          {markers}
        </Map>
      </div>
    );
  } else {
    return <div className="col s4 offset-4"><BounceLoader size={150} sizeUnit={'px'} color={'#ffa500'} /></div>
  }
}

  render() {
    return <Fragment>{this.renderMap()}</Fragment>;
  }
}




export default GoogleApiWrapper({
  apiKey:GAPI_KEY
})(MapContainer);
