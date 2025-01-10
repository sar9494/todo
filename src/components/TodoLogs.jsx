import LittleButtons from "./LittleButtons"

const TodoLogs = (props) => {
    const {logs,filterState ,showAlert} = props
    return <div className="logs">
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
                    color: log.status.includes("deleted") ? "red" : "black",
                  }}
                >
                  <p>{log.status}: {"  " + log.time}</p>
                </li>
              ))}
            </ul>
            <LittleButtons text="Restore" className="clicked" style={{
                display: todo.status.includes("deleted") ? "block" : "none",
              }} onClick={() => showAlert(todo.id, "restore")}/>
          </div>
        )
    )}
  </div>
}
export default TodoLogs