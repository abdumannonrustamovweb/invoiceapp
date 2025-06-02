import React from "react";
import ThemesDrop from "../ThemesDrop";
import { useAppStore } from "../../lib/zustend";
import Form from "../Form";
import { Sheet, SheetContent } from "../ui/sheet";

function Sidebar() {
  const { setSheetOpen, sheetOpen, editedData } = useAppStore();

  return (
    <>
      <div
        className="bg-[#373B53] flex items-center justify-between
        w-full h-[72px] z-50
        md:flex-col md:justify-between md:w-[80px] md:h-screen"
      >
        <div
          className="p-2 bg-[#7C5DFA] flex justify-center items-center 
          h-full w-[72px] md:w-full md:h-[80px] 
          rounded-r-2xl md:rounded-r-none md:rounded-b-2xl"
        >
          <img src="./image/Icon.svg" alt="icon" className="w-15 h-15" />
        </div>

        <div className="flex gap-4 items-center px-2 md:flex-col md:gap-6 md:w-full">
          <ThemesDrop />
          <hr className="w-full bg-[#494E6E] border-0 h-[1px] hidden md:block" />
          <img
            className="rounded-full mb-2"
            src="./image/Avatar.svg"
            alt="Avatar"
            width={48}
            height={48}
          />
        </div>
      </div>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent
          side="left"
          className="ml-0 md:ml-[80px] w-full md:min-w-[calc(55%-80px)] modalCss"
        >
          <Form setSheetOpen={setSheetOpen} info={editedData} />
        </SheetContent>
      </Sheet>
    </>
  );
}

export default Sidebar;
