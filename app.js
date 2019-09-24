'use strict';
const express = require('express');
const morgan = require('morgan');

const playstore = require('./playstore.js');

const app = express();

app.use(morgan('common')); // let's see what 'common' format looks like

app.get('/apps', (req, res) => {
  const { genres = '', sort } = req.query;
  if (sort) {
    if (!['rating', 'app'].includes(sort)) {
      return res
        .status(400)
        .send('Sort must be one of rating or app'); 
    }
  }

  
  if(genres) {
    if (!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)) {
      return res.status(400).send('Jenre must be on of Action, Puzzle, Strategy, Casual, Arcade, Card');
    }
    
    return results;
  }

  
  
  
  
  if (sort) {
    results
      .sort((a, b) => {
        return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
      });
  }

  res
    .json(results);
});

app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});