import { useState, useEffect } from "react";
import Characters from "./components/Characters";
import axios from "axios";

function App() {
  const [isFocus, setIsFocus] = useState({
    currentId: NaN,
    currentCharacter: "",
    currentImg: "",
  });
  const [charactersList, setCharactersList] = useState([]);

  const URL = "https://sf6-combo-tracker.onrender.com";

  const focusOn = (id, character, img) => {
    setIsFocus({ currentCharacter: character, currentId: id, currentImg: img });
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const charResponse = await axios.get(URL + "/characters");

        setCharactersList(charResponse.data);
      } catch (err) {
        console.error(err);
      }
    };

    getData();
  }, []);

  const updateAfterDelete = (id) => {
    const copyArr = charactersList.slice(0);
    for (let i = 0; i < copyArr.length; i++) {
      if (copyArr[i].char_id === id) {
        copyArr.splice(i, 1);
      }
    }
    setCharactersList(copyArr);
  };

  const updateAfterAdd = (obj) => {
    const copyArr = charactersList.slice(0);
    copyArr.push(obj);
    setCharactersList(copyArr);
  };

  const updateAfterUpdate = (obj) => {
    const copyArr = charactersList.slice(0);
    for (let i = 0; i < copyArr.length; i++) {
      if (copyArr[i].char_id === obj.char_id) {
        copyArr.splice(i, 1, obj);
      }
    }
    setCharactersList(copyArr);
  };

  return (
    <div className="container">
      <header>
        <h1>Street Fighter 6 Combo Tracker</h1>
      </header>
      <Characters
        focus={isFocus}
        updateAfterDelete={updateAfterDelete}
        focusOn={focusOn}
        updateAfterUpdate={updateAfterUpdate}
        charactersList={charactersList}
        url={URL}
        updateAfterAdd={updateAfterAdd}
      />
    </div>
  );
}

export default App;
