require("dotenv").config();

const GAPI_KEY = process.env.GAPI_KEY
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
  let allPlaces = await googleMapsClient.places(googleQuery).asPromise()
  let {results} = allPlaces.json
  for (let i=0; i< results.length;i++){
    //array methods are not async so I need to do it this way
    let origins = [[latitude, longitude]]
      let destinations = [[results[i].geometry.location.lat, results[i].geometry.location.lng]]
      let googleQuery = {
        origins,
        destinations
      }
    //Add distqance prop to ech result
     await googleMapsClient.distanceMatrix(googleQuery).asPromise()
       .then(response => allPlaces.json.results[i].distance = response.json.rows[0].elements[0].distance)
  }
  let filteredResults = results.filter(place => {
    return parseInt(calories) < (place.distance.value *0.0621504)
  })
  res.send(filteredResults)


})
module.exports = router