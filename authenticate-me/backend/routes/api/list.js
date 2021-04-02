const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { List, Task } = require('../../db/models');

const router = express.Router();

router.get('/:id/tasks', asyncHandler(async (req, res) => {
    const id = req.params.id
    const tasks = await Task.findAll({
        where: {
            listId: id
        }
    });
    res.json(tasks);
}))

router.get('/', asyncHandler(async (req, res) => {
    const lists = await List.findAll();
    res.json(lists);
}))

router.post('/', asyncHandler(async (req, res) => {
    const { userId, title } = req.body;
    const list = await List.create({
        userId,
        title
    })
    return res.json(list);
}))

module.exports = router;
