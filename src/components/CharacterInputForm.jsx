import { useState } from "react";
import axios from "axios";

const CharacterInputForm = ({
  bringUpNewCharacterForm,
  url,
  updateAfterAdd,
  bringUpUpdateForm,
  updateCharacter,
  updateAfterUpdate,
  focus,
  focusOn,
}) => {
  const [formData, setFormData] = useState({
    char_name: "",
    char_img: "",
  });

  const changePreview = (e) => {
    switch (e.target.className) {
      case "":
        e.target.className = "pic";
        e.target.parentNode.className += ", square";
        break;

      default:
        e.target.className = "";
        e.target.parentNode.className = "preview-pic";
        break;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendFormData(formData);
    if (updateCharacter) {
      bringUpUpdateForm();
    } else {
      bringUpNewCharacterForm();
    }
  };

  const sendFormData = async (formData) => {
    try {
      if (updateCharacter) {
        const response = await axios.patch(
          url + `/characters/${focus.currentId}`,
          formData
        );
        const data = await response.data;
        focusOn(data.char_id, data.char_name, data.char_img);
        updateAfterUpdate(data);
      } else {
        const response = await axios.post(url + "/characters", formData);
        updateAfterAdd(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  let value = "";
  if (updateCharacter) {
    value = "Update Character";
  } else {
    value = "Add Character";
  }

  return (
    <div>
      <div>
        <form action="characters" onSubmit={handleSubmit}>
          <label htmlFor="char_name">Character Name</label>
          <input
            type="text"
            name="char_name"
            value={formData.char_name}
            onChange={handleChange}
          />
          <label htmlFor="char_img">Character Image URL</label>
          <input
            type="text"
            name="char_img"
            value={formData.char_img}
            onChange={handleChange}
          />
          <input type="submit" value={value} />
        </form>
      </div>
      <div className="preview-container">
        <div className="preview-pic">
          <img className="" src={formData.char_img} onClick={changePreview} />
        </div>
      </div>
    </div>
  );
};

export default CharacterInputForm;
