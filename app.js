'use strict';
const express = require('express');
const morgan = require('morgan');

const playstore = require('./playstore.js');

const app = express();

app.use(morgan('common')); // let's see what 'common' format looks like

app.get('/apps', (req, res) => {
  const { genres = '', sort } = req.query;
  let results = playstore;


  if (sort) {
    //checking if rating or app is supplied by client
    if (!['rating', 'app'].includes(sort)) {
      return res
        .status(400)
        .send('Sort must be one of rating or app'); 
    }
    //sorting by app 
    if (sort === 'app') {
      results = results
          .sort((a, b) => {
          return a['app'] > b['app'] ? 1 : a['app'] < b['app'] ? -1 : 0;
        });
    }
    //sorting by rating
    if (sort === 'rating') {
      results
        .sort((a, b) => {
        return a['rating'] > b['rating'] ? 1 : a['rating'] < b['rating'] ? -1 : 0;
      });
    }
  }

  if(genres) {
    if (!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)) {
      return res.status(400).send('Jenre must be on of Action, Puzzle, Strategy, Casual, Arcade, Card');
    }
    results = playstore .filter(app =>
      app.Genres.toLowerCase().includes(genres.toLowerCase()));
    }
    
    //return results;

  res.json(results);
  
});

app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});