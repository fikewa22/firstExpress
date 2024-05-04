const Task = require("../models/taskModel");

const getTasks=async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const sortAndFilterTasks= async (req, res) => {
    try {
        let query = {};

        // Filtering by completed status
        if (req.query.completed !== undefined) {
            query.completed = req.query.completed === 'true';
        }

        // Sorting by title or completion status
        let sort = {};
        if (req.query.sortBy) {
            const parts = req.query.sortBy.split(':');
            sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
        }

        const tasks = await Task.find(query).sort(sort);
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
const postTasks=async (req, res) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed || false
    });

    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const patchTasks= async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (req.body.title) {
            task.title = req.body.title;
        }
        if (req.body.description) {
            task.description = req.body.description;
        }
        if (req.body.completed !== undefined) {
            task.completed = req.body.completed;
        }

        const updatedTask = await task.save();
        res.json(updatedTask);
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