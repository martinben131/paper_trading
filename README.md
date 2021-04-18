# COMP3900-H17A-stonks

## Project

Investment Simulator

## Group Members

- Sebastian Hodge
- Sanchit Gupta
- Victor Fang
- Ma Ben
- Lumina Gajanayake

## How to run

Both the frontend and backend need to run for the app to be useable.

### Frontend

The frontend was built with yarn. Yarn is not installed on vlab, so you can use npm instead.
If you have yarn installed, replace `npm` with `yarn`.
Once you run the commands below, you will see the localhost URL for the app in the terminal.
The default URL is <http://localhost:3000>.

#### Navigating to the frontend (do this before running the commands below)

    cd frontend

#### Starting the frontend

    npm install
    npm start

#### Frontend tests

    npm install
    npm test

#### If the frontend port is taken

You will be prompted by npm start/yarn start to change port. It is fine to agree.

### Backend

The backend was built with npm. Once the backend is running, you are able to use the frontend.

#### Navigating to the backend (do this before running the commands below)

    cd backend

#### Starting the backend

    npm install
    npm start

#### Backend tests

    npm install
    npm test

#### If the backend port is taken

If the default backend port is taken, change the default port (5841) to another port.
You will have to do so in the following files:

- backend/app.js
- backend/config/config.env
- frontend/package.json

## Jira Instance

<https://comp3900-h17a-stonks.atlassian.net/>

## Github Repo

<https://github.com/unsw-cse-capstone-project/capstone-project-comp3900-h17a-stonks>
