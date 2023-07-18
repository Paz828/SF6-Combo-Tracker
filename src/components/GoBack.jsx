const GoBack = ({ focusOn }) => {
  const handleClick = () => {
    focusOn("");
  };

  return <button onClick={handleClick}>Back</button>;
};

export default GoBack;
