const AddCombo = ({ updateCombo, setComboFormData, currentId, formData }) => {
  const handleClick = () => {
    setComboFormData({ ...formData, char_id: currentId });
    updateCombo("add");
  };

  return <button onClick={handleClick}>Add Combo</button>;
};

export default AddCombo;
