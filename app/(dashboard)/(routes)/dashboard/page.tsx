import React from "react";
import { DashboardNavBar } from "@/components/dashboardNavBar";
import CreateButton from "@/components/createProject/createButton";
import prismadb from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import ProjectCard from "@/components/projectCard";

const DashboardPage = async () => {
  const { userId } = auth();
  const projects = await prismadb.presentation.findMany({
    where: {
      userId: userId,
    },
  });
  return (
    <div className="w-full min-h-screen bg-slate-950">
      <div className="pt-3">
        <DashboardNavBar />
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-4 my-10 ">
        <CreateButton />
        {projects.map((project) => (
          <ProjectCard key={project.id} />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
