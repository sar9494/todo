import "./App.css";
import { useState } from "react";
function App() {
  const [newTasks, setNewTask] = useState({});
  const [newList, setNewList] = useState([]);
  function changeColor(e) {
    const clicked = e.target;
    clicked.style.backgroundColor = "black";
    console.log(clicked);
  }
  function newTask(e) {
    setNewTask({
      task:e.target.value,
      isDone:false
    });
  }
  function addList() {
    setNewList([...newList, newTasks]);
  }
  console.log(newTasks.task);
  return (
    <div className="app">
      <div className="container">
        <h2>To-Do List</h2>
        <div className="addTask">
          <input
            type="text"
            placeholder="Add a new task..."
            onChange={newTask}
          />
          <button className="blueButton" onClick={addList}>
            Add
          </button>
        </div>
        <div className="buttons">
          <button className="addBut , blueButton" onClick={changeColor}>All</button>
          <button className="grayButton ">Active</button>
          <button className="grayButton">Complited</button>
        </div>
        {
        newList.length === 0 ? (
          <h3>No tasks yet. Add one above!</h3>
        ) : (
          <div>
            {newList.map((task, index) => (
              <div key={index}>
                <h3>{task.isDone}</h3>
              </div>
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
