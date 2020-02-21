# Booking

> Component to select calendar dates and number of guests for booking. It also displays prices per night and total number of reviews.

# Images
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")

![Booking Component Image 1](https://i.ibb.co/4Py0GWh/image1.png)
![Booking Component Image 2](https://i.ibb.co/sHh2DH8/image2.png)
![Booking Component Image 3](https://i.ibb.co/djC494k/image3.png)
![Booking Component Image 4](https://i.ibb.co/dft1CzJ/image4.png)

# Booking Service API:

| Method      | Endpoint                | Desc                                       |
|:------------|:------------------------|:-------------------------------------------|
| GET         | /api/:listingid/booking | READs listing data for specific listing id |
| POST        | /api/booking            | CREATE a new, unique reservation listing   |
| PUT         | /api/:listingid/booking | UPDATE and replace an existing listing     |
| PATCH       | /api/:listingid/booking | UPDATE and modify an existing listing      |
| DELETE      | /api/:listingid/booking | DELETE an existing listing                 |

### GET: Req.body empty, Res contains JSON data of respective listing.
### POST: Req.body contains the listing object to be added to the database.
### PUT: Replaces a listing if exists. Req.body contains an object that should replace an existing object.
### PATCH: Modifies a listing if exists. Req.body contains an object with fields that need to be updated.
### DELETE: Deletes an existing listing. 

## Related Projects

  - https://github.com/bedroost/gallery
  - https://github.com/bedroost/review
  - https://github.com/bedroost/description

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
npm run build
mysql -uroot < ./server/db/schema.sql
npm run seed
```

