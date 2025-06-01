import React from "react";
import ThemesDrop from "../ThemesDrop";
import { useAppStore } from "../../lib/zustend";
import Form from "../Form";
import { Sheet, SheetContent } from "../ui/sheet";

function Sidebar() {
  const { setSheetOpen, sheetOpen, editedData } = useAppStore();

  return (
    <>
      <div className="bg-[#373B53] flex md:flex-col justify-between items-center w-[72px] md:w-[80px] h-[72px] md:h-screen z-50">
        {/* Icon */}
        <div className="p-2 bg-[#7C5DFA] w-full flex justify-center items-center h-full md:h-[80px] rounded-r-2xl">
          <img src="./image/Icon.svg" alt="icon" className="w-55 h-55" />
        </div>

        <div className="flex md:flex-col items-center gap-4 md:gap-6 px-2 md:w-full">
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
          className="ml-[72px] md:min-w-[calc(100%-72px)] lg:min-w-[calc(100%-80px)] modalCss"
        >
          <Form setSheetOpen={setSheetOpen} info={editedData} />
        </SheetContent>
      </Sheet>
    </>
  );
}

export default Sidebar;
