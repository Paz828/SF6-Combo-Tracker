import axios from "axios";

const ComboInputForm = ({
  updateCombo,
  updateAdd,
  url,
  formData,
  setComboFormData,
  setComboList,
  comboList,
  resetComboData,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setComboFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendFormData(formData);
    updateCombo("");
  };

  const updateAfterComboChange = (obj) => {
    const copyArr = comboList.slice(0);

    switch (updateAdd) {
      case "update":
        for (let i = 0; i < copyArr.length; i++) {
          if (copyArr[i].combo_id === obj.combo_id) {
            copyArr.splice(i, 1, obj);
          }
        }
        break;

      case "add":
        copyArr.push(obj);
        break;
    }
    setComboList(copyArr);
  };

  const sendFormData = async (formData) => {
    let response;
    let data;
    switch (updateAdd) {
      case "update":
        response = await axios.patch(
          url + `/combos/${formData.combo_id}`,
          formData
        );
        data = await response.data;

        break;

      case "add":
        response = await axios.post(url + "/combos", formData);
        data = await response.data;

        break;
    }
    updateAfterComboChange(data);
    resetComboData();
  };

  let value;
  switch (updateAdd) {
    case "update":
      value = "Update";
      break;

    case "add":
      value = "Add";
      break;
  }

  return (
    <div className="combo-input-form">
      <form action="combos" onSubmit={handleSubmit}>
        <label htmlFor="combo_inputs">Inputs</label>
        <input
          type="text"
          name="combo_inputs"
          value={formData.combo_inputs}
          onChange={handleChange}
        />
        <label htmlFor="combo_dmg">Damage</label>
        <input
          type="text"
          name="combo_dmg"
          value={formData.combo_dmg}
          onChange={handleChange}
        />
        <label htmlFor="combo_resources">Resources</label>
        <input
          type="text"
          name="combo_resources"
          value={formData.combo_resources}
          onChange={handleChange}
        />
        <input type="submit" className="button" value={value} />
      </form>
      <div className="combo-img">
        <img src="https://tse3.mm.bing.net/th?id=OIP.6gHAIF_zThkBbFKScsbBWgHaEK&pid=Api" />
      </div>
    </div>
  );
};

export default ComboInputForm;
