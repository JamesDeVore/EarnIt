const express = require("express");
const router = express.Router();
const fetch = require("node-fetch")

//routes to find the food item based on a query, 
//then find by ID

//api credentials
const {appId, appKey} = require("../../NTKeys")
const creds = `&appId=${appId}&appKey=${appKey}`

router.get("/searchByPhrase", (req,res) => {
  //this will ping the nutritionix api and return the top 20 items
  console.log("Searched")
  let {phrase} = req.query
  const url = `https://api.nutritionix.com/v1_1/search/${phrase}`
  fetch(`${url}?results=0:10&fields=item_name%2Cbrand_name%2Citem_id%2Cbrand_id${creds}`)
  .then(r => r.json())
  .then(data => res.send(data))
  .catch(err => res.status(400).json({msg:"Something went wrong with the API, credentials probably", err}))
})

router.get("/findById", (req,res) => { 
  let {id} = req.query
  const url = `https://api.nutritionix.com/v1_1/item?id=${id}${creds}`
  fetch(url).then(r => r.json())
  .then(data => res.send(data))
  .catch(error => res.status(400).json({ msg: "Something went wrong with the API, credentials probably",err }))
})

module.exports = router