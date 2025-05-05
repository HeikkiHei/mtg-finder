# Magic The Gathering Finder

This is a personal project to test if I could create an app for recognizing and pricing MtG cards based on their images.

## Features

- Image recognition of MtG cards
  - Images come in sets of 9, from a binder page
  - Images are a bit distorted due to plastic binder pages
  - Images are processed to find the cards
    - Images are cropped to the card size
    - Images are rotated to the correct orientation
    - Images need to be recognized, something like google reverse image search
    - If possible, recognize FOIL
- Pricing of MtG cards
  - Based on the image, get the name, and search for it from Cardmarket
  - Get the price of the card
  - Get the price of the card in different conditions
    - Return all gradings
    - Return all conditions
    - Return all languages
  - Return all prices in EUR
- Let the user choose, which grade and language each scanned card is.
- Store all the data in a database
  - Store the image
  - Store the name
  - Store the price
  - Store the condition
  - Store the language
  - Store the date of the scan
  - Store the date of the last update

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
  - Sharp for image processing
  - Puppeteer or Cheerio for web scraping
  - PostgreSQL or MongoDB for the database

- **Deployment**:
  - Docker for containerization
  - Platforms like AWS, Vercel, or Heroku for hosting
