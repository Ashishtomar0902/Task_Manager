const router = require("express").Router();
const Task = require("../models/task");
const User = require("../models/user");

// Create Task
router.post("/create-task", async (req, res) => {
    try {
        const { title, desc } = req.body;
        const { id } = req.headers;

        // Check all inputs
        if (!title || !desc || !id) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Create and save the task
        const newTask = new Task({ title, desc });
        const saveTask = await newTask.save();

        // Update the user's task list
        const taskId = saveTask._id;
        await User.findByIdAndUpdate(id, { $push: { tasks: taskId } });

        // Send success response
        res.status(200).json({ message: "Task Created" });
    } catch (error) {
        console.error("Error in create-task route:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

//Get Task
router.get("/get-all-tasks", async (req, res) => {
    try {
        const { id } = req.headers
        const userData = await User.findById(id).populate({ path: "tasks", options: { sort: { createdAt: -1 } } })
        res.status(200).json({ data: userData })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Internal Server Eroor" })
    }
})

//Delete Task
router.delete("/delete-task/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.headers.id;

        console.log("Task ID:", id);
        console.log("User ID:", userId);

        if (!id || !userId) {
            console.log("Validation failed");
            return res.status(400).json({ message: "Missing required fields" });
        }

        await Task.findByIdAndDelete(id);
        await User.findByIdAndUpdate(userId, { $pull: { tasks: id } });

        console.log("Task deleted successfully");
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error in /delete-tasks route:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

//update Task
router.put("/update-task/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { title, desc } = req.body
        await Task.findByIdAndUpdate(id, { title: title, desc: desc })
        res.status(200).json({ message: "Task Updated Successfully " })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Internal Server Eroor" })
    }
})

//update Priority Task
router.put("/update-priority-task/:id", async (req, res) => {
    try {
        const { id } = req.params
        const TaskData = await Task.findById(id)
        const priorityTask = TaskData.priority
        await Task.findByIdAndUpdate(id, { priority: !priorityTask })
        res.status(200).json({ message: "Task Updated Successfully " })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Internal Server Eroor" })
    }
})

//update completed Task
router.put("/update-complete-task/:id", async (req, res) => {
    try {
        const { id } = req.params
        const TaskData = await Task.findById(id)
        const completeTask = TaskData.complete
        await Task.findByIdAndUpdate(id, { complete: !completeTask })
        res.status(200).json({ message: "Task Updated Successfully " })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Internal Server Eroor" })
    }
})

//Get priority Task
router.get("/get-priority-tasks", async (req, res) => {
    try {
        const { id } = req.headers
        const Data = await User.findById(id).populate({ path: "tasks", match: { priority: true }, options: { sort: { createdAt: -1 } } })
        const priorityTaskData = Data.tasks
        res.status(200).json({ data: priorityTaskData })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Internal Server Eroor" })
    }
})

//Get completed Task
router.get("/get-complete-tasks", async (req, res) => {
    try {
        const { id } = req.headers
        const Data = await User.findById(id).populate({ path: "tasks", match: { complete: true }, options: { sort: { createdAt: -1 } } })
        const completeData = Data.tasks
        res.status(200).json({ data: completeData })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Internal Server Eroor" })
    }
})

//Get pending Task
router.get("/get-incomplete-tasks", async (req, res) => {
    try {
        const { id } = req.headers
        const Data = await User.findById(id).populate({ path: "tasks", match: { complete: false }, options: { sort: { createdAt: -1 } } })
        const completeData = Data.tasks
        res.status(200).json({ data: completeData })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Internal Server Eroor" })
    }
})

module.exports = router;
