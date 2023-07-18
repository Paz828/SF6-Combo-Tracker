import UpdateCombo from "./UpdateCombo";
import AddCombo from "./AddCombo";
import DeleteCombo from "./DeleteCombo";
import CombosItem from "./CombosItem";
import axios from "axios";
import { useState, useEffect } from "react";

const Combos = ({ url, currentId }) => {
  const [comboList, setComboList] = useState([]);

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

  return (
    <div>
      {comboList.map((combo) => (
        <CombosItem
          url={url}
          combo={combo}
          currentId={currentId}
          key={combo.combo_id}
        />
      ))}
      <AddCombo />
      <UpdateCombo />
      <DeleteCombo />
    </div>
  );
};

export default Combos;
