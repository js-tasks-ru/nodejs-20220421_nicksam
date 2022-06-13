const app = require('./app');
require('dotenv').config();

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000');
});
