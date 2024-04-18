"use client";
import axios from "axios";
import { Plus } from "lucide-react";
import React from "react";

const CreateButton = () => {
  return (
    <button className="rounded-3xl bg-gray-900 flex flex-col mb-5 mx-4 items-center p-10 shadow-gradient-right transition duration-200 ease-in-out hover:shadow-gradient-right-hover">
      <Plus className="h-[50px] w-[150px] text-gray-50" />
      <span className="font-xs text-gray-50 pt-3">New</span>
    </button>
  );
};

export default CreateButton;
