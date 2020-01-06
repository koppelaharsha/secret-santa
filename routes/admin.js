const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

router.get('/', adminController.main);
router.get('/login', adminController.GETlogin);
router.post('/login', adminController.POSTlogin);
router.get('/logout', adminController.logout);
router.get('/add-id', adminController.GETaddId);
router.post('/add-id', adminController.POSTaddId);
router.get('/rem-id', adminController.GETremId);
router.post('/rem-id', adminController.POSTremId);
router.get('/view', adminController.view);
router.get('/turnlock', adminController.turnlock);

module.exports = router
