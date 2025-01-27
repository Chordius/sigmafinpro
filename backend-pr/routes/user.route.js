const express = require('express')
const router = express.Router()
const {getUser, createAccount, loginProfile, accountProfileId, accountUpdateProfileId, deleteProfileId} = require('../controllers/user.controller.js')

router.post('/account/create', createAccount);
router.get('/database/12345/allProfile', getUser);
router.post('/account/login', loginProfile);
router.get('/profile/:id', accountProfileId);
router.put('/profile/:id', accountUpdateProfileId);
router.delete('/account/delete/:id', deleteProfileId);

module.exports = router;