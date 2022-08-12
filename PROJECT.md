# GDF Viewer Choices

This document covers the GDF viewer design and technology choices for future developers.

## Folder Structure

The folder layout for this project is based on [Ryan Florence's base folder structure](https://gist.github.com/ryanflorence/daafb1e3cb8ad740b346).

We do expand on the definition of `index.js` files. The document states:

> Next, each of these screens has an `index.js` file, which is the file that handles the entry into the screen, also known as a "Route Handler" in react router.
> We want to emphasize the goal is to not have meaningful logic inside the `index.js` file. Our `index.js` files will provide include either route definitions or contract definition. We will use named components for all logic. The folder structure will mimic our internal routes.

As an alternative to route handlers you will also encounter `index.js` files as [public interfaces](https://www.digitalocean.com/community/tutorials/react-index-js-public-interfaces).

## Linting

Our base linting rule are derived from the [AirBnB Style Guide](https://github.com/airbnb/javascript). We have a few changes, look into the `.eslintrc.js`. Eventually we will create a base linting rule.
