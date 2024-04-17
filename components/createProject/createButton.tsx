"use client";
import axios from "axios";
import { Plus } from "lucide-react";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formSchema } from "@/components/createProject/constants";
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
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";

const CreateButton = () => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/create-project", {
        name: values.name,
        description: values.description,
      });

      if (response.status == 200) {
        setOpen(false);
        form.reset();
      }
    } catch (err: any) {
      console.log(err);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="rounded-3xl bg-gray-900 flex flex-col  mx-7 items-center p-10 shadow-gradient-right transition duration-200 ease-in-out hover:shadow-gradient-right-hover">
        <Plus className="h-[50px] w-[50px] text-gray-50" />
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
                    <Input placeholder="The life of Shakespeare" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="email"
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
  );
};

export default CreateButton;
