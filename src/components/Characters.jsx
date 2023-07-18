import Character from "./Character";
import AddCharacter from "./AddCharacter";
import InputForm from "./InputForm";
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

  if (newCharacter || updateCharacter) {
    return (
      <div>
        <InputForm
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
      <div>
        {charactersList.map((char) => (
          <Character
            focus={focus}
            focusOn={focusOn}
            char={char}
            url={url}
            key={char.char_id}
          />
        ))}
        <AddCharacter bringUpNewCharacterForm={bringUpNewCharacterForm} />
      </div>
    );
  }
};

export default Characters;
