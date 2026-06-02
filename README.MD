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
- [x] **User accounts** — each user has their own card collection (Clerk auth: Google + Apple)
- [ ] **Let the user choose the grade and language of each scanned card**
- [ ] **Store all scan data in a database** (per user)
  - [ ] Image
  - [x] Name
  - [x] Price
  - [ ] Condition / grade
  - [ ] Language
  - [x] Date of the scan
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
  - Next.js (App Router) with TypeScript
  - Tailwind CSS for styling
  - next-intl for localization (26 locales)
  - Clerk for authentication (Google + Apple)

- **Backend**:
  - Node.js with TypeScript
  - Express for API routing
  - Sharp for image processing and perceptual hashing
  - Scryfall API for card data and EUR pricing
  - Clerk (`@clerk/express`) to verify auth tokens
  - MongoDB for the database

- **Deployment**:
  - Docker for containerization
  - Platforms like AWS, Vercel, or Heroku for hosting

## Authentication setup (Clerk)

The web app and backend share one Clerk instance; the backend verifies the
Clerk session token sent with each `/api/cards` request.

1. Create an application at [clerk.com](https://clerk.com).
2. Enable **Google** and **Apple** under _User & Authentication → Social
   Connections_. (Sign in with Apple requires an Apple Developer Program
   membership to create the Service ID + key.)
3. Copy the API keys into the env files (see `frontend/.env.example` and
   `backend/.env.example`): `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` +
   `CLERK_SECRET_KEY` for the frontend, `CLERK_PUBLISHABLE_KEY` +
   `CLERK_SECRET_KEY` for the backend (same instance).
