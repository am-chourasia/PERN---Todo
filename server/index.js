const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware:
app.use(cors());
app.use(express.json()); // used to recieve data as json objects from the client for the POST or PUT request.

// ____________________________________________________ROUTES: ____________________________________________________

// get all todo
app.get("/todos", async (req, res) => {
	try {
		const allTodo = await pool.query(
			"SELECT * FROM todo" // RETURNING * is not used cause SELECT itself returns the data
		);
		res.json(allTodo.rows);
	} catch (error) {
		console.error("Error in getting the todos: " + error.message);
	}
});

// get a todo
app.get("/todos/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
			id,
		]);
		res.json(todo.rows);
	} catch (error) {
		console.error(
			"Error in getting the todo " + req.params.id + " : " + error.message
		);
	}
});

// create a todo:
app.post("/todos", async (req, res) => {
	try {
		const { description } = req.body;
		const newTodo = await pool.query(
			"INSERT INTO todo (description) VALUES($1) RETURNING *", // RETURNING* adds the data to the response body
			[description]
		);
		res.json(newTodo.rows[0]);
	} catch (error) {
		console.error("Error posting the todo: " + error.message);
	}
});

// update a todo:
app.put("/todos/:id", async (req, res) => {
	try {
		const { description } = req.body;
		const { id } = req.params;
		const updatedTodo = await pool.query(
			"UPDATE todo SET description = $1 WHERE todo_id = $2",
			[description, id]
		);
		res.json("Todo was updated");
	} catch (error) {
		console.error("Error updating the todo: " + error.message);
	}
});

// delete a todo:
app.delete("/todos/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
			id,
		]);
		res.json("Todo " + id + " was deleted."); //this is wrong and should be fixed with priority basis 3 no kidding around like a dummbo
	} catch (error) {
		console.error(
			"Error in getting the todo " + req.params.id + " : " + error.message
		);
	}
});

// ________________________________________________________________________________________________________________

app.listen(process.env.PORT, () => {
	console.log(
		"Server Started at port https://" +
			process.env.HOST +
			":" +
			process.env.PORT
	);
});
