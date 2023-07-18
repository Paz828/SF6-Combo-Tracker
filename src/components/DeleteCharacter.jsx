import axios from "axios";

const DeleteCharacter = ({ url, focus, focusOn, updateAfterDelete }) => {
  const handleClick = async () => {
    await axios.delete(url + `/characters/${focus.currentId}`);
    updateAfterDelete(focus.currentId);
    focusOn("", NaN);
  };

  return <button onClick={handleClick}>Delete Character</button>;
};

export default DeleteCharacter;
