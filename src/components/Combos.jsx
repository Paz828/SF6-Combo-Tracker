import AddCombo from "./AddCombo";
import CombosItem from "./CombosItem";
import axios from "axios";
import { useState, useEffect } from "react";
import ComboInputForm from "./ComboInputForm";
import GoBack from "./GoBack";

const Combos = ({ url, currentId }) => {
  const [comboList, setComboList] = useState([]);
  const [updateAdd, setUpdateAdd] = useState("");
  const [comboFormData, setComboFormData] = useState({
    combo_inputs: "",
    combo_dmg: "",
    combo_resources: "",
    char_id: 0,
  });

  const resetComboData = () => {
    console.log("reset");
    setComboFormData({
      combo_inputs: "",
      combo_dmg: "",
      combo_resources: "",
      char_id: 0,
    });
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const comboResponse = await axios.get(url + "/combos");

        setComboList(comboResponse.data);
      } catch (err) {
        console.error(err);
      }
    };

    getData();
  }, []);

  const updateCombo = (verb) => {
    setUpdateAdd(verb);
  };

  if (updateAdd) {
    return (
      <div>
        <GoBack focusOn={updateCombo} />
        <ComboInputForm
          url={url}
          resetComboData={resetComboData}
          updateCombo={updateCombo}
          updateAdd={updateAdd}
          formData={comboFormData}
          setComboFormData={setComboFormData}
          setComboList={setComboList}
          comboList={comboList}
        />
      </div>
    );
  } else {
    return (
      <div className="combos">
        <h2>Combos</h2>
        {comboList.map((combo) => (
          <CombosItem
            url={url}
            combo={combo}
            updateCombo={updateCombo}
            setComboFormData={setComboFormData}
            formData={comboFormData}
            currentId={currentId}
            key={combo.combo_id}
            comboList={comboList}
            setComboList={setComboList}
          />
        ))}
        <footer>
          <AddCombo
            updateCombo={updateCombo}
            setComboFormData={setComboFormData}
            currentId={currentId}
            formData={comboFormData}
            comboFormData={comboFormData}
            resetComboData={resetComboData}
          />
        </footer>
      </div>
    );
  }
};

export default Combos;
