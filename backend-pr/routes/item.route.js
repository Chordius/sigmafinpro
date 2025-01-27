const express = require('express')
const router = express.Router()
const { createItem, deleteItem, getItemAll, getItemOne } = require('../controllers/item.controller.js')

router.post('/create', createItem);
router.get('/all', getItemAll);
router.get('/:id', getItemOne);
router.delete('/delete/:id', deleteItem);

module.exports = router;