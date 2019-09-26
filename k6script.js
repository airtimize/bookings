import { check, sleep } from "k6";
import { Rate } from "k6/metrics";
import http from "k6/http";

// See https://docs.k6.io/docs/options for other options
export let options = {
  // simulate rampup of traffic from 1 to 200 users over 5 minutes.
  stages: [
    { duration : "1m", target : 200},
    { duration : "3m", target : 5500},
    { duration : "1m", target: 4000},
    {duration : "5m", target : 500}
  ]
};

let errorRate = new Rate("API errors");
let getListing = function(){
    let min = 1;
    let max = 9999999;
    var rand = Math.floor(Math.random() * (max - min)) + min;
    let listingRes = http.get(`18.191.15.40/rooms/${rand}/`, {}, {

  });

  check(listingRes, {
      "Listing retrieval successful": (r) => r.status === 200
  }) || errorRate.add(1);
  return listingRes;
};

let createListing = function(){
    let listingRes = http.post(`18.191.15.40/api/booking/`, {}, {

  });

    check(listingRes, {
        "Listing retrieval successful": (r) => r.status === 200
    }) || errorRate.add(1);
    return listingRes;
}
export default function() {
  let min = 0;
  let max = 99;
  var rand = Math.floor(Math.random() * (max - min)) + min;
  if(rand > 0){
  getListing();
  } else{
    createListing();
  }
  sleep(0.5); // user usually waits 1 second after this flow
}