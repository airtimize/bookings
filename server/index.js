const express = require('express');
const morgan = require('morgan');
const path = require('path');
const db = require('./db');
const models = require('./models');
const rel = require('newrelic');
// console.log(rel)
const app = express();
const port = 3001;

app.use(morgan('dev'));
app.use('/rooms/:listingid', express.static(path.resolve('client')));
app.use(express.json());

app.get('/api/:listingid/booking', async(req, res) => {
  const listingInfo = await models.getListingInfo(req.params.listingid);
  const bookedDates = await models.getBookedDates(req.params.listingid);
  //console.log(bookedDates);
  let listing = {
    "id": listingInfo["rows"][0]["id"],
    "reviews": listingInfo["rows"][0]["reviews"],
    "views": listingInfo["rows"][0]["views"],
    "basePrice": listingInfo["rows"][0]["baseprice"],
    "guestFee":  listingInfo["rows"][0]["guestfee"],
    "cleaningFee": listingInfo["rows"][0]["cleaningfee"],
    "serviceFee": listingInfo["rows"][0]["servicefee"],
    "occupancyFee": listingInfo["rows"][0]["occupancyfee"],
    "taxes": listingInfo["rows"][0]["taxes"],
    "baseGuests": listingInfo["rows"][0]["baseguests"],
    "extraGuests": listingInfo["rows"][0]["extraguests"],
    "maxGuests": listingInfo["rows"][0]["maxguests"],
    "minNights": listingInfo["rows"][0]["minnights"],
    "maxNights": listingInfo["rows"][0]["maxnights"],
    "lastAvailableDate": listingInfo["rows"][0]["lastavailabledate"],
  }
  // console.log(bookedDates["rows"]);
  var bookArr = [];
  for(let i = 0; i < bookedDates["rows"].length; i++){
    let booked = {
      "id" : bookedDates["rows"][i]["id"],
      "listingId" : bookedDates["rows"][i]["listingid"],
      "bookedDate" : bookedDates["rows"][i]["bookeddate"],
      "userId" : bookedDates["rows"][i]["userId"]
    }
    bookArr.push(booked);
  }
  // res.send({listingInfo : listingInfo["rows"][0], bookedDates : bookedDates["rows"]})
  res.send({listingInfo : listing, bookedDates : bookArr})

  // res.send(listingInfo);
});

app.post('/api/booking', async (req, res) => {
  const createListing = await models.createListingInfo();
  // console.log(createListing);
  res.send('POSTED');
});

app.put('/api/:listingid/booking', async(req, res) => {

});

app.delete('/api/:listingid/booking', async (req, res) => {

});


app.listen(port, () => {
  console.log(`listening on ${port}`);
});
