const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: 'config.env' });
const app = require('./app');
const spinUp = require('./spinUp');

console.log('NODE_ENV:', process.env.NODE_ENV);

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {})
  .then(() => {
    console.log('Successfully connected to database');
  })
  .catch((err) => {
    console.log('Database connection error:', err);
  });

spinUp();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
