# COMP3900-H17A-stonks
### How to run ###
Both the frontend and backend need to run in separate terminals for the app to be useable.

### Frontend ###
You run the commands below, you will see the localhost URL for the app in the terminal.
The default URL is <http://localhost:3000>.

*Navigating to the frontend (do this before running the commands below)*
    cd frontend

*Starting the frontend*
    npm install
    npm start

*Frontend tests*
    npm install
    npm test

#### If the frontend port is taken
You will be prompted by npm start/yarn start to change port. It is fine to agree.

### Backend ###
Once the backend is running, you are able to use the frontend.

*Navigating to the backend (do this before running the commands below)*
    cd backend
    
*Starting the backend*
    npm install
    npm start
    
*Backend tests*
    npm install
    npm test

*If the backend port is taken*
If the default backend port is taken, change the default port (5841) to another port.
You will have to do so in the following files:
- backend/app.js
- backend/config/config.env
- frontend/package.json