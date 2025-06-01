import { useState, useEffect } from "react";
import { Input } from "../components/ui/input";
import { Button } from "./ui/button";
import { Plus, TrashIcon } from "lucide-react";
import { toast } from "sonner";
import { useAppStore } from "../lib/zustend";

export default function ItemList({ info, onItemsChange }) {
  const { setItems } = useAppStore();
  const [localItems, setLocalItems] = useState(
    info && info.length > 0
      ? info
      : [
          {
            id: crypto.randomUUID(),
            name: "Banner design",
            quantity: 1,
            price: 156,
          },
        ]
  );

  useEffect(() => {
    setItems(localItems);
  }, [localItems, setItems]);

  useEffect(() => {
    if (onItemsChange) {
      onItemsChange(localItems);
    }
  }, [localItems, onItemsChange]);

  function handleChange(e, id) {
    const { name, value } = e.target;
    setLocalItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              [name]: name === "name" ? value : Number(value),
            }
          : item
      )
    );
  }

  function handleClick(type, id) {
    if (type === "add") {
      if (localItems.at(-1).name.trim() !== "") {
        setLocalItems((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            name: "",
            quantity: 1,
            price: 0,
          },
        ]);
      } else {
        toast.info("Ismni kiritish zarur!");
      }
    } else if (type === "delete") {
      if (localItems.length === 1) {
        toast.info("Kamida 1 ta element qolishi zarur!");
      } else {
        setLocalItems((prev) => prev.filter((el) => el.id !== id));
      }
    }
  }

  return (
    <div>
      <ul className="flex flex-col items-center !justify-start gap-[18px]">
        {localItems.map(({ price, id, name, quantity }) => (
          <li
            key={id}
            className="flex items-center gap-[16px] w-full max-w-4xl"
          >
            <div className="flex flex-col gap-[5px] flex-grow">
              <label htmlFor={`name-${id}`}>Item Name</label>
              <Input
                id={`name-${id}`}
                className="max-w-full"
                type="text"
                name="name"
                placeholder="Item Name"
                value={name}
                onChange={(e) => handleChange(e, id)}
              />
            </div>

            <div className="flex flex-col gap-[5px] w-[80px]">
              <label htmlFor={`quantity-${id}`}>Qty.</label>
              <Input
                id={`quantity-${id}`}
                type="number"
                placeholder="Qty"
                name="quantity"
                value={quantity}
                min={1}
                onChange={(e) => handleChange(e, id)}
              />
            </div>

            <div className="flex flex-col gap-[5px] w-[120px]">
              <label htmlFor={`price-${id}`}>Price</label>
              <Input
                id={`price-${id}`}
                type="number"
                placeholder="Price"
                name="price"
                value={price}
                min={0}
                onChange={(e) => handleChange(e, id)}
              />
            </div>

            <div className="flex flex-col gap-[10px] w-[100px]">
              <label>Total</label>
              <span>{(price * quantity).toFixed(2)}</span>
            </div>

            <Button
              onClick={() => handleClick("delete", id)}
              variant="destructive"
              className="mt-[24px]"
              size="icon"
              aria-label="Delete item"
            >
              <TrashIcon />
            </Button>
          </li>
        ))}

        <Button
          type="button"
          variant="secondary"
          className="w-full rounded-3xl mt-4"
          onClick={() => handleClick("add")}
        >
          <Plus /> Add New Item
        </Button>
      </ul>
    </div>
  );
}
