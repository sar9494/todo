const LittleButtons = (props) => {
  const { className, text, onClick,style } = props;
  return (
    <button className={className} onClick={onClick} style={style}>
      {text}
    </button>
  );
};
{
  /* <button style={{ color: "red" , background:"none"}} onClick={clearCompleted}>
              Clear completed
            </button> */
}
// <button
//       onClick={() => showAlert(task.id, "delete")}
//       className="deleteButton"
//     >
//       Delete
//     </button>

//     <button className="addButton" onClick={createNewTask}>
//   Add
// </button>
export default LittleButtons;
