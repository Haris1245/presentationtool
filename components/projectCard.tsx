"use client";
import React, { useState, useEffect } from "react";

const ProjectCard = () => {
  const [background, setBackground] = useState("");
  const [code, setCode] = useState("");

  const randomElement = () => {
    const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
    return array[Math.floor(array.length * Math.random())];
  };

  const randomColor = () => {
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += randomElement();
    }
    return color;
  };

  const randomAngle = () => {
    return Math.floor(360 * Math.random());
  };

  const generateBackground = () => {
    const gradientColor1 = randomColor();
    const gradientColor2 = randomColor();
    const newBg =
      "linear-gradient(" +
      randomAngle() +
      "deg, " +
      gradientColor1 +
      ", " +
      gradientColor2 +
      ")";
    setBackground(newBg);
    setCode(newBg);
  };

  useEffect(() => {
    generateBackground(); // Call the function when the component mounts
  }, []); // Empty dependency array means it only runs once, on mount

  return (
    <div
      className="w-full h-full mx-5 opacity-40 rounded-3xl"
      style={{ background: background }}
    >
      <div className="h-full bg-gradient-to-b from-transparent to-gray-900 rounded-3xl"></div>
    </div>
  );
};

export default ProjectCard;
