var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var proxy = require('proxy-middleware');
var url = require('url');
var DRUMKIT_FILE = path.join(__dirname, 'drumkit.json');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');
const PORT = process.env.PORT || 8080;

new WebpackDevServer(webpack(config), { // Start a server
  publicPath: config.output.publicPath,
  hot: true, // With hot reloading
  inline: false,
  historyApiFallback: false,
  quiet: false,
  proxy: {
    '/api*' : 'http://localhost:8081'
  }
}).listen(PORT, function (err, result) {
  if (err) {
    console.log(err);
  } else {
    console.log('Server started');
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/getdrumkit', function(req, res) {
  fs.readFile(DRUMKIT_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.post('/api/setdrumkit', function(req, res) {
  fs.readFile(DRUMKIT_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var comments = JSON.parse(data);
    // NOTE: In a real implementation, we would likely rely on a database or
    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
    // treat Date.now() as unique-enough for our purposes.
    var newComment = {
      id: Date.now(),
      author: req.body.author,
      text: req.body.text,
    };
    comments.push(newComment);
    fs.writeFile(DRUMKIT_FILE, JSON.stringify(comments, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.setHeader('Cache-Control', 'no-cache');
      res.json(comments);
    });
  });
});

app.listen(PORT+1);