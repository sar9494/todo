import "./App.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [mainToDo, setMainToDo] = useState([]);
  const [filterState, setFilterState] = useState("all");
  const [logs, setLog] = useState([]);

  const createNewTask = () => {
    if (inputValue.length === 0) {
    } else {
      const newTask = {
        task: inputValue,
        state: "active",
        id: uuidv4(),
        logs: [
          {
            status: "active",
            time: addNewLog(),
          },
        ],
      };
      setTodos([...todos, newTask]);
      setMainToDo([...mainToDo, newTask]);
      setLog([
        ...logs,
        [
          {
            taskDescription: newTask.task,
            id: newTask.id,
            logs: [{ status: "ACTIVE", time: addNewLog() }],
          },
        ],
      ]);
      setInputValue("");
    }
  };

  const checkboxHandler = (id) => {
    const updatedTodos = todos.map((task) => {
      if (task.id == id) {
        console.log({
          ...task,
          state: task.state == "active" ? "completed" : "active",
          logs: [
            ...task.logs,
            {
              status: task.state == "active" ? "completed" : "active",
              time: addNewLog(),
            },
          ],
        });
        return {
          ...task,
          state: task.state == "active" ? "completed" : "active",
          logs: [
            ...task.logs,
            {
              status: task.state == "active" ? "completed" : "active",
              time: addNewLog(),
            },
          ],
        };
      } else {
        return task;
      }
    });
    setTodos(updatedTodos);
    console.log(updatedTodos);
    setLog([
      ...logs,
      [
        {
          taskDescription: updatedTodos.task,
          id: updatedTodos.id,
          logs: [{ status:updatedTodos.state, time: addNewLog() }],
        },
      ],
    ])
    setMainToDo(updatedTodos)
    
  };

  

  const deleteToDo = (id) => {
    const updatedTodo = todos.filter((task) => {
      if (task.id == id) {
        console.log({
          ...task,
          state: (task.state = "deleted"),
          logs: [
            ...task.logs,
            {
              status:"deleted",
              time: addNewLog(),
            },
          ],
        });

        return {
          ...task,
          state: (task.state = "deleted"),
          logs: [
            ...task.logs,
            {
              status: task.state = "deleted",
              time: addNewLog(),
            },
          ],
        };
      }
    });
    console.log(updatedTodo);
    setLog([
      ...logs,
      [
        {
          taskDescription: updatedTodo.task,
          id: updatedTodo.id,
          logs: [{ status:updatedTodo.state, time: addNewLog() }],
        },
      ],
    ])
    setMainToDo(updatedTodo)
    const updatedTodos = todos.filter((task) => task.id !== id);
    setTodos(updatedTodos);

    setMainToDo(updatedTodos)
  };
  console.log(mainToDo)
  const clearCompleted = () => {
    // const updatedMainTodos = mainToDo.map((todo)=>{
    //   if(todo.state=="completed"){
    //     console.log({
    //       ...todo,state:(todo.state="deleted"),logs:[...todo.logs,{status:"deleted",time:addNewLog()}]
    //     });
        
    //     return {
    //       ...todo,state:(todo.state="deleted"),logs:[...todo.logs,{status:"deleted",time:addNewLog()}]
    //     }
    //   }
    //   else return todo
    // })
    // setMainToDo(updatedMainTodos)
    const updatedTodos = todos.filter((task) => task.state !== "completed");
    setTodos(updatedTodos);
  };

  console.log(mainToDo)
  const filterButtonHandler = (filterState) => {
    setFilterState(filterState);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewLog = () => {
    return moment().format("MMMM Do YYYY, h:mm:ss a");
  };
  return (
    <div className="app">
      <div className="container">
        <h2>To-Do List</h2>
        <div className="addTask">
          <input
            type="text"
            placeholder="Add a new task..."
            value={inputValue}
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
            className={filterState == "log" ? "clicked" : "nonClicked"}
          >
            Logs
          </button>
        </div>
        <div className="logs">
          {mainToDo.map(
            (todo, index) =>
              filterState == "log" && (
                <div key={index} style={{display:"flex",width:"98%",justifyContent:"center",
                  flexDirection:"column"
                }}>
                  <div style={{ display: "flex",width:"95%",justifyContent:"space-between"}}>
                    <h4>{todo.task}</h4>
                    <p style={{width:"250px",wordWrap:"break-word",color:"green"}}>{todo.id}</p>
                  </div>
                  <ul>
                    {todo.logs.map((log,index) => (
                      <li key={index} style={{display:"flex", justifyContent:"space-between", width:"95%"}}>
                        <p>STATUS:{log.status}</p> <p>TIME:{log.time}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )
          )}
        </div>
        {todos.length === 0 &&filterState!="log" ? (
          <p style={{ color: "#71717a" }}>No tasks yet. Add one above!</p>
        ) : (
          <div className="todos">
            {todos
              .filter((todo) => {
                if (filterState == "active") {
                  return todo.state === "active";
                } else if (filterState == "completed") {
                  return todo.state === "completed";
                } else if (filterState === "all") {
                  return true;
                }
              })
              .map((task, index) => (
                <label key={index} className="todo">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <input
                      type="checkbox"
                      style={{
                        height: "fit-content",
                      }}
                      onChange={() => checkboxHandler(task.id)}
                      checked={task.state == "completed"}
                    />
                    <p
                      style={{
                        textDecoration:
                          task.state == "completed" && "line-through",
                        fontWeight: "300",
                        color:task.state == "completed" && "red",
                        width: "245px",
                        wordWrap: "break-word",
                      }}
                    >
                      {task.task}
                    </p>
                  </div>
                  <button
                    style={{ color: "red" }}
                    onClick={() => deleteToDo(task.id)}
                  >
                    Delete
                  </button>
                </label>
              ))}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                height: "60px",
                alignItems: "center",
                width: "345px",
                color: "#6B7280",
              }}
            >
              <p>
                {
                  todos.filter((todo) => {
                    if (todo.state == "completed") {
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
    </div>
  );
}

export default App;
