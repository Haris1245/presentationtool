import { UserButton } from "@clerk/nextjs";
import React from "react";

export const DashboardNavBar = () => {
  return (
    <nav className="bg-gray-900 mx-11 rounded-full px-3 mt-1">
      <div className="flex flex-wrap justify-between items-center    p-2">
        <a
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse p-2 bg-black rounded-full"
        >
          <img src="Logo.svg" className="h-9" alt="Flowbite Logo" />
        </a>
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </nav>
  );
};
