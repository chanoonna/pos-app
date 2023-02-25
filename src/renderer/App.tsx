import { useState } from 'react';

export const App = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      Add Main Edited
      {count}
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Add
      </button>
    </div>
  );
};
