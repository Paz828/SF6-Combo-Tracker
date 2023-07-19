const UpdateCombo = ({ updateCombo, fillComboForm }) => {
  const handleClick = () => {
    fillComboForm();
    updateCombo("update");
  };
  return <button onClick={handleClick}>Update</button>;
};

export default UpdateCombo;
