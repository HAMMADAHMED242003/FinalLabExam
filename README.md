# FinalLabExam - Tourism Management System

This project is a **Tourism Management System** built using **Node.js**, **Express**, and **MongoDB** with **Mongoose** to manage the data related to **Visitors**, **Attractions**, and **Reviews**. The system tracks various attractions, allows visitors to post reviews, and helps manage the ratings of attractions based on those reviews.

## Features

- **Visitor Management**: Create, update, and delete visitor profiles.
- **Attraction Management**: Add new attractions, update details, and fetch attractions sorted by rating.
- **Review System**: Allow visitors to post reviews on attractions, ensuring that a visitor can only review each attraction once.
- **Rating System**: The average rating of an attraction is recalculated whenever a new review is added or removed.

## API Endpoints

### Visitors
- `POST /visitors`: Create a new visitor.
- `GET /visitors`: Get a list of all visitors.
- `GET /visitors/:id`: Get a specific visitor by ID.
- `PUT /visitors/:id`: Update a visitor's information by ID.
- `DELETE /visitors/:id`: Delete a visitor by ID.
- `GET /visitors/activity`: Get a list of visitors with the count of attractions they have reviewed.

### Attractions
- `POST /attractions`: Create a new attraction.
- `GET /attractions`: Get a list of all attractions.
- `GET /attractions/:id`: Get a specific attraction by ID.
- `PUT /attractions/:id`: Update an attraction's details by ID.
- `DELETE /attractions/:id`: Delete an attraction by ID.
- `GET /attractions/top-rated`: Get the top 5 attractions with the highest ratings.

### Reviews
- `POST /reviews`: Create a review for an attraction.
- `GET /reviews`: Get a list of all reviews.
- `GET /reviews/:id`: Get a specific review by ID.
- `PUT /reviews/:id`: Update a review by ID.
- `DELETE /reviews/:id`: Delete a review by ID.

## Business Logic

### Visitor Review Restrictions
- A **visitor** can only **review** an attraction **once**.
- The **visitor** must have visited the attraction before posting a review.
- The **rating** of an attraction is updated based on the average of all reviews for that attraction.

### Attraction Entry Fee Validation
- The **entry fee** for an attraction cannot be negative.

### Visitor Email Validation
- The **email** of a **visitor** must be unique and must follow the correct format.

## Technologies Used

- **Node.js**: JavaScript runtime for building the server-side application.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database to store data about visitors, attractions, and reviews.
- **Mongoose**: ODM (Object Data Modeling) library to interact with MongoDB.
- **EJS**: Templating engine for rendering HTML views.


