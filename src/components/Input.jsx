import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import Button from "./Button";
const FILTER_BUTTONS = [
  { text: "All", status: "all" },
  { text: "Active", status: "active" },
  { text: "Completed", status: "completed" },
  { text: "Logs", status: "log" },
];
const Input = (props) => {
  const { logs, todos, setLogs, setTodos, filterState, setFilterState } = props;
  const [inputValue, setInputValue] = useState("");
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
            time: moment().format("llll"),
          },
        ],
      };
      setTodos([...todos, newTask]);
      setLogs([...logs, newLog]);
      setInputValue("");
    }
  };
  console.log(todos, logs);
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <>
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
      {
        FILTER_BUTTONS.map((button,index)=>(
          <Button key={index} setFilterState={setFilterState}
          filterState={filterState}
          selectTypes={button.status}
          text={button.text}/>
        ))
      }
      </div>
    </>
  );
};
//filterState, setFilterState, selectTypes,text
export default Input;
