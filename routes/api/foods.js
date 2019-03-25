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
  //needs to be the body of the post request
  let nutritionixOpts = {
    appId:appId,
    appKey:appKey,
    query:phrase,
    limit:3,
    min_score:1.5,
    filters:{
      item_type:1
    },
    fields:["nf_calories", "item_name", "brand_name", "item_id" ]
  }
  const url = `https://api.nutritionix.com/v1_1/search`
  fetch(`${url}`, {
    method: "POST",
    body: JSON.stringify(nutritionixOpts),
    headers: { "Content-Type": "application/json" }
  })
    .then(r => r.json())
    .then(data => res.send(data))
    .catch(err =>
      res
        .status(400)
        .json({
          msg: "Something went wrong with the API, credentials probably",
          err
        })
    );
})

router.get("/findById", (req,res) => { 
  let {id} = req.query
  const url = `https://api.nutritionix.com/v1_1/item?id=${id}${creds}`
  fetch(url).then(r => r.json())
  .then(data => res.send(data))
  .catch(error => res.status(400).json({ msg: "Something went wrong with the API, credentials probably",err }))
})

module.exports = router