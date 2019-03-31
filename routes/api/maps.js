const { GAPI_KEY } = require("../../GAPIKey")
const googleMapsClient = require("@google/maps").createClient({
  key: GAPI_KEY,
  Promise,
});
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");


router.post("/findPlaces", (req, res) => {
  let {latitude,longitude, phrase} = req.body
  let googleQuery = {
    location:[latitude,longitude],
    query:phrase,
    radius:100
  }
  googleMapsClient.places(googleQuery).asPromise()
  .then(response => res.send(response));

})
module.exports = router