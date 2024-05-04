const express = require('express');
const taskRouter = require("./routes/taskRouter.js");
const Task = require("./models/taskModel.js");
const dotenv = require('dotenv')
dotenv.config();

const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI= process.env.MONGODB_URI

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/tasks", taskRouter);

mongoose.connect(MONGODB_URI)
.then(()=>{
    console.log("Database connected")
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
})
.catch(()=>{
    console.log("Connection failed")
})




