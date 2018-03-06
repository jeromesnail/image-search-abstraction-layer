const express = require('express');
const fs = require('fs');
const dataFromGoogle = require('./data-from-google');
const app = express();


const port = process.env.PORT;

app.get('/api/imagesearch/:search', (req, res) => {
  let search = req.params.search;
  let offset = req.query.hasOwnProperty('offset') ?
                 +req.query.offset : 1;
  dataFromGoogle(search, offset, (results) => {
    res.json(results);
  });
  fs.readFile('data-base.json', 'utf8', (e, data) => {
    if (e) throw e;
    let date = new Date();
    let current = JSON.parse(data);
    current.unshift({
      term: search,
      when: date
    });
    if (current.length > 10) current.pop();
    console.log(current);
    fs.writeFile('data-base.json', JSON.stringify(current), (e) => {
      if (e) throw e;
    });
  });
});

app.get('/api/latest/imagesearch', (req, res) => {
  fs.readFile('data-base.json', 'utf8', (e, data) => {
    if (e) throw e;
    res.json(JSON.parse(data));
  });
});

app.get('*', (req, res) => {
  res.end(
    '"/api/imagesearch/<your research>[?offset=10] to search for images\n' +
    '"/api/latest/imagesearch/" to see the latest researchs'
  );
});

app.listen(port, () => {console.log('App running on port ' + port);});
