import { check, sleep } from "k6";
import { Rate } from "k6/metrics";
import http from "k6/http";

// See https://docs.k6.io/docs/options for other options
export let options = {
  // simulate rampup of traffic from 1 to 200 users over 5 minutes.
  stages: [
    { duration : "1m", target : 200},
    { duration : "2m", target: 4000},
    { duration : "1m", target : 5500},
    { duration : "2m", target : 3000},
    { duration : "1m", target : 1000}
  ]
};

let errorRate = new Rate("API errors");

let getUser = function(){
    let min = 1;
    let max = 9999999;
    var rand = Math.floor(Math.random() * (max - min)) + min;
    let baseUrl = 'http://localhost:3001';
  let listingRes = http.get(`${baseUrl}/rooms/${rand}/`, {}, {
  });

  check(listingRes, {
      "Listing retrieval successful": (r) => r.status === 200
  }) || errorRate.add(1);

  return listingRes;
};

export default function() {
  getUser();
  sleep(0.5); // user usually waits 1 second after this flow
}