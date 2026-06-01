# Magic The Gathering Finder

This is a personal project to test if I could create an app for recognizing and pricing MtG cards based on their images.

Card Typing taken from https://mtgjson.com/data-models/rulings/

## Features

- [ ] **Image recognition of MtG cards**
  - _Images come in sets of 9, from a binder page._
  - _Images are a bit distorted due to plastic binder pages._
  - Images are processed to find the cards:
    - [x] Cropped to individual card size
    - [ ] Rotated to the correct orientation
    - [x] Recognized (perceptual hashing against a Scryfall image index)
    - [ ] Detect FOIL, if possible
- [ ] **Pricing of MtG cards**
  - [x] Look the recognized card up on Scryfall
  - [x] Get the card's price in EUR (non-foil and foil)
- [ ] **Let the user choose the grade and language of each scanned card**
- [ ] **Store all scan data in a database**
  - [ ] Image
  - [ ] Name
  - [ ] Price
  - [ ] Condition / grade
  - [ ] Language
  - [ ] Date of the scan
  - [ ] Date of the last update

## Project Structure

The project is divided into two main parts:

1. **Frontend**:

   - Built with React and TypeScript.
   - Provides a user interface for uploading images, selecting card grades and languages, and viewing results.
   - Located in the `frontend` folder.

2. **Backend**:
   - Built with Node.js and TypeScript.
   - Handles image processing, card recognition, pricing, and database operations.
   - Located in the `backend` folder.

## Technologies Used

- **Frontend**:

  - React with TypeScript
  - Axios for API communication
  - TailwindCSS or Material-UI for styling

- **Backend**:

  - Node.js with TypeScript
  - Express for API routing
  - Sharp for image processing and perceptual hashing
  - Scryfall API for card data and EUR pricing
  - MongoDB for the database

- **Deployment**:
  - Docker for containerization
  - Platforms like AWS, Vercel, or Heroku for hosting
