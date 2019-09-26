/* eslint-disable arrow-body-style */
const db = require('../db');
const faker = require('faker');

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

module.exports.createListingInfo =  () => {
    const reviews = faker.random.number({ min: 0, max: 1000 });
    const views = faker.random.number({ min: 0, max: 1000 });
    const basePrice = faker.random.number({ min: 20, max: 500 });
    const cleaningFee = faker.random.number({ min: 20, max: 500 });  
    const baseGuests = faker.random.number({ min: 1, max: 5 }) * 2;   
    const minNights = faker.random.number({ min: 1, max: 10 });
    const guestFee = faker.random.number({ min: 0, max: basePrice });
    const extraGuests = Math.round(
      baseGuests * faker.random.number({ min: 0, max: 0.5, precision: 0.1 })
    );
    const maxGuests = baseGuests + extraGuests;
    var date = faker.date.between('2019-09-01', '2019-12-10');
    // let lastAvailableDate = date.toISOString();
    let lastAvailableDate = date.toISOString();
    console.log(lastAvailableDate);
    const maxNights = Math.max(minNights, faker.random.number({ min: 1, max: 355 }));
    const taxes = Math.round(
      basePrice * faker.random.number({ min: 0.05, max: 0.2, precision: 0.01 }),
    );
    const serviceFee = Math.round(
      basePrice * 0.12,
    );    
  return db.query(`INSERT INTO listings (reviews, views, basePrice, cleaningFee, baseGuests, minNights, guestFee, extraGuests, maxGuests, lastAvailableDate, maxNights, taxes, serviceFee)
  VALUES (${reviews},${views},${basePrice},${cleaningFee},${baseGuests},${minNights},${guestFee},${extraGuests},${maxGuests},'2019-11-04T07:56:07.102Z',${maxNights},${taxes},${serviceFee})
  `)
}
