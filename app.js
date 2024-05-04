const express = require('express');
const taskRouter = require("./routes/taskRouter.js");
const Task = require("./models/taskModel.js");

const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/tasks", taskRouter);

mongoose.connect("mongodb+srv://fikewabdul:Pk9AlGiya72vc1zE@todolist.rbnextl.mongodb.net/tasks?retryWrites=true&w=majority&appName=Todolist")
.then(()=>{
    console.log("Database connected")
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
})
.catch(()=>{
    console.log("Connection failed")
})




