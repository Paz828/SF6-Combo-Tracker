import axios from "axios";
import UpdateCombo from "./UpdateCombo";
import DeleteCombo from "./DeleteCombo";

const CombosItem = ({
  currentId,
  combo,
  setComboFormData,
  url,
  formData,
  updateCombo,
  setComboList,
  comboList,
}) => {
  const fillComboForm = async () => {
    const response = await axios.get(url + `/combos/${combo.combo_id}`);
    const data = await response.data;
    return setComboFormData(data);
  };

  if (currentId === combo.char_id) {
    return (
      <div>
        <p>{combo.combo_inputs}</p>
        <p>{combo.combo_dmg}</p>
        <p>{combo.combo_resources}</p>
        <UpdateCombo
          setComboFormData={setComboFormData}
          fillComboForm={fillComboForm}
          updateCombo={updateCombo}
          combo={combo}
          currentId={currentId}
          formData={formData}
        />
        <DeleteCombo
          setComboList={setComboList}
          url={url}
          combo={combo}
          comboList={comboList}
        />
      </div>
    );
  }
};

export default CombosItem;
