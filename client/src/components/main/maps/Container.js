import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import {GAPI_KEY} from '../../../config'

export class MapContainer extends Component {
  
  fetchPlaces = (mapProps,map) => {
    const { google } = mapProps;
    //get the center for the query
    let googleLatLngObj = new google.maps.LatLng(this.props.latitude, this.props.longitude)

    map = new google.maps.Map(
      document.getElementById('map'), { center: googleLatLngObj, zoom:1 });
    //set up the request
    let request = {
      query:this.props.phrase, //will be changed later on
      fields:['name']
    }
    const service = new google.maps.places.PlacesService(map);

    service.findPlaceFromQuery(request, function (results, status) {
      if (true) {
        console.log("object")
        for (var i = 0; i < results.length; i++) {
          console.log(results, "HERE")
          // createMarker(results[i]);
        }

        map.setCenter(results[0].geometry.location);
      }
    });
  }


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
          onReady={this.fetchPlaces}
        />
      </div>
    );
  }
}


export default GoogleApiWrapper({
  apiKey:GAPI_KEY
})(MapContainer);
