import Combos from "./Combos";
import UpdateCharacter from "./UpdateCharacter";
import DeleteCharacter from "./DeleteCharacter";

const Character = ({
  focus,
  char,
  focusOn,
  url,
  updateAfterDelete,
  bringUpUpdateForm,
}) => {
  const handleClick = () => {
    focusOn(char.char_id, char.char_name, char.char_img);
  };

  if (focus.currentCharacter) {
    return (
      <div className="focused-container">
        <div className="focused-character">
          {focus.currentCharacter}
          <div>
            <img src={focus.currentImg} />
          </div>
          {/* <div className="focus-character-btns"> */}
          <UpdateCharacter
            bringUpUpdateForm={bringUpUpdateForm}
            focus={focus}
            url={url}
            focusOn={focusOn}
          />
          <DeleteCharacter
            url={url}
            updateAfterDelete={updateAfterDelete}
            focus={focus}
            focusOn={focusOn}
          />
          {/* </div> */}
        </div>
        <div>
          <Combos url={url} currentId={focus.currentId} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="character" onClick={handleClick}>
        <div className="square">
          <img className="pic" src={char.char_img} />
        </div>
        {char.char_name}
      </div>
    );
  }
};

export default Character;
