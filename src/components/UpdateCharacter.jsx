import axios from "axios";

const UpdateCharacter = ({ bringUpUpdateForm }) => {
  const handleClick = async () => {
    bringUpUpdateForm();
  };

  return <button onClick={handleClick}>Update Character</button>;
};

export default UpdateCharacter;
