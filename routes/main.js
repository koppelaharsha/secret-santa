const express = require('express');

const router = express.Router();

const mainController = require('../controllers/main');

router.get('/', mainController.main);
router.get('/set-name', mainController.GETsetName);
router.post('/set-name', mainController.POSTsetName);
router.get('/view-name', mainController.GETviewName);
router.post('/view-name', mainController.POSTviewName);
router.get('/view-list', mainController.GETviewList);
router.post('/view-list', mainController.POSTviewList);

module.exports = router
