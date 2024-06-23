# Star Wars Characters

This project is built with Next.js and deployed with Vercel.

![GitHub deployments](https://img.shields.io/github/deployments/flavianunes/star-wars-characters/production?label=Deploy)

## Functionality

- It displays Star Wars characters with pagination
- It filters characters by homeworld (planet)
- It displays a simple skeleton on loading

## Tech Stack

- Next.js with TypeScript
- Tailwind for styling
- Vitest and Testing Library for unit testing
- Axios and React Query for handling requests (caching, retries, and JSON response handling out of the box)

## How to Run

```bash
nvm use
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Running tests:

```bash
npm run test
```

## Improvement opportunities

**Filtering by homeworld**:

1. Since the people endpoint doesn't filter results by homeworld, I followed the approach of using residents' data to get characters from each planet. This is not the best approach, since it makes requests for each character on the planet, but it keeps using the API pagination. Once filtering by `homeworld` is implemented on the API, only the filtering feature will need updates.

2. The number of planets is relatively large, which makes the selection experience not ideal. Using an autocomplete component in the feature would probably increase user experience.

3. Since the planets endpoint doesn't allow us to opt out of pagination, I requested all planets pages to add all values to the filter select. But with the autocomplete feature mentioned above, this probably won't be needed.

**Error handling**

Currently, I only display the error message on the UI. Ideally, we should log the error to a monitoring platform and handle it better, by providing useful user feedback based on each type of error.
