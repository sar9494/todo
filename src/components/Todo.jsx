import LittleButtons from "./LittleButtons";
import moment from "moment";
import TodoLogs from "./TodoLogs.jsx";

const Todos = (props) => {
    const {todos,filterState,setTodos,logs,setLogs,setFilterState}=props
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
                  time: moment().format("llll"),
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
                  time: moment().format("llll"),
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
                  time: moment().format("llll"),
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
                { status: "completed and deleted", time: moment().format("llll") },
              ],
            };
          } else return log;
        });
        setLogs(updatedlogss);
    
        const updatedTodos = todos.filter((task) => task.status !== "completed");
        setTodos(updatedTodos);
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
              logs: [...log.logs, { status: "restored", time: moment().format("llll") }],
            };
          } else return log;
        });
        setFilterState("logRemove");
        setLogs(updatedLogs);
      };
    
      const showAlert = (id, actionName) => {
        const text = `Are you sure you want to ${actionName} this task?`;
        if (confirm(text) == true && actionName == "delete") {
          deleteToDo(id);
        }
        if (confirm(text) == true && actionName == "restore") {
          restoreToDo(id);
        }
      };
    return <>
    <TodoLogs logs={logs} filterState={filterState} showAlert={showAlert}/>
    <div className="todos"> 
    {todos.length === 0 && filterState == "all" ? (
        <p style={{ color: "#71717a" }}>No tasks yet. Add one above!</p>
      ) : (
        <div className="todos">
          {
          todos
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
                <LittleButtons text="Delete" onClick={() => showAlert(task.id, "delete")} className="deleteButton"/>
              </label>
            ))}
          <p
            style={{
              display:
                (filterState == "completed" || filterState == "active") &&
                todos.filter((todo) => todo.status == filterState).length == 0
                  ? "block"
                  : "none",
              color: "#71717a",
            }}
          >
            No {filterState} tasks found.
          </p>
          <div
            className="clearCompleted"
            style={{
              display:
                filterState != "log" && todos.length != 0 ? "flex" : "none",
            }}
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
            <LittleButtons text="Clear completed" onClick={clearCompleted} className="clearCompletedButton"/>
          </div>
        </div>
      )}
    </div>
    </>
}

export default Todos