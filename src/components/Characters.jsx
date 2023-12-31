import Character from "./Character";
import AddCharacter from "./AddCharacter";
import CharacterInputForm from "./CharacterInputForm";
import { useState } from "react";
import GoBack from "./GoBack";

const Characters = ({
  focus,
  charactersList,
  focusOn,
  url,
  updateAfterUpdate,
  updateAfterAdd,
  updateAfterDelete,
}) => {
  const [newCharacter, setNewCharacter] = useState(false);
  const [updateCharacter, setUpdateCharacter] = useState(false);
  const bringUpNewCharacterForm = () => {
    setNewCharacter(!newCharacter);
  };

  const bringUpUpdateForm = () => {
    setUpdateCharacter(!updateCharacter);
  };

  const resetCharacterState = (cheat) => {
    if (!cheat) {
      setNewCharacter(false);
      setUpdateCharacter(false);
    }
  };

  if (newCharacter || updateCharacter) {
    return (
      <div className="input-container">
        <div>
          <GoBack focusOn={resetCharacterState} />
        </div>
        <CharacterInputForm
          focus={focus}
          focusOn={focusOn}
          updateAfterUpdate={updateAfterUpdate}
          newCharacter={newCharacter}
          charactersList={charactersList}
          updateAfterAdd={updateAfterAdd}
          updateCharacter={updateCharacter}
          bringUpUpdateForm={bringUpUpdateForm}
          bringUpNewCharacterForm={bringUpNewCharacterForm}
          url={url}
        />
      </div>
    );
  } else if (focus.currentCharacter) {
    return (
      <div>
        <GoBack focusOn={focusOn} />
        <Character
          url={url}
          focus={focus}
          bringUpUpdateForm={bringUpUpdateForm}
          updateAfterDelete={updateAfterDelete}
          char={focus.currentCharacter}
          focusOn={focusOn}
        />
      </div>
    );
  } else {
    return (
      <div className="characters">
        {charactersList.map((char) => (
          <Character
            focus={focus}
            focusOn={focusOn}
            char={char}
            url={url}
            key={char.char_id}
          />
        ))}
        <footer>
          <AddCharacter bringUpNewCharacterForm={bringUpNewCharacterForm} />
        </footer>
      </div>
    );
  }
};

export default Characters;
