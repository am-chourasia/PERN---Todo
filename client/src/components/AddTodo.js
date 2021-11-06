import { useState } from "react";
const AddTodo = () => {
	const [description, setDescription] = useState("");
	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			const body = { description }; // packing the request
			await fetch("http://localhost:5000/todos", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});
			window.location = "/"; // to refresh the window
		} catch (error) {
			console.error("Error while adding the todo : " + error.message);
		}
	};
	return (
		<>
			<h2 className="text-center mt-5">TODO</h2>
			<form className="d-flex mt-4" onSubmit={(e) => submitHandler(e)}>
				<input
					type="text"
					placeholder="Your new todo goes here"
					className="form-control"
					onChange={(e) => setDescription(e.target.value)}
				/>
				<button className="btn btn-primary">Add</button>
			</form>
		</>
	);
};

export default AddTodo;
