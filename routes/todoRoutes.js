const express = require("express");
const sequelize = require("../config/dbconfig");
const router = express.Router();
const Todo = require("../models/todoModel");

// start the database.
sequelize.sync().then(() => {
  console.log("database is running");
});

/* to create todo */
router.post("/todo", async (req, res) => {
  try {
    console.log(req.body);
    const { text } = req.body;

    const newTask = await Todo.create({ text });
    console.log(newTask.toJSON()); // This is good!

    return res.status(201).send(newTask.toJSON());
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("failed to create todo");
  }
});

/* find all the Todo*/
router.get("/todo", async (req, res) => {
  try {
    const todoList = await Todo.findAll();
    res.status(200).send(todoList);
  } catch (error) {}
});
/* update the todo */
router.put("/todo", async (req, res) => {
  try {
    const { id, done } = req.body;
    const updatedTask = await Todo.update(
      { done },
      {
        where: {
          id,
        },
      }
    );
    console.log("task updated");
    return res.status(201).send("updated");
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("failed to update todo");
  }
});

/* Delete the Todo*/

router.delete("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.destroy({
      where: {
        id,
      },
    });
    return res.status(201).send("todo deleted");
  } catch (error) {
    return res.status(500).send("failed to delete todo");
  }
});

module.exports = router;
