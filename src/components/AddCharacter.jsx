const AddCharacter = ({ newCharacter, bringUpNewCharacterForm }) => {
  const handleClick = () => {
    bringUpNewCharacterForm();
  };
  if (newCharacter) {
    return (
      <button type="submit" onClick={handleClick}>
        Add Character
      </button>
    );
  } else {
    return <button onClick={handleClick}>Add Character</button>;
  }
};

export default AddCharacter;
