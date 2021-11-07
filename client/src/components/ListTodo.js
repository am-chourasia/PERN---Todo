import { useState, useEffect } from "react";
import EditTodo from "./EditTodo";
const ListTodo = () => {
	const [todos, setTodos] = useState([]);
	const getTodos = async () => {
		try {
			const response = await fetch("http://localhost:5000/todos");
			const jsonData = await response.json();
			setTodos(jsonData.reverse());
		} catch (error) {
			console.error("Error fetching the todos: " + error.message);
		}
	};
	const deleteTodo = async (id) => {
		try {
			await fetch(`http://localhost:5000/todos/${id}`, {
				method: "DELETE",
			});
			setTodos(todos.filter((todo) => todo.todo_id !== id));
		} catch (error) {
			console.error("Error deleting the todo : " + error.message);
		}
	};
	useEffect(() => {
		getTodos();
	}, []);
	return (
		<>
			<div className="table-responsive mt-5 text-center">
				<table className="table">
					<tbody>
						{todos.map((todo) => (
							<tr key={todo.todo_id}>
								{/* prettier-ignore */}
								<td>{todo.description}</td>
								<td>
									<EditTodo todo={todo} />
								</td>
								<td>
									<button
										className="btn btn-danger"
										onClick={() => deleteTodo(todo.todo_id)}
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default ListTodo;
