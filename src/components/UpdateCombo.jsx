const UpdateCombo = ({ updateCombo, fillComboForm }) => {
  const handleClick = () => {
    fillComboForm();
    updateCombo("update");
  };
  return <button onClick={handleClick}>Update Combo</button>;
};

export default UpdateCombo;
