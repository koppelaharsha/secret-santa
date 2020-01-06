const express = require('express');

const router = express.Router();

router.use('/admin', require('./routes/admin'));
router.use('/', require('./routes/main'));

module.exports = router
