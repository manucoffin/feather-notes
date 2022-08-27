import clsx from "clsx";
import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { useDoubleTap } from "use-double-tap";
import EraseButton from "./EraseButton";

interface Props {
  value: string;
  isFocused: boolean;
  isStruck: boolean;
  onChange: (value: string) => void;
  onRemove: () => void;
  onStrike: (val: boolean) => void;
}

const ListItem = ({
  value,
  isFocused,
  isStruck,
  onChange,
  onRemove,
  onStrike,
}: Props) => {
  const [showInput, setShowInput] = useState(false);
  const [stroke, setStroke] = useState(isStruck);
  const [swiping, setSwiping] = useState(false);
  const [strokeSize, setStrokeSize] = useState(0);

  const doubleTapHandlers = useDoubleTap((event) => {
    setShowInput(true);
  });

  const swipeHandlers = useSwipeable({
    onSwiping: ({ deltaX }) => {
      setSwiping(true);
      setStrokeSize(deltaX);
    },
    onSwipedRight: ({ deltaX }) => {
      if (deltaX > 50) {
        setStroke(true);
        onStrike(true);
      }
      setSwiping(false);
    },
    onSwipedLeft: ({ deltaX }) => {
      if (deltaX < -50) {
        setStroke(false);
        onStrike(false);
      }
      setSwiping(false);
    },
  });

  useEffect(() => {
    if (isFocused) {
      setShowInput(true);
    }
  }, []);

  function handleBlur() {
    setShowInput(false);
  }

  return (
    <li className="mb-2 border-b text-sky-900 border-amber-800/10">
      {showInput ? (
        <input
          className="w-full bg-transparent outline-0"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <span
          {...doubleTapHandlers}
          {...swipeHandlers}
          className={clsx(
            { "line-through": stroke },
            "relative flex justify-between w-full"
          )}
        >
          <div
            className={clsx(
              { hidden: !swiping },
              "absolute left-0 h-0.5 bg-sky-900 top-1/2 max-w-full"
            )}
            style={{ width: `${strokeSize}px` }}
          ></div>
          {value}

          {stroke ? <EraseButton onClick={onRemove} /> : null}
        </span>
      )}
    </li>
  );
};

export default ListItem;
