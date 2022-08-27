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
}

const Home: NextPage = () => {
  const [items, setItems] = useState<Item[]>([]);

  const [isWritting, setIsWritting] = useState(false);

  useEffect(() => {
    // Fetch the existing entries
    getAllItems().then((entries) => {
      setItems((prevState) => {
        const initialItems = entries.map((entry) => {
          const uuid = entry[0] as string;
          const item = entry[1] as Item;

          console.log("ITEM", item);

          return {
            id: uuid,
            value: item.value,
            order: item.order,
            isFocused: false,
          };
        });

        return initialItems;
      });
    });
  }, []);

  function startTyping() {
    // focus le input
    // show le input
    // si y'a déjà un input en cours, on transforme l'input en item de la liste
    setIsWritting(true);
  }

  async function createItem() {
    setItems([
      ...items,
      { id: uuid(), value: "", isFocused: true, order: items.length },
    ]);
  }

  async function getAllItems() {
    return await entries();
  }

  async function updateItem(id: string, newVal: string) {
    let updatedItem: Item | null = null;

    const newState = await items.map((item) => {
      if (item.id === id) {
        updatedItem = { ...item, value: newVal };
        return updatedItem;
      }

      return item;
    });

    setItems(newState);

    if (updatedItem) {
      await update(id, (oldValue) => updatedItem);
    }
  }

  async function deleteItem(id: string) {
    const newState = items.filter((item) => item.id !== id);
    setItems(newState);

    await del(id);
  }

  return (
    <div className="h-screen p-4 bg-rose-50">
      <h1 className="mb-4 text-3xl font-extrabold">Notes</h1>
      <ul className="text-xl font-handwritting">
        {items
          .sort((a, b) => a.order - b.order)
          .map((item) => (
            <ListItem
              key={item.id}
              value={item.value}
              isFocused={item.isFocused}
              onChange={(val) => {
                updateItem(item.id, val);
              }}
              onRemove={() => deleteItem(item.id)}
            />
          ))}
      </ul>

      <button onClick={createItem}>New item</button>
    </div>
  );
};

export default Home;
