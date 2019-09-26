const faker = require('faker');
const fs = require('fs');

const listingStream = fs.createWriteStream('./listings3.csv');
const bookingStream = fs.createWriteStream('./bookings3.csv');
const userStream = fs.createWriteStream('./users3.csv');

const maxListings = 1e7;
const minUsers = 0;
const maxUsers = 2; //max 2 user bookings on a listing
// const minBookings = 50;
// const maxBookings = 50;
var userReserveCount = 0;
var bookingCount = 0;

function drainer() {
  return new Promise((resolve) => {
    listingStream.once('drain', resolve);
  });
}
async function writer() {
  let ableToWrite = true;

  for (let i = 0; i < maxListings; i += 1) {//data for each listing
    const listing_id = i + 1;
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
    const lastAvailableDate = faker.date.between('2019-09-01', '2019-12-05');
    const maxNights = Math.max(minNights, faker.random.number({ min: 1, max: 355 }));
    const taxes = Math.round(
      basePrice * faker.random.number({ min: 0.05, max: 0.2, precision: 0.01 }),
    );
    const serviceFee = Math.round(
      basePrice * 0.12,
    );    
    const randUserMax = Math.floor(Math.random() * (maxUsers - minUsers + 1)) + minUsers; //The maximum is inclusive and the minimum is inclusive 
    const randUsers = Math.floor(Math.random() * (randUserMax - minUsers + 1)) + minUsers;
    var startDate = faker.date.between('2019-07-31', lastAvailableDate);
    for(let k = 0; k < randUsers; k++){//create users that contains start and end reservation date
        userReserveCount +=1;
        if(k===2){
            startDate = faker.date.between(startDate, lastAvailableDate);
        }
        // const startDate = faker.date.between('2019-07-31', lastAvailableDate);
        const endDate = faker.date.between(startDate, lastAvailableDate);
        userStream.write(`${userReserveCount},${listing_id},${startDate.toISOString()},${endDate.toISOString()}\n`);
        var date1 = new Date(startDate);
        var date2 = new Date(endDate);
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
        var currDate = date1;
        
        for (let j = 0; j < diffDays; j += 1) {//store days booked by user inside booking table
            //const id = maxBookings*i + j;
            bookingCount += 1;
            bookingStream.write(`${bookingCount},${listing_id},${currDate.toISOString()},${userReserveCount}\n`);
            currDate.setDate(currDate.getDate()+1);
        }
    }
    
    ableToWrite = listingStream.write(`${listing_id},${reviews},${views},${basePrice},${cleaningFee},${baseGuests},${minNights},${guestFee},${extraGuests},${maxGuests},${lastAvailableDate.toISOString()},${maxNights},${taxes},${serviceFee}\n`);

    if (!ableToWrite) {
      await drainer();
    }
    if (i % 1e6 === 0) {
      console.error(i, 'count per mil');
      console.error(process.uptime() + "sec");
    }
  }
    bookingStream.end()
    listingStream.end();
    userStream.end();
}
writer();