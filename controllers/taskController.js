const Task = require("../models/taskModel");

const getTasks=async (req, res) => {
    try {
        const getTasks = await Task.find();
        res.json(getTasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const sortAndFilterTasks = async (req, res) => {
    try {
        let query = {};

        // Filter tasks
        if (req.query.completed !== undefined) {
            query.completed = req.query.completed === 'true';
        }

        // Sort tasks
        let sortOption = { title: 1 };
        if (req.query.sortBy) {
            const parts = req.query.sortBy.split(':');
            sortOption = { [parts[0]]: parts[1] === 'desc' ? -1 : 1 };
        }

        const sortedTasks = await Task.find(query).sort(sortOption);
        res.json(sortedTasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const postTasks=async (req, res) => {
    const postTask = new Task({
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed || false
    });

    try {
        const newTask = await postTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const patchTasks= async (req, res) => {
    try {
        const patchTask = await Task.findById(req.params.id);

        if (req.body.title) {
            patchTask.title = req.body.title;
        }
        if (req.body.description) {
            patchTask.description = req.body.description;
        }
        if (req.body.completed !== undefined) {
            patchTask.completed = req.body.completed;
        }

        const patchedTask = await patchTask.save();
        res.json(patchedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
  };

const updateTasks=async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
const deleteTasks=async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getTasks,
    sortAndFilterTasks,
    postTasks,
    patchTasks,
    updateTasks,
    deleteTasks,
  };