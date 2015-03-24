var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json({ extended: true }));

app.get('/', function (req, res) {
    res.send('Hello, World!');
});

app.post('/', function (req, res) {
    console.log(req.body.title);
})

module.exports = app;

if (!module.parent) {
    app.listen(process.env.PORT || 5000);
}