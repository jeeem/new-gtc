var express = require('express');
var path = require('path');
var router = express.Router();
var request = require('request');
var rp = require('request-promise-native');
/* GET home page. */
var http = require('http');

var imageURL = `http://www.globaltourcreatives.com/media/asset_lib/download.php?token=`;
router.get('/proxy/:id', function(req, res, next) {
  console.log(req.params.id);
  http.get(imageURL + req.params.id, function(response) {
    var imageSize = parseInt(response.headers["content-length"]);
    var imageBuffer = new Buffer(imageSize);
    var bytes = 0;

    response.setEncoding("binary");
    response.on("data", function(chunk) {
      imageBuffer.write(chunk, bytes, "binary");
      bytes += chunk.length;
    });

    response.on("end", function() {
      res.type('image/jpg');
      res.set('Cache-Control', 'public, max-age=2592000');
      res.send(imageBuffer);
    });

  });
});


router.get('/*', function(req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

module.exports = router;
