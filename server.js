const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.static('www'));

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.listen(port, () => console.log(`Listening on ${ port }`));
