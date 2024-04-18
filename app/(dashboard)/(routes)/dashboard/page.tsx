"use client";

import React, { useEffect, useState } from "react";
import { DashboardNavBar } from "@/components/dashboardNavBar";
import CreateButton from "@/components/createProject/createButton";
import ProjectCard from "@/components/projectCard";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
interface ProjectData {
  id: string;
  userId: string | null;
  name: string;
  description: string | null;
  gradient: string;
}

const DashboardPage = () => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [updated, setUpdated] = useState(false);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/get-projects");
        const projectsData = response.data;
        console.log(projectsData);
        setProjects(projectsData);
        setUpdated(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchData();
  }, [userId, updated]);

  return (
    <div className="w-full min-h-screen bg-slate-950 ">
      <div className="pt-3">
        <DashboardNavBar />
      </div>
      <div
        style={{ gridAutoRows: "minmax(200px, auto)" }}
        className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 px-4 my-10 "
      >
        <CreateButton setUpdated={setUpdated} />
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
