"use client";
import React, { useEffect, useState } from "react";
import { DashboardNavBar } from "@/components/dashboardNavBar";
import CreateButton from "@/components/createProject/createButton";
import prismadb from "@/lib/prisma";
import { useAuth } from "@clerk/nextjs";
import ProjectCard from "@/components/projectCard";
import axios from "axios";

interface ProjectData {
  id: string;
  userId: string | null; // Make userId nullable
  name: string;
  description: string | null;
  gradient: string; // Make description nullable
}

const DashboardPage = () => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/get-projects");
        const projectsData = response.data; // Extract data from response
        console.log(projectsData); // Log the fetched data
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchData();
  }, [userId]);
  // Fetch data whenever userId changes

  return (
    <div className="w-full min-h-screen bg-slate-950 ">
      <div className="pt-3">
        <DashboardNavBar />
      </div>
      <div
        style={{ gridAutoRows: "minmax(200px, auto)" }} // Add this line
        className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 px-4 my-10 "
      >
        <CreateButton />
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
