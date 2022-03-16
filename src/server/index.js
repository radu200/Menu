const express = require('express');
const items = require('./items');
const helpers = require('./helpers')
const app = express();

const port = process.env.PORT || 8080;

app.use(express.static('dist'));

app.get('/api/items', (req, res) => {
 
const searchQuery = req.query.search

if(!searchQuery){
  return res.json({ items });
}

const searchedItems = helpers.filterByName(items, searchQuery)
return res.json({ items:searchedItems });

})

app.listen(port, () => console.log(`Listening on port ${port}!`));
