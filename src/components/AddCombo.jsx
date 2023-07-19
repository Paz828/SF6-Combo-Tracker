const AddCombo = ({
  updateCombo,
  setComboFormData,
  currentId,
  formData,
  resetComboData,
  comboFormData,
}) => {
  const handleClick = () => {
    resetComboData();
    console.log();
    setComboFormData({ ...formData, char_id: currentId });
    updateCombo("add");
  };

  return <button onClick={handleClick}>Add Combo</button>;
};

export default AddCombo;
