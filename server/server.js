const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const taskRouter = require("./routes/task.routes")
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

mongoose.connect(MONGO_URI)
.then(()=> console.log("Database Connected"))
.catch((err)=>console.error("Database Connection Failed",err))

app.use(express.json())
app.use(cors())
app.use("/api/tasks",taskRouter)

app.listen(PORT)