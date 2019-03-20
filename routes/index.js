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
    console.log('response.headers', response.headers);
    var imageSize = parseInt(response.headers["content-length"]);
    var imageBuffer = new Buffer(imageSize);
    var bytes = 0;

    response.setEncoding("binary");
    response.headers["cache-control"] = "public";
    delete response.headers["pragma"];
    delete response.headers["set-cookie"];
    response.on("data", function(chunk) {
      imageBuffer.write(chunk, bytes, "binary");
      bytes += chunk.length;
    });

    response.on("end", function() {
      console.log("Download complete, sending image.");
      res.type('image/jpg');
      res.set('Cache-Control', 'public');
      res.send(imageBuffer);
    });

  });
});


router.get('/*', function(req, res, next) {
  console.log('serving up a static HTML file');
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

module.exports = router;
