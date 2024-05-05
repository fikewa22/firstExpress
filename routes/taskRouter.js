const express = require("express");
const router = express.Router();
const {deleteTasks, postTasks,getTasks, updateTasks, sortAndFilterTasks, patchTasks} = require('../controllers/taskController.js');

// router.get('/', getTasks);

router.get('/',sortAndFilterTasks);

router.post('/', postTasks);

router.patch('/:id', patchTasks);

router.put('/:id', updateTasks);

router.delete('/:id', deleteTasks);


module.exports = router;
