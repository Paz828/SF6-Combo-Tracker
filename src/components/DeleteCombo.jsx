import axios from "axios";

const DeleteCombo = ({ comboList, setComboList, combo, url }) => {
  const handleClick = () => {
    removeCombo(combo.combo_id);
    updateAfterComboDelete(combo.combo_id);
  };

  const removeCombo = async (id) => {
    await axios.delete(url + `/combos/${id}`);
  };

  const updateAfterComboDelete = (id) => {
    const copyArr = comboList.slice(0);
    for (let i = 0; i < copyArr.length; i++) {
      if (copyArr[i].combo_id === id) {
        copyArr.splice(i, 1);
      }
    }
    setComboList(copyArr);
  };

  return <button onClick={handleClick}>Delete</button>;
};

export default DeleteCombo;
