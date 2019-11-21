let express = require('express');
let router = express.Router();

// Displays a homepage on the most base route.
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});




module.exports = router;
