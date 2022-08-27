import { useEffect, useState } from "react";
import { useDoubleTap } from "use-double-tap";

interface Props {
  value: string;
  isFocused: boolean;
  onChange: (value: string) => void;
  onRemove: () => void;
}

const ListItem = ({ value, isFocused, onChange, onRemove }: Props) => {
  const [showInput, setShowInput] = useState(false);

  const bindDoubleTap = useDoubleTap((event) => {
    setShowInput(true);
    console.log("Double tapped");
  });

  useEffect(() => {
    if (isFocused) {
      setShowInput(true);
    }
  }, []);

  function handleChange() {
    //
  }

  function handleBlur() {
    setShowInput(false);
  }

  return (
    <li className="mb-2">
      {showInput ? (
        <input
          className="w-full bg-transparent"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <span {...bindDoubleTap} className="block w-full">
          {value} - <button onClick={onRemove}>DEL</button>
        </span>
      )}
    </li>
  );
};

export default ListItem;
