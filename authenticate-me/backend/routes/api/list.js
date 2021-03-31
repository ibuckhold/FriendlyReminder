const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { List } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async () => {
    const lists = await List.findAll();
    res.json(lists);
}))

module.exports = router;
