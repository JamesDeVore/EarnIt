const { GAPI_KEY } = require("../../GAPIKey")
const googleMapsClient = require("@google/maps").createClient({
  key: GAPI_KEY,
  Promise,
});
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");


router.post("/findPlaces", async (req, res) => {
  let { latitude, longitude, phrase, calories } = req.body
  let googleQuery = {
    location: [latitude, longitude],
    query: phrase,
    radius: 100
  }
  //first, get all relavent places
  googleMapsClient.places(googleQuery).asPromise()
  .then(allPlaces => {
    let filteredPlaces = allPlaces.json.results.filter(async places => {
      //first, I need to get the distance value
      let origins = [[latitude, longitude]]
      let destinations = [[places.geometry.location.lat, places.geometry.location.lng]]
      let googleQuery = {
        origins,
        destinations
      }
      let withinDistance = await googleMapsClient.distanceMatrix(googleQuery).asPromise()
        .then(results => {
          places.distanceInKm = results.json.rows[0].elements[0].distance
          return (parseInt(calories) < (places.distanceInKm.value * 0.0621504)) //average cal / meter 
        })
        return withinDistance
    })
    filteredPlaces
  })
  //now I have an array of all places, I need to find the number that are outside the minimum range
  //filter method wasn't working well so I have to do this roundabout way
  
 



})
module.exports = router