
const express = require("express");
const Task = require("../models/taskModel.js");
const router = express.Router();
const {deleteTasks, postTasks, updateTasks,getTasks, sortAndFilterTasks, patchTasks} = require('./controllers/taskController');

router.get('/', getTasks, sortAndFilterTasks);

router.post('/', postTasks);

router.patch('/:id', patchTasks);

router.put('/:id', updateTasks);

router.delete('/:id', deleteTasks);


module.exports = router;
