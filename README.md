# Contact List APP - Client

This project is an App that allows you to manage your contacts in differents contact books.

You can create contact contact books, create contacts within these contact books and show the updates history of each contact

## Requirements

- React 18
- TypeScript 4.4.2
- NodeJS 17.9.0

## How to start

In the project directory, you need to do some steps before:

### `yarn install` or `npm install`

With this command, you will install the dependencies of this project.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Other configuration

To run the backend, you need to run the server of `contact_list_api` which is [here](https://github.com/RafaMellado/contact_list_api).

Once this is done, you need to place in your `.env` file the following enviroment variables:

`REACT_APP_API_HOST="http://localhost:3000"`

If you run the server in other path or port, just change it

## Information for developers

This project has enabled the strict mode with TypeScript.

## Dependencies used in this project

- [dovenv](https://github.com/motdotla/dotenv): To manage enviroment variables
- [fetch-intercept](https://github.com/werk85/fetch-intercept): Interceptor library to intercept native fetch method for requests
- [qs](https://github.com/ljharb/qs): To parse and stringify objects to querystring
- [universal-cookie](https://github.com/reactivestack/cookies): To manage browser cookies
- [react-bootstrap](https://getbootstrap.com/): Styling library
- [react-icons](https://github.com/react-icons/react-icons): Library of icons
- [react-i18next](https://github.com/i18next/i18next): To manage translations
- [react-router-dom](https://github.com/ljharb/qs)
