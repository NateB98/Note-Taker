const express = require('express');
const app = express();
const fs = require('fs');
const PORT = process.env.PORT || 2222;

//Attach client side form data to the request.body object
app.use(express.urlencoded({ extended: true }));
// Allow json data to be received from the client
app.use(express.json());
//gathers the data for express parsing
app.use('/assets', express.static('./assets'));

// Loads Routes
require("./routes/html_routes")(app);
require("./routes/api_routes")(app);

// Start Server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});