import "./App.css";
import { useState } from "react";
import Input from "./components/Input";
import Todos from "./components/Todo";
import FooterText from "./components/FooteText";

function App() {
  const [todos, setTodos] = useState([]);
  const [logs, setLogs] = useState([]);
  const [filterState, setFilterState] = useState("all");
  return (
    <div className="container">
      <Input logs={logs} todos={todos} setLogs={setLogs} setTodos={setTodos} filterState={filterState} setFilterState={setFilterState}/>
      <Todos todos={todos} filterState={filterState} setTodos={setTodos} logs={logs} setLogs={setLogs} setFilterState={setFilterState}/>
      <FooterText/>
    </div>
  );
}

export default App;