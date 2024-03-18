const express = require('express');
const { 
  handleGenerateNewShortURL,
  handleGetInfoShortURL
 } = require('../controllers/url');
const router = express.Router();

router.post('/', handleGenerateNewShortURL);

router.get('/analytics/:shortId', handleGetInfoShortURL)


module.exports = router;