const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, csrfProtection, restoreUser } = require('../../utils/auth');
const { User, Task } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const tasks = await Task.findAll();
    res.json(tasks);
}))

router.post('/', asyncHandler(async (req, res) => {
    const { listId, body } = req.body;
    const task = await Task.create({
        listId,
        body
    })
    res.json(task);
}))

module.exports = router;
