import AddTodo from "./components/AddTodo";
import ListTodo from "./components/ListTodo";
function App() {
	return (
		<>
			<div className="container">
				<AddTodo />
				<ListTodo />
			</div>
		</>
	);
}

export default App;
