import "./App.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [filterState, setFilterState] = useState("");
  function changeColor(e) {
    const clicked = e.target;
    clicked.style.backgroundColor = "black";
    console.log(clicked);
  }

  function createNewTask() {
    if (inputValue.length === 0) {
      console.log("hello");
    } else {
      setTodos([
        ...todos,
        {
          task: inputValue,
          state: "active",
          id: uuidv4(),
        },
      ]);
    }
  }

  const checkboxHandler = (id) => {
    const updatedTodos = todos.map((task) => {
      if (task.id == id) {
        return {
          ...task,
          state: task.state == "active" ? "completed" : "active",
        };
      } else {
        return task;
      }
    });
    setTodos(updatedTodos);
  };
  

  const filterButtonHandler = (filterState) => {
    setFilterState(filterState);
  };

  

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <div className="app">
      <div className="container">
        <h2>To-Do List</h2>
        <div className="addTask">
          <input
            type="text"
            placeholder="Add a new task..."
            onChange={handleInputChange}
          />
          <button className="addButton" onClick={createNewTask}>
            Add
          </button>
        </div>
        <div className="filterButtons">
          <button
            onClick={() => {
              filterButtonHandler("all");
            }}
            style={{ 
              backgroundColor: filterState == "all" ? "#3c82f6" : "#F3F4F6",
              color:filterState == "all" ? "#F3F4F6" : "black",
             }}

          >
            All
          </button>
          <button
            onClick={() => {
              filterButtonHandler("active");
            }}
            style={{ 
              backgroundColor: filterState == "active" ? "#3c82f6" : "#F3F4F6",
              color:filterState == "active" ? "#F3F4F6" : "black",
             }}
          >
            Active
          </button>
          <button
            onClick={() => {
              filterButtonHandler("completed");
            }}
            style={{ 
              backgroundColor: filterState == "completed" ? "#3c82f6" : "#F3F4F6",
              color:filterState == "completed" ? "#F3F4F6" : "black",
             }}
          >
            Completed
          </button>
        </div>
        {todos.length === 0 ? (
          <h3>No tasks yet. Add one above!</h3>
        ) : (
          <div>
            {todos.filter((todo) => {
              if(filterState=="active"){
                return todo.state==="active"
              }
              else if(filterState=="completed"){
                return todo.state==="completed"
              }
              else return true
            }).map((task, index) => (
              <label key={index} className="todo">
                <input
                  type="checkbox"
                  onChange={() => checkboxHandler(task.id)}
                  checked={task.state == "completed"}
                />
                <h3>{task.task}</h3>
                <button style={{color:"red"}}>Delete</button>
              </label>
            ))}
          </div>
        )}
        <div className="footer">
          <p>Powered by</p>
          <a href="https://pinecone.mn/">Pinecone Academy</a>
        </div>
      </div>
    </div>
  );
}

export default App;
