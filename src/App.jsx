import "./App.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [filterState, setFilterState] = useState("");

  const createNewTask=()=> {
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

  const deleteToDo = (id) => {
    const updatedTodos = todos.filter((task) => task.id !== id);
    setTodos(updatedTodos);
  };

  const clearCompleted = () => {
    const updatedTodos = todos.filter((task) => task.state !== "completed");
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
            className="textInput"
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
            className={filterState=="all" ? "clicked":"nonClicked"}
            
          >All</button>
          <button
            onClick={() => {
              filterButtonHandler("active");
            }}
            className={filterState=="active" ? "clicked":"nonClicked"}
            
          >Active</button>
          <button
            onClick={() => {
              filterButtonHandler("completed");
            }}
            className={filterState=="completed" ? "clicked":"nonClicked"}
            
          >Completed</button>
        </div>
        {todos.length === 0 ? (
          <h3>No tasks yet. Add one above!</h3>
        ) : (
          <div className="todos">
            {todos
              .filter((todo) => {
                if (filterState == "active") {
                  return todo.state === "active";
                } else if (filterState == "completed") {
                  return todo.state === "completed";
                } else return true;
              })
              .map((task, index) => (
                <label key={index} className="todo">
                  <div style={{display:"flex",
                    alignItems:"center",
                    gap:"10px"
                  }}>
                  <input
                    type="checkbox"
                    style={{
                      boxShadow: "0px 0px 8px 0px rgba(0, 98, 255, 0.8)",
                      height:"fit-content",
                  
                  }}
                    onChange={() => checkboxHandler(task.id)}
                    checked={task.state == "completed"}
                  />
                  <p style={{textDecoration: task.state=="completed"&&'line-through',fontWeight:"300"}}>{task.task}</p>
                  </div>
                  <button style={{ color: "red" }} onClick={()=>deleteToDo(task.id)} >Delete</button>
                </label>
              ))
              }
              <div style={{display:"flex" ,justifyContent:"space-between", height:"60px",alignItems:"center",width:"345px",color:"#6B7280"
              }}>
              <p>{todos.filter((todo) => {
                if (todo.state == "completed") {
                  return true}
              }).length} of {todos.length} tasks completed</p>
              <p style={{color:"red"}} onClick={clearCompleted}>Clear completed</p>
              </div>
              
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
