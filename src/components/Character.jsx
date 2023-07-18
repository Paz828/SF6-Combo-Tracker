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
      <div>
        {focus.currentCharacter}
        <Combos url={url} currentId={focus.currentId} />
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
      </div>
    );
  } else {
    return (
      <div onClick={handleClick}>
        {/*<img src={char.char_img} />*/}
        {char.char_name}
      </div>
    );
  }
};

export default Character;
