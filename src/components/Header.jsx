import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { queryGenerator } from "../lib/utils";
import { ArrowBigDown, PlusCircle } from "lucide-react";
import { useAppStore } from "../lib/zustend";

function Header() {
  const { setSheetOpen, invoices, setFilter } = useAppStore();
  const [items, setItems] = useState({
    draft: false,
    Paid: false,
    Pending: false,
  });

  function handleChange(key) {
    setItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  useEffect(() => {
    const query = queryGenerator(items);
    setFilter(query);
  }, [items, setFilter]);

  return (
    <header className="base_container">
      <div className="max-w-[730px] w-full mx-auto flex items-center justify-between py-[75px]">
        <div>
          <h1 className="font-bold text-[32px]">Invoices</h1>
          <p className="text-[#888EB0] text-[12px] mt-[8px]">
            There are {invoices?.length} total invoices
          </p>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" className="flex items-center gap-2">
                Filter by status <ArrowBigDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>Statuses</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="flex flex-col gap-3 px-2 py-1">
                {Object.entries(items).map(([key, value]) => (
                  <label
                    key={key}
                    className={`${buttonVariants({
                      variant: "ghost",
                    })} justify-start capitalize flex items-center gap-2 cursor-pointer`}
                    htmlFor={key}
                  >
                    <Checkbox
                      id={key}
                      checked={value}
                      onCheckedChange={() => handleChange(key)}
                    />
                    {key}
                  </label>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            className="max-w-[150px] w-full invoiceAdd flex items-center gap-2"
            onClick={setSheetOpen}
          >
            <PlusCircle className="h-5 w-5 bg-amber-50 rounded-full text-[#7C5DFA]" />
            New Invoice
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
