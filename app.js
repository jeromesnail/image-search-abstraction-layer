const express = require('express');
const dataFromGoogle = require('./data-from-google');
const app = express();


const port = process.env.PORT /*'1337'*/;

app.get('/api/imagesearch/:search', (req, res) => {
  let search = req.params.search;
  let offset = req.query.hasOwnProperty('offset') ?
                 +req.query.offset : 1;
  dataFromGoogle(search, offset, (results) => {
    res.json(results);
  });
});

app.get('/api/latest/imagesearch/', (req, res) => {
  res.end('on verra plus tard pour cette partie');
});

app.get('*', (req, res) => {
  res.end(
    '"/api/imagesearch/<your research>[?offset=10] to search for images\n' +
    '"/api/latest/imagesearch/" to see the latest researchs'
  );
});

app.listen(port, () => {console.log('App running on port ' + port);});
