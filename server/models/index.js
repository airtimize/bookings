/* eslint-disable arrow-body-style */
const db = require('../db');

// module.exports.getListingInfo = (listingId) => {
//   return db.Listing.findByPk(listingId);
// };

// module.exports.getBookedDates = (listingId) => {
//   return db.Booking.findAll({
//     where: { listingId },
//   });
// };

module.exports.getListingInfo = (listingId) => {
  // console.log('GET LISTING INFO from db/models/index.js')
  return db.query(`SELECT * from listings where id = ${listingId}`)
}

module.exports.getBookedDates = (listingId) => {
  return db.query(`SELECT * from bookings where listingId = ${listingId}`)
};
