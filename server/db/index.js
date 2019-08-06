// String url = "brandonyu@postgresql://localhost:5433/reservations";
const Pool = require('pg').Pool
const pool = new Pool({
  // user: 'brandonyu',
  // host : 'localhost',
  host: '18.191.15.40',
  database: 'reservations',
  // password: 'password',
  port: 5432,
})

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }
  console.log('POOL CONNECTED from db/index.js')
  client.query('SELECT NOW()', (err, result) => {
    release()
    if (err) {
      return console.error('Error executing query', err.stack)
    }
    console.log(result.rows)
  })
})

module.exports = pool;
// const Sequelize = require('sequelize');
// const chalk = require('chalk');

// // Option 1: Passing parameters separately
// const sequelize = new Sequelize('booking', 'root', '', {
//   //host: '172.17.0.2',
//   host: 'localhost',
//   dialect: 'mysql',
// });

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log(chalk.green('Connection has been established successfully.'));
//   })
//   .catch((err) => {
//     console.error(chalk.red('Unable to connect to the database:', err));
//   });

// const Listing = sequelize.define('listing', {
//   reviews: { type: Sequelize.INTEGER },
//   views: { type: Sequelize.INTEGER },
//   basePrice: { type: Sequelize.INTEGER },
//   guestFee: { type: Sequelize.INTEGER },
//   cleaningFee: { type: Sequelize.INTEGER },
//   serviceFee: { type: Sequelize.INTEGER },
//   taxes: { type: Sequelize.INTEGER },
//   baseGuests: { type: Sequelize.INTEGER },
//   extraGuests: { type: Sequelize.INTEGER },
//   maxGuests: { type: Sequelize.INTEGER },
//   minNights: { type: Sequelize.INTEGER },
//   maxNights: { type: Sequelize.INTEGER },
//   lastAvailableDate: { type: Sequelize.DATE },
// }, {
//   underscored: true,
// });

// const Booking = sequelize.define('booking', {
//   bookedDate: { type: Sequelize.DATE },
// }, {
//   underscored: true,
// });

// Listing.hasMany(Booking);//listing have many bookings
// Booking.belongsTo(Listing);//links the listing id to booking entry

// module.exports.sequelize = sequelize;
// module.exports.Listing = Listing;
// module.exports.Booking = Booking;

// // var pgp = require('pg-promise')(/* options */)
// // var db = pgp('postgres://localhost:5432/database')

// // db.one('SELECT $1 AS value', 123)
// //   .then(function (data) {
// //     console.log('DATA:', data.value)
// //   })
// //   .catch(function (error) {
// //     console.log('ERROR:', error)
// //   })