This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The GDF Viewer is an application to view GDF data in tandem with GSU. During first release it will interact directly with GSU through the window.postMessage API and present relevant GDF data.

In the Future, the scope will grow where it will be a standalone app with navigation.

## Technical Overview

Technical Documentation for this project can be found in the [PROJECT.md](PROJECT.md)

## Installation

### Software Requirements

1. [git](https://git-scm.com/downloads)
1. [node lts](https://nodejs.org/en/download/)
1. [npm](https://classic.npmpkg.com/en/docs/install)
1. [Visual Studio Code](https://code.visualstudio.com/download)

## Running the project the first time.

After the project has been downloaded locally. Here are the steps to run the project.

**Configure Artifactory > Run:**

> npm config set registry https://artifactory.healthpartners.com/artifactory/api/npm/npm/

**Disable Strict SSL > Run:**

> npm config set strict-ssl false

**Install without upgrading dependencies**

> npm ci

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:8075](http://localhost:8075) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run test:coverage`

Launches the test runner in coverage mode. Providing a full fledged coverage report and aborting if the coverage threshold is not met.

### `npm run format`

Formats and writes code by running prettier and eslint in sequence.

### `npm run format:eslint`

Formats and writes code by running eslint.

### `npm run format:prettier`

Formats and writes code by running prettier.

### `npm run lint`

Runs eslint in virtual mode. Basic entry point to eslint.

### `npm run prettier:check`

Runs prettier in [check mode](https://prettier.io/docs/en/cli.html#--check).

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
