"use client";
import React, { useEffect, useState } from "react";
import { DashboardNavBar } from "@/components/dashboardNavBar";
import prismadb from "@/lib/prisma";
import { useAuth } from "@clerk/nextjs";
import ProjectCard from "@/components/projectCard";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formSchema } from "@/app/(dashboard)/(routes)/dashboard/constants";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
interface ProjectData {
  id: string;
  userId: string | null; // Make userId nullable
  name: string;
  description: string | null;
  gradient: string; // Make description nullable
}

const DashboardPage = () => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [updated, setUpdated] = useState(false);
  const { userId } = useAuth();
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

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
    return newBg; // Return the generated background
  };
  // Extract data from response

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const newBg = generateBackground(); // Generate the background
      const response = await axios.post("/api/create-project", {
        name: values.name,
        description: values.description,
        gradient: newBg, // Use the generated background here
      });

      if (response.status === 200) {
        setUpdated(true);
        setOpen(false);
        form.reset();
      }
    } catch (err: any) {
      console.log(err);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/get-projects");
        const projectsData = response.data; // Extract data from response
        console.log(projectsData); // Log the fetched data
        setProjects(projectsData);
        setUpdated(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchData();
  }, [userId, updated]);
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
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className="rounded-3xl bg-gray-900 flex flex-col mb-5 mx-4 items-center p-10 shadow-gradient-right transition duration-200 ease-in-out hover:shadow-gradient-right-hover">
            <Plus className="h-[50px] w-[150px] text-gray-50" />
            <span className="font-xs text-gray-50 pt-3">New</span>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-[350px] block m-auto">
                      <FormLabel>Project name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="The life of Shakespeare"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="description"
                  render={({ field }) => (
                    <FormItem className="w-[350px] block m-auto">
                      <FormLabel>Project Description</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="This presentation is for literature class"
                          {...field}
                          type="text"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <DialogTrigger asChild>
                  <Button type="submit" className="block m-auto my-3">
                    Submit
                  </Button>
                </DialogTrigger>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
