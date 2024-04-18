"use client";
import React, { useState, useEffect } from "react";
interface ProjectData {
  id: string;
  userId: string | null; // Make userId nullable
  name: string;
  description: string | null;
  gradient: string; // Make description nullable
}

interface ProjectCardProps {
  project: ProjectData;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div
      className="mx-5 bg-opacity-15 rounded-3xl flex items-end mb-5 transition duration-200 ease-in-out hover:scale-110"
      style={{ background: project.gradient }}
    >
      <div className="h-[40%] bg-gray-900 w-full rounded-b-2xl">
        <h1 className="text-white px-2 pt-2">{project.name}</h1>
        <h3 className="text-gray-600 px-2 pt-1">{project.description}</h3>
      </div>
    </div>
  );
};

export default ProjectCard;
