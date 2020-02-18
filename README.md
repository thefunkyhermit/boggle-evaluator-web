## Boggle Evaluator Web

This application displays a virtual boggle board with letters that can be edited.  When the `Upload Boggle Board` button is clicked, a list of all possible words on the screen are shown.

### Run Locally
`npm start` runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### Developer Notes
This application runs within the browser as a React app.  It points to an API that does the actual processing of the boggle board.

### Testing Application
The application is deployed (via Heroku) to https://stormy-refuge-96758.herokuapp.com/.  Please have a look and play around with it. :)

### Things to improve
* The composition in this application needs work.  In a work setting, I'd have moved a lot of the logic out of App.js and properly built components.  However, I was strapped for time so I decided to keep it simple for now.
* Proper configuration management.  Right now you have to change code to alter things like the URL for the API.  I'd move this into better config management.
