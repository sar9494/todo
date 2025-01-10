const Button = (props) => {
  const { filterState, setFilterState, selectTypes,text } = props;
  return (
    <button
      onClick={() => {
        setFilterState(selectTypes);
      }}
      className={filterState.includes(selectTypes)? "clicked" : "nonClicked"}
    >
        {text}
    </button>
  );
};
export default Button;
