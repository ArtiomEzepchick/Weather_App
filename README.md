# Weather App

Currently working on this project.

- The project is written in TypeScript.
- Redux is used as a state manager. And Redux Saga used as Middleware.
- The application determines the location of the user (using Abstract API) and prefills the city search field.
- Possible city options will be displayed when entering data in the city search field. Data entry is delayed (using Redux Saga delay effect) to avoid frequent API requests.
- Two weather APIs are integrated. One gets the weather forecast for several days and the other one gets the hourly forecast. The user can quickly switch between them and get the information he needs.
- Integrated Google OAuth API and Google Calendar API to receive user data, as well as receiving user's calendar events and displaying them on UI.
- Weather data is stored in local storage and available after page reload.
- Background images change depending on the weather forecast.
- The project is fully responsive.
- 3rd-party libraries used: Ant Design, moment.js, nano-id, classnames, etc.

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.