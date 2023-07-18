const CombosItem = ({ currentId, combo }) => {
  if (currentId === combo.char_id) {
    return (
      <div>
        <p>{combo.combo_inputs}</p>
        <p>{combo.combo_dmg}</p>
        <p>{combo.combo_resources}</p>
      </div>
    );
  }
};

export default CombosItem;
