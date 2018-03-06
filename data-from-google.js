const https = require('https');

module.exports = function(search, offset, callback) {
  https.get('https://www.googleapis.com/customsearch/v1?' +
           'key=AIzaSyCNYrlGjjjJY6VU9Y9EUJPSUXF-hrnCgB0&' +
           'cx=008076120302999683364:ioemobhowbm&imgSize=medium&' +
           'q=' + search + '&searchType=image&' +
           'start=' + offset + '&alt=json', (response) => {
    let data = '';
    response.on('data', chunk => {
      data += chunk;
    });
    response.on('end', () => {
      let results = JSON.parse(data).items.map((item) => {
        return {
          url: item.link,
          snippet: item.snippet,
          thumbnail: item.image.thumbnailLink,
          context: item.image.contextLink
        }
      });
      callback(results);
    });
    response.on('error', e => console.error(e));
  });
};
