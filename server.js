const express = require('express');
const app = express();
const PORT = process.env.PORT || 2222;
const path = require('path');

const notes_router = require('./routes/api_routes')

//share static/browser files
app.use(express.static(path.join(__dirname, 'public')));
//Attach client side form data to the request.body object
app.use(express.urlencoded({ extended: true }));
// Allow json data to be received from the client
app.use(express.json());

app.use("/assets", express.static("./assets"));


require("./routes/html_routes")(app)
app.use('/notes', notes_router);

// Start Server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});