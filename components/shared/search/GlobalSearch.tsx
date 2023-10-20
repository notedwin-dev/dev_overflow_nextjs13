import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";

const GlobalSearch = () => {
  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      <div className="background-light-800_dark-gradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <Image
          src="/assets/icons/search.svg"
          alt="Search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
        <Input
          type="text"
          placeholder="Search globally"
          className="paragraph-regular no-focus placeholder background-light-800_dark-gradient border-none shadow-none outline-none"
        />
      </div>
    </div>
  );
};

export default GlobalSearch;
