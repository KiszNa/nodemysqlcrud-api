const express = require('express');
const bodyParser = require("body-parser");

const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

require("./app/routes/UserRoutes.js")(app);
require("./app/models/DbConnection.js");

// set port, listen for requests
const port = process.env.PORT || 4444;

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});