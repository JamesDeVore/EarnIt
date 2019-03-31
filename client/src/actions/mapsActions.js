import { FIND_PLACES } from "./types";

//dont need to use the redux store for this actually
export const findPlaces = (phrase) => dispatch => {
  console.log("findplaces  action")

  navigator.geolocation.getCurrentPosition(location => {
    fetch("/api/maps/findPlaces", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        phrase
      })
    })
    .then(res => res.json())
    .then(response => dispatch({type:FIND_PLACES, payload:response}))
  })

}