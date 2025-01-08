import "./App.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [logs, setLogs] = useState([]);
  const [filterState, setFilterState] = useState("all");

  const createNewTask = () => {
    if (inputValue.length === 0) {
    } else {
      const newTask = {
        task: inputValue,
        status: "active",
        id: uuidv4(),
      };

      const newLog = {
        task: newTask.task,
        status: newTask.status,
        id: newTask.id,
        logs: [
          {
            status: "active",
            time: addTime(),
          },
        ],
      };
      setTodos([...todos, newTask]);
      setLogs([...logs, newLog]);
      setInputValue("");
    }
  };

  const checkboxHandler = (id) => {
    const updatedTodos = todos.map((task) => {
      if (task.id == id) {
        console.log({
          ...task,
          status: task.status == "active" ? "completed" : "active",
        });
        return {
          ...task,
          status: task.status == "active" ? "completed" : "active",
        };
      } else {
        return task;
      }
    });
    setTodos(updatedTodos);

    const updatedlogss = logs.map((task) => {
      if (task.id == id) {
        console.log({
          ...task,
          status: task.status == "active" ? "completed" : "active",
          logs: [
            ...task.logs,
            {
              status: task.status == "active" ? "completed" : "active",
              time: addTime(),
            },
          ],
        });
        return {
          ...task,
          status: task.status == "active" ? "completed" : "active",
          logs: [
            ...task.logs,
            {
              status: task.status == "active" ? "completed" : "active",
              time: addTime(),
            },
          ],
        };
      } else {
        return task;
      }
    });
    setLogs(updatedlogss);
  };

  const deleteToDo = (id) => {
    const updatedTodo = logs.map((task) => {
      if (task.id == id) {
        return {
          ...task,
          status: (task.status = "deleted"),
          logs: [
            ...task.logs,
            {
              status: (task.status = "deleted"),
              time: addTime(),
            },
          ],
        };
      } else return task;
    });
    setLogs(updatedTodo);

    const updatedTodos = todos.filter((task) => task.id !== id);
    setTodos(updatedTodos);
  };

  const clearCompleted = () => {
    const updatedlogss = logs.map((log) => {
      if (log.status == "completed") {
        return {
          ...log,
          status: (log.status = "completed and deleted"),
          logs: [
            ...log.logs,
            { status: "completed and deleted", time: addTime() },
          ],
        };
      } else return log;
    });
    setLogs(updatedlogss);

    const updatedTodos = todos.filter((task) => task.status !== "completed");
    setTodos(updatedTodos);
  };

  const filterButtonHandler = (filterState) => {
    setFilterState(filterState);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addTime = () => {
    return moment().format("llll");
  };

  const restoreToDo = (id) => {
    const updatedLogs = logs.map((log) => {
      if (log.id == id) {
        setTodos([
          ...todos,
          {
            task: log.task,
            status: "active",
            id: id,
          },
        ]);
        console.log(log);
        return {
          ...log,
          status: "active",
          logs: [...log.logs, { status: "active", time: addTime() }],
        };
      } else return log;
    });
    setFilterState("logRemove");
    setLogs(updatedLogs);
  };

  return (
      <div className="container">
        <h2>To-Do List</h2>
        <div className="addTask">
          <input
            type="text"
            placeholder="Add a new task..."
            value={inputValue}
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
            className={filterState == "all" ? "clicked" : "nonClicked"}
          >
            All
          </button>
          <button
            onClick={() => {
              filterButtonHandler("active");
            }}
            className={filterState == "active" ? "clicked" : "nonClicked"}
          >
            Active
          </button>
          <button
            onClick={() => {
              filterButtonHandler("completed");
            }}
            className={filterState == "completed" ? "clicked" : "nonClicked"}
          >
            Completed
          </button>
          <button
            onClick={() => {
              filterButtonHandler("log");
            }}
            className={filterState.includes("log") ? "clicked" : "nonClicked"}
          >
            Logs
          </button>
        </div>
        <div className="logs">
          {logs.map(
            (todo, index) =>
              filterState.includes("log") && (
                <div key={index}>
                  <h4>Task description: {todo.task}</h4>
                  <ul>
                    {todo.logs.map((log, index) => (
                      <li
                        key={index}
                        style={{
                          color: log.status.includes("deleted")
                            ? "red"
                            : "black",
                        }}
                      >
                        <p>Status: {log.status}</p>{" "}
                        <p>Time: {"  " + log.time}</p>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={"clicked"}
                    style={{
                      display: todo.status.includes("deleted")
                        ? "block"
                        : "none",
                    }}
                    onClick={() => restoreToDo(todo.id)}
                  >
                    Restore
                  </button>
                </div>
              )
          )}
        </div>
        {todos.length === 0 && filterState == "all" ? (
          (<p style={{ color: "#71717a" }}>No tasks yet. Add one above!</p>)
        ) : (
          <div className="todos">
            {todos
              .filter((todo) => {
                if (filterState == "active") {
                  return todo.status === "active";
                } else if (filterState == "completed") {
                  return todo.status === "completed";
                } else if (filterState === "all") {
                  return true;
                }
              })
              .map((task, index) => (
                <label key={index} className="todo">
                  <div>
                    <input
                      type="checkbox"
                      style={{
                        height: "fit-content",
                      }}
                      onChange={() => checkboxHandler(task.id)}
                      checked={task.status == "completed"}
                    />
                    <p
                      style={{
                        textDecoration:
                          task.status == "completed" && "line-through",
                        color: task.status == "completed" && "red",
                      }}
                    >
                      {task.task}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteToDo(task.id)}
                    className="deleteButton"
                  >
                    Delete
                  </button>
                </label>
              ))}
              <p style={{display:(filterState=="completed"||filterState=="active")&&todos.filter((todo)=>todo.status==filterState).length==0?"block":"none",
                color: "#71717a"
              }}>No {filterState} tasks found.</p>
            <div
              className="clearCompleted"
              style={{ display: filterState != "log" &&todos.length!=0 ? "flex" : "none" }}
            >
              <p>
                {
                  todos.filter((todo) => {
                    if (todo.status == "completed") {
                      return true;
                    }
                  }).length
                }{" "}
                of {todos.length} tasks completed
              </p>
              <p style={{ color: "red" }} onClick={clearCompleted}>
                Clear completed
              </p>
            </div>
          </div>
        )}
        <div className="footer">
          <p>Powered by</p>
          <a href="https://pinecone.mn/">Pinecone Academy</a>
        </div>
      </div>
  );
}

export default App;
