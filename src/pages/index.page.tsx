import { del, entries, set, update } from "idb-keyval";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import ListItem from "@src/pages/home/components/ListItem";

interface Item {
  id: string;
  value: string;
  isFocused: boolean;
  order: number;
  stroke: boolean;
}

const Home: NextPage = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    // Fetch the existing entries
    getAllItems().then((entries) => {
      setItems((prevState) => {
        const initialItems = entries.map((entry) => {
          const uuid = entry[0] as string;
          const item = entry[1] as Item;

          return {
            id: uuid,
            value: item.value,
            order: item.order,
            isFocused: false,
            stroke: item.stroke,
          };
        });

        return initialItems.sort((a, b) => a.order - b.order);
      });
    });
  }, []);

  async function createItem() {
    setItems([
      ...items,
      {
        id: uuid(),
        value: "",
        isFocused: true,
        order: items.length,
        stroke: false,
      },
    ]);
  }

  async function getAllItems() {
    return await entries();
  }

  async function updateItem(id: string, updatedItem: Item) {
    const newState = await items.map((item) =>
      item.id === id ? updatedItem : item
    );

    setItems(newState);

    await update(id, (oldValue) => updatedItem);
  }

  async function deleteItem(id: string) {
    const newState = items.filter((item) => item.id !== id);
    setItems(newState);

    await del(id);
  }

  return (
    <div className="flex flex-col h-screen p-4 bg-orange-50">
      <div className="flex items-baseline justify-between">
        <h1 className="mb-4 text-3xl font-extrabold">Notes</h1>
      </div>

      <ul className="overflow-y-auto text-xl max-h-[85%] font-handwritting">
        {items.map((item) => (
          <ListItem
            key={item.id}
            value={item.value}
            isFocused={item.isFocused}
            isStruck={item.stroke}
            onChange={(val) => updateItem(item.id, { ...item, value: val })}
            onRemove={() => deleteItem(item.id)}
            onStrike={(stroke) => updateItem(item.id, { ...item, stroke })}
          />
        ))}
      </ul>

      <button
        onClick={createItem}
        className="flex-1 w-full mt-2 text-xl italic text-gray-400 font-handwritting"
      >
        ...
      </button>
    </div>
  );
};

export default Home;
